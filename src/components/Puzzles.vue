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
  let playerMoves = []
  let puzzles = [{"puzzleid":"2NaDA","fen":"4r1k1/8/p4bp1/1p1p1p2/2q5/P1P2N1P/1P2QPP1/4RK2 w - - 4 34","rating":1433,"ratingdeviation":77,"moves":["f3d2","e8e2","d2c4","e2e1"],"themes":["advantage","endgame","short"]},{"puzzleid":"A7UBu","fen":"5rk1/pppR3p/4p1p1/3r1q2/8/1P4Q1/P4PPP/3R2K1 w - - 2 25","rating":1597,"ratingdeviation":161,"moves":["d1d5","e6d5","h2h4","f5d7"],"themes":["capturingDefender","crushing","discoveredAttack","endgame","short"]},{"puzzleid":"0QoCE","fen":"6k1/p4rp1/8/3Q4/4pq2/2P5/P1P2rPP/R4RK1 w - - 2 28","rating":1771,"ratingdeviation":308,"moves":["f1d1","f4g4","d5f7","f2f7"],"themes":["crushing","endgame","short"]},{"puzzleid":"5d42v","fen":"8/p7/5p2/2pK1Pk1/8/2P5/P1P5/8 w - - 2 39","rating":1626,"ratingdeviation":301,"moves":["d5e6","c5c4","e6d5","g5f5"],"themes":["endgame","equality","pawnEndgame","quietMove","short","zugzwang"]},{"puzzleid":"lRRd2","fen":"8/5k2/8/3p2Rp/3P1p2/2P1rP1P/3K2P1/7n b - - 8 46","rating":1571,"ratingdeviation":74,"moves":["h1g3","g5g3","e3e8","g3g5"],"themes":["advantage","endgame","short"]},{"puzzleid":"K4P4d","fen":"5b1r/p1pk4/2pp4/7q/2P1Q3/8/PP5p/4R2K b - - 1 26","rating":1480,"ratingdeviation":96,"moves":["h5e5","e4g4","d7d8","e1e5"],"themes":["advantage","discoveredAttack","endgame","short"]},{"puzzleid":"Z4EOE","fen":"4r1k1/5ppp/5P2/3p2q1/4r3/2P5/PPQ3PP/R4R1K w - - 0 28","rating":1513,"ratingdeviation":77,"moves":["f6g7","e4e2","c2e2","e8e2"],"themes":["advantage","endgame","short"]},{"puzzleid":"vggSZ","fen":"8/pp1k3R/2p5/4r1P1/8/1P2p3/1PP1K3/8 b - - 2 30","rating":1482,"ratingdeviation":74,"moves":["d7c8","g5g6","e5g5","g6g7"],"themes":["advancedPawn","crushing","endgame","rookEndgame","short"]},{"puzzleid":"xM31M","fen":"r4r1k/6pp/4P3/p2Q4/P1R2PP1/2R3K1/8/6q1 w - - 1 40","rating":1448,"ratingdeviation":76,"moves":["g3f3","g1h1","f3g3","h1d5"],"themes":["crushing","endgame","short","skewer"]},{"puzzleid":"UvCVu","fen":"7r/8/2k4p/4npN1/8/5K2/PPP5/7R w - - 3 35","rating":1486,"ratingdeviation":75,"moves":["f3f4","h6g5","f4e5","h8h1"],"themes":["crushing","discoveredAttack","endgame","short"]},{"puzzleid":"W4Jtj","fen":"2q5/4r3/4P2p/4k2Q/8/7P/6PK/8 b - - 22 53","rating":1441,"ratingdeviation":80,"moves":["e5e6","h5g4","e6d5","g4c8"],"themes":["advantage","endgame","short","skewer"]},{"puzzleid":"Oh5vn","fen":"3r2k1/p4ppp/1p4n1/2B5/3pR3/P7/1PP2PPP/6K1 w - - 0 27","rating":1549,"ratingdeviation":74,"moves":["c5d4","f7f5","e4e3","d8d4"],"themes":["advantage","endgame","short"]},{"puzzleid":"heKVq","fen":"5rk1/3R1Npp/4K3/p2Q2P1/P1pPp3/2P1P2q/8/8 w - - 2 38","rating":1572,"ratingdeviation":74,"moves":["d5f5","f8e8","e6d6","h3f5"],"themes":["crushing","deflection","endgame","pin","short"]},{"puzzleid":"lhgqN","fen":"3rn1k1/6p1/2p1r3/pp2p3/3BR3/P4PKP/1PP3P1/3R4 w - - 3 41","rating":1437,"ratingdeviation":75,"moves":["e4e1","e6g6","g3f2","e5d4"],"themes":["advantage","endgame","short"]},{"puzzleid":"bW916","fen":"6k1/8/6p1/5b2/RP6/P2r4/2pK4/2R5 w - - 2 41","rating":1424,"ratingdeviation":79,"moves":["d2e2","d3d1","c1c2","f5c2"],"themes":["advantage","endgame","short"]},{"puzzleid":"3HdCq","fen":"8/5Qpk/p6p/4p1P1/2p1PN1P/2P5/2q3BK/4n3 b - - 0 41","rating":1572,"ratingdeviation":74,"moves":["e5f4","g5g6","h7h8","f7e8"],"themes":["endgame","mate","mateIn2","short"]},{"puzzleid":"hX8q0","fen":"5k2/R7/4PKp1/5n1p/p7/Pbp5/8/8 b - - 3 63","rating":1571,"ratingdeviation":76,"moves":["b3e6","a7a8","e6c8","a8c8"],"themes":["endgame","mate","mateIn2","short"]},{"puzzleid":"URCxo","fen":"6k1/8/p6p/PpNq4/1P1P1pp1/2P4P/4n1PK/6Q1 w - - 0 36","rating":1486,"ratingdeviation":74,"moves":["g1e1","g4g3","h2h1","f4f3"],"themes":["crushing","endgame","short"]},{"puzzleid":"S5pxt","fen":"5k2/5pp1/B6p/1P6/R7/1r1bN1P1/4KP1n/8 w - - 4 39","rating":1444,"ratingdeviation":74,"moves":["e2d2","h2f3","d2c1","b3b1"],"themes":["endgame","master","mate","mateIn2","short"]},{"puzzleid":"uO5v7","fen":"1kr5/p2R3Q/2p3p1/2p1q3/6P1/1P4K1/P6P/8 w - - 4 41","rating":1477,"ratingdeviation":79,"moves":["g3f3","c8f8","d7f7","e5d5"],"themes":["crushing","endgame","short"]},{"puzzleid":"FLMOu","fen":"8/5pkp/p3b1p1/N7/P6Q/5Pbq/5R2/6K1 w - - 0 34","rating":1454,"ratingdeviation":75,"moves":["h4h3","g3f2","g1f2","e6h3"],"themes":["crushing","endgame","intermezzo","short"]},{"puzzleid":"CwQ21","fen":"8/8/8/5Q2/4p3/4k3/PPPp4/1K1Rq3 w - - 2 46","rating":1454,"ratingdeviation":101,"moves":["f5f1","e1f1","d1f1","e3e2"],"themes":["crushing","endgame","short"]},{"puzzleid":"R8c23","fen":"8/4k1pp/4p3/4P3/pK1p4/P1N3P1/2b4P/8 w - - 0 43","rating":1505,"ratingdeviation":76,"moves":["c3a4","d4d3","a4b2","d3d2"],"themes":["advancedPawn","advantage","endgame","short"]},{"puzzleid":"kDdeS","fen":"3r2k1/p4ppp/1p2p3/1q6/PPb2P2/2Q3P1/6BP/2K4R b - - 0 26","rating":1449,"ratingdeviation":77,"moves":["d8d3","c3d3","c4d3","a4b5"],"themes":["crushing","endgame","short"]},{"puzzleid":"a5jii","fen":"5rk1/5p2/p3pQ1p/3p4/2rq4/P5RP/P4PP1/R5K1 b - - 1 25","rating":1545,"ratingdeviation":74,"moves":["g8h7","g3g7","h7h8","f6h6"],"themes":["deflection","endgame","mate","mateIn2","short"]},{"puzzleid":"9F7R8","fen":"4r3/5k1p/4n1p1/2p1R3/2N2P2/7P/6P1/6K1 b - - 2 34","rating":1542,"ratingdeviation":120,"moves":["e6f4","c4d6","f7f6","e5e8"],"themes":["advantage","deflection","endgame","fork","short"]},{"puzzleid":"3NQ72","fen":"5r1k/7p/p5p1/1p1p4/3R4/2P4P/PPQR1rPK/4q3 w - - 0 32","rating":1575,"ratingdeviation":78,"moves":["d2f2","f8f2","c2d1","e1e5"],"themes":["crushing","endgame","short"]},{"puzzleid":"5Vmib","fen":"3Q4/5pp1/3b2n1/p2Nq1k1/4P2p/7P/PPP2PP1/6K1 b - - 10 30","rating":1518,"ratingdeviation":76,"moves":["g6e7","f2f4","e5f4","d5f4"],"themes":["crushing","endgame","fork","short"]},{"puzzleid":"QcSpn","fen":"7r/6k1/p1p2p2/2p1qPp1/PP1n4/8/2P2QP1/3R1NK1 w - - 3 37","rating":1465,"ratingdeviation":75,"moves":["b4c5","d4e2","f2e2","e5e2"],"themes":["crushing","endgame","short"]},{"puzzleid":"y59o7","fen":"8/1p5p/pB4p1/2PbPp2/1K2kP1P/4P1P1/8/8 b - - 4 40","rating":1427,"ratingdeviation":75,"moves":["e4e3","c5c6","e3f3","c6c7"],"themes":["advancedPawn","bishopEndgame","crushing","discoveredAttack","endgame","short"]},{"puzzleid":"ZCaGO","fen":"4Q3/2p2rk1/3p3p/3P1r2/1PP3p1/P4pPq/5P1P/4R1RK w - - 2 30","rating":1515,"ratingdeviation":74,"moves":["e1e7","h3h2","h1h2","f5h5"],"themes":["attraction","endgame","kingsideAttack","mate","mateIn2","sacrifice","short"]},{"puzzleid":"mFahg","fen":"8/5R2/8/P7/2B1pn1K/5k2/8/6r1 b - - 8 59","rating":1514,"ratingdeviation":78,"moves":["e4e3","c4d5","f3f2","f7f4"],"themes":["crushing","deflection","endgame","pin","short"]},{"puzzleid":"8jTrC","fen":"4r1k1/p1p1r1pp/2Q2p2/1p3P2/4NP2/3P4/P1P1qP1P/6RK b - - 2 22","rating":1392,"ratingdeviation":163,"moves":["b5b4","e4f6","g8h8","f6e8"],"themes":["advantage","endgame","kingsideAttack","pin","short"]},{"puzzleid":"TQ7rV","fen":"4r2k/2Q3p1/7p/8/1Pr3q1/P5P1/5P1P/R2R2K1 w - - 2 30","rating":1403,"ratingdeviation":147,"moves":["c7d7","e8e1","d1e1","g4d7"],"themes":["advantage","deflection","endgame","short"]},{"puzzleid":"sUWgh","fen":"1r6/8/2P2R2/6P1/5P2/K1k5/8/8 w - - 1 64","rating":1436,"ratingdeviation":74,"moves":["c6c7","b8a8","f6a6","a8a6"],"themes":["endgame","master","mate","mateIn2","rookEndgame","short"]},{"puzzleid":"xKL2E","fen":"8/8/5k2/2pr2Rp/1p3P1P/1P2K3/8/8 b - - 5 47","rating":1547,"ratingdeviation":75,"moves":["d5f5","e3e4","f5g5","f4g5"],"themes":["crushing","endgame","rookEndgame","short"]},{"puzzleid":"FiUR6","fen":"8/pB6/7p/4bP2/1P1N2k1/2nK4/8/8 b - - 3 42","rating":1376,"ratingdeviation":196,"moves":["c3d1","b7f3","g4g5","f3d1"],"themes":["advantage","endgame","fork","short"]},{"puzzleid":"3uFiN","fen":"6k1/7p/p1p3pQ/qpPp1r1n/3Pp2B/2P1P3/P5RP/6K1 w - - 0 30","rating":1466,"ratingdeviation":82,"moves":["g2g6","h7g6","h6g6","h5g7"],"themes":["crushing","defensiveMove","endgame","short"]},{"puzzleid":"wyTAY","fen":"6r1/3R4/8/8/5K2/6r1/6k1/2R5 b - - 10 49","rating":1479,"ratingdeviation":75,"moves":["g8g5","d7d2","g2h3","c1h1"],"themes":["endgame","mate","mateIn2","rookEndgame","short"]},{"puzzleid":"ojk8Z","fen":"3r2k1/3r1pq1/p4R1p/1p1p4/3P1Q2/3B3P/PP3PP1/6K1 b - - 8 28","rating":1441,"ratingdeviation":75,"moves":["d7d6","f6d6","d8d6","f4d6"],"themes":["crushing","endgame","short"]},{"puzzleid":"btEfr","fen":"2k5/ppp4N/5P2/8/3n2P1/8/PP1rp2P/1K5R w - - 5 28","rating":1421,"ratingdeviation":104,"moves":["f6f7","d2d1","h1d1","e2d1q"],"themes":["advancedPawn","endgame","mate","mateIn2","promotion","short"]},{"puzzleid":"m2an0","fen":"3r4/8/6p1/1R1pBb1p/1P2pP1P/4K1k1/8/8 b - - 0 40","rating":1382,"ratingdeviation":120,"moves":["g3h4","e5f6","h4g4","f6d8"],"themes":["crushing","endgame","fork","short"]},{"puzzleid":"1SEek","fen":"r2q4/pp4Q1/4kr2/4p1p1/4P3/P2P2P1/1PP3K1/R4R2 w - - 1 30","rating":1479,"ratingdeviation":77,"moves":["g7g5","f6f2","g2f2","d8g5"],"themes":["advantage","discoveredAttack","endgame","short"]},{"puzzleid":"sVAJj","fen":"8/8/4kp1p/5RpP/4P1P1/2p2P2/5r2/3K4 w - - 0 52","rating":1530,"ratingdeviation":128,"moves":["d1e1","c3c2","e1f2","c2c1q"],"themes":["advancedPawn","advantage","endgame","promotion","rookEndgame","short"]},{"puzzleid":"Iunq5","fen":"8/2p5/2p5/2P5/pB6/Pq2k3/2R5/2K5 b - - 15 48","rating":1486,"ratingdeviation":75,"moves":["b3d3","c2c3","d3c3","b4c3"],"themes":["crushing","endgame","pin","short"]},{"puzzleid":"x6ylA","fen":"8/8/4k3/4p1P1/rpp1p3/8/pK1B1P2/R7 w - - 0 47","rating":1490,"ratingdeviation":75,"moves":["a1a2","c4c3","b2b3","a4a2"],"themes":["crushing","endgame","fork","short"]},{"puzzleid":"HmSby","fen":"r7/3RPk2/5p2/5p2/p2Kb3/B6P/8/8 b - - 1 51","rating":1473,"ratingdeviation":74,"moves":["a8b8","d7d8","b8b4","a3b4"],"themes":["crushing","endgame","master","masterVsMaster","short"]},{"puzzleid":"6Z0vQ","fen":"6k1/1Q3pp1/p2P4/5q1p/1P1K4/P7/8/8 b - - 0 68","rating":1519,"ratingdeviation":112,"moves":["f5f6","d4c5","f6f2","c5c6"],"themes":["crushing","defensiveMove","endgame","queenEndgame","short"]},{"puzzleid":"0Rgpm","fen":"1b6/pP2r3/4Nqpk/5p2/5P1p/1Q4P1/PP3P1P/4RK2 w - - 0 35","rating":1543,"ratingdeviation":76,"moves":["e6g5","f6a6","f1g2","e7e1"],"themes":["advantage","deflection","endgame","short"]},{"puzzleid":"xPwCf","fen":"2k5/R5Rp/3b4/2pP4/6KP/P5P1/4r2r/8 b - - 3 32","rating":1451,"ratingdeviation":74,"moves":["e2e8","a7a8","d6b8","d5d6"],"themes":["crushing","endgame","pin","short"]}]
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
      console.log("IS PROMOTION")
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

  export default {
    name: 'Puzzles',
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
        onSnapEnd: onSnapEnd
      });
      makeMove(0)
    } 
  }
</script>