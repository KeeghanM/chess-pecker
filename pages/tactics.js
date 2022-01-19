import Layout from '../components/Layout'
import { useState, useContext } from 'react'
import { UserContext } from '../lib/context'
import LoginForm from '../components/LoginForm'
import PuzzleSetList from '../components/PuzzleSetList'
import TacticsChess from '../components/TacticsChess'

const tactics = () => {
  const { user } = useContext(UserContext)
  const [puzzleSetId, setpuzzleSetId] = useState(null)

  return (
    <div>
      <Layout name="Tactics">
        <div className="p-6 md:p-12 lg:p-16 flex flex-col space-y-6 lg:flex-row lg:space-x-12 lg:space-y-0">
          <div className="space-y-4 lg:w-1/3">
            <h1 className="text-4xl font-bold text-primary">
              Tactics Training
            </h1>
            <p>
              Train tactics using the WoodPecker Method developed by GM's Axel
              Smith, and Hans Tikkanen.
            </p>
            <p>
              The Woodpecker Method is based on solving a large set of puzzles;
              then solving the same puzzles again and again, only faster.
            </p>
            <p>
              The puzzles should be difficult but not impossible, in the 3-7
              minute range to solve. Not 30 seconds.
            </p>
            <p>
              By repeating the set over and over, you will get faster and more
              accurate. However this isn't simple memorisation! Rather, you
              internalise and bake into your subconscious the core ideas and
              patterns.
            </p>
          </div>
          <div className="space-y-4 lg:w-1/3">
            <h2 className="text-4xl font-bold text-accent-dark">Our Trainer</h2>
            <p>
              Using our tool, you can build a set of between 200-500 puzzles.
              Each one tailored to your chess rating.
            </p>
            <p>
              We will automatically track the time spent on each puzzle, and the
              overall set. As well as your accuracy throughout your training.
            </p>
            <p>
              This means all the admin work required in the WoodPecker method of
              tracking your work is taken care of for you - you just focus on
              solving puzzles.
            </p>
            <p>
              Remember, these puzzles should be difficult to solve. For best
              results, break your practice into 30-60 minute sessions once a
              day. Your first time through a puzzle set should take 1-2 weeks.
            </p>
          </div>
          <div className="min-w-fit max-w-md lg:w-1/3">
            {!user ? (
              <LoginForm redirect="/tactics" />
            ) : !puzzleSetId ? (
              <PuzzleSetList
                onSelect={(id) => {
                  setpuzzleSetId(id)
                }}
              />
            ) : (
              <TacticsChess setId={puzzleSetId} />
            )}
          </div>
        </div>
      </Layout>
    </div>
  )
}

export default tactics
