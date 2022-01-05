import Image from 'next/image'
import { useState, useRef } from 'react'
import { Dialog } from '@headlessui/react'
import dynamic from 'next/dynamic.js'
const Chessground = dynamic(() => import('react-chessground'), { ssr: false })
import 'react-chessground/dist/styles/chessground.css'
import Chess from '../lib/chess.js'

const Chessboard = (props) => {
  const [chess, setChess] = useState(new Chess(props.fen))
  const [pendingMove, setPendingMove] = useState()
  const [promotionVisible, setPromotionVisible] = useState(false)
  const [fen, setFen] = useState(props.fen)
  const [lastMove, setLastMove] = useState()
  let queenRef = useRef(null)

  const onMove = (from, to) => {
    const moves = chess.moves({ verbose: true })
    for (let i = 0, len = moves.length; i < len; i++) {
      /* eslint-disable-line */
      if (moves[i].flags.indexOf('p') !== -1 && moves[i].from === from) {
        setPendingMove([from, to])
        setPromotionVisible(true)
        return
      }
    }
    if (chess.move({ from, to, promotion: 'q' })) {
      setFen(chess.fen())
      setLastMove([from, to])
      props.moveCheck()
      setTimeout(randomMove, 500)
    }
  }

  const randomMove = () => {
    const moves = chess.moves({ verbose: true })
    const move = moves[Math.floor(Math.random() * moves.length)]
    if (moves.length > 0) {
      chess.move(move.san)
      setFen(chess.fen())
      setLastMove([move.from, move.to])
    }
  }

  const promotion = (e) => {
    const from = pendingMove[0]
    const to = pendingMove[1]
    chess.move({ from, to, promotion: e })
    setFen(chess.fen())
    setLastMove([from, to])
    setPromotionVisible(false)
    props.moveCheck()
    setTimeout(randomMove, 500)
  }

  const turnColor = () => {
    return chess.turn() === 'w' ? 'white' : 'black'
  }

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

  return (
    <div className="p-6 overflow-hidden">
      <Chessground
        width="24vw"
        height="24vw"
        turnColor={turnColor()}
        movable={calcMovable()}
        lastMove={lastMove}
        fen={fen}
        onMove={onMove}
      />
      <Dialog
        initialFocus={queenRef}
        open={promotionVisible}
        onClose={() => {
          setPromotionVisible(false)
        }}
        className="fixed z-10 inset-0 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          <div className="relative bg-white rounded max-w-sm mx-auto p-3 space-x-2">
            <button onClick={() => promotion('q')} ref={queenRef}>
              <Image src="/chessPieces/wQ.svg" width="50px" height="50px" />
            </button>
            <button onClick={() => promotion('r')}>
              <Image src="/chessPieces/wR.svg" width="50px" height="50px" />
            </button>
            <button onClick={() => promotion('b')}>
              <Image src="/chessPieces/wB.svg" width="50px" height="50px" />
            </button>
            <button onClick={() => promotion('n')}>
              <Image src="/chessPieces/wN.svg" width="50px" height="50px" />
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  )
}

export default Chessboard
