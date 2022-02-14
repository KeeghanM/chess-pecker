import { Dialog } from "@headlessui/react"
import { useState, useContext } from "react"
import { UserContext } from "../../lib/context"
import { XCircleIcon } from "@heroicons/react/outline"
import { firestore } from "../../lib/firebase"
import { doc, deleteDoc, setDoc } from "firebase/firestore"
import { saveAs } from "file-saver"
import { percentOf, secondsToTime } from "../../lib/utils"

export default function PuzzleSetSettings(props) {
  const { user } = useContext(UserContext)
  const [dialogOpen, setDialogOpen] = useState(false)
  let set = JSON.parse(localStorage.getItem("tactics-set-list")).filter(
    (set) => {
      return set.id == props.setId
    }
  )[0]

  let roundStats = []
  for (let i = set.set.rounds.length - 1; i >= 0; i--) {
    roundStats.push(
      <div key={i} className="border-b-4 border-primary py-4">
        <h4 className="text-lg font-bold">Round #{i + 1}</h4>
        <p>
          Completed: {set.set.rounds[i].completed}/{set.set.setSize}
        </p>
        <div className="flex gap-2">
          <p>
            Correct: {set.set.rounds[i].correct}/{set.set.rounds[i].completed}
          </p>
          <p>
            ({percentOf(set.set.rounds[i].correct, set.set.rounds[i].completed)}{" "}
            Accuracy)
          </p>
        </div>
        <p>Round Time: {secondsToTime(set.set.rounds[i].timeSpent)}</p>
      </div>
    )
  }
  return (
    <>
      <button
        className="px-4 py-2 bg-accent-light text-dark hover:bg-primary hover:text-light transition duration-200"
        onClick={() => setDialogOpen(true)}
      >
        Settings
      </button>
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        className="fixed z-10 inset-0 overflow-y-auto font-serif"
      >
        <div className="flex items-center justify-center min-h-screen">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-80" />

          <div className="relative bg-white px-24 py-12 mx-auto">
            <div className="w-full flex flex-row justify-end left-[-50px] md:left-[-5px] top-[5px] absolute">
              <button
                className="text-dark hover:text-primary"
                onClick={() => {
                  setDialogOpen(false)
                }}
              >
                <XCircleIcon className="w-10 h-10" />
              </button>
            </div>
            <h3 className="text-3xl text-primary font-bold">
              {set.set.setName}
            </h3>
            <div className="max-h-[500px] overflow-y-auto">{roundStats}</div>
            <div className="flex flex-row space-x-2 pt-3">
              <button
                className="px-4 py-2 bg-accent-light text-dark hover:bg-primary hover:text-light transition duration-200"
                onClick={() => renameSet(set, user, props.updateList)}
              >
                Rename Set
              </button>
              <button
                className="px-4 py-2 bg-accent-light text-dark hover:bg-primary hover:text-light transition duration-200"
                onClick={() => exportSet(set)}
              >
                Export Set
              </button>
              <button
                className="px-4 py-2 bg-[red] text-dark hover:bg-primary hover:text-light transition duration-200"
                onClick={() => {
                  deleteSet(set, user, props.updateList)
                  setDialogOpen(false)
                }}
              >
                Delete Set
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  )
}

function renameSet(set, user, updateList) {
  var result = prompt("Type the new set name:")

  if (result) {
    let id = set.id
    set.set.setName = result
    let saved = JSON.parse(localStorage.getItem("tactics-set-list"))
    let updated = saved.map((savedSet) => {
      if (savedSet.id === id) {
        savedSet = set
      }
      return savedSet
    })
    updateList(updated)

    localStorage.setItem("tactics-set-list", JSON.stringify(updated))
    setDoc(doc(firestore, "users", user.uid, "tactics-sets", id), set.set)
  }
}

function deleteSet(set, user, updateList) {
  let id = set.id
  let name = set.set.setName
  var result = prompt('Type set name "' + name + '" to confirm deletion')

  if (result.toLocaleLowerCase() == name.toLocaleLowerCase()) {
    let saved = JSON.parse(localStorage.getItem("tactics-set-list"))
    let cleared = saved.filter((set) => {
      return set.id != id
    })
    updateList(cleared)

    localStorage.setItem("tactics-set-list", JSON.stringify(cleared))
    deleteDoc(doc(firestore, "users", user.uid, "tactics-sets", id))
  } else {
    alert("Incorrect Name")
  }
}

function exportSet(set) {
  let orderedPuzzles = []

  for (let pzl of set.set.puzzles) {
    orderedPuzzles.push(
      Object.keys(pzl)
        .sort()
        .reduce(function (result, key) {
          result[key] = pzl[key]
          return result
        }, {})
    )
  }

  let exportStr = JSON.stringify(
    {
      setName: set.set.setName,
      puzzles: orderedPuzzles,
    },
    null,
    2
  )
  let fileName = set.set.setName
    .trim()
    .toLowerCase()
    .replace(/([^A-Z0-9]+)(.)/gi, function (match) {
      return arguments[2].toUpperCase()
    })
  var blob = new Blob([exportStr], { type: "text/plain;charset=utf-8" })
  saveAs(blob, fileName + "_chessTrainingApp.json")
}
