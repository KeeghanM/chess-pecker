import { useState, useEffect } from 'react'
import Chessboard from './TacticsChessboard'

export default function TacticsChess(props) {
  const [currentSet, setcurrentSet] = useState(() => {
    let setList = JSON.parse(localStorage.getItem('tactics-set-list'))
    return setList.find((set) => {
      return set.id == props.setId
    })
  })
  const [puzzle, setpuzzle] = useState(null)
  useEffect(() => {
    // console.log(currentSet)
    let round = currentSet.set.rounds[currentSet.set.rounds.length - 1]
    changePuzzle(round.completed)
  }, [currentSet])

  function changePuzzle(i) {
    setpuzzle(currentSet.set.puzzles[i])
  }

  function moveCheck(from, to, promotion, moveIndex) {
    let move = from + to + (promotion || '')
    // console.log({ puzzle, move })

    if (move == puzzle.moves[moveIndex]) {
      // console.log('CORRECT')
      return true
    } else {
      console.log('WRONG')
      return false
    }
  }

  return (
    <div>{puzzle && <Chessboard puzzle={puzzle} moveCheck={moveCheck} />}</div>
  )
}
