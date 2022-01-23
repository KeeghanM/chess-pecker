import { useState, useContext, useEffect } from 'react'
import { UserContext } from '../lib/context'
import Chessboard from './TacticsChessboard'
import { firestore } from '../lib/firebase'
import { doc, setDoc } from 'firebase/firestore'
import useSound from 'use-sound'

export default function TacticsChess(props) {
  const [playCorrect] = useSound('/sounds/correct.mp3', { volume: 0.25 })
  const [playIncorrect] = useSound('/sounds/incorrect.mp3', { volume: 0.25 })

  let startTime = Date.now()

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
    console.log({ player: move, actual: puzzle.moves[moveIndex] })
    if (move == puzzle.moves[moveIndex]) {
      playCorrect()
      if (moveIndex != puzzle.moves.length - 1) return true
      currentSet.set.rounds[currentSet.set.rounds.length - 1].correct += 1
    } else {
      playIncorrect()
    }

    let currentTime = Date.now()
    let dif = (currentTime - startTime) / 1000

    currentSet.set.rounds[currentSet.set.rounds.length - 1].completed += 1
    currentSet.set.rounds[currentSet.set.rounds.length - 1].timeSpent += dif
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
    <div>{puzzle && <Chessboard puzzle={puzzle} moveCheck={moveCheck} />}</div>
  )
}
