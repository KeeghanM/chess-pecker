import Layout from '../components/Layout'
import { useRouter } from 'next/router'
import { auth, googleAuthProvider } from '../lib/firebase'
import { signInWithPopup } from 'firebase/auth'

export default function Login(props) {
  const router = useRouter()
  const user = null
  const username = null
  // 1. user signed out, <SignInForm />
  // 2. user signed in, but missing username <UsernameForm />
  // 3. user signed in, has username => Redirect to Profile
  return (
    <Layout noCTA name="Login">
      <section className="py-20 2xl:py-40 overflow-hidden">
        <div className="container px-4 mx-auto">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-wrap items-center -mx-10">
              {user ? (
                !username ? (
                  <UsernameForm />
                ) : (
                  router.push('/profile')
                )
              ) : (
                <SignInForm />
              )}
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

function SignInForm() {
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleAuthProvider).then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result)
        const token = credential.accessToken
        // The signed-in user info.
        const user = result.user
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="w-full lg:w-1/2 px-10">
      <div className="px-6 lg:px-20 pt-12 lg:pt-20 bg-dark text-light shadow-2xl rounded-lg">
        <button onClick={signInWithGoogle}>Sign in with Google</button>
      </div>
    </div>
  )
}

function UsernameForm() {
  return null
}
