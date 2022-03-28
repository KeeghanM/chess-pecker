import { useState, useContext } from "react"
import { XCircleIcon } from "@heroicons/react/outline"
import { UserContext } from "../../lib/context"
import Spinner from "../utils/Spinner"
import { Dialog } from "@headlessui/react"

export default function ImportSet() {
  const { user } = useContext(UserContext)
  const [dialogOpen, setDialogOpen] = useState(false)

  function loadFile() {
    alert()
  }

  return (
    <>
      <button
        onClick={() => setDialogOpen(true)}
        className="px-4 py-2 bg-accent-light text-dark hover:bg-primary hover:text-light transition duration-200"
      >
        Import Set
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
            <form
              method="post"
              action="/api/setUpload"
              encType="multipart/form-data"
              className="flex flex-row gap-2"
            >
              <input name="setFile" type="file" accept=".json" />
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-light hover:bg-accent-dark transition duration-200"
              >
                Import
              </button>
            </form>
          </div>
        </div>
      </Dialog>
    </>
  )
}
