import { useState, useContext, useEffect } from "react"
import { UserContext } from "../../lib/context"
import Chessboard from "./TacticsChessboard"
import { firestore } from "../../lib/firebase"
import { doc, setDoc } from "firebase/firestore"
import useSound from "use-sound"
import { useStopwatch } from "react-timer-hook"

export default function TacticsChess(props) {
  const { seconds, minutes, hours, days, isRunning, start, pause, reset } =
    useStopwatch({ autoStart: true })

  const [playCorrect] = useSound("/sounds/correct.mp3", { volume: 0.25 })
  const [playIncorrect] = useSound("/sounds/incorrect.mp3", { volume: 0.25 })
  const [playHighScore] = useSound("/sounds/highscore.mp3", { volume: 0.25 })

  const [startTime, setstartTime] = useState(Date.now())
  const [error, setError] = useState(false)
  const [colorFlash, showFlash] = useState(false)
  const [errorFlash, showError] = useState(false)

  const { user } = useContext(UserContext)
  const [currentSet, setcurrentSet] = useState(() => {
    let saved = JSON.parse(localStorage.getItem("tactics-set-list"))
    return saved.find((set) => {
      return set.id == props.setId
    })
  })
  const [puzzle, setpuzzle] = useState(null)
  useEffect(() => {
    let round = currentSet.set.rounds[currentSet.set.rounds.length - 1]
    changePuzzle(round.completed)
  }, [currentSet])

  function changePuzzle(i) {
    // setstartTime(Date.now())
    setpuzzle(currentSet.set.puzzles[i])
  }

  function moveCheck(chess) {
    let history = chess.history({ verbose: true })
    let moveIndex = history.length - 1
    let last = history[moveIndex]
    let move = last.from + last.to + (last.promotion || "")

    if (move == puzzle.moves[moveIndex] || chess.in_checkmate()) {
      showFlash(true)
      setTimeout(() => {
        showFlash(false)
      }, 500)

      if (moveIndex != puzzle.moves.length - 1) {
        playCorrect()
        return "next"
      }

      currentSet.set.rounds[currentSet.set.rounds.length - 1].correct += 1
      playHighScore()
      nextPuzzle()
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

  function showNextButton() {
    setError(true)
  }

  function nextPuzzle() {
    setError(false)
    currentSet.set.rounds[currentSet.set.rounds.length - 1].completed += 1

    if (
      currentSet.set.rounds[currentSet.set.rounds.length - 1].completed ===
      currentSet.set.setSize
    ) {
      console.log("Add Set")
      currentSet.set.rounds.push({ completed: 0, correct: 0, timeSpent: 0 })
      saveSet()
      props.stopSession()
    } else {
      changePuzzle(
        currentSet.set.rounds[currentSet.set.rounds.length - 1].completed
      )
    }
  }

  function saveSet() {
    let currentTime = Date.now()
    let dif = (currentTime - startTime) / 1000
    currentSet.set.rounds[currentSet.set.rounds.length - 1].timeSpent += dif

    let saved = JSON.parse(localStorage.getItem("tactics-set-list"))
    saved.forEach(function (set, i) {
      if (set.id == currentSet.id) {
        saved[i] = currentSet
      }
    })
    localStorage.setItem("tactics-set-list", JSON.stringify(saved))
    setDoc(
      doc(firestore, "users", user.uid, "tactics-sets", currentSet.id),
      currentSet.set
    )
  }

  return (
    <div>
      {puzzle && (
        <div className="flex flex-col items-center my-12">
          <div className="bg-dark rounded text-light p-4 space-y-2 h-fit flex flex-col">
            <div className="flex flex-row space-x-4">
              <p className="font-bold">
                {puzzle.fen.split(" ")[1] == "w" ? "Black" : "White"} to move
              </p>
              <p>
                Puzzle{" "}
                {currentSet.set.rounds[currentSet.set.rounds.length - 1]
                  .completed + 1}
                /{currentSet.set.setSize}
              </p>
            </div>
            <p>
              Session Timer: {minutes}:{seconds}
            </p>
            <div className="flex flex-row space-x-2">
              <button
                className="w-full px-4 py-2 bg-accent-light text-dark hover:bg-accent-dark hover:text-light transition duration-200"
                onClick={() => {
                  saveSet()
                  props.stopSession()
                }}
              >
                End Session
              </button>
              {error && (
                <>
                  <button
                    className="w-full px-4 py-2 bg-primary text-light hover:bg-accent-dark transition duration-200"
                    onClick={nextPuzzle}
                  >
                    Next Puzzle
                  </button>
                  {puzzle.puzzleid && (
                    <a
                      href={"https://lichess.org/training/" + puzzle.puzzleid}
                      className="w-full py-2 bg-accent-light text-dark hover:bg-accent-dark hover:text-light transition duration-200 text-center"
                      target="_blank"
                    >
                      Analysis Board
                    </a>
                  )}
                </>
              )}
            </div>
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
              puzzle={puzzle}
              moveCheck={moveCheck}
              showNext={showNextButton}
            />
          </div>
        </div>
      )}
    </div>
  )
}
