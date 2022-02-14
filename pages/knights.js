import Layout from "../components/layout/Layout"
import { useState, useEffect, useContext } from "react"
import KnightsChess from "../components/knights/KnightsChess"
import { Switch } from "@headlessui/react"
import { minKnightJumps } from "../lib/knightJumps"
import { useTimer } from "react-timer-hook"
import useSound from "use-sound"
import { UserContext } from "../lib/context"
import { setDoc, doc } from "firebase/firestore"
import { firestore } from "../lib/firebase"
import HeroBanner from "../components/utils/HeroBanner"
import ContentBlock from "../components/utils/ContentBlock"

function knights() {
  const { user } = useContext(UserContext)

  // Helper function to generate squares for the puzzle
  function generateSquare() {
    let rows = "12345678"
    let cols = "abcdefgh"

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

  // Setup best streak in sessionStorage
  useEffect(() => {
    let storedBest = 0
    if (!user) {
      storedBest =
        JSON.parse(sessionStorage.getItem("best-knight-vision-streak")) || 0
    } else {
      let localBest =
        JSON.parse(sessionStorage.getItem("best-knight-vision-streak")) || 0
      let dbBest = user.knightHighscore
      storedBest = Math.max(localBest, dbBest)
    }
    setbestStreak(storedBest)
  })

  // Setup SFX
  const [playCorrect] = useSound("/sounds/correct.mp3", { volume: 0.25 })
  const [playIncorrect] = useSound("/sounds/incorrect.mp3", { volume: 0.25 })
  const [playHighScore] = useSound("/sounds/highscore.mp3", { volume: 0.25 })

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
      JSON.parse(sessionStorage.getItem("best-knight-vision-streak")) || 0
    if (streak > bestStreak) {
      playHighScore()
      showhighScoreFlash(true)
      let hideFlash = setTimeout(() => {
        showhighScoreFlash(false)
      }, 1000)
      setbestStreak(streak)

      // Always store locally, because we use that for display
      // but also update the database
      sessionStorage.setItem(
        "best-knight-vision-streak",
        JSON.stringify(streak)
      )
      if (user) {
        const userRef = doc(firestore, "users", user.uid)
        setDoc(userRef, { knightHighscore: streak }, { merge: true })
      }
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
        <HeroBanner
          title="Knight Vision"
          image="/chessBackground.jpg"
          cta="Start Now ↓"
          target="#start"
        >
          <p className="max-w-xl text-lg py-2 mx-auto">
            Improve your board vision, and master those tricky knights.
          </p>
        </HeroBanner>
        <ContentBlock title="How it works" color="dark">
          <div>
            Improve your board vision, and also master those tricky knights. By
            using our Knight Vision trainer, you will greatly improve your chess
            abilities.
          </div>
          <div className="">
            Coordinates have been intentionally left off to help reinforce your
            own internalisation of the squares. The board is setup from Whites
            perspective, so remember:{" "}
            <span className="font-bold">A to H, 1 to 8</span>
          </div>
          <div
            className="py-4 text-accent-dark font-bold text-xl"
            style={{ color: highScoreFlash ? "#84cc16" : "" }}
          >
            Your Best Streak: {bestStreak}
            <a id="start"></a>
          </div>
          <div
            className="p-4 bg-accent-dark text-light min-w-lg max-w-lg"
            style={{ background: highScoreFlash ? "#84cc16" : "" }}
          >
            {isRunning ? (
              // Timer is running, so show movement squares
              // and hide the prompt text/start button
              <div className="space-y-4">
                <div className="flex flex-row items-center">
                  <Switch.Group>
                    <Switch
                      checked={moveHint}
                      onChange={setMoveHint}
                      className={`${
                        moveHint ? "bg-primary" : "bg-gray-200"
                      } relative inline-flex items-center h-6 rounded-full w-11`}
                    >
                      <span
                        className={`${
                          moveHint ? "translate-x-6" : "translate-x-1"
                        } inline-block w-4 h-4 transform bg-white rounded-full`}
                      />
                    </Switch>
                    <Switch.Label className="ml-2 flex flex-row items-center space-x-2">
                      <span>Show Move Hint:</span>
                      <span className={moveHint ? "block" : "hidden"}>
                        {minJumps} Moves
                      </span>
                    </Switch.Label>
                  </Switch.Group>
                </div>
                <div>
                  <span>
                    Timer: 0{minutes}:{seconds == 0 ? "00" : seconds}
                  </span>
                </div>
                <div
                  className="transition-all"
                  style={{ color: colorFlash ? "#84cc16" : "" }}
                >
                  Current Streak: {streak}
                </div>
                <div
                  className="font-bold transition-all text-2xl"
                  style={{ color: colorFlash ? "#84cc16" : "" }}
                >
                  Get your knight to:{" "}
                  <span
                    className="text-dark transition-all"
                    style={{ color: colorFlash ? "#84cc16" : "" }}
                  >
                    {endSquare}
                  </span>
                </div>
              </div>
            ) : (
              // Timer is not running
              <div className="flex flex-col space-y-6">
                <p>
                  You'll have 1 minute to move your knight to the indicated
                  square in as few moves as possible, as many times as possible.
                  See how high of a streak you can get!
                </p>
                <button
                  onClick={startTimer}
                  className="px-4 py-2 bg-primary text-light hover:bg-accent-light hover:text-dark transition duration-200 w-fit"
                >
                  Start
                </button>
              </div>
            )}
          </div>
          <div className="overflow-hidden">
            <KnightsChess
              knightSquare={moveSquare}
              moveCheck={knightMoveCheck}
              coords={false}
            />
          </div>
        </ContentBlock>
      </Layout>
    </div>
  )
}

export default knights
