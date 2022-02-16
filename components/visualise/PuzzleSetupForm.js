import { useState, useEffect, useContext } from "react"
import { UserContext } from "../../lib/context"
import { Tab, Switch } from "@headlessui/react"
import Spinner from "../utils/Spinner"

export default function PuzzleSetupForm(props) {
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

  const [strictModeEnabled, setStrictModeEnabled] = useState(true)

  return (
    <div>
      <form
        onSubmit={(e) => {
          setdisable(true)
          props.submit(e)
        }}
      >
        <fieldset disabled={disable}>
          <div className="space-y-6">
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
            <div className="pb-6">
              <label
                className="block font-bold mb-1 pr-4"
                htmlFor="chessRating"
              >
                Length
              </label>
              <div className="flex flex-col space-y-2 p-2 min-w-sm max-w-sm">
                <input
                  className="w-full bg-gray-200 appearance-none border-4 border-accent-light focus:outline-none focus:bg-white focus:border-primary"
                  id="puzzleLength"
                  type="range"
                  defaultValue={moves}
                  min={3}
                  max={6}
                  onChange={(x) => setmoves(x.target.value)}
                />
                <ul className="flex justify-between w-full px-[10px]">
                  <li class="flex justify-center relative">
                    <span className="absolute">3</span>
                  </li>
                  <li className="flex justify-center relative">
                    <span className="absolute">4</span>
                  </li>
                  <li className="flex justify-center relative">
                    <span className="absolute">5</span>
                  </li>
                  <li className="flex justify-center relative">
                    <span className="absolute">6</span>
                  </li>
                </ul>
              </div>
            </div>
            <input
              type="checkbox"
              id="strictMode"
              defaultChecked={strictModeEnabled}
              hidden
            />
            <div className="flex flex-col">
              <div className="flex flex-row justify-between max-w-sm">
                <Switch.Group>
                  <Switch.Label>
                    <span className="font-bold">Use Strict Mode</span>
                  </Switch.Label>
                  <Switch
                    checked={strictModeEnabled}
                    onChange={() => setStrictModeEnabled(!strictModeEnabled)}
                    className={`${
                      strictModeEnabled ? "bg-primary" : "bg-gray-200"
                    } relative inline-flex items-center h-6 rounded-full w-11`}
                  >
                    <span
                      className={`${
                        strictModeEnabled ? "translate-x-6" : "translate-x-1"
                      } inline-block w-4 h-4 transform bg-white rounded-full`}
                    />
                  </Switch>
                </Switch.Group>
              </div>
              <p className="text-sm">
                Disable to not need # and + in your answer
              </p>
            </div>
          </div>

          <div className="pt-6">
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-light hover:bg-accent-light hover:text-dark transition duration-200"
            >
              Start
            </button>
          </div>
        </fieldset>
      </form>

      <div className="pt-4" style={{ display: disable ? "block" : "none" }}>
        <Spinner text="Fetching your puzzles..." />
      </div>
    </div>
  )
}
