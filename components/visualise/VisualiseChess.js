import dynamic from "next/dynamic.js"
const Chessground = dynamic(() => import("react-chessground"), { ssr: false })
import "react-chessground/dist/styles/chessground.css"
import { useWindowSize } from "../../lib/hooks"
import Chess from "../../lib/chess"
import { useState, useEffect } from "react"
import useSound from "use-sound"

export default function VisualiseChess(props) {
  const [playCorrect] = useSound("/sounds/correct.mp3", { volume: 0.25 })
  const [playIncorrect] = useSound("/sounds/incorrect.mp3", { volume: 0.25 })

  const [orientation, setorientation] = useState()
  const [fen, setFen] = useState()
  const [finalMove, setfinalMove] = useState()
  const [movesList, setmovesList] = useState()
  const [colorFlash, showFlash] = useState(false)
  const [errorFlash, showError] = useState(false)

  let puzzle = props.puzzle
  let chess = new Chess()
  let clicked = ""

  useEffect(() => {
    chess.load(puzzle.fen)
    setFen(puzzle.fen)
    setorientation(puzzle.fen.split(" ")[1] === "w" ? "black" : "white")
    puzzle.moves.map((move) => chess.move(move, { sloppy: true }))
    setfinalMove(chess.undo()?.san)
    let pgnUnits = chess.pgn({ newline_char: " " }).split("]")[2].split(" ")
    let moves = []
    pgnUnits.map((unit, index) => {
      moves.push(
        isNaN(parseInt(unit)) ? (
          <p className="font-bold text-2xl" key={index}>
            {unit}
          </p>
        ) : (
          <p className="text-lg" key={index}>
            {unit}
          </p>
        )
      )
    })

    setmovesList(moves)
  }, [puzzle])

  function moveCheck(e) {
    e.preventDefault()
    if (clicked === "check") {
      let playerMove = e.target.move.value
      let checkMove = finalMove

      if (!props.strictMode) {
        playerMove = playerMove.replace(/[^0-9a-z]/gi, "")
        checkMove = checkMove.replace(/[^0-9a-z]/gi, "")
      }

      if (playerMove.toLowerCase() == checkMove.toLowerCase()) {
        playCorrect()
        e.target.move.value = ""

        showFlash(true)
        setTimeout(() => {
          showFlash(false)
        }, 500)

        props.onSuccess()
      } else {
        playIncorrect()
        showError(true)
        setTimeout(() => {
          showError(false)
        }, 500)

        props.onError()
      }
    } else if (clicked === "skip") {
      e.target.move.value = ""
      props.onSkip()
    }
  }

  let windowSize = useWindowSize()
  return (
    <div className="mb-10">
      <div className="flex flex-row items-baseline space-x-2 max-w-2xl mb-4 flex-wrap">
        {movesList}
      </div>
      <form
        onSubmit={moveCheck}
        className="flex flex-col md:flex-row md:items-center space-y-2 space-x-4 mb-4"
        autoComplete="off"
      >
        <div className="flex flex-row items-center space-x-2">
          <p>Your Answer:</p>
          <input
            autoComplete="off"
            type="text"
            id="move"
            className="bg-gray-200 appearance-none border-2 border-accent-light rounded w-32 py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-primary"
          />
        </div>
        <div className="flex flex-row items-center space-x-2">
          <button
            onClick={() => (clicked = "check")}
            className="inline-block w-fit py-2 px-12 text-light font-bold bg-primary hover:bg-accent-dark hover:text-light rounded-full transition duration-200"
          >
            Check
          </button>
          <button
            onClick={() => (clicked = "skip")}
            className="text-sm inline-block w-fit py-2 px-6 text-dark font-bold bg-accent-light hover:bg-accent-dark hover:text-light rounded-full transition duration-200"
          >
            Skip Puzzle
          </button>
        </div>
      </form>

      <div
        className={
          colorFlash
            ? "shadow-xl shadow-[#84cc16] transition-all"
            : errorFlash
            ? "shadow-xl shadow-[#cc2b16] transition-all"
            : ""
        }
      >
        <Chessground
          width={
            windowSize.width < 1024
              ? windowSize.width < 768
                ? "85vw"
                : "65vw"
              : "60vh"
          }
          height={
            windowSize.width < 1024
              ? windowSize.width < 768
                ? "85vw"
                : "65vw"
              : "60vh"
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
