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
    <div className="mb-10 text-light pl-6">
      <div className="flex flex-row items-baseline gap-2 min-w-xl max-w-xl mb-4 flex-wrap">
        {movesList}
      </div>
      <form
        onSubmit={moveCheck}
        className="flex flex-col md:flex-row md:items-center gap-2 pb-6"
        autoComplete="off"
      >
        <input
          autoComplete="off"
          placeholder="Your Answer"
          type="text"
          id="move"
          className="w-[150px] bg-gray-200 appearance-none border-4 border-primary py-2 focus:outline-none focus:bg-white text-dark text-center"
        />
        <button
          onClick={() => (clicked = "check")}
          className="w-[150px] py-3 bg-primary text-light hover:bg-accent-dark hover:text-light transition duration-200"
        >
          Check
        </button>
        <button
          onClick={() => (clicked = "skip")}
          className="w-[150px] py-3 bg-accent-light text-dark hover:bg-accent-dark hover:text-light transition duration-200"
        >
          Skip Puzzle
        </button>
      </form>

      <div
        className={
          "pb-6 overflow-hidden" +
          (colorFlash
            ? "shadow-xl shadow-[#84cc16] transition-all"
            : errorFlash
            ? "shadow-xl shadow-[#cc2b16] transition-all"
            : "")
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
