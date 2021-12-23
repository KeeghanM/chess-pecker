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

  const game = new Chess()

function onDragStart (source, piece, position, orientation) {
  // do not pick up pieces if the game is over
  if (game.game_over()) return false

  // Use Unused for VUE TODO: REMOVE
  if(source||position||orientation){
    console.log("")
  }

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
    console.log("INVALID: Snapback")
    return 'snapback';
  } else {
    console.log("Valid: Run UNDO")
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
  // ChessBoard.position(game.fen()) //ERRORS SAYING UNAVAILABLE??
  let movesList = []
  for(let move of game.history({verbose:true})){
    let moveStr = move.from+move.to
    movesList.push(moveStr)
  }
  console.log(movesList)
}

  export default {
    name: 'Puzzles',
    mounted(){
      ChessBoard('puzzleBoard',{
        draggable: true,
        position: 'start',
        onDragStart: onDragStart,
        onDrop: onDrop,
        onSnapEnd: onSnapEnd
      });
    }
  }
</script>