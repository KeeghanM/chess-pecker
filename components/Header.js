import Link from 'next/link'
import Logo from './Logo'
import { ArrowCircleLeftIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'

const Header = (props) => {
  const router = useRouter()
  return (
    <div>
      <section className="py-8 px-4 lg:px-10 bg-dark">
        <nav className="flex flex-row justify-between items-center space-x-2">
          <div className="flex flex-row items-center space-x-4 md:space-x-10">
            <div>
              <Logo text={props.name} />
            </div>
            <div style={{ display: router.pathname == '/' ? 'none' : 'block' }}>
              <Link href="/">
                <div className="text-light hover:text-primary hover:cursor-pointer text-2xl md:text-4xl font-bold flex items-center space-x-2">
                  <ArrowCircleLeftIcon className="w-5 h-5 md:w-10 md:h-10" />
                  <p>Back</p>
                </div>
              </Link>
            </div>
          </div>
        </nav>
      </section>
    </div>
  )
}

export default Header
