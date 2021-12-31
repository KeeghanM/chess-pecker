import { HeartIcon } from "@heroicons/react/solid"
import Layout from "../components/Layout"

function knights() {
    return (
        <div>
            <Layout>
            Knights <HeartIcon className="w-5 h-5" />
            </Layout>
        </div>
    )
}

export default knights