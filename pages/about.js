import { HeartIcon } from '@heroicons/react/solid'
import Layout from '../components/Layout'

function about() {
  return (
    <div>
      <Layout name="About">
        About Us <HeartIcon className="w-5 h-5" />
      </Layout>
    </div>
  )
}

export default about
