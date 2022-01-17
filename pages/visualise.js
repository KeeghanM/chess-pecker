import { useState, useEffect, useContext } from 'react'
import Layout from '../components/Layout'
import getPuzzle from '../components/PuzzleHandler'
import { Tab } from '@headlessui/react'
import Spinner from '../components/Spinner'
import VisualiseChess from '../components/VisualiseChess'
import { UserContext } from '../lib/context'

export default function visualise() {
  const [puzzles, setpuzzles] = useState([])
  const [currentPuzzle, setcurrentPuzzle] = useState()
  const [rating, setrating] = useState()
  const [playerMoves, setplayermoves] = useState()
  const [errorMsg, seterrorMsg] = useState(false)

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
      JSON.parse(localStorage.getItem('visualisation-puzzle-list')) || []
    if (saved.length > 0 && !currentPuzzle) {
      // On first load, grab from Local
      setpuzzles(saved)
    }

    if (puzzles.length > 0) {
      localStorage.setItem('visualisation-puzzle-list', JSON.stringify(puzzles))
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
    // TODO: Increment some counter on the User Account
    nextPuzzle()
  }

  function puzzleError() {
    // TODO: Display puzzle solution and a "Move On" button
    nextPuzzle()
  }

  function difficultyAdjuster(d) {
    return d == 0 ? 0.8 : d == 1 ? 1 : 1.2
  }

  function formSubmit(e) {
    e.preventDefault()
    let form = e.target
    let r =
      form.chessRating.value * difficultyAdjuster(form.puzzleDifficulty.value)
    let pm = parseInt(form.puzzleLength.value) - 1
    fetchPuzzles(5, r, pm)
    setrating(r)
    setplayermoves(pm)
  }

  function reset() {
    localStorage.setItem('visualisation-puzzle-list', JSON.stringify([]))
    setcurrentPuzzle()
    setpuzzles([])
  }

  return (
    <div>
      <Layout name="Visualisation & Calculation">
        <div className="flex flex-col lg:flex-row space-y-12 p-4 md:p-6 lg:p-12 text-lg text-dark">
          <div className="space-y-4 lg:w-1/3">
            <h1 className="text-4xl font-bold text-primary">
              Visualisation & Calculation
            </h1>
            <div>
              If you're struggling to calculate more than 2 or 3 moves, then
              this training tool is for you.
            </div>
            <div>
              You'll be presented with a position, and a list of moves.
              Visualise the given moves in your head, and try to find the
              correct move in that position.
            </div>
            <div>
              When you think you've found the correct move to finish the puzzle
              off, simply type it in!
            </div>
            <div>
              If you're correct, brilliant! Move on to the next one, if not then
              you can keep trying - or skip the puzzle and move to the next one.
            </div>
            <div className="italic">
              Please note: Answers need to be entered in Algebraic Notation.
              This includes + for "check" and # for "checkmate". Learn more
              about Algebraic Notation{' '}
              <a
                href="https://www.ichess.net/wp-content/uploads/2021/10/chess-notation-infographic-906x2048.jpg"
                className="text-accent-dark underline hover:text-primary"
                target="_blank"
              >
                here
              </a>
              . An example is "1. f3 e6 2. g4 Qh4#" - the famous "Fools Mate"
            </div>
            <div className="">
              {puzzles.length > 0 && (
                <button
                  onClick={reset}
                  className="inline-block w-fit py-2 px-12 text-light font-bold bg-accent-dark hover:bg-accent-light hover:text-dark rounded-full transition duration-200"
                >
                  Reset Puzzle Settings
                </button>
              )}
            </div>
          </div>
          <div className="lg:pl-12">
            {puzzles.length === 0 || !currentPuzzle ? (
              <div className="w-2/3 lg:w-1/3 align-middle m-auto lg:m-0">
                <PuzzleSetupForm submit={formSubmit} error={errorMsg} />
                <div
                  className="pt-4 italic text-danger"
                  style={{ display: errorMsg ? 'block' : 'none' }}
                >
                  <p>
                    Error: Please try again. If the error persists, please
                    contact us
                  </p>
                </div>
              </div>
            ) : (
              <VisualiseChess
                puzzle={currentPuzzle}
                onSuccess={puzzleSuccess}
                onError={puzzleError}
              />
            )}
          </div>
        </div>
      </Layout>
    </div>
  )
}

function PuzzleSetupForm(props) {
  const { user } = useContext(UserContext)

  const [selectedDifficulty, setselectedDifficulty] = useState(
    user ? user.puzzleDifficulty : 1
  )
  const [moves, setmoves] = useState(3)
  const [disable, setdisable] = useState(false)

  useEffect(() => {
    if (props.error && disable) {
      setdisable(false)
    }
  }, [props.error])

  return (
    <div>
      <form
        onSubmit={(e) => {
          setdisable(true)
          props.submit(e)
        }}
      >
        <fieldset disabled={disable}>
          <div className="space-y-2">
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
                  defaultValue={user ? user.chessRating : 1500}
                  min={600}
                  max={2900}
                />
              </div>
            </div>
            <div className="md:flex md:items-center">
              <div className="md:w-1/3">
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
                className="w-fit flex flex-row"
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
                      'appearance-none border-2 border-r-0 rounded-r-none rounded  w-fit px-2 py-2 leading-tight focus:outline-none focus:border-primary'
                    }
                  >
                    Easy
                  </Tab>
                  <Tab
                    className={({ selected }) =>
                      (selected
                        ? ' border-primary bg-white '
                        : ' border-accent-light bg-gray-200 ') +
                      'appearance-none border-y-2 rounded-y w-fit px-2 py-2 leading-tight focus:outline-none focus:border-primary'
                    }
                  >
                    Medium
                  </Tab>
                  <Tab
                    className={({ selected }) =>
                      (selected
                        ? ' border-primary bg-white '
                        : ' border-accent-light bg-gray-200 ') +
                      'appearance-none border-2 border-l-0 rounded-l-none rounded  w-fit px-2 py-2 leading-tight focus:outline-none focus:border-primary'
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
                  Length
                </label>
              </div>
              <div className="md:w-2/3 flex flex-row items-center">
                <div className="px-4 text-xl font-bold">{moves}</div>
                <input
                  className="bg-gray-200 appearance-none border-2 border-accent-light rounded w-full px-4 focus:outline-none focus:bg-white focus:border-primary"
                  id="puzzleLength"
                  type="range"
                  defaultValue={moves}
                  min={3}
                  max={6}
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
        <Spinner text="Fetching your puzzles..." />
      </div>
    </div>
  )
}
