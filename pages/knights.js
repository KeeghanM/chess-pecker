import Layout from '../components/Layout'
import { useState, useEffect } from 'react'
import KnightsChess from '../components/KnightsChess'
import { Switch } from '@headlessui/react'
import { minKnightJumps } from '../lib/knightJumps'
import { useTimer } from 'react-timer-hook'
import useSound from 'use-sound'

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
  const [highScoreFlash, showhighScoreFlash] = useState(false)
  const [moveHint, setMoveHint] = useState(false)
  const [bestStreak, setbestStreak] = useState(0)

  // Setup best streak in LocalStorage
  useEffect(() => {
    let storedBest =
      JSON.parse(localStorage.getItem('best-knight-vision-streak')) || 0
    setbestStreak(storedBest)
  })

  // Setup SFX
  const [playCorrect] = useSound('/sounds/correct.mp3', { volume: 0.25 })
  const [playIncorrect] = useSound('/sounds/incorrect.mp3', { volume: 0.25 })
  const [playHighScore] = useSound('/sounds/highscore.mp3', { volume: 0.25 })

  // Setup the timer with 60 seconds
  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    expiryTimestamp: () => {
      const time = new Date()
      time.setSeconds(time.getSeconds() + 60)
      return time
    },
    onExpire: endTimer,
    autoStart: false,
  })

  // The chessboard calls this function after every move
  // in it we increment the counter, check if the puzzle is solved
  // if it is, create a new one, if we have failed, Reset.
  function knightMoveCheck(from, to) {
    setmoveCount(moveCount + 1)
    setMoveSquare(to)
    if (to == endSquare) {
      // Puzzle Finished - Make a new one
      playCorrect()
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
      // Too many moves - reset game
      playIncorrect()
      endTimer()
    }
  }

  function startTimer() {
    // Reset Moves
    setmoveCount(0)
    setStreak(0)

    // Call the timer start
    start()
  }

  function endTimer() {
    // Check if current streak is better than the
    // best streak in local storage
    let currentSavedStreak =
      JSON.parse(localStorage.getItem('best-knight-vision-streak')) || 0
    if (streak > currentSavedStreak) {
      playHighScore()
      showhighScoreFlash(true)
      let hideFlash = setTimeout(() => {
        showhighScoreFlash(false)
      }, 1000)
      setbestStreak(streak)
      localStorage.setItem('best-knight-vision-streak', JSON.stringify(streak))
    }

    // Generate the next sequence
    let newStart = generateSquare()
    let newEnd = generateSquare()
    setStartSquare(newStart)
    setMoveSquare(newStart)
    setEndSquare(newEnd)
    setMinJumps(minKnightJumps(newStart, newEnd))

    // Finally reset the timer
    resetTimer()
  }

  function resetTimer() {
    const time = new Date()
    time.setSeconds(time.getSeconds() + 60)
    // Reset but dont start
    restart(time, false)
  }

  return (
    <div>
      <Layout name="Knight Vision">
        <div
          className="flex flex-col lg:flex-row p-4 md:p-6 lg:p-12 space-4 lg:space-x-6 text-lg text-dark"
          style={{ background: highScoreFlash ? '#84cc16' : '' }}
        >
          <div className="space-y-2 lg:w-1/3">
            <h1 className="text-4xl font-bold text-primary">Knight Vision</h1>
            <div>
              Improve your board vision, and also master those tricky knights.
              By using our Knight Vision trainer, you will greatly improve your
              chess abilities.
            </div>
            <div className="">
              Coordinates have been intentionally left off to help reinforce
              your own internalisation of the squares. The board is setup from
              Whites perspective, so remember:{' '}
              <span className="font-bold">A to H, 1 to 8</span>
            </div>
            <div className="flex flex-col space-y-2">
              <div
                className="py-4 text-accent-dark font-bold text-xl"
                style={{ color: highScoreFlash ? '#84cc16' : '' }}
              >
                Your Best Streak: {bestStreak}
              </div>
              <div className="p-4 bg-dark text-light">
                {isRunning ? (
                  // Timer is running, so show movement squares
                  // and hide the prompt text/start button
                  <div>
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
                    <div>
                      <span>
                        Timer: 0{minutes}:{seconds == 0 ? '00' : seconds}
                      </span>
                    </div>
                    <div
                      className="transition-all"
                      style={{ color: colorFlash ? '#84cc16' : '' }}
                    >
                      Current Streak: {streak}
                    </div>

                    <div
                      className="font-bold transition-all"
                      style={{ color: colorFlash ? '#84cc16' : '' }}
                    >
                      Get your knight to:{' '}
                      <span
                        className="text-primary transition-all"
                        style={{ color: colorFlash ? '#84cc16' : '' }}
                      >
                        {endSquare}
                      </span>
                    </div>
                  </div>
                ) : (
                  // Timer is not running
                  <div className="flex flex-col space-y-2">
                    <p>
                      You'll have 1 minute to move your knight to the indicated
                      square in as few moves as possible, as many times as
                      possible. See how high of a streak you can get!
                    </p>
                    <button
                      onClick={startTimer}
                      className="w-fit inline-block text-sm md:text-lg py-1 px-2 md:py-2 md:px-4 text-light font-bold bg-primary hover:bg-accent-light hover:text-dark rounded-full transition duration-200"
                    >
                      Start
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center align-middle space-y-0">
            <div
              className={
                colorFlash ? 'shadow-xl shadow-[#84cc16] transition-all' : ''
              }
            >
              <KnightsChess
                knightSquare={moveSquare}
                moveCheck={knightMoveCheck}
                coords={false}
              />
            </div>
          </div>
        </div>
      </Layout>
    </div>
  )
}

export default knights
