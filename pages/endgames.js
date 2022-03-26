import { Tab } from "@headlessui/react"
import { useContext, useState } from "react"
import Layout from "../components/layout/Layout"
import ContentBlock from "../components/utils/ContentBlock"
import HeroBanner from "../components/utils/HeroBanner"
import getPuzzle from "../components/utils/PuzzleHandler"
import { UserContext } from "../lib/context"
import { difficultyAdjuster } from "../lib/utils"

export default function Endgames() {
  const { user } = useContext(UserContext)

  const [selectedDifficulty, setselectedDifficulty] = useState(
    user ? user.puzzleDifficulty : 1
  )
  const [themeType, setThemeType] = useState(0)
  const [puzzles, setpuzzles] = useState([])
  const [currentPuzzle, setcurrentPuzzle] = useState()
  const [errorMsg, seterrorMsg] = useState(false)

  function formSubmit(e) {
    e.preventDefault()
    let form = e.target
    let r =
      form.chessRating.value * difficultyAdjuster(form.puzzleDifficulty.value)
    let themes = [
      "endgame",
      "queenEndgame",
      "rookEndgame",
      "bishopEndgame",
      "knightEndgame",
      "pawnEndgame",
    ]

    fetchPuzzles(5, r, themes[themeType])
  }

  function fetchPuzzles(c, r, t) {
    getPuzzle({ rating: r, themes: [t], themesType: "ALL", count: c })
      .then((response) => {
        console.log(response.data)
        setpuzzles([...puzzles, ...response.data.puzzles])
      })
      .catch((err) => {
        seterrorMsg(true)
      })
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

      <ContentBlock title="Pick your theme" color="dark">
        <div>
          <a id="start"></a>
          Endgames are an incredibly important, if often overlooked, element of
          any chess game. Much thought must be given to endgame positions as a
          single move can completely throw the whole thing away.
        </div>
        <div>
          Test your knowledge and hone your skills with our endgames puzzles,
          sorted into piece types.
        </div>
        <form onSubmit={(e) => formSubmit(e)}>
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
                  setThemeType(index)
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
                defaultValue={user ? user.chessRating : 1500}
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
        </form>
        <div
          className="pt-4 italic text-danger"
          style={{ display: errorMsg ? "block" : "none" }}
        >
          <p>
            Error: Please try again. If the error persists, please contact us
          </p>
        </div>
      </ContentBlock>
    </Layout>
  )
}
