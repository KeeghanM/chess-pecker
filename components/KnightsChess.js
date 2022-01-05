import dynamic from 'next/dynamic.js'
const Chessground = dynamic(() => import('react-chessground'), { ssr: false })
import 'react-chessground/dist/styles/chessground.css'
import { useWindowSize } from '../lib/windowSize'
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
    <div className="py-6 md:px-6 overflow-hidden">
      <Chessground
        width={
          windowSize.width < 1024
            ? windowSize.width < 768
              ? '85vw'
              : '65vw'
            : '25vw'
        }
        height={
          windowSize.width < 1024
            ? windowSize.width < 768
              ? '85vw'
              : '65vw'
            : '25vw'
        }
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
