import Link from 'next/link'
import Logo from './Logo'
import {
  HomeIcon,
  LightningBoltIcon,
  EyeIcon,
  PuzzleIcon,
} from '@heroicons/react/solid'

const Header = (props) => (
  <div>
    <section className="py-8 px-4 lg:px-10 bg-dark">
      <nav className="relative flex justify-between items-center">
        <Logo text />
        <div className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
          <ul className="flex items-center text-light font-bold text-lg space-x-10">
            <li className="hover:text-accent-light flex items-center space-x-2">
              <HomeIcon className="w-5 h-5" />
              <Link href="/">Home</Link>
            </li>
            <span>|</span>
            <li className="hover:text-accent-light flex items-center space-x-2">
              <PuzzleIcon className="w-5 h-5" />
              <Link href="/tactics">Tactics</Link>
            </li>
            <span>|</span>
            <li className="hover:text-accent-light flex items-center space-x-2">
              <EyeIcon className="w-5 h-5" />
              <Link href="/visualise">Calculation</Link>
            </li>
            <span>|</span>
            <li className="hover:text-accent-light flex items-center space-x-2">
              <LightningBoltIcon className="w-5 h-5" />
              <Link href="/knights">Knight Vision</Link>
            </li>
          </ul>
        </div>
        <div>
          <button style={{display: props.noCTA?"none":"inline-block"}} className="inline-block py-2 px-4 text-light font-bold bg-primary hover:bg-accent-light hover:text-dark rounded-full transition duration-200">
            <Link href="/login">
              Log In / Sign Up
            </Link>
          </button>
        </div>
      </nav>
    </section>
  </div>
)

export default Header
