import dynamic from 'next/dynamic.js'
const Chessground = dynamic(() => import('react-chessground'), { ssr: false })
import 'react-chessground/dist/styles/chessground.css'
import { useWindowSize } from '../lib/hooks'
import Chess from '../lib/chess'

const KnightsChess = (props) => {
  let chess = new Chess()
  chess.clear()
  chess.put({ type: 'n', color: 'w' }, props.knightSquare)
  let fen = chess.fen()
  let windowSize = useWindowSize()

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
    <div className="overflow-y-hidden">
      <Chessground
        width={
          windowSize.width < 1024
            ? windowSize.width < 768
              ? '85vw'
              : '65vw'
            : '60vh'
        }
        height={
          windowSize.width < 1024
            ? windowSize.width < 768
              ? '85vw'
              : '65vw'
            : '60vh'
        }
        turnColor="white"
        movable={calcMovable()}
        fen={fen}
        onMove={onMove}
        coordinates={props.coords}
      />
    </div>
  )
}

export default KnightsChess
