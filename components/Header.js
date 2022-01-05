import Link from 'next/link'
import Logo from './Logo'
import { ArrowCircleLeftIcon } from '@heroicons/react/solid'
import { useUser } from '../lib/hooks'

const Header = (props) => {
  const user = useUser()
  return (
    <div>
      <section className="py-8 px-4 lg:px-10 bg-dark">
        <nav className="flex flex-row justify-between items-center space-x-2">
          <div className="flex flex-row items-center space-x-4 md:space-x-10">
            <div>
              <Logo text={props.name} />
            </div>
            <Link href="/">
              <div className="text-light text-2xl md:text-4xl font-bold flex items-center space-x-2">
                <ArrowCircleLeftIcon className="w-5 h-5 md:w-10 md:h-10" />
                <p>Back</p>
              </div>
            </Link>
          </div>
          <div className="">
            {!props.noCTA && !user && (
              <button className="inline-block text-sm md:text-lg py-1 px-2 md:py-2 md:px-4 text-light font-bold bg-primary hover:bg-accent-light hover:text-dark rounded-full transition duration-200">
                <Link href="/login">Log In / Sign Up</Link>
              </button>
            )}
            {user && (
              <button className="inline-block text-sm md:text-lg py-1 px-2 md:py-2 md:px-4 text-light font-bold bg-primary hover:bg-accent-light hover:text-dark rounded-full transition duration-200">
                <a href="/api/logout">Log Out</a>
              </button>
            )}
          </div>
        </nav>
      </section>
    </div>
  )
}

export default Header
