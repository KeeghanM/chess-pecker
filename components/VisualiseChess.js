import dynamic from 'next/dynamic.js'
const Chessground = dynamic(() => import('react-chessground'), { ssr: false })
import 'react-chessground/dist/styles/chessground.css'
import { useWindowSize } from '../lib/hooks'
import Chess from '../lib/chess'
import { useState } from 'react'

export default function VisualiseChess(props) {
  let puzzle = props.puzzle
  console.log(puzzle)
  //   let puzzle = {
  //     puzzleid: 'sHRlZ',
  //     fen: '1r2k1nr/p4pb1/1pB1p1pp/1p2Pb2/3R1B2/6P1/P6P/3R2K1 b k - 1 24',
  //     rating: 1556,
  //     ratingdeviation: 75,
  //     moves: ['e8f8', 'd4d8', 'b8d8', 'd1d8', 'f8e7', 'd8e8'],
  //     themes: ['long', 'mate', 'mateIn3', 'middlegame'],
  //   }

  let chess = new Chess(puzzle.fen)
  const [orientation, setorientation] = useState(
    chess.turn() === 'w' ? 'black' : 'white'
  )
  puzzle.moves.map((move) => chess.move(move, { sloppy: true }))

  const [fen, setFen] = useState(puzzle.fen)
  const [finalMove, setfinalMove] = useState(chess.undo().san)
  const [movesList, setmovesList] = useState(
    chess.pgn({ newline_char: ' ' }).split(']')[2]
  )
  const [status, setstatus] = useState('')

  function moveCheck(e) {
    e.preventDefault()
    let move = e.target.move.value

    try {
      let checkMove = chess.move(move, { sloppy: true }).san
      // let checkMove = chess.undo().san
      if (checkMove == finalMove) {
        setstatus('Success!')
        props.onSuccess()
      } else {
        // Wrong move, so apply first move to the board
        // and then get them to guess agin
        setstatus('Wrong Move - Try Again')

        chess.load(fen)
        chess.move(puzzle.moves[0], { sloppy: true })
        setFen(chess.fen())

        let newChess = new Chess(chess.fen())
        puzzle.moves.shift()
        puzzle.moves.map((move) => newChess.move(move, { sloppy: true }))
        newChess.undo()
        let newList = newChess.pgn({ newline_char: ' ' }).split(']')[2]
        setmovesList(newList)
      }
    } catch (e) {
      // Wrong format
      console.log(e.message)
      setstatus('Invalid Move Format')
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
          type="submit"
          className="inline-block w-fit py-2 px-12 text-light font-bold bg-primary hover:bg-accent-dark hover:text-light rounded-full transition duration-200"
        >
          Check
        </button>
        <button
          onClick={() => props.onError()}
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
          fen={fen}
          viewOnly={true}
          drawable={{ enabled: true }}
          disableContextMenu={true}
        />
      </div>
    </div>
  )
}
