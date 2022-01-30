import { Dialog } from '@headlessui/react'
import { useState, useContext } from 'react'
import { UserContext } from '../lib/context'
import { CogIcon } from '@heroicons/react/solid'

export default function PuzzleSetSettings(props) {
  const { user } = useContext(UserContext)
  const [dialogOpen, setDialogOpen] = useState(false)
  let set = JSON.parse(localStorage.getItem('tactics-set-list')).filter(
    (set) => {
      return set.id == props.setId
    }
  )[0]

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
            <h3 className="text-lg text-primary font-bold">
              {set.set.setName}
            </h3>
            <p>Current Round: </p>
            <p>Previous Round Stats:</p>
            <p>Delete Set</p>
            <p>Export Set</p>
            <p>Rename Set</p>
          </div>
        </div>
      </Dialog>
    </>
  )
}
