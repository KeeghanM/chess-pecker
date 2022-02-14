import { useState, useContext, useEffect } from "react"
import { UserContext } from "../../lib/context"
import { firestore } from "../../lib/firebase"
import {
  collection,
  getDocs,
  addDoc,
  Timestamp,
  doc,
  deleteDoc,
} from "firebase/firestore"
import CreateSetForm from "./CreateSetForm"

export default function PuzzleSetList(props) {
  const { user } = useContext(UserContext)
  const [puzzleSetList, setpuzzleSetList] = useState([])
  useEffect(() => {
    getSetList()
  }, [])

  function getSetList() {
    let setList = []
    getDocs(collection(firestore, "users", user.uid, "tactics-sets")).then(
      (docs) => {
        docs.forEach((doc) => {
          setList.push({ id: doc.id, set: doc.data() })
        })
        for (let set of setList) {
          if (
            set.set.rounds.length < 8 &&
            set.set.rounds[set.set.rounds.length - 1].completed ==
              set.set.setSize
          ) {
            set.set.rounds.push({ completed: 0, correct: 0, timeSpent: 0 })
          }
        }
        setpuzzleSetList(setList)
        localStorage.setItem("tactics-set-list", JSON.stringify(setList))
      }
    )
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

    addDoc(collection(firestore, "users", user.uid, "tactics-sets"), set).then(
      (doc) => {
        let newSetList = [...puzzleSetList, { id: doc.id, set }]
        localStorage.setItem("tactics-set-list", JSON.stringify(newSetList))
        setpuzzleSetList(newSetList)
      }
    )
  }

  function deleteSet(set) {
    let id = set.id
    let name = set.set.setName
    var result = prompt('Type set name "' + name + '" to confirm deletion')

    if (result == name) {
      let saved = JSON.parse(localStorage.getItem("tactics-set-list"))
      let cleared = saved.filter((set) => {
        return set.id != id
      })
      setpuzzleSetList(cleared)

      localStorage.setItem("tactics-set-list", JSON.stringify(cleared))
      deleteDoc(doc(firestore, "users", user.uid, "tactics-sets", id))
    }
  }

  return (
    <div>
      {puzzleSetList.length < 3 && (
        <div>
          <CreateSetForm saveSet={createSet} />
        </div>
      )}
      <div className="overflow-y-auto max-h-[500px]">
        {puzzleSetList.map((set, index) => {
          return (
            <SetListItem
              set={set.set}
              key={index}
              onSelect={() => props.onSelect(set.id)}
              onDelete={() => deleteSet(set)}
            />
          )
        })}
      </div>
    </div>
  )
}

function SetListItem(props) {
  let set = props.set
  return (
    <div className="p-2 rounded-lg my-2 bg-dark text-light">
      <p className="text-lg font-bold">
        {set.setName} - {set.rounds.length}/8
      </p>
      <p>
        Finished {set.rounds[set.rounds.length - 1].completed} of {set.setSize}{" "}
        puzzles (
        {percentOf(
          set.rounds[set.rounds.length - 1].correct,
          set.rounds[set.rounds.length - 1].completed
        )}{" "}
        Accuracy)
      </p>
      <p>
        Round Time: {secondsToTime(set.rounds[set.rounds.length - 1].timeSpent)}
      </p>
      <div className="flex flex-row justify-between">
        <button
          onClick={props.onSelect}
          className="py-2 px-4 rounded bg-accent-dark hover:bg-accent-light text-dark font-bold"
        >
          Train Set
        </button>
        <button
          onClick={props.onDelete}
          className="py-2 px-2 rounded bg-danger hover:bg-accent-light text-dark font-bold text-xs"
        >
          Delete
        </button>
      </div>
    </div>
  )
}

function secondsToTime(seconds) {
  let time = new Date(1000 * seconds).toISOString().substr(11, 8)
  return time
}

function percentOf(a, b) {
  // if (b == 0) return '100%'
  if (a == 0 || b == 0) return "0%"

  let p = Math.round((a / b) * 100)
  return p + "%"
}
