import { EyeIcon, LightningBoltIcon, PuzzleIcon } from "@heroicons/react/solid";
import Link from "next/link";
import Layout from "../components/Layout";

export default function Home() {
  return (
    <Layout name="ChessPecker">
      <section className="py-20 2xl:py-40 overflow-hidden"><div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center text-dark">
            <h2 className="my-8 text-6xl lg:text-7xl font-bold font-heading">Improve Your Chess</h2>
            <p className="mb-14 text-lg">Train with scientifically backed methods to improve your chess  tactics, pattern recognition, and deep calculation skills</p>
            <button className="inline-block py-4 px-12 text-light font-bold bg-primary hover:bg-accent-light hover:text-dark rounded-full transition duration-200">
              <Link href="/login">Sign Up Now</Link>
            </button>
          </div>
        </div>
      </section>
        
      <section className="relative py-20 2xl:py-40 bg-dark overflow-hidden text-light"><div className="absolute h-40 w-40 bg-primary bottom-0 right-0 -mr-20 -mb-20 rounded-full"></div>
        <div className="container px-4 mx-auto pb-10">
          <h1 className="text-light text-4xl">What can you train here?</h1>
        </div>
        <div className="container px-4 mx-auto">
          <div>
            <div className="flex flex-wrap -mx-6 lg:-mx-8 items-center">
            <div className="w-full md:w-1/2 lg:w-1/4 px-6 lg:px-8 mb-20 lg:mb-0">
                <span className="flex mb-10 justify-center items-center w-20 h-20 bg-blue-500 rounded-lg">
                  <PuzzleIcon className="h-10 w-10" />
                </span>
                <div className="pb-px mb-12 bg-accent-dark"></div>
                <h3 className="mt-12 mb-8 text-lg font-bold font-heading">Train using the WoodPecker Method</h3>
                <div className="text-lg space-y-5">
                  <p>
                    The quick explanation of the Woodpecker Method is that you need to solve a large number of puzzles in a row; then solve the same puzzles again and again, only faster.
                  </p>
                  <p>
                    It's not a lazy shortcut to success - hard work is required. But the reward can be re-programming your unconscious mind.
                  </p>
                  <p>
                    Benefits include sharper tactical vision, fewer blunders, better play when in time trouble and improved intuition.
                  </p>
                  <div>
                    <button class="inline-block py-2 px-4 text-light font-bold bg-primary hover:bg-accent-light hover:text-dark rounded-full transition duration-200">
                      <Link href="/tactics">
                        Train Tactics
                      </Link>
                    </button>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-1/2 lg:w-1/4 px-6 lg:px-8 mb-20 lg:mb-0">
                <span className="flex mb-10 justify-center items-center w-20 h-20 bg-green-500 rounded-lg">
                  <EyeIcon className="h-10 w-10" />
                </span>
                <div className="pb-px mb-12 bg-accent-dark"></div>
                <h3 className="mt-12 mb-8 text-lg font-bold font-heading">Improve calculation through Visualisation</h3>
                <div className="text-lg space-y-5">
                  <p>
                    Do you struggle to see past two or three moves? Find long calculations difficult? So did we.
                  </p>
                  <p>
                    With our visualisation trainer you are presented with a board position, and a list of moves at the end of which will be a simple tactic. 
                  </p>
                  <p>
                    All you need to do is play the given sequence of moves in your head, decide on your final move and then check if you were correct.
                  </p>
                  <div>
                    <button class="inline-block py-2 px-4 text-light font-bold bg-primary hover:bg-accent-light hover:text-dark rounded-full transition duration-200">
                      <Link href="/visualisation">
                        Improve Visualisation
                      </Link>
                    </button>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-1/2 lg:w-1/4 px-6 lg:px-8 mb-20 lg:mb-0">
                <span className="flex mb-10 justify-center items-center w-20 h-20 bg-pink-500 rounded-lg">
                  <LightningBoltIcon className="h-10 w-10" />
                </span>
                <div className="pb-px mb-12 bg-accent-dark"></div>
                <h3 className="mt-12 mb-8 text-lg font-bold font-heading">Knight Vision</h3>
                <div className="text-lg space-y-5">
                  <p>
                    Beginners often struggle with Knights, as their movement can be complicated
                  </p>
                  <p>
                    We have devised a very simple method of quickly improving your ability to see knight moves, routes, and tactics.
                  </p>
                  <p>
                    SImply put, you have to calculate the fastest way a knight can get to a given square. The difficulty can ramp up with other pieces involved.
                  </p>
                  <div>
                    <button class="inline-block py-2 px-4 text-light font-bold bg-primary hover:bg-accent-light hover:text-dark rounded-full transition duration-200">
                      <Link href="/knights">
                        Gain Knight Vision
                      </Link>
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
