import LoginForm from "../components/LoginForm"
import Layout from "../components/Layout";

function Login() {
    return (
        <Layout>
            <section class="py-20 2xl:py-40 overflow-hidden"><div class="container px-4 mx-auto">
            <div class="max-w-5xl mx-auto">
                <div class="flex flex-wrap items-center -mx-10">
                  <LoginForm />
                  <div class="w-full lg:w-1/2 px-10 mb-16 lg:mb-0 order-first lg:order-last">
                    <div class="max-w-md">
                    <h2 class="mt-8 mb-12 text-5xl font-bold font-heading">Log in or create an account to start improving your chess today</h2>
                    <p className="text-xl pb-2 text-accent-dark">Our main features are always free. Forever.</p>
                    <p className="text-lg">If you want to maintain multiple Tactics sets, we offer that for a small subscription fee (this helps fuel our coffee addiction, and keep the servers running)</p>
                    </div>
                  </div>
                </div>
            </div>
            
            </div>
            </section>
        </Layout>
    )
}

export default Login
