import { Tab } from "@headlessui/react"
import { useContext, useState } from "react"
import useSound from "use-sound"
import Layout from "../components/layout/Layout"
import Chessboard from "../components/utils/Chessboard"
import ContentBlock from "../components/utils/ContentBlock"
import HeroBanner from "../components/utils/HeroBanner"
import getPuzzle from "../components/utils/PuzzleHandler"
import Spinner from "../components/utils/Spinner"
import { UserContext } from "../lib/context"
import { difficultyAdjuster } from "../lib/utils"

export default function Endgames() {
  const { user } = useContext(UserContext)

  const [selectedDifficulty, setselectedDifficulty] = useState(
    user ? user.puzzleDifficulty : 1
  )
  const [disable, setdisable] = useState(false)
  const [themeType, setThemeType] = useState("endgame")
  const [rating, setrating] = useState(user ? user.chessRating : 1500)
  const [puzzles, setpuzzles] = useState([])
  const [currentPuzzle, setcurrentPuzzle] = useState(null)
  const [errorMsg, seterrorMsg] = useState(false)
  const [wrongSolution, setwrongSolution] = useState(false)
  const themes = [
    "endgame",
    "queenEndgame",
    "rookEndgame",
    "bishopEndgame",
    "knightEndgame",
    "pawnEndgame",
  ]

  const [playCorrect] = useSound("/sounds/correct.mp3", { volume: 0.25 })
  const [playIncorrect] = useSound("/sounds/incorrect.mp3", { volume: 0.25 })
  const [playHighScore] = useSound("/sounds/highscore.mp3", { volume: 0.25 })
  const [colorFlash, showFlash] = useState(false)
  const [errorFlash, showError] = useState(false)

  function formSubmit(e) {
    e.preventDefault()
    setdisable(true)
    setrating(e.target.chessRating.value)
    fetchPuzzles(
      5,
      rating * difficultyAdjuster(selectedDifficulty),
      themeType,
      true
    )
  }

  function fetchPuzzles(c, r, t, update) {
    getPuzzle({ rating: r, themes: [t], themesType: "ALL", count: c })
      .then((response) => {
        let puzzleList = [...puzzles, ...response.data.puzzles]
        if (update) {
          setcurrentPuzzle(puzzleList.shift())
          setdisable(false)
        }
        setpuzzles(puzzleList)
      })
      .catch((err) => {
        seterrorMsg(true)
      })
  }

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

  function nextPuzzle() {
    setwrongSolution(false)

    setcurrentPuzzle(puzzles.shift())

    if (puzzles.length < 5) {
      fetchPuzzles(
        5,
        rating * difficultyAdjuster(selectedDifficulty),
        themeType,
        false
      )
    }
  }

  function endSession() {
    setcurrentPuzzle(null)
    setpuzzles([])
    setwrongSolution(false)
  }

  return (
    <Layout name="Endgames">
      <HeroBanner
        title="Endgame Training"
        image="/chessBackground.jpg"
        cta="Start Now ↓"
        target="#start"
      >
        <p className="max-w-xl text-lg py-2 mx-auto">
          “In order to improve your game, you must study the endgame before
          everything else, for whereas the endings can be studied and mastered
          by themselves, the middle game and the opening must be studied in
          relation to the endgame.” <br />
          <b>José Raúl Capablanca</b>
        </p>
      </HeroBanner>

      <ContentBlock
        title={
          currentPuzzle
            ? (currentPuzzle.fen.split(" ")[1] == "w" ? "Black" : "White") +
              " To Move"
            : "Pick your theme"
        }
        color="dark"
      >
        {currentPuzzle ? (
          <>
            <div className="w-full flex flex-row gap-2">
              <button
                className="w-fit px-4 py-2 bg-accent-light text-dark hover:bg-accent-dark hover:text-light transition duration-200 text-center"
                onClick={endSession}
              >
                End Session
              </button>
              {wrongSolution && (
                <>
                  <button
                    className="w-fit px-4 py-2 bg-primary text-light hover:bg-accent-dark transition duration-200"
                    onClick={nextPuzzle}
                  >
                    Next Puzzle
                  </button>
                  <a
                    href={
                      "https://lichess.org/training/" + currentPuzzle.puzzleid
                    }
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
                showNext={() => {
                  setwrongSolution(true)
                }}
              />
            </div>
          </>
        ) : (
          <>
            <div>
              <a id="start"></a>
              Endgames are an incredibly important, if often overlooked, element
              of any chess game. Much thought must be given to endgame positions
              as a single move can completely throw the whole thing away.
            </div>
            <div>
              Test your knowledge and hone your skills with our endgames
              puzzles, sorted into piece types.
            </div>
            <form onSubmit={(e) => formSubmit(e)}>
              <fieldset disabled={disable}>
                <div className="space-y-6">
                  <div>
                    <label
                      className="block font-bold mb-1 pr-4"
                      htmlFor="endgameType"
                    >
                      Endgame Type
                    </label>
                    <Tab.Group
                      className="max-w-sm min-w-sm flex flex-row"
                      defaultIndex={themeType}
                      onChange={(index) => {
                        setThemeType(themes[index])
                      }}
                    >
                      <Tab.List className="space-x-2">
                        <Tab
                          className={({ selected }) =>
                            (selected
                              ? " border-primary bg-white  "
                              : " border-accent-light bg-gray-200 ") +
                            "appearance-none border-4 border-r-0 w-1/3 py-2 leading-tight focus:outline-none focus:border-primary text-dark"
                          }
                        >
                          Any
                        </Tab>
                        <Tab
                          className={({ selected }) =>
                            (selected
                              ? " border-primary bg-white "
                              : " border-accent-light bg-gray-200 ") +
                            "appearance-none border-y-4 w-1/3 py-2 leading-tight focus:outline-none focus:border-primary text-dark"
                          }
                        >
                          Queen
                        </Tab>
                        <Tab
                          className={({ selected }) =>
                            (selected
                              ? " border-primary bg-white "
                              : " border-accent-light bg-gray-200 ") +
                            "appearance-none border-y-4 w-1/3 py-2 leading-tight focus:outline-none focus:border-primary text-dark"
                          }
                        >
                          Rook
                        </Tab>
                        <Tab
                          className={({ selected }) =>
                            (selected
                              ? " border-primary bg-white "
                              : " border-accent-light bg-gray-200 ") +
                            "appearance-none border-y-4 w-1/3 py-2 leading-tight focus:outline-none focus:border-primary text-dark"
                          }
                        >
                          Bishop
                        </Tab>
                        <Tab
                          className={({ selected }) =>
                            (selected
                              ? " border-primary bg-white "
                              : " border-accent-light bg-gray-200 ") +
                            "appearance-none border-y-4 w-1/3 py-2 leading-tight focus:outline-none focus:border-primary text-dark"
                          }
                        >
                          Knight
                        </Tab>
                        <Tab
                          className={({ selected }) =>
                            (selected
                              ? " border-primary bg-white "
                              : " border-accent-light bg-gray-200 ") +
                            "appearance-none border-4 border-l-0 w-1/3 py-2 leading-tight focus:outline-none focus:border-primary text-dark"
                          }
                        >
                          Pawn
                        </Tab>
                      </Tab.List>
                    </Tab.Group>
                  </div>
                  <div className="max-w-sm">
                    <label
                      className="block font-bold mb-1 pr-4"
                      htmlFor="chessRating"
                    >
                      Chess Rating
                    </label>
                    <input
                      className="text-dark bg-gray-200 appearance-none border-4 border-accent-light w-full py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-primary"
                      id="chessRating"
                      type="number"
                      defaultValue={rating}
                      min={600}
                      max={2900}
                    />
                  </div>
                  <div>
                    <label
                      className="block font-bold mb-1 pr-4"
                      htmlFor="puzzleDifficulty"
                    >
                      Puzzle Difficulty
                    </label>
                    <input
                      type="number"
                      id="puzzleDifficulty"
                      defaultValue={selectedDifficulty}
                      hidden
                    />
                    <Tab.Group
                      className="max-w-sm min-w-sm flex flex-row"
                      defaultIndex={selectedDifficulty}
                      onChange={(index) => {
                        setselectedDifficulty(index)
                      }}
                    >
                      <Tab.List className="space-x-2">
                        <Tab
                          className={({ selected }) =>
                            (selected
                              ? " border-primary bg-white  "
                              : " border-accent-light bg-gray-200 ") +
                            "appearance-none border-4 border-r-0 w-1/3 py-2 leading-tight focus:outline-none focus:border-primary text-dark"
                          }
                        >
                          Easy
                        </Tab>
                        <Tab
                          className={({ selected }) =>
                            (selected
                              ? " border-primary bg-white "
                              : " border-accent-light bg-gray-200 ") +
                            "appearance-none border-y-4 w-1/3 py-2 leading-tight focus:outline-none focus:border-primary text-dark"
                          }
                        >
                          Medium
                        </Tab>
                        <Tab
                          className={({ selected }) =>
                            (selected
                              ? " border-primary bg-white "
                              : " border-accent-light bg-gray-200 ") +
                            "appearance-none border-4 border-l-0 w-1/3 py-2 leading-tight focus:outline-none focus:border-primary text-dark"
                          }
                        >
                          Hard
                        </Tab>
                      </Tab.List>
                    </Tab.Group>
                  </div>

                  <div className="pt-6">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-primary text-light hover:bg-accent-light hover:text-dark transition duration-200"
                    >
                      Start
                    </button>
                  </div>
                </div>
              </fieldset>
            </form>
            <div
              className="pt-4"
              style={{ display: disable ? "block" : "none" }}
            >
              <Spinner text="Fetching your puzzles..." />
            </div>
            <div
              className="pt-4 italic text-danger"
              style={{ display: errorMsg ? "block" : "none" }}
            >
              <p>
                Error: Please try again. If the error persists, please contact
                us
              </p>
            </div>
          </>
        )}
      </ContentBlock>
    </Layout>
  )
}
