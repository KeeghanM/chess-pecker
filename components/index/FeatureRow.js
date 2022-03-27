import FeatureCard from "./FeatureCard"

export default function FeatureRow() {
  return (
    <section className="lg:px-12 z-20 flex flex-col lg:flex-row justify-center items-center lg:items-start w-full gap-12 relative">
      <FeatureCard title="Tactics Training" cta="Train Now" target="/tactics">
        <p>
          Train tactics using the WoodPecker Method developed by GM's Axel
          Smith, and Hans Tikkanen.
        </p>
        <p>
          Re-program your unconscious mind. With benefits including sharper
          tactical vision, fewer blunders, and better play when in time trouble
          as well as improved intuition.
        </p>
        <p>
          Generate puzzle sets and train on them, while the site takes care of
          tracking your accuracy & time spent.
        </p>
      </FeatureCard>
      <FeatureCard title="Endgame Practice" cta="Train Now" target="/endgames">
        <p>
          Fundamental to the game of chess, endgames are an area of chess which
          many players neglect in their training.
        </p>
        <p>
          Not as exciting as openings, not as sexy as middlegame tactics, but
          arguably much more important than either.
        </p>
        <p>
          Pick from Queen, Rook, Knight, Bishop, or Pawn endgames. Or let fate
          decide.
        </p>
      </FeatureCard>
      <FeatureCard
        title="Visualisation & Calculation"
        cta="Train Now"
        target="/visualise"
      >
        <p>
          Do you struggle to see past two or three moves? Find long calculations
          difficult? So did we.
        </p>
        <p>
          With our visualisation trainer you are presented with a board
          position, and a list of moves at the end of which will be a simple
          tactic.
        </p>
        <p>
          All you need to do is play the given sequence of moves in your head,
          decide on your final move and then check if you were correct.
        </p>
      </FeatureCard>
      <FeatureCard title="Knight Vision" cta="Train Now" target="/knights">
        <p>
          Whether you are a beginner, intermediate, or even experienced player -
          board vision is <i>crucial</i> to the game of Chess.
        </p>
        <p>
          We have devised a very simple method of improving your board vision
          through the use of knights.
        </p>
        <p>
          Simply put, race against the clock to calculate the fastest way a
          knight can get to a given square. Rack up a streak and try to beat
          your own high score.
        </p>
      </FeatureCard>
    </section>
  )
}
