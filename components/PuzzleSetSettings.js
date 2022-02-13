import { Dialog } from '@headlessui/react'
import { useState, useContext } from 'react'
import { UserContext } from '../lib/context'
import { CogIcon } from '@heroicons/react/solid'
import { firestore } from '../lib/firebase'
import { doc, deleteDoc } from 'firebase/firestore'

export default function PuzzleSetSettings(props) {
  const { user } = useContext(UserContext)
  const [dialogOpen, setDialogOpen] = useState(false)
  let set = JSON.parse(localStorage.getItem('tactics-set-list')).filter(
    (set) => {
      return set.id == props.setId
    }
  )[0]
  let prevRounds = []

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
            <p>Current Round: {set.set.rounds.length}/8</p>
            <p>Previous Round Stats:</p>
            <div>{prevRounds}</div>
            <div className="flex flex-row space-x-2 pt-3">
              <button className="py-2 px-4 rounded text-dark bg-accent-dark hover:bg-primary font-bold">
                Export Set
              </button>
              <button
                className="py-2 px-4 rounded text-dark bg-accent-dark hover:bg-primary font-bold"
                onClick={() => renameSet(set, user, props.updateList)}
              >
                Rename Set
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

function renameSet(set, user) {
  var result = prompt('Type the new set name:')

  if (result) {
    let id = set.id
    let saved = JSON.parse(localStorage.getItem('tactics-set-list'))
  }
}

function deleteSet(set, user, updateList) {
  let id = set.id
  let name = set.set.setName
  var result = prompt('Type set name "' + name + '" to confirm deletion')

  if (result.toLocaleLowerCase() == name.toLocaleLowerCase()) {
    let saved = JSON.parse(localStorage.getItem('tactics-set-list'))
    let cleared = saved.filter((set) => {
      return set.id != id
    })
    updateList(cleared)

    localStorage.setItem('tactics-set-list', JSON.stringify(cleared))
    deleteDoc(doc(firestore, 'users', user.uid, 'tactics-sets', id))
  } else {
    alert('Incorrect Name')
  }
}
