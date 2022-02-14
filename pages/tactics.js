import Layout from "../components/layout/Layout"
import { useState, useContext } from "react"
import { UserContext } from "../lib/context"
import LoginForm from "../components/login/LoginForm"
import PuzzleSetList from "../components/tactics/PuzzleSetList"
import TacticsChess from "../components/tactics/TacticsChess"
import HeroBanner from "../components/utils/HeroBanner"
import ContentBlock from "../components/utils/ContentBlock"

const tactics = () => {
  const { user } = useContext(UserContext)
  const [puzzleSetId, setpuzzleSetId] = useState(null)

  return (
    <div>
      <Layout name="Tactics">
        {puzzleSetId ? (
          <TacticsChess
            setId={puzzleSetId}
            stopSession={() => {
              setpuzzleSetId(null)
            }}
          />
        ) : (
          <>
            <HeroBanner
              title="Tactics Training"
              image="/chessBackground.jpg"
              imgHeight="450px"
              cta="Start Now ↓"
              target="#start"
            >
              <p className="max-w-xl text-lg py-2 mx-auto">
                Train tactics using the WoodPecker Method developed by GM's Axel
                Smith, and Hans Tikkanen.
              </p>
            </HeroBanner>

            <>
              <ContentBlock title="What is the Woodpecker Method" color="black">
                <p>
                  The Woodpecker Method is based on solving a large set of
                  puzzles; then solving the same puzzles again and again, only
                  faster.
                </p>
                <p>
                  The puzzles should be difficult but not impossible, in the 3-7
                  minute range to solve. Not 30 seconds.
                </p>
                <p>
                  By repeating the set over and over, you will get faster and
                  more accurate. However this isn't simple memorisation! Rather,
                  you internalise and bake into your subconscious the core ideas
                  and patterns.
                </p>
              </ContentBlock>
              <ContentBlock title="How our tool works" color="dark">
                <p>
                  Using our tool, you can build a set of between 200-500
                  puzzles. Each one tailored to your chess rating.
                </p>
                <p>
                  We will automatically track the time spent on each puzzle, and
                  the overall set. As well as your accuracy throughout your
                  training.
                </p>
                <p>
                  This means all the admin work required in the WoodPecker
                  method of tracking your work is taken care of for you - you
                  just focus on solving puzzles.
                </p>
                <p>
                  Remember, these puzzles should be difficult to solve. For best
                  results, break your practice into 30-60 minute sessions once a
                  day. Your first time through a puzzle set should take 1-2
                  weeks.
                </p>
              </ContentBlock>
              <ContentBlock title="Your Training Sets" color="black">
                <a id="start"></a>
                {!user ? (
                  <LoginForm redirect="/tactics" />
                ) : (
                  !puzzleSetId && (
                    <PuzzleSetList
                      onSelect={(id) => {
                        setpuzzleSetId(id)
                      }}
                    />
                  )
                )}
              </ContentBlock>
            </>
          </>
        )}
      </Layout>
    </div>
  )
}

export default tactics
