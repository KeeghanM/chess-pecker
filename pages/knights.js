import { HeartIcon } from '@heroicons/react/solid'
import Layout from '../components/Layout'

function knights() {
  return (
    <div>
      <Layout name="Knight Vision">
        <div className="flex flex-col p-4 md:p-6 lg:p-12 space-y-2">
          <h1 className="text-4xl font-bold text-primary">
            About ChessTraining.app
          </h1>
          <div className="space-y-1 pb-6">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate
              excepturi consequuntur aliquam porro amet eveniet accusamus velit
              impedit esse nostrum fugit sint possimus laudantium
              necessitatibus, molestias nam dolore vel eaque?
            </p>
          </div>
        </div>
      </Layout>
    </div>
  )
}

export default knights
