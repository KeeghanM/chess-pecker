import { useState, useContext, useEffect } from "react"
import { UserContext } from "../../lib/context"
import { firestore } from "../../lib/firebase"
import { collection, getDocs, addDoc, Timestamp } from "firebase/firestore"
import CreateSetForm from "./CreateSetForm"
import SetListItem from "./PuzzleSetListItem"

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

  return (
    <div>
      <div className="overflow-y-auto max-h-[500px]">
        {puzzleSetList.map((set, index) => {
          return (
            <SetListItem
              set={set}
              key={index}
              onSelect={() => props.onSelect(set.id)}
              updateList={setpuzzleSetList}
            />
          )
        })}
      </div>
      {puzzleSetList.length < 3 && (
        <div className="mt-6">
          <CreateSetForm saveSet={createSet} />
        </div>
      )}
    </div>
  )
}
