import { signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { auth, firestore } from "../../lib/firebase"
import { useRouter } from "next/router"
import { setDoc, doc } from "firebase/firestore"

export default function LoginForm(props) {
  return (
    <div className="px-6 lg:px-20 py-12 lg:py-20 bg-dark text-light shadow-2xl rounded-lg space-y-6">
      <p className="text-4xl font-bold text-primary">Account Registration</p>
      <GoogleSignInButton redirect={props.redirect} />
    </div>
  )
}

function GoogleSignInButton(props) {
  const router = useRouter()
  const provider = new GoogleAuthProvider()
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const userRef = doc(firestore, "users", result.user.uid)
        setDoc(userRef, {}, { merge: true })
        router.push(props.redirect)
      })
      .catch((error) => {
        console.log(error.message)
      })
  }

  return (
    <button onClick={signInWithGoogle}>
      <div className="flex flex-row items-center p-2 bg-white rounded-md text-dark pr-6 space-x-2">
        <img src="/g-logo.png" width="50px" height="50px" alt="Google Logo" />
        <p>Sign in with Google</p>
      </div>
    </button>
  )
}
