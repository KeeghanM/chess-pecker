import { useState, useContext } from 'react'
import { UserContext } from '../lib/context'
import { Dialog, Tab } from '@headlessui/react'
import getPuzzle from './PuzzleHandler'
import Spinner from './Spinner'

export default function CreateSetForm(props) {
  const { user } = useContext(UserContext)
  const [selectedDifficulty, setselectedDifficulty] = useState(
    user ? user.puzzleDifficulty : 1
  )
  const [size, setsize] = useState(500)
  const [disable, setdisable] = useState(false)
  const [dialogOpen, setdialogOpen] = useState(false)
  const [errorMsg, seterrorMsg] = useState(false)

  let attempts = 0
  let maxTries = 3

  function difficultyAdjuster(d) {
    return d == 0 ? 0.9 : d == 1 ? 1 : 1.2
  }

  function createSet(e) {
    e.preventDefault()
    setdisable(true)
    let form = e.target
    let r = Math.round(
      form.chessRating.value * difficultyAdjuster(selectedDifficulty)
    )
    let c = form.setSize.value

    loadPuzzles({ rating: r, count: c, form })
  }

  function loadPuzzles(settings) {
    try {
      getPuzzle({ rating: settings.rating, count: settings.count }).then(
        (response) => {
          props.saveSet({
            puzzles: response.data.puzzles,
            name: settings.form.setName.value,
          })
          setdisable(false)
          setdialogOpen(false)
          attempts = 0
        }
      )
    } catch (err) {
      if (attempts < maxTries) {
        attempts++
        loadPuzzles(settings)
      } else {
        seterrorMsg(true)
      }
    }
  }

  return (
    <>
      <button
        onClick={() => {
          setdialogOpen(true)
        }}
        className="min-w-[100px] inline-block text-sm md:text-lg py-1 px-2 md:py-2 md:px-4 text-light font-bold bg-primary hover:bg-accent-light hover:text-dark rounded-full transition duration-200"
      >
        Add Set
      </button>
      <Dialog
        open={dialogOpen}
        onClose={() => {
          setdisable(false)
          setdialogOpen(false)
        }}
        className="fixed z-10 inset-0 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          <div className="relative bg-white rounded p-12 space-x-2 max-w-[330px] mx-auto">
            <form onSubmit={createSet}>
              <fieldset disabled={disable}>
                <div className="space-y-2">
                  <div>
                    <div>
                      <label
                        className="block font-bold mb-1 pr-4"
                        htmlFor="chessRating"
                      >
                        Chess Rating
                      </label>
                    </div>
                    <div>
                      <input
                        className="bg-gray-200 appearance-none border-2 border-accent-light rounded w-full py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-primary"
                        id="chessRating"
                        type="number"
                        defaultValue={user ? user.chessRating : 1500}
                        min={500}
                        max={2600}
                      />
                    </div>
                  </div>
                  <div>
                    <div>
                      <label
                        className="block font-bold mb-1 pr-4"
                        htmlFor="puzzleDifficulty"
                      >
                        Puzzle Difficulty
                      </label>
                    </div>
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
                  <div>
                    <div>
                      <label
                        className="block font-bold mb-1 pr-4"
                        htmlFor="chessRating"
                      >
                        Set Size
                      </label>
                    </div>
                    <div className="flex flex-row items-center">
                      <div className="px-4 text-xl font-bold">{size}</div>
                      <input
                        className="bg-gray-200 appearance-none border-2 border-accent-light rounded w-full px-4 focus:outline-none focus:bg-white focus:border-primary"
                        id="setSize"
                        type="range"
                        defaultValue={size}
                        min={200}
                        max={500}
                        step={50}
                        onChange={(x) => setsize(x.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <div>
                      <label
                        className="block font-bold mb-1 pr-4"
                        htmlFor="chessRating"
                      >
                        Set Name
                      </label>
                    </div>
                    <div>
                      <input
                        className="bg-gray-200 appearance-none border-2 border-accent-light rounded w-full py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-primary"
                        id="setName"
                        type="text"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="pt-6">
                  <button
                    type="submit"
                    className="inline-block w-full py-2 px-12 text-light font-bold bg-primary hover:bg-accent-light hover:text-dark rounded-full transition duration-200"
                  >
                    Create Set
                  </button>
                </div>
              </fieldset>
            </form>
            <div
              className="pt-4"
              style={{ display: disable ? 'block' : 'none' }}
            >
              <Spinner text="Building your Puzzle Set..." />
            </div>
            <div
              className="pt-4 italic text-danger"
              style={{ display: errorMsg ? 'block' : 'none' }}
            >
              <p>
                Error: Please try again. If the error persists, please contact
                us
              </p>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  )
}
