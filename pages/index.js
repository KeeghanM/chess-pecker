import Layout from '../components/Layout'
import Link from 'next/link'

export default function Home() {
  return (
    <Layout name="Home">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-items-stretch p-4 md:p-6 lg:p-12">
        <div className="hover:bg-accent-light border-b-2 md:border-2 border-primary hover:cursor-pointer shadow-lg rounded-2xl bg-light">
          <Link href="/about">
            <div className="p-6 md:p-8 lg:p-10 space-y-4">
              <h1 className="text-4xl font-bold text-primary">
                ChessTraining.app
              </h1>
              <p className="text-xl font-bold">
                Are you ready to bring your chess to the next level?
              </p>
              <p className="text-xl font-bold">
                Use our powerful training tools, backed by science and Grand
                Master training methods, to shape up your chess and bring in the
                wins!
              </p>
            </div>
          </Link>
        </div>
        <div className="hover:bg-accent-light border-b-2 md:border-2 border-dark hover:cursor-pointer shadow-lg rounded-2xl bg-light">
          <Link href="/knights">
            <div className="p-6 md:p-8 lg:p-10 space-y-2">
              <h1 className="text-4xl font-bold">Knight Vision</h1>
              <p>
                Whether you are a beginner, intermediate, or even experienced
                player - board vision is <i>crucial</i> to the game of Chess.
              </p>
              <p>
                We have devised a very simple method of improving your board
                vision through the use of knights.
              </p>
              <p>
                Simply put, race against the clock to calculate the fastest way
                a knight can get to a given square. Rack up a streak and try to
                beat your own high score.
              </p>
            </div>
          </Link>
        </div>
        <div className="hover:bg-accent-light border-b-2 md:border-2 border-dark hover:cursor-pointer shadow-lg rounded-2xl bg-light">
          <Link href="/visualise">
            <div className="p-6 md:p-8 lg:p-10 space-y-2">
              <h1 className="text-4xl font-bold">
                Visualisation & Calculation
              </h1>
              <p>
                Do you struggle to see past two or three moves? Find long
                calculations difficult? So did we.
              </p>
              <p>
                With our visualisation trainer you are presented with a board
                position, and a list of moves at the end of which will be a
                simple tactic.
              </p>
              <p>
                All you need to do is play the given sequence of moves in your
                head, decide on your final move and then check if you were
                correct.
              </p>
            </div>
          </Link>
        </div>
        <div className="hover:bg-accent-light border-b-2 md:border-2 border-dark hover:cursor-pointer shadow-lg rounded-2xl bg-light">
          <Link href="/tactics">
            <div className="p-6 md:p-8 lg:p-10 space-y-2">
              <h1 className="text-4xl font-bold">
                Tactics Training - <i>Coming Soon</i>
              </h1>
              <p>
                Train tactics using the WoodPecker Method developed by GM's Axel
                Smith, and Hans Tikkanen.
              </p>
              <p>
                The quick explanation of the Woodpecker Method is that you need
                to solve a large number of puzzles in a row; then solve the same
                puzzles again and again, only faster.
              </p>
              <p>
                It’s not a lazy shortcut to success – hard work is required.
              </p>
              <p>
                But the reward can be re-programming your unconscious mind.
                Benefits include sharper tactical vision, fewer blunders, better
                play when in time trouble and improved intuition.
              </p>
            </div>
          </Link>
        </div>
      </div>
    </Layout>
  )
}
