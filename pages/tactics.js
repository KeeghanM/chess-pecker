import { HeartIcon } from '@heroicons/react/solid'
import Layout from '../components/Layout'
import { useUser } from '../lib/hooks'

const tactics = () => {
  const user = useUser({ redirectTo: '/login' })
  return (
    <div>
      <Layout name="Tactics">
        Tactics <HeartIcon className="w-5 h-5" />
      </Layout>
    </div>
  )
}

export default tactics
