<template>
  <v-container>
    <v-row class="text-center">
      <v-col>
        <h1> Puzzles </h1>
        <div id="puzzleBoard" style="width: 400px"></div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import ChessBoard from "chessboardjs-vue"
  import Chess from 'chess.js'

  let board
  let puzzle = {
            "puzzleid":"HxxIU",
            "fen":"2r2rk1/3nqp1p/p3p1p1/np1p4/3P4/P1NBP3/1PQ2PPP/2R2RK1 w - - 0 18",
            "moves":["c3d5","e6d5","c2c8","f8c8"],
            "rating":1683,
            "ratingdeviation":74,
            "themes":["advantage","hangingPiece","middlegame","short"]
        }
  const game = new Chess()  

  function onDragStart (source, piece, position, orientation) {
    // do not pick up pieces if the game is over
    if (game.game_over()) return false

    // only pick up pieces for the side to move
    if ((game.turn() === 'w' && piece.search(/^b/) !== -1) ||
        (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
      return false
    }
  }

  function onDrop (source, target, piece) {
    var move_cfg = {
      from: source,
      to: target,
      promotion: 'q'
    }
    // check we are not trying to make an illegal pawn move to the 8th or 1st rank,
    // so the promotion dialog doesn't pop up unnecessarily
    // e.g. (p)d7-f8
    var move = game.move(move_cfg)

    // illegal move
    if (move === null) {
      return 'snapback';
    } else {
      game.undo(); //move is ok, now we can go ahead and check for promotion
    }

    // Check if a pawn is reaching the last rank for promotion
    var source_rank = source.substring(2,1);
    var target_rank = target.substring(2,1);
    var piece_code = piece.substring(2,1)

    if (piece_code === 'P' && ((source_rank === '7' && target_rank === '8') || (source_rank === '2' && target_rank === '1'))) {
      // TODO: Show promotion dialogue
      console.log("IS PROMOTION")
      move_cfg.promotion = 'n'
      console.log(move_cfg)
    }

    move = game.move(move_cfg)
  }

  // update the board position after the piece snap
  // for castling, en passant, pawn promotion
  function onSnapEnd () {
    board.position(game.fen())
    let movesList = []
    for(let move of game.history({verbose:true})){
      let moveStr = move.from+move.to
      movesList.push(moveStr)
    }
    
    // Now Validate this move against the puzzle
    if(validateMoves(movesList)) {
      // Moves so far are correct
      // check if puzzle finished
      if(movesList.length == puzzle.moves.length){
        // TODO: LOAD NEXT PUZZLE
        console.log("FINISHED AND CORRECT")
        return
      }

      // if more moves, make the next move
      makeMove(movesList.length)
    } else {
      // Incorrect move made
      console.log("WRONG MOVE")
    }
  }

  function makeMove(x){
    let from = puzzle.moves[x].substring(0,2)
    let to = puzzle.moves[x].substring(2,4)

    game.move({from,to})
    setTimeout(() => {board.position(game.fen())},500)
  }

  function validateMoves(moveList){
    for(let i=0; i < moveList.length; i++){
      let puzzleMove = puzzle.moves[i]
      let playerMove = moveList[i]

      if (playerMove != puzzleMove) {
        return false
      } 
    }
    return true
  }

  export default {
    name: 'Puzzles',
    mounted() {
      let orientation = (puzzle.fen.split(' ')[1] == 'w') ? 'black' : 'white'; // The puzzle FEN starts in the position with the opponent ABOUT to move
                                                                              // which means the player is the opposite of the FEN "to move"         
      game.load(puzzle.fen)
      board = ChessBoard('puzzleBoard',{
        draggable: true,
        position: puzzle.fen,
        orientation,
        onDragStart: onDragStart,
        onDrop: onDrop,
        onSnapEnd: onSnapEnd
      });
      makeMove(0)
    } 
  }
</script>