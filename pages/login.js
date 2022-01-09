import Layout from '../components/Layout'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { auth } from '../lib/firebase'
import Image from 'next/image'
import { useRouter } from 'next/router'

const Login = () => {
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
                  <GoogleSignInButton />
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

export default Login

function GoogleSignInButton() {
  const router = useRouter()
  const provider = new GoogleAuthProvider()
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // Successful login! Go to profile page
        router.push('/profile')
      })
      .catch((error) => {
        console.log(error)
      })
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
