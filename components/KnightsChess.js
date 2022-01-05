import dynamic from 'next/dynamic.js'
import { useState } from 'react'
const Chessground = dynamic(() => import('react-chessground'), { ssr: false })
import 'react-chessground/dist/styles/chessground.css'
import Chess from '../lib/chess'

const KnightsChess = (props) => {
  let chess = new Chess()
  chess.clear()
  chess.put({ type: 'n', color: 'w' }, props.knightSquare)
  let fen = chess.fen()

  const calcMovable = () => {
    const dests = new Map()
    chess.SQUARES.forEach((s) => {
      const ms = chess.moves({ square: s, verbose: true })
      if (ms.length)
        dests.set(
          s,
          ms.map((m) => m.to)
        )
    })
    return {
      free: false,
      dests,
      color: 'white',
    }
  }

  const onMove = (from, to) => {
    props.moveCheck(from, to)
  }

  return (
    <div className="p-6 overflow-hidden">
      <Chessground
        // width="24vw"
        // height="24vw"
        turnColor="white"
        movable={calcMovable()}
        fen={fen}
        onMove={onMove}
        coordinates={true}
      />
    </div>
  )
}

export default KnightsChess
