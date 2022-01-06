import Layout from '../components/Layout'
import { useState } from 'react'
import KnightsChess from '../components/KnightsChess'
import { Switch } from '@headlessui/react'
import { minKnightJumps } from '../lib/knightJumps'

function knights() {
  // Helper function to generate squares for the puzzle
  function generateSquare() {
    let rows = '12345678'
    let cols = 'abcdefgh'

    let randC = cols.charAt(Math.floor(Math.random() * cols.length))
    let randR = rows.charAt(Math.floor(Math.random() * rows.length))

    return randC + randR
  }

  // Setup all the state managed variables
  const [startSquare, setStartSquare] = useState(generateSquare())
  const [moveSquare, setMoveSquare] = useState(startSquare)
  const [endSquare, setEndSquare] = useState(generateSquare())
  const [moveCount, setmoveCount] = useState(0)
  const [minJumps, setMinJumps] = useState(
    minKnightJumps(startSquare, endSquare)
  )
  const [streak, setStreak] = useState(0)
  const [colorFlash, showFlash] = useState(false)
  const [moveHint, setMoveHint] = useState(false)
  const [coordinatesShow, setCoordinatesShow] = useState(false)

  // The chessboard calls this function after every move
  // in it we increment the counter, check if the puzzle is solved
  // if it is, create a new one, if we have failed, Reset.
  function knightMoveCheck(from, to) {
    setmoveCount(moveCount + 1)
    setMoveSquare(to)
    if (to == endSquare) {
      // Puzzle Finished - Make a new one
      setStartSquare(to)
      let newEnd = generateSquare()
      setEndSquare(newEnd)
      setMinJumps(minKnightJumps(to, newEnd))
      setmoveCount(0)
      setStreak(streak + 1)
      showFlash(true)
      let hideFlash = setTimeout(() => {
        showFlash(false)
      }, 500)
      return
    }
    if (moveCount + 1 >= minJumps) {
      // Too many moves - reset to starting
      setMoveSquare(startSquare)
      setmoveCount(0)
      setStreak(0)
    }
  }

  return (
    <div>
      <Layout name="Knight Vision">
        <div className="flex flex-col lg:flex-row p-4 md:p-6 lg:p-12 space-4 text-lg text-dark">
          <div className="space-y-2 lg:w-1/3">
            <h1 className="text-4xl font-bold text-primary">Knight Vision</h1>
            <div>
              Improve your board vision, and also master those tricky knights.
              By using our Knight Vision trainer, you will greatly improve your
              chess abilities.
            </div>
            <div className="">
              Coordinates have been intentially left off to help reinforce your
              own internalisation of the squares. The board is setup from Whites
              perspective, so remember:{' '}
              <span className="font-bold">A to H, 1 to 8</span>
            </div>
            <div className="flex flex-col-reverse md:flex-col">
              <div className="p-4 bg-dark text-light">
                Move your Knight in as few a moves as possible.
                <ul
                  className="font-bold transition-all"
                  style={{ color: colorFlash ? '#84cc16' : '' }}
                >
                  <li>
                    From:{' '}
                    <span
                      className="text-primary transition-all"
                      style={{ color: colorFlash ? '#84cc16' : '' }}
                    >
                      {startSquare}
                    </span>
                  </li>
                  <li>
                    To:{' '}
                    <span
                      className="text-primary transition-all"
                      style={{ color: colorFlash ? '#84cc16' : '' }}
                    >
                      {endSquare}
                    </span>
                  </li>
                </ul>
              </div>
              <div
                className="font-bold text-xl transition-all"
                style={{ color: colorFlash ? '#84cc16' : '' }}
              >
                Current Streak: {streak}
              </div>
              <div className="flex flex-col w-fit">
                <div className="flex flex-row items-center">
                  <Switch.Group>
                    <Switch
                      checked={moveHint}
                      onChange={setMoveHint}
                      className={`${
                        moveHint ? 'bg-primary' : 'bg-gray-200'
                      } relative inline-flex items-center h-6 rounded-full w-11`}
                    >
                      <span
                        className={`${
                          moveHint ? 'translate-x-6' : 'translate-x-1'
                        } inline-block w-4 h-4 transform bg-white rounded-full`}
                      />
                    </Switch>
                    <Switch.Label className="ml-2 flex flex-row items-center space-x-2">
                      <span>Show Move Hint:</span>
                      <span className={moveHint ? 'block' : 'hidden'}>
                        {minJumps} Moves
                      </span>
                    </Switch.Label>
                  </Switch.Group>
                </div>
                {/* <div className="flex flex-row items-center">
                  <Switch.Group>
                    <Switch
                      checked={coordinatesShow}
                      onChange={setCoordinatesShow}
                      className={`${
                        coordinatesShow ? 'bg-primary' : 'bg-gray-200'
                      } relative inline-flex items-center h-6 rounded-full w-11`}
                    >
                      <span
                        className={`${
                          coordinatesShow ? 'translate-x-6' : 'translate-x-1'
                        } inline-block w-4 h-4 transform bg-white rounded-full`}
                      />
                    </Switch>
                    <Switch.Label className="ml-2 flex flex-row items-center space-x-2">
                      <span>Show Coordinates</span>
                    </Switch.Label>
                  </Switch.Group>
                </div> */}
              </div>
            </div>
          </div>
          <div
            className={
              colorFlash ? 'shadow-xl shadow-[#84cc16] transition-all' : ''
            }
          >
            <KnightsChess
              knightSquare={moveSquare}
              moveCheck={knightMoveCheck}
              coords={coordinatesShow}
            />
          </div>
        </div>
      </Layout>
    </div>
  )
}

export default knights
