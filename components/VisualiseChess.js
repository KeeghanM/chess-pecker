import dynamic from 'next/dynamic.js'
const Chessground = dynamic(() => import('react-chessground'), { ssr: false })
import 'react-chessground/dist/styles/chessground.css'
import { useWindowSize } from '../lib/hooks'
import Chess from '../lib/chess'
import { useState } from 'react'
import { useEffect } from 'react/cjs/react.development'

export default function VisualiseChess(props) {
  let puzzle = props.puzzle
  let chess = new Chess(puzzle.fen)
  const [orientation, setorientation] = useState('')
  const [fen, setFen] = useState('puzzle.fen')
  const [finalMove, setfinalMove] = useState('')
  const [movesList, setmovesList] = useState('')
  const [status, setstatus] = useState('')
  let clicked = ''

  useEffect(() => {
    chess.load(puzzle.fen)
    setFen(puzzle.fen)
    setorientation(chess.turn() === 'w' ? 'black' : 'white')
    puzzle.moves.map((move) => chess.move(move, { sloppy: true }))
    setfinalMove(chess.undo()?.san)
    setmovesList(chess.pgn({ newline_char: ' ' }).split(']')[2])
  }, [puzzle])

  function moveCheck(e) {
    e.preventDefault()
    if (clicked === 'check') {
      let checkMove = e.target.move.value
      if (checkMove == finalMove) {
        e.target.move.value = ''
        setstatus('Success!')
        props.onSuccess()
      } else {
        setstatus('Wrong Move - Try Again')
      }
    } else if (clicked === 'skip') {
      e.target.move.value = ''
      props.onError()
    }
  }

  let windowSize = useWindowSize()
  return (
    <div>
      <div className="flex flex-row items-center space-x-2 text-2xl">
        <p>Visualise These Moves:</p>
        <div className="font-bold flex flex-row items-center space-x-2 ">
          {movesList}
        </div>
      </div>
      <form
        onSubmit={moveCheck}
        className="py-4 space-x-2 flex flex-row items-center"
      >
        <p>Your Answer:</p>
        <input
          type="text"
          id="move"
          className="bg-gray-200 appearance-none border-2 border-accent-light rounded w-32 py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-primary"
        />
        <button
          onClick={() => (clicked = 'check')}
          className="inline-block w-fit py-2 px-12 text-light font-bold bg-primary hover:bg-accent-dark hover:text-light rounded-full transition duration-200"
        >
          Check
        </button>
        <button
          onClick={() => (clicked = 'skip')}
          className="text-sm inline-block w-fit py-2 px-6 text-dark font-bold bg-accent-light hover:bg-accent-dark hover:text-light rounded-full transition duration-200"
        >
          Skip Puzzle
        </button>
        <p>{status}</p>
      </form>

      <div className="">
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
          turnColor={orientation}
          orientation={orientation}
          fen={fen}
          viewOnly={true}
        />
      </div>
    </div>
  )
}
