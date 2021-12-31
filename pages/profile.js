import { HeartIcon } from "@heroicons/react/solid"
import Layout from "../components/Layout"
import { useUser } from "../lib/hooks"

const profile = () => {
    const user = useUser({ redirectTo: '/login' })

    return (
        <div>
            <Layout>
            Profile of user {user && (<p>{user.email}</p>)}
            </Layout>
        </div>
    )
}

export default profile