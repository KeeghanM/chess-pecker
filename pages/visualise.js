import { useState, useEffect, useContext } from "react"
import Layout from "../components/layout/Layout"
import getPuzzle from "../components/utils/PuzzleHandler"
import VisualiseChess from "../components/visualise/VisualiseChess"
import { UserContext } from "../lib/context"
import { collection, addDoc, Timestamp } from "firebase/firestore"
import { firestore } from "../lib/firebase"
import HeroBanner from "../components/utils/HeroBanner"
import ContentBlock from "../components/utils/ContentBlock"
import PuzzleSetupForm from "../components/visualise/PuzzleSetupForm"
import { difficultyAdjuster } from "../lib/utils"

export default function visualise() {
  const { user } = useContext(UserContext)

  const [puzzles, setpuzzles] = useState([])
  const [currentPuzzle, setcurrentPuzzle] = useState()
  const [rating, setrating] = useState()
  const [playerMoves, setplayermoves] = useState()
  const [errorMsg, seterrorMsg] = useState(false)
  const [strictMode, setstrictMode] = useState(true)

  function fetchPuzzles(c, r, pm) {
    getPuzzle({ rating: r, playerMoves: pm, count: c })
      .then((response) => {
        setpuzzles([...puzzles, ...response.data.puzzles])
      })
      .catch((err) => {
        seterrorMsg(true)
      })
  }

  useEffect(() => {
    let saved =
      JSON.parse(localStorage.getItem("visualisation-puzzle-list")) || []
    if (saved.length > 0 && !currentPuzzle) {
      // On first load, grab from Local
      setpuzzles(saved)
    }

    if (puzzles.length > 0) {
      localStorage.setItem("visualisation-puzzle-list", JSON.stringify(puzzles))
      if (!currentPuzzle) setcurrentPuzzle(puzzles[0])
      if (puzzles.length < 5 && saved.length < 5)
        fetchPuzzles(5, rating, playerMoves)
    }
  }, [puzzles])

  function nextPuzzle() {
    setcurrentPuzzle(puzzles[1])
    let id = puzzles[0].puzzleid
    let newPuzzles = puzzles.filter((puzzle) => puzzle.puzzleid !== id)
    setpuzzles(newPuzzles)
  }

  function puzzleSuccess() {
    logPuzzle("success")
    nextPuzzle()
  }

  function puzzleError() {
    logPuzzle("error")
  }

  function puzzleSkip() {
    logPuzzle("skip")
    // TODO: Display puzzle solution and a "Move On" button
    nextPuzzle()
  }

  function logPuzzle(type) {
    if (user) {
      addDoc(collection(firestore, "users", user.uid, "vis-" + type), {
        date: Timestamp.fromDate(new Date()),
        puzzleRating: currentPuzzle.rating.toString(),
        puzzleId: currentPuzzle.puzzleid,
      })
    }
  }

  function formSubmit(e) {
    e.preventDefault()
    let form = e.target
    let r =
      form.chessRating.value * difficultyAdjuster(form.puzzleDifficulty.value)
    let pm = parseInt(form.puzzleLength.value) - 1
    setrating(r)
    setplayermoves(pm)
    setstrictMode(form.strictMode.checked)
    fetchPuzzles(5, r, pm)
  }

  function reset() {
    localStorage.setItem("visualisation-puzzle-list", JSON.stringify([]))
    setcurrentPuzzle()
    setpuzzles([])
  }

  return (
    <div>
      <Layout name="Visualisation & Calculation">
        {puzzles.length === 0 || !currentPuzzle ? (
          <>
            <HeroBanner
              title="Visualisation & Calculation"
              image="/chessBackground.jpg"
              cta="Start Now ↓"
              target="#start"
            >
              <p className="max-w-xl text-lg py-2 mx-auto">
                If you're struggling to calculate more than 2 or 3 moves, then
                this training tool is for you.
              </p>
            </HeroBanner>
            <ContentBlock title="How it works" color="dark">
              <div>
                You'll be presented with a position, and a list of moves.
                Visualise the given moves in your head, and try to find the
                correct move in that position.
              </div>
              <div>
                When you think you've found the correct move to finish the
                puzzle off, simply type it in!
              </div>
              <div>
                If you're correct, brilliant! Move on to the next one, if not
                then you can keep trying - or skip the puzzle and move to the
                next one.
              </div>
              <div className="italic">
                Please note: Answers need to be entered in Algebraic Notation.
                This includes + for "check" and # for "checkmate". Learn more
                about Algebraic Notation{" "}
                <a
                  href="https://www.ichess.net/wp-content/uploads/2021/10/chess-notation-infographic-906x2048.jpg"
                  className="text-accent-dark underline hover:text-primary"
                  target="_blank"
                >
                  here
                </a>
                . An example is "1. f3 e6 2. g4 Qh4#" - the famous "Fools Mate"
              </div>
            </ContentBlock>
            <ContentBlock title="Configure your puzzles" color="black">
              <div className="">
                <a id="start"></a>
                <PuzzleSetupForm submit={formSubmit} error={errorMsg} />
                <div
                  className="pt-4 italic text-danger"
                  style={{ display: errorMsg ? "block" : "none" }}
                >
                  <p>
                    Error: Please try again. If the error persists, please
                    contact us
                  </p>
                </div>
              </div>
            </ContentBlock>
          </>
        ) : (
          <div className="flex flex-col items-center my-12">
            <VisualiseChess
              puzzle={currentPuzzle}
              onSuccess={puzzleSuccess}
              onError={puzzleError}
              onSkip={puzzleSkip}
              strictMode={strictMode}
            />
            <div>
              {puzzles.length > 0 && (
                <button
                  onClick={reset}
                  className="px-4 py-2 bg-accent-light text-dark hover:bg-accent-dark hover:text-light transition duration-200"
                >
                  Reset Puzzle Settings
                </button>
              )}
            </div>
          </div>
        )}
      </Layout>
    </div>
  )
}
