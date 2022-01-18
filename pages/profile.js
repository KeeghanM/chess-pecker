import { Tab } from '@headlessui/react'
import Layout from '../components/Layout'
import { useContext } from 'react'
import { UserContext } from '../lib/context'
import { setDoc, doc } from 'firebase/firestore'
import { firestore } from '../lib/firebase'

const profile = () => {
  const { user } = useContext(UserContext)
  let selectedDifficulty = user ? user.puzzleDifficulty : 1

  function saveDetails(e) {
    e.preventDefault()
    let form = e.target
    // TODO: Validate and secure form values
    let newDetails = {
      displayName: form.displayName.value,
      email: form.email.value,
      chessRating: form.chessRating.value,
      puzzleDifficulty: selectedDifficulty,
    }
    // Ship the details off to Firebase
    const userRef = doc(firestore, 'users', user.uid)
    setDoc(userRef, newDetails, { merge: true }).then(() => {
      // TODO: Handle the saving
    })
  }

  return (
    <div>
      <Layout name="Profile">
        <div className="flex flex-col items-center p-6 text-lg text-dark">
          {!user ? (
            <p>You must be signed in to view your profile</p>
          ) : (
            <form onSubmit={saveDetails} className="w-full max-w-sm">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold text-primary">
                  Personal Details
                </h1>
                <div className="md:flex md:items-center">
                  <div className="md:w-1/3">
                    <label
                      className="block font-bold md:text-right mb-1 md:mb-0 pr-4"
                      htmlFor="displayName"
                    >
                      Display Name
                    </label>
                  </div>
                  <div className="md:w-2/3">
                    <input
                      className="bg-gray-200 appearance-none border-2 border-accent-light rounded w-full py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-primary"
                      id="displayName"
                      type="text"
                      defaultValue={user.displayName}
                    />
                  </div>
                </div>
                <div className="md:flex md:items-center">
                  <div className="md:w-1/3">
                    <label
                      className="block font-bold md:text-right mb-1 md:mb-0 pr-4"
                      htmlFor="email"
                    >
                      Email
                    </label>
                  </div>
                  <div className="md:w-2/3">
                    <input
                      className="bg-gray-200 appearance-none border-2 border-accent-light rounded w-full py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-primary"
                      id="email"
                      type="email"
                      defaultValue={user.email}
                    />
                  </div>
                </div>
              </div>
              <div className="pt-6">
                <h1 className="text-4xl font-bold text-primary">
                  Chess Details
                </h1>
                <div className="md:flex md:items-center">
                  <div className="md:w-1/3">
                    <label
                      className="block font-bold md:text-right mb-1 md:mb-0 pr-4"
                      htmlFor="chessRating"
                    >
                      Chess Rating
                    </label>
                  </div>
                  <div className="md:w-2/3">
                    <input
                      className="bg-gray-200 appearance-none border-2 border-accent-light rounded w-full py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-primary"
                      id="chessRating"
                      type="number"
                      defaultValue={user.chessRating}
                    />
                  </div>
                </div>
                <div className="md:flex md:items-center">
                  <div className="md:w-1/3">
                    <label
                      className="block font-bold md:text-right mb-1 md:mb-0 pr-4"
                      htmlFor="puzzleDifficulty"
                    >
                      Default Puzzle Difficulty
                    </label>
                  </div>
                  <Tab.Group
                    className="md:w-2/3"
                    id="puzzleDifficulty"
                    defaultIndex={selectedDifficulty}
                    onChange={(index) => {
                      selectedDifficulty = index
                    }}
                  >
                    <Tab.List className="space-x-2">
                      <Tab
                        className={({ selected }) =>
                          (selected
                            ? ' border-primary bg-white  '
                            : ' border-accent-light bg-gray-200 ') +
                          'appearance-none border-2 border-r-0 rounded-r-none rounded w-1/3 py-2 leading-tight focus:outline-none focus:border-primary'
                        }
                      >
                        Easy
                      </Tab>
                      <Tab
                        className={({ selected }) =>
                          (selected
                            ? ' border-primary bg-white '
                            : ' border-accent-light bg-gray-200 ') +
                          'appearance-none border-y-2 rounded-y w-1/3 py-2 leading-tight focus:outline-none focus:border-primary'
                        }
                      >
                        Medium
                      </Tab>
                      <Tab
                        className={({ selected }) =>
                          (selected
                            ? ' border-primary bg-white '
                            : ' border-accent-light bg-gray-200 ') +
                          'appearance-none border-2 border-l-0 rounded-l-none rounded w-1/3 py-2 leading-tight focus:outline-none focus:border-primary'
                        }
                      >
                        Hard
                      </Tab>
                    </Tab.List>
                  </Tab.Group>
                </div>
              </div>
              <div className="pt-6">
                <button
                  type="submit"
                  className="inline-block w-full py-2 px-12 text-light font-bold bg-primary hover:bg-accent-light hover:text-dark rounded-full transition duration-200"
                >
                  Save
                </button>
              </div>
            </form>
          )}
        </div>
      </Layout>
    </div>
  )
}

export default profile
