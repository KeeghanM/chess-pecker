import { EyeIcon, LightningBoltIcon, PuzzleIcon } from "@heroicons/react/solid";
import Layout from "../components/Layout";
import { Tab } from '@headlessui/react'
import Link from 'next/link'


export default function Home() {
  return (
    <Layout name="ChessPecker">
      <div className="flex flex-col lg:flex-row px-20">
        <div className="lg:w-1/2">
          <h1 className="text-4xl font-bold">
            ChessTraining.app
          </h1>
          <p>
            Are you ready to bring your chess to the next level?
          </p>
          <p>
            Use our powerful training tools, backed by science and Grand Master training methods, to shape up your chess and bring in the wins!
          </p>
        </div>
        <div className="lg:w-1/2">
          <Tab.Group>
            <Tab.List className="flex items-center text-dark text-sm lg:text-xl">
              <Tab className={({ selected }) => (selected ? 'bg-accent-dark ' : 'bg-light hover:text-accent-dark ') + 'flex items-center space-x-1 py-2 px-3 lg:px-6 rounded-l-lg'}>
                <PuzzleIcon className="w-5 h-5" />
                <span>WoodPecker Tactics</span>
              </Tab>
              <Tab className={({ selected }) => (selected ? 'bg-accent-dark ' : 'bg-light hover:text-accent-dark ') + 'flex items-center space-x-1  py-2 px-3 lg:px-6'}>
                <EyeIcon className="w-5 h-5" />
                <span>Calculation & Visualisation</span>
              </Tab>
              <Tab className={({ selected }) => (selected ? 'bg-accent-dark ' : 'bg-light hover:text-accent-dark ') + 'flex items-center space-x-1  py-2 px-3 lg:px-6 rounded-r-lg'}>
                <LightningBoltIcon className="w-5 h-5" />
                <span>Knight Vision</span>
              </Tab>
            </Tab.List>
            <Tab.Panels className="p-6">
              <Tab.Panel>
                <p>
                  Train tactics using the WoodPecker Method developed by GM's Axel Smith, and Hans Tikkanen.
                </p>
                <p>
                  The quick explanation of the Woodpecker Method is that you need to solve a large number of puzzles in a row; then solve the same puzzles again and again, only faster.
                </p> 
                <p>
                  It’s not a lazy shortcut to success – hard work is required.
                </p>
                <p>
                  But the reward can be re-programming your unconscious mind. Benefits include sharper tactical vision, fewer blunders, better play when in time trouble and improved intuition.
                </p>
                <p>
                  <Link href="/login">
                    <button>Let's Go</button>
                  </Link>
                </p>
              </Tab.Panel>
              <Tab.Panel>
                <p>Do you struggle to see past two or three moves? Find long calculations difficult? So did we.</p> 
                <p>With our visualisation trainer you are presented with a board position, and a list of moves at the end of which will be a simple tactic.</p>
                <p>All you need to do is play the given sequence of moves in your head, decide on your final move and then check if you were correct.</p>
              </Tab.Panel>
              <Tab.Panel>
                <p>Beginners often struggle with Knights, as their movement can be complicated</p>
                <p>We have devised a very simple method of quickly improving your ability to see knight moves, routes, and tactics.</p>
                <p>SImply put, you have to calculate the fastest way a knight can get to a given square. The difficulty can ramp up with other pieces involved.</p>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </Layout>
  )
}
