import Chessboard from '../components/Chessboard'
import { Chess } from '../lib/chess'
import { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import getPuzzle from '../components/PuzzleHandler'
import { Tab } from '@headlessui/react'
import Spinner from '../components/Spinner'

export default function visualise() {
  const [puzzles, setpuzzles] = useState([])
  const [fen, setfen] = useState('')
  const [movesList, setmovesList] = useState('')
  const [rating, setrating] = useState()
  const [playerMoves, setplayerMoves] = useState()

  useEffect(() => {
    if (puzzles.length > 0) showPuzzle()
  }, [puzzles])

  function formSubmit(e) {
    e.preventDefault()
    let form = e.target

    setrating(
      form.chessRating.value * difficultyAdjuster(form.puzzleDifficulty.value)
    )
    setplayerMoves(parseInt(form.puzzleLength.value))
    let count = puzzles.length > 0 ? 1 : 2
    fetchPuzzles(count)
  }

  function fetchPuzzles(count) {
    getPuzzle({ rating, playerMoves, count })
      .then((response) => {
        setpuzzles([...puzzles, ...response.data.puzzles])
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  function showPuzzle() {
    let puzzle = puzzles[0]
    setmovesList(JSON.stringify(puzzle.moves))
    console.log(puzzle)
    setfen(puzzle.fen)
  }

  function nextPuzzle() {
    let id = puzzles[0].puzzleId
    setPuzzles(puzzles.filter((puzzle) => puzzle.puzzleId !== id))
    fetchPuzzles(1)
  }

  function difficultyAdjuster(d) {
    return d == 0 ? 0.6 : d == 1 ? 0.75 : 0.9
  }

  return (
    <div>
      <Layout name="Visualisation & Calculation">
        <div className="flex flex-col lg:flex-row space-y-12 space-x-12 p-4 md:p-6 lg:p-12 text-lg text-dark">
          <div className="space-y-2 lg:w-1/3">
            <h1 className="text-4xl font-bold text-primary">
              Visualisation & Calculation
            </h1>
            <div>
              If you're struggling to calculate more than 2 or 3 moves, then
              this training tool is for you.
            </div>
            <div>
              You'll be presented with a position, and a list of moves.
              Visualise the moves in your head, and when you're ready - type in
              your answer!
            </div>
            <div>
              If you're correct, brilliant! Move on to the next one, if not then
              the puzzle will step forward one move, and you can try again.
            </div>
          </div>
          <div>
            {puzzles.length === 0 ? (
              <PuzzleSetupForm submit={formSubmit} />
            ) : (
              <div>
                <Chessboard fen={fen} draggable={{ enabled: false }} />
                <div>{movesList}</div>
              </div>
            )}
          </div>
        </div>
      </Layout>
    </div>
  )
}

function PuzzleSetupForm(props) {
  const [selectedDifficulty, setselectedDifficulty] = useState(1)
  const [moves, setmoves] = useState(2)
  const [disable, setdisable] = useState(false)

  return (
    <div className="flex flex-col m-0 items-center text-lg text-dark">
      <form
        onSubmit={(e) => {
          setdisable(true)
          props.submit(e)
        }}
        className="w-full max-w-sm"
      >
        <fieldset disabled={disable}>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-primary">
              Setup Your Puzzles
            </h1>
            <div className="md:flex md:items-center">
              <div className="md:w-1/2">
                <label
                  className="block font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="chessRating"
                >
                  Chess Rating
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-accent-light rounded w-full py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-primary"
                  id="chessRating"
                  type="number"
                  defaultValue={1500}
                />
              </div>
            </div>
            <div className="md:flex md:items-center">
              <div className="md:w-1/2">
                <label
                  className="block font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="puzzleDifficulty"
                >
                  Puzzle Difficulty
                </label>
              </div>
              <input
                type="number"
                id="puzzleDifficulty"
                defaultValue={selectedDifficulty}
                hidden
              />
              <Tab.Group
                className="md:w-2/3"
                defaultIndex={selectedDifficulty}
                onChange={(index) => {
                  setselectedDifficulty(index)
                }}
              >
                <Tab.List className="space-x-2">
                  <Tab
                    className={({ selected }) =>
                      (selected
                        ? ' border-primary bg-white  '
                        : ' border-accent-light bg-gray-200 ') +
                      'appearance-none border-2 border-r-0 rounded-r-none rounded w-1/3 py-2 leading-tight focus:outline-none focus:border-primary'
                    }
                  >
                    Easy
                  </Tab>
                  <Tab
                    className={({ selected }) =>
                      (selected
                        ? ' border-primary bg-white '
                        : ' border-accent-light bg-gray-200 ') +
                      'appearance-none border-y-2 rounded-y w-1/3 py-2 leading-tight focus:outline-none focus:border-primary'
                    }
                  >
                    Medium
                  </Tab>
                  <Tab
                    className={({ selected }) =>
                      (selected
                        ? ' border-primary bg-white '
                        : ' border-accent-light bg-gray-200 ') +
                      'appearance-none border-2 border-l-0 rounded-l-none rounded w-1/3 py-2 leading-tight focus:outline-none focus:border-primary'
                    }
                  >
                    Hard
                  </Tab>
                </Tab.List>
              </Tab.Group>
            </div>
            <div className="md:flex md:items-center">
              <div className="md:w-1/2">
                <label
                  className="block font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="chessRating"
                >
                  Moves to Visualise
                </label>
              </div>
              <div className="md:w-2/3 flex flex-row items-center">
                <div className="px-4 text-xl font-bold">{moves}</div>
                <input
                  className="bg-gray-200 appearance-none border-2 border-accent-light rounded w-full px-4 focus:outline-none focus:bg-white focus:border-primary"
                  id="puzzleLength"
                  type="range"
                  defaultValue={moves}
                  min={1}
                  max={5}
                  onChange={(x) => setmoves(x.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="pt-6">
            <button
              type="submit"
              className="inline-block w-full py-2 px-12 text-light font-bold bg-primary hover:bg-accent-light hover:text-dark rounded-full transition duration-200"
            >
              Start
            </button>
          </div>
        </fieldset>
      </form>

      <div className="pt-4" style={{ display: disable ? 'block' : 'none' }}>
        <Spinner />
      </div>
    </div>
  )
}
