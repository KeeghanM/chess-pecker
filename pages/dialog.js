import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import Image from 'next/image'

function dialog() {
  let [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <div className="">
        <button onClick={() => setIsOpen(true)}>Open Dialog</button>
      </div>
      <Dialog
        open={isOpen}
        onClose={() => {
          setIsOpen(false)
        }}
        className="fixed z-10 inset-0 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          <div className="relative bg-white rounded max-w-sm mx-auto p-3 space-x-2">
            <button onClick={() => promotion('q')}>
              <Image src="/chessPieces/wQ.svg" width="50px" height="50px" />
            </button>
            <button onClick={() => promotion('r')}>
              <Image src="/chessPieces/wR.svg" width="50px" height="50px" />
            </button>
            <button onClick={() => promotion('b')}>
              <Image src="/chessPieces/wB.svg" width="50px" height="50px" />
            </button>
            <button onClick={() => promotion('n')}>
              <Image src="/chessPieces/wN.svg" width="50px" height="50px" />
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  )
}
export default dialog
