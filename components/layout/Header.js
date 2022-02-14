import Link from "next/link"
import Logo from "../utils/Logo"
import { ArrowCircleLeftIcon, CogIcon } from "@heroicons/react/solid"
import { useRouter } from "next/router"
import { useContext } from "react"
import { UserContext } from "../../lib/context"
import { auth } from "../../lib/firebase"

const Header = (props) => {
  const { user } = useContext(UserContext)
  const router = useRouter()

  function signOutNow() {
    auth.signOut()
    if (router.pathname == "/profile") router.push("/")
  }

  return (
    <div>
      <section className="py-2 bg-dark flex justify-center">
        <nav className="flex flex-row items-center w-full lg:max-w-[800px]">
          <div
            className="basis-1/2 md:basis-1/3 flex justify-center"
            style={{
              visibility: router.pathname == "/" ? "hidden" : "visible",
            }}
          >
            <Link href="/">
              <div className="text-light hover:text-primary hover:cursor-pointer text-xl font-bold flex items-center space-x-2">
                <ArrowCircleLeftIcon className="w-5 h-5" />
                <p>Back</p>
              </div>
            </Link>
          </div>
          <div className="basis-1/2 justify-center hidden md:flex">
            <Logo />
          </div>
          <div className="basis-1/2 md:basis-1/3 flex justify-center">
            {!props.noCTA && !user && (
              <Link href="/login">
                <button className="px-4 py-2 bg-primary text-light hover:bg-accent-light hover:text-dark transition duration-200">
                  Log In / Sign Up
                </button>
              </Link>
            )}
            {user && (
              <div className="flex flex-col">
                <div className="text-light pb-2 flex flex-row items-center space-x-2">
                  <div className="transition-all duration-200">
                    Welcome {user.displayName}
                  </div>

                  <Link href="/profile">
                    <div>
                      <CogIcon className="w-5 h-5 hover:cursor-pointer hover:text-primary transition duration-200" />
                    </div>
                  </Link>
                </div>

                <button
                  onClick={signOutNow}
                  className="px-4 py-2 bg-primary text-light hover:bg-accent-light hover:text-dark transition duration-200"
                >
                  Log Out
                </button>
              </div>
            )}
          </div>
        </nav>
      </section>
    </div>
  )
}

export default Header
