import { useState, useContext, useEffect } from 'react'
import { UserContext } from '../lib/context'
import Chessboard from './TacticsChessboard'
import { firestore } from '../lib/firebase'
import { doc, setDoc } from 'firebase/firestore'
import useSound from 'use-sound'
import { useStopwatch } from 'react-timer-hook'

export default function TacticsChess(props) {
  const { seconds, minutes, hours, days, isRunning, start, pause, reset } =
    useStopwatch({ autoStart: true })

  const [playCorrect] = useSound('/sounds/correct.mp3', { volume: 0.25 })
  const [playIncorrect] = useSound('/sounds/incorrect.mp3', { volume: 0.25 })

  // let startTime = Date.now()
  const [startTime, setstartTime] = useState(Date.now())

  const { user } = useContext(UserContext)
  const [currentSet, setcurrentSet] = useState(() => {
    let saved = JSON.parse(localStorage.getItem('tactics-set-list'))
    return saved.find((set) => {
      return set.id == props.setId
    })
  })
  const [puzzle, setpuzzle] = useState(null)
  useEffect(() => {
    let round = currentSet.set.rounds[currentSet.set.rounds.length - 1]
    changePuzzle(round.completed)
  }, [currentSet])

  function changePuzzle(i) {
    startTime = Date.now()
    setpuzzle(currentSet.set.puzzles[i])
  }

  function moveCheck(from, to, promotion, moveIndex) {
    let move = from + to + (promotion || '')
    if (move == puzzle.moves[moveIndex]) {
      playCorrect()
      if (moveIndex != puzzle.moves.length - 1) return true
      currentSet.set.rounds[currentSet.set.rounds.length - 1].correct += 1
    } else {
      playIncorrect()
    }

    currentSet.set.rounds[currentSet.set.rounds.length - 1].completed += 1
    changePuzzle(
      currentSet.set.rounds[currentSet.set.rounds.length - 1].completed
    )
    saveSet()
    if (
      currentSet.set.rounds[currentSet.set.rounds.length - 1].completed ===
      currentSet.set.setSize
    ) {
      setcurrentSet(null)
    }
  }

  function saveSet() {
    let currentTime = Date.now()
    let dif = (currentTime - startTime) / 1000
    currentSet.set.rounds[currentSet.set.rounds.length - 1].timeSpent += dif

    let saved = JSON.parse(localStorage.getItem('tactics-set-list'))
    saved.forEach(function (set, i) {
      if (set.id == currentSet.id) {
        saved[i] = currentSet
      }
    })
    localStorage.setItem('tactics-set-list', JSON.stringify(saved))
    setDoc(
      doc(firestore, 'users', user.uid, 'tactics-sets', currentSet.id),
      currentSet.set
    )
  }

  return (
    <div>
      {puzzle && (
        <div className="flex flex-col items-center">
          <div className="bg-dark rounded text-light p-4 space-y-2 h-fit flex flex-col">
            <div className="flex flex-row space-x-4">
              <p className="font-bold">
                {puzzle.fen.split(' ')[1] == 'w' ? 'Black' : 'White'} to move
              </p>
              <p>
                Puzzle{' '}
                {currentSet.set.rounds[currentSet.set.rounds.length - 1]
                  .completed + 1}
                /{currentSet.set.setSize}
              </p>
            </div>
            <p>
              Session Timer: {minutes}:{seconds}
            </p>
            <button
              className="py-2 px-4 rounded bg-accent-dark hover:bg-accent-light text-dark font-bold"
              onClick={() => {
                saveSet()
                props.stopSession()
              }}
            >
              End Session
            </button>
          </div>
          <div>
            <Chessboard puzzle={puzzle} moveCheck={moveCheck} />
          </div>
        </div>
      )}
    </div>
  )
}
