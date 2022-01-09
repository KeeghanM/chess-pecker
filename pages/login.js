import Layout from '../components/Layout'
import { useRouter } from 'next/router'
import { auth, googleAuthProvider, firestore } from '../lib/firebase'
import { doc, getDoc, writeBatch } from 'firebase/firestore'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { useEffect, useState, useCallback, useContext } from 'react'
import { UserContext } from '../lib/context'
import Image from 'next/image'
import debounce from 'lodash.debounce'

export default function Login(props) {
  const router = useRouter()
  const { user, username } = useContext(UserContext)

  // 1. user signed out, <SignInButtons />
  // 2. user signed in, but missing username <UsernameForm />
  // 3. user signed in, has username => Redirect to Profile
  return (
    <Layout noCTA name="Login">
      <section className="py-20 2xl:py-40 overflow-hidden">
        <div className="container px-4 mx-auto">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-wrap items-center -mx-10">
              <div className="w-full lg:w-1/2 px-10">
                <div className="px-6 lg:px-20 py-12 lg:py-20 bg-dark text-light shadow-2xl rounded-lg space-y-6">
                  <p className="text-4xl font-bold text-primary">
                    Account Registration
                  </p>
                  {user ? (
                    !username ? (
                      <UsernameForm />
                    ) : (
                      router.push('/profile')
                    )
                  ) : (
                    <SignInButtons />
                  )}
                </div>
              </div>
              <div className="w-full lg:w-1/2 px-10 mb-16 lg:mb-0 order-first lg:order-last">
                <div className="max-w-md">
                  <h2 className="mt-8 mb-12 text-5xl font-bold font-heading">
                    Log in or create an account to start improving your chess
                    today
                  </h2>
                  <p className="text-xl pb-2 text-primary font-bold">
                    Our main features are always free. Forever.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

function SignInButtons() {
  const signInWithGoogle = async () => {
    await signInWithPopup(auth, googleAuthProvider)
  }

  return (
    <button onClick={signInWithGoogle}>
      <div className="flex flex-row items-center p-2 bg-white rounded-md text-dark pr-6 space-x-2">
        <Image src="/g-logo.png" width="50px" height="50px" alt="Google Logo" />
        <p>Sign in with Google</p>
      </div>
    </button>
  )
}

function UsernameForm() {
  const [formValue, setFormValue] = useState('')
  const [isValid, setIsValid] = useState(false)
  const [loading, setLoading] = useState(false)

  const { user, username } = useContext(UserContext)

  const onSubmit = async (e) => {
    e.preventDefault()

    // Create refs for both documents
    const userDoc = doc(firestore, 'users', user.uid)
    const usernameDoc = doc(firestore, 'usernames', formValue)

    // Commit both docs together as a batch write.
    const batch = (batch = writeBatch(firestore))
    batch.set(userDoc, {
      username: formValue,
      chessRating: 1500,
      puzzleDifficulty: 1,
      firstName: '',
      lastName: '',
    })
    batch.set(usernameDoc, { uid: user.uid })

    await batch.commit()
  }

  const onChange = (e) => {
    // Force form value typed in form to match correct format
    const val = e.target.value //.toLowerCase()
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/

    // Only set form value if length is < 3 OR it passes regex
    if (val.length < 3) {
      setFormValue(val)
      setLoading(false)
      setIsValid(false)
    }

    if (re.test(val)) {
      setFormValue(val)
      setLoading(true)
      setIsValid(false)
    }
  }

  //

  useEffect(() => {
    checkUsername(formValue)
  }, [formValue])

  // Hit the database for username match after each debounced change
  // useCallback is required for debounce to work
  const checkUsername = useCallback(
    debounce(async (username) => {
      if (username.length >= 3) {
        const docRef = doc(firestore, 'usernames', username)
        const docSnap = await getDoc(docRef)
        console.log('Firestore read executed!')
        setIsValid(!docSnap.exists())
        setLoading(false)
      }
    }, 500),
    []
  )

  return (
    !username && (
      <form onSubmit={onSubmit} className="w-full max-w-sm">
        <div className="md:flex md:items-center">
          <div className="md:w-1/3">
            <label
              className="block font-bold md:text-right mb-1 md:mb-0 pr-4"
              for="username"
            >
              Username
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="text-dark bg-gray-200 appearance-none border-2 border-accent-light rounded w-full py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-primary"
              name="username"
              placeholder="JoeBloggs"
              value={formValue}
              onChange={onChange}
            />
            <div className="pt-2 text-md">
              <UsernameMessage
                username={formValue}
                isValid={isValid}
                loading={loading}
              />
            </div>
          </div>
        </div>
        <div className="pt-6">
          <button
            type="submit"
            className="inline-block w-full py-2 px-12 text-light font-bold bg-primary hover:bg-accent-light hover:text-dark rounded-full transition duration-200"
            disabled={!isValid}
          >
            Choose
          </button>
        </div>
      </form>
    )
  )
}

function UsernameMessage({ username, isValid, loading }) {
  if (loading) {
    return <p>Checking...</p>
  } else if (isValid) {
    return <p className="text-success">{username} is available!</p>
  } else if (username && !isValid) {
    if (username.length < 3) {
      return <p className="text-danger">That username is too short!</p>
    } else {
      return <p className="text-danger">That username is taken!</p>
    }
  } else {
    return <p></p>
  }
}
