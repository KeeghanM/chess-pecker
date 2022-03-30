import { useState } from "react"
import useSound from "use-sound"
import Chessboard from "../utils/Chessboard"

export default function EndgameChess(props) {
  let currentPuzzle = props.puzzle
  const [wrongSolution, setwrongSolution] = useState(false)

  const [playCorrect] = useSound("/sounds/correct.mp3", { volume: 0.25 })
  const [playIncorrect] = useSound("/sounds/incorrect.mp3", { volume: 0.25 })
  const [playHighScore] = useSound("/sounds/highscore.mp3", { volume: 0.25 })
  const [colorFlash, showFlash] = useState(false)
  const [errorFlash, showError] = useState(false)

  function moveCheck(chess) {
    let history = chess.history({ verbose: true })
    let moveIndex = history.length - 1
    let last = history[moveIndex]
    let move = last.from + last.to + (last.promotion || "")

    if (move == currentPuzzle.moves[moveIndex] || chess.in_checkmate()) {
      showFlash(true)
      setTimeout(() => {
        showFlash(false)
      }, 500)

      if (moveIndex != currentPuzzle.moves.length - 1) {
        playCorrect()
        return "next"
      }

      playHighScore()
      showNext("success")
      return "finished"
    } else {
      showError(true)
      setTimeout(() => {
        showError(false)
      }, 500)
      playIncorrect()
      return "error"
    }
  }

  function showNext(type) {
    setwrongSolution(false)
    props.nextPuzzle(type)
  }

  return (
    <div className="flex flex-col items-center my-12">
      <h2 className="mb-6 text-4xl font-bold text-light">
        {(currentPuzzle.fen.split(" ")[1] == "w" ? "Black" : "White") +
          " To Move"}
      </h2>
      <div className="w-full flex flex-row gap-2 justify-center">
        <button
          className="w-fit px-4 py-2 bg-accent-light text-dark hover:bg-accent-dark hover:text-light transition duration-200 text-center"
          onClick={props.endSession}
        >
          End Session
        </button>
        {wrongSolution && (
          <>
            <button
              className="w-fit px-4 py-2 bg-primary text-light hover:bg-accent-dark transition duration-200"
              onClick={() => showNext("error")}
            >
              Next Puzzle
            </button>
            <a
              href={"https://lichess.org/training/" + currentPuzzle.puzzleid}
              className="w-fit px-4 py-2 bg-accent-light text-dark hover:bg-accent-dark hover:text-light transition duration-200 text-center"
              target="_blank"
            >
              Analysis Board
            </a>
          </>
        )}
      </div>
      <div
        className={
          colorFlash
            ? "shadow-xl shadow-[#84cc16] transition-all"
            : errorFlash
            ? "shadow-xl shadow-[#cc2b16] transition-all"
            : ""
        }
      >
        <Chessboard
          puzzle={currentPuzzle}
          moveCheck={moveCheck}
          showNext={() => setwrongSolution(true)}
        />
      </div>
    </div>
  )
}
