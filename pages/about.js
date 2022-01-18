import Image from 'next/image'
import Layout from '../components/Layout'

function about() {
  return (
    <div>
      <Layout name="About">
        <div className="flex flex-col p-4 md:p-6 lg:p-12 space-y-2 text-lg text-dark">
          <h1 className="text-4xl font-bold text-primary">
            About ChessTraining.app
          </h1>
          <div className="space-y-1 pb-6">
            <p>
              <span className="font-bold">ChessTraining.app</span> is designed
              to be a super easy to use, but incredibly <i>powerful</i> training
              tool to improve your chess.
            </p>
            <p>
              When{' '}
              <a className="group font-bold text-accent-dark underline hover:text-primary">
                I (Keeghan)
                <div className="absolute hidden group-visited:block group-hover:block border-4 border-primary w-[240px] h-[240px] rounded-2xl overflow-hidden">
                  <Image
                    priority
                    src="/keeghan.jpg"
                    width="240px"
                    height="240px"
                  />
                </div>
              </a>{' '}
              started working on this site, I focused on building tools that:
            </p>
            <ul className="list-disc pl-8">
              <li>I personally needed in my chess journery</li>
              <li>I would be happy to use on a daily basis</li>
              <li>Didn't have equivalents elsewhere online</li>
            </ul>
          </div>
          <div>
            <p>
              As a huge fan of (and big relier on) OpenSource projects my aim is
              to always offer{' '}
              <span className="font-bold">ChessTraining.app</span> for free.
              However, there are overheads to running websites like this,
              namely:
              <ul className="list-disc pl-8">
                <li>Website Hosting</li>
                <li>Domain Registration</li>
                <li>Database Storage</li>
              </ul>
            </p>
            <p>
              Some of which I am happy to front myself (remember, I use this
              website myself every day). Some I recoup through offering publicly
              the{' '}
              <a
                href="https://rapidapi.com/KeeghanM/api/chess-puzzles/details"
                target="_blank"
                className="text-accent-dark font-bold hover:text-primary underline"
              >
                Puzzle API
              </a>{' '}
              which I developed for this site (although that too has a free
              tier).
            </p>
            <p>
              However, most of the costs are covered by the <i>incredibly</i>{' '}
              generous donations of you, the users.
            </p>
            <p>
              If you would like to donate to the site, you can{' '}
              <a
                href="https://www.buymeacoffee.com/KeeghanM"
                target="_blank"
                className="text-accent-dark font-bold hover:text-primary underline"
              >
                do so here
              </a>
              .
            </p>
          </div>
        </div>
      </Layout>
    </div>
  )
}

export default about
