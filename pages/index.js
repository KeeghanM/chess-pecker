import Layout from "../components/layout/Layout"
import FeatureRow from "../components/index/FeatureRow"
import HeroBanner from "../components/utils/HeroBanner"
import ContentBlock from "../components/utils/ContentBlock"
import Image from "next/image"
import { useContext } from "react"
import { UserContext } from "../lib/context"

export default function Home() {
  const { user } = useContext(UserContext)
  return (
    <Layout name="Home">
      <HeroBanner
        title="ChessTraining.app"
        image="/chessBackground.jpg"
        cta={!user ? "Sign Up Now" : false}
        target="/login"
      >
        <p className="max-w-md font-bold pb-12 mx-auto">
          Are you ready to bring your chess to the next level?
        </p>
        <p className="max-w-md text-lg italic pb-12 mx-auto">
          Use our powerful training tools, backed by science and Grand Master
          training methods, to shape up your chess and bring in the wins!
        </p>
      </HeroBanner>
      <FeatureRow />
      <ContentBlock title="About Us" color="dark">
        <div className="mb-6 space-y-1">
          <p>
            <span className="font-bold">ChessTraining.app</span> is designed to
            be a super easy to use, but incredibly <i>powerful</i> training tool
            to improve your chess.
          </p>
          <p>
            When{" "}
            <a className="group hover:text-accent-dark text-accent-light underline">
              I (Keeghan)
              <span className="hidden absolute group-visited:block group-hover:block ">
                <Image
                  priority
                  src="/keeghan.jpg"
                  width="240px"
                  height="240px"
                />
              </span>
            </a>{" "}
            started working on this site, I focused on building tools that:
          </p>
          <ul className="list-disc pl-8">
            <li>I personally needed in my chess journery</li>
            <li>I would be happy to use on a daily basis</li>
            <li>Didn't have equivalents elsewhere online</li>
          </ul>
        </div>
        <div className="mb-6 space-y-1">
          <p>
            As a huge fan of (and big relier on) OpenSource projects my aim is
            to always offer <span className="font-bold">ChessTraining.app</span>{" "}
            for free. However, there are overheads to running websites like
            this, namely:
          </p>
          <ul className="list-disc pl-8">
            <li>Website Hosting</li>
            <li>Domain Registration</li>
            <li>Database Storage</li>
          </ul>
        </div>
        <div className="mb-6 space-y-1">
          <p>
            Some of which I am happy to front myself (remember, I use this
            website myself every day). Some I recoup through offering publicly
            the{" "}
            <a
              href="https://rapidapi.com/KeeghanM/api/chess-puzzles/details"
              target="_blank"
              className="hover:text-accent-dark text-accent-light underline"
            >
              Puzzle API
            </a>{" "}
            which I developed for this site (although that too has a free tier).
          </p>
          <p>
            However, most of the costs are covered by the <i>incredibly</i>{" "}
            generous donations of you, the users.
          </p>
        </div>
        <div>
          <p>
            If you would like to donate to the site, you can{" "}
            <a
              href="https://www.buymeacoffee.com/KeeghanM"
              target="_blank"
              className="hover:text-accent-dark text-accent-light underline"
            >
              do so here
            </a>
            .
          </p>
        </div>
      </ContentBlock>
    </Layout>
  )
}
