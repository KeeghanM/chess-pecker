import { Dialog } from "@headlessui/react"
import { useState, useContext } from "react"
import { UserContext } from "../../lib/context"
import { CogIcon } from "@heroicons/react/solid"
import { firestore } from "../../lib/firebase"
import { doc, deleteDoc, setDoc } from "firebase/firestore"
import { saveAs } from "file-saver"

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
    roundStats.push(<p key={i}>{set.set.rounds[i].completed}</p>)
  }
  return (
    <>
      <button
        className="text-light hover:text-primary"
        onClick={() => setDialogOpen(true)}
      >
        <CogIcon className="w-5 h-5" />
      </button>
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        className="fixed z-10 inset-0 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

          <div className="relative bg-white rounded px-12 py-6 space-x-2 max-w-lg mx-auto">
            <div className="w-full flex flex-row justify-end left-[-5px] top-[5px] absolute">
              <button
                className="rounded text-xl font-bold text-dark p-2 hover:bg-accent-light text-center bg-accent-dark"
                onClick={() => {
                  setDialogOpen(false)
                }}
              >
                X
              </button>
            </div>
            <h3 className="text-lg text-primary font-bold">
              {set.set.setName}
            </h3>
            <div>{roundStats}</div>
            <div className="flex flex-row space-x-2 pt-3">
              <button
                className="py-2 px-4 rounded text-dark bg-accent-dark hover:bg-primary font-bold"
                onClick={() => renameSet(set, user, props.updateList)}
              >
                Rename Set
              </button>
              <button
                className="py-2 px-4 rounded text-dark bg-accent-dark hover:bg-primary font-bold"
                onClick={() => exportSet(set)}
              >
                Export Set
              </button>
              <button
                className="py-2 px-4 rounded text-dark bg-danger hover:bg-accent-light font-bold"
                onClick={() => deleteSet(set, user, props.updateList)}
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
