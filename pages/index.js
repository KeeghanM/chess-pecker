import { EyeIcon, LightningBoltIcon, PuzzleIcon } from '@heroicons/react/solid'
import Layout from '../components/Layout'
import { Tab } from '@headlessui/react'
import Link from 'next/link'

export default function Home() {
  return (
    <Layout name="Home">
      <div className="flex flex-col lg:flex-row px-20">
        <div className="lg:w-1/2">
          <h1 className="text-4xl font-bold">ChessTraining.app</h1>
          <p>Are you ready to bring your chess to the next level?</p>
          <p>
            Use our powerful training tools, backed by science and Grand Master
            training methods, to shape up your chess and bring in the wins!
          </p>
        </div>
        <div className="lg:w-1/2"></div>
      </div>
    </Layout>
  )
}
