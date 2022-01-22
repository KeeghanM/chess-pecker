import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'
import { Dialog } from '@headlessui/react'
import dynamic from 'next/dynamic.js'
const Chessground = dynamic(() => import('react-chessground'), { ssr: false })
import 'react-chessground/dist/styles/chessground.css'
import Chess from '../lib/chess.js'

const Chessboard = (props) => {
  let moveDelay = 600
  const [chess, setChess] = useState(new Chess(props.puzzle.fen))
  const [pendingMove, setPendingMove] = useState()
  const [promotionVisible, setPromotionVisible] = useState(false)
  const [fen, setFen] = useState(props.puzzle.fen)
  const [lastMove, setLastMove] = useState()
  let queenRef = useRef(null)

  useEffect(() => {
    setTimeout(() => {
      puzzleMove(0)
    }, moveDelay)
  }, [])

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
    makeMove(from, to, 'q', true)
  }

  const promotion = (p) => {
    const from = pendingMove[0]
    const to = pendingMove[1]
    makeMove(from, to, p, true)
  }

  function puzzleMove(i) {
    let from = props.puzzle.moves[i].substring(0, 2)
    let to = props.puzzle.moves[i].substring(2, 4)
    let promo = props.puzzle.moves[i].substring(4) || ''
    makeMove(from, to, promo, false)
  }

  function makeMove(from, to, promotion, player) {
    if (chess.move({ from, to, promotion })) {
      setFen(chess.fen())
      setLastMove([from, to])
      setPromotionVisible(false)
      if (player) {
        let history = chess.history({ verbose: true })
        let last = history[history.length - 1]
        if (
          props.moveCheck(
            last.from,
            last.to,
            last.promotion,
            history.length - 1
          )
        ) {
          setTimeout(() => {
            puzzleMove(history.length)
          }, moveDelay)
        }
      }
    }
  }

  const turnColor = () => {
    return props.puzzle.fen.split(' ')[1] === 'w' ? 'black' : 'white'
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
      color: turnColor(),
    }
  }

  return (
    <div className="p-6 overflow-hidden">
      <Chessground
        width="24vw"
        height="24vw"
        turnColor={turnColor()}
        orientation={turnColor()}
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
