import { useState, useContext } from 'react'
import { UserContext } from '../lib/context'
import { firestore } from '../lib/firebase'
import { collection, getDocs } from 'firebase/firestore'
import CreateSetForm from './CreateSetForm'

export default function PuzzleSetList(props) {
  const { user } = useContext(UserContext)
  const [puzzleSetList, setpuzzleSetList] = useState(getSetList())

  function getSetList() {
    let setList = JSON.parse(localStorage.getItem('tactics-set-list')) || []
    if (setList.length === 0) {
      getDocs(collection(firestore, 'users', user.uid, 'tactics-sets')).then(
        (docs) => (setList = docs || [])
      )
    }
    localStorage.setItem('tactics-set-list', JSON.stringify(setList))

    let outputList = []
    setList.map((set, index) => {
      outputList.push(
        <SetListItem set={set} key={index} onSelect={props.onSelect} />
      )
    })
    return outputList
  }

  function addToSetList(setId) {}
  function removeFromSetList(setId) {}

  function saveSet(set) {
    console.log(set)
  }

  return (
    <div>
      <h2 className="text-4xl font-bold text-accent-dark">
        Your Training Sets
      </h2>
      <div>{puzzleSetList}</div>
      <div>
        <CreateSetForm saveSet={saveSet} />
      </div>
    </div>
  )
}

function SetListItem(props) {
  let set = props.set
  return (
    <div>
      <p>{set.name}</p>
      <p>Contains {set.puzzleCount} puzzles</p>
      <p>
        {set.percentComplete}% through round {set.roundNumber}/8
      </p>
      <button onClick={props.onSelect}>Train Set</button>
    </div>
  )
}
