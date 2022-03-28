import { useState, useContext } from "react"
import { XCircleIcon } from "@heroicons/react/outline"
import { UserContext } from "../../lib/context"
import Spinner from "../utils/Spinner"
import { Dialog } from "@headlessui/react"
import axios from "axios"

export default function ImportSet() {
  const { user } = useContext(UserContext)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [loading, setloading] = useState(false)
  const [errorMessage, seterrorMessage] = useState(null)

  function loadFile(e) {
    e.preventDefault()
    setloading(true)
    seterrorMessage(null)

    let formData = new FormData(e.target)

    fetch("/api/setUpload", { method: "POST", body: formData })
      .then((res) => {
        if (res.status == 200) {
          console.log(res.data)
        } else {
          res.text().then((t) => seterrorMessage(t))
        }
        setloading(false)
      })
      .catch((err) => {
        setloading(false)
        seterrorMessage(err.message)
      })
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
              onSubmit={loadFile}
              className="flex flex-row gap-2"
              encType="multipart/form-data"
            >
              <input name="setFile" type="file" accept=".json" required />
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-light hover:bg-accent-dark transition duration-200"
              >
                Import
              </button>
            </form>

            {loading && <Spinner text="Processing set, please be patient..." />}
            {errorMessage && (
              <p className="text-danger mt-2">
                {errorMessage} - Please fix and try again
              </p>
            )}
          </div>
        </div>
      </Dialog>
    </>
  )
}
