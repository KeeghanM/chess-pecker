<template>
  <v-container>
    <promotion v-if="isPromotion"></promotion>
    <v-row class="text-center">
      <v-col>
        <h1> Puzzles </h1>
        <div id="puzzleBoard" style="width: 600px"></div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import ChessBoard from "chessboardjs-vue"
  import Chess from 'chess.js'
  import Promotion from './Promotion.vue'
  
  let isPromotion = false

  let board
  let playerMoves = []
  let puzzles = [{"puzzleid":"6VVvQ","fen":"8/8/6p1/6p1/PK4k1/8/8/8 b - - 0 46","rating":737,"ratingdeviation":91,"moves":["g4f3","a4a5","g5g4","a5a6","g4g3","a6a7","g3g2","a7a8q"],"themes":["advancedPawn","crushing","endgame","pawnEndgame","promotion","quietMove","veryLong"]},{"puzzleid":"OmNxN","fen":"8/3K4/4pkp1/3bR2p/5P1P/6P1/8/8 w - - 34 53","rating":859,"ratingdeviation":77,"moves":["e5d5","e6d5","d7c6","d5d4","c6c5","d4d3","c5c4","d3d2"],"themes":["advancedPawn","crushing","endgame","hangingPiece","quietMove","veryLong"]},{"puzzleid":"tKCmY","fen":"8/p7/6K1/1p6/2k4P/P7/8/8 b - - 2 47","rating":749,"ratingdeviation":79,"moves":["c4b3","h4h5","b3a3","h5h6","b5b4","h6h7","b4b3","h7h8q"],"themes":["advancedPawn","crushing","endgame","pawnEndgame","promotion","quietMove","veryLong"]},{"puzzleid":"utMTA","fen":"8/8/8/7K/8/5kPp/7P/8 w - - 1 47","rating":903,"ratingdeviation":109,"moves":["h5h4","f3g2","g3g4","g2h2","g4g5","h2g2","g5g6","h3h2"],"themes":["advancedPawn","crushing","endgame","pawnEndgame","veryLong"]},{"puzzleid":"LDEri","fen":"8/1k6/8/1p6/6PK/7P/8/8 w - - 0 52","rating":725,"ratingdeviation":140,"moves":["h4g3","b5b4","h3h4","b4b3","h4h5","b3b2","h5h6","b2b1q"],"themes":["advancedPawn","crushing","endgame","pawnEndgame","promotion","quietMove","veryLong"]},{"puzzleid":"VMhsD","fen":"8/8/2k2p2/5p1p/2K2P1P/6P1/8/8 w - - 6 44","rating":831,"ratingdeviation":98,"moves":["c4b4","c6d5","b4b5","d5e4","b5c4","e4f3","c4d5","f3g3"],"themes":["crushing","endgame","pawnEndgame","veryLong"]},{"puzzleid":"R3gI4","fen":"8/8/p1p3K1/2Pp3p/1P5P/P3k3/6P1/8 w - - 1 38","rating":867,"ratingdeviation":77,"moves":["g6h5","d5d4","h5g6","d4d3","h4h5","d3d2","h5h6","d2d1q"],"themes":["advancedPawn","crushing","endgame","pawnEndgame","promotion","quietMove","veryLong"]},{"puzzleid":"i9sT9","fen":"8/2R5/8/1p6/8/1k5P/2r3P1/5K2 w - - 0 58","rating":779,"ratingdeviation":86,"moves":["c7c2","b3c2","f1f2","b5b4","h3h4","b4b3","h4h5","b3b2"],"themes":["advancedPawn","crushing","endgame","quietMove","veryLong"]},{"puzzleid":"0FpaR","fen":"8/8/5Kp1/6P1/p7/8/k7/1q4Q1 w - - 0 73","rating":763,"ratingdeviation":83,"moves":["g1b1","a2b1","f6g6","a4a3","g6f7","a3a2","g5g6","a2a1q"],"themes":["advancedPawn","crushing","endgame","promotion","veryLong"]},{"puzzleid":"m46zA","fen":"8/2r5/R1B5/P7/5kpp/8/5PP1/6K1 w - - 0 42","rating":831,"ratingdeviation":77,"moves":["c6e8","c7c1","g1h2","g4g3","f2g3","h4g3","h2h3","c1h1"],"themes":["endgame","master","mate","mateIn4","veryLong"]}]
  const game = new Chess()  
  let puzzleNumber = 0

  function onDragStart (source, piece, position, orientation) {
    // do not pick up pieces if the game is over
    if (game.game_over()) return false

    // only pick up pieces for the side to move
    if ((game.turn() === 'w' && piece.search(/^b/) !== -1) ||
        (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
      return false
    }

    // Dont allow dragging if puzzle completed
    if(playerMoves.length == puzzles[puzzleNumber].moves.length) return false

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
      isPromotion = true
      move_cfg.promotion = 'n'
    }

    move = game.move(move_cfg)
  }

  // update the board position after the piece snap
  // for castling, en passant, pawn promotion
  function onSnapEnd () {
    board.position(game.fen())
    playerMoves = []
    for(let move of game.history({verbose:true})){
      let moveStr = move.from+move.to
      if(move.promotion) {
        moveStr+=move.promotion
      }
      playerMoves.push(moveStr)
    }
    
    // Now Validate this move against the puzzle
    if(validateMoves(playerMoves)) {
      // Moves so far are correct
      // check if puzzle finished
      if(playerMoves.length == puzzles[puzzleNumber].moves.length){
        // TODO: LOAD NEXT PUZZLE
        console.log("FINISHED AND CORRECT")
        puzzleNumber++
        playerMoves= []

        let orientation = (puzzles[puzzleNumber].fen.split(' ')[1] == 'w') ? 'black' : 'white'; // The puzzle FEN starts in the position with the opponent ABOUT to move
                                                                              // which means the player is the opposite of the FEN "to move"         
        game.load(puzzles[puzzleNumber].fen)
        board = ChessBoard('puzzleBoard',{
          draggable: true,
          position: puzzles[puzzleNumber].fen,
          orientation,
          onDragStart: onDragStart,
          onDrop: onDrop,
          onSnapEnd: onSnapEnd
        });
        makeMove(0)

        return
      }

      // if more moves, make the next move
      makeMove(playerMoves.length)
    } else {
      // Incorrect move made
      console.log("WRONG MOVE")
      game.undo()
      board.position(game.fen())
      playerMoves.pop()
    }
  }

  function makeMove(x){
    let from = puzzles[puzzleNumber].moves[x].substring(0,2)
    let to = puzzles[puzzleNumber].moves[x].substring(2,4)

    game.move({from,to})
    setTimeout(() => {
      board.position(game.fen())
      },500)
  }

  function validateMoves(moveList){
    for(let i=0; i < moveList.length; i++){
      let puzzleMove = puzzles[puzzleNumber].moves[i]
      let playerMove = moveList[i]

      if (playerMove != puzzleMove) {
        return false
      } 
    }
    return true
  }

  function pieceTheme (piece) {
      return require('../assets/pieces/'+piece+'.png')
  }

  export default {
    name: 'Puzzles',
    components: {
      Promotion
    },
    props:{
      isPromotion
    },
    mounted() {
      let orientation = (puzzles[puzzleNumber].fen.split(' ')[1] == 'w') ? 'black' : 'white'; // The puzzle FEN starts in the position with the opponent ABOUT to move
                                                                              // which means the player is the opposite of the FEN "to move"         
      game.load(puzzles[puzzleNumber].fen)
      board = ChessBoard('puzzleBoard',{
        draggable: true,
        position: puzzles[puzzleNumber].fen,
        orientation,
        onDragStart: onDragStart,
        onDrop: onDrop,
        onSnapEnd: onSnapEnd,
        pieceTheme: pieceTheme
      });
      makeMove(0)
    } 
  }
</script>