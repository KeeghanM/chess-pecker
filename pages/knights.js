import { HeartIcon } from '@heroicons/react/solid'
import Layout from '../components/Layout'
import Chessboard from "../components/Chessboard"

function knights() {
  return (
    <div>
      <Layout name="Knight Vision">
        <div className="flex flex-col p-4 md:p-6 lg:p-12 space-y-2 text-lg text-dark">
          <h1 className="text-4xl font-bold text-primary">Knight Vision</h1>
          <div className="space-y-1 pb-6">
            <p>Coming Soon</p>
          </div>
            <Chessboard />
        </div>
      </Layout>
    </div>
  )
}

export default knights
