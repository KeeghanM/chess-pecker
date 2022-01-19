import { useState, useContext, useEffect } from 'react'
import { UserContext } from '../lib/context'
import { firestore } from '../lib/firebase'
import { collection, getDocs, addDoc, Timestamp } from 'firebase/firestore'
import CreateSetForm from './CreateSetForm'

export default function PuzzleSetList(props) {
  const { user } = useContext(UserContext)
  const [puzzleSetList, setpuzzleSetList] = useState([])
  useEffect(() => {
    getSetList()
  }, [])

  function getSetList() {
    let setList = JSON.parse(localStorage.getItem('tactics-set-list')) || []
    if (setList.length === 0) {
      getDocs(collection(firestore, 'users', user.uid, 'tactics-sets')).then(
        (docs) => {
          docs.forEach((doc) => {
            setList.push({ id: doc.id, set: doc.data() })
          })
          localStorage.setItem('tactics-set-list', JSON.stringify(setList))
          setpuzzleSetList(setList)
        }
      )
    } else {
      setpuzzleSetList(setList)
    }
  }

  function createSet(props) {
    let set = {
      setName: props.name,
      setSize: props.puzzles.length,
      creationDate: Timestamp.fromDate(new Date()),
      rounds: [
        {
          completed: 0,
          correct: 0,
          timeSpent: 0,
        },
      ],
      puzzles: props.puzzles,
    }

    addDoc(collection(firestore, 'users', user.uid, 'tactics-sets'), set).then(
      (doc) => {
        let newSetList = [...puzzleSetList, { id: doc.id, set }]
        localStorage.setItem('tactics-set-list', JSON.stringify(newSetList))
        setpuzzleSetList(newSetList)
      }
    )
  }

  return (
    <div>
      <h2 className="text-4xl font-bold text-accent-dark">
        Your Training Sets
      </h2>
      <div>
        {puzzleSetList.map((set, index) => {
          return (
            <SetListItem set={set.set} key={index} onSelect={props.onSelect} />
          )
        })}
      </div>
      <div>
        <CreateSetForm saveSet={createSet} />
      </div>
    </div>
  )
}

function SetListItem(props) {
  let set = props.set
  return (
    <div>
      <p>{set.setName}</p>
      <p>Contains {set.setSize} puzzles</p>
      <p>
        {set.rounds[set.rounds.length - 1].completed / set.setSize}% through
        round {set.rounds.length}/8
      </p>
      <p>Current Round Time: {set.rounds[set.rounds.length - 1].timeSpent}</p>
      <p>
        Current Round Accuracy: {set.rounds[set.rounds.length - 1].correct}/
        {set.rounds[set.rounds.length - 1].completed} correct
      </p>
      <button onClick={props.onSelect}>Train Set</button>
    </div>
  )
}
