import { HeartIcon } from '@heroicons/react/solid'
import Layout from '../components/Layout'
import { useUser } from '../lib/hooks'

const tactics = () => {
  const user = useUser({ redirectTo: '/login' })
  return (
    <div>
      <Layout name="Tactics">
        <div className="flex flex-col p-4 md:p-6 lg:p-12 space-y-2 text-lg text-dark">
          <h1 className="text-4xl font-bold text-primary">Tactics</h1>
          <div className="space-y-1 pb-6">
            <p>Train tactics using the WoodPecker method - Coming Soon</p>
          </div>
        </div>
      </Layout>
    </div>
  )
}

export default tactics
