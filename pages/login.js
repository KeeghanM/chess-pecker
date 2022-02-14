import Layout from "../components/layout/Layout"
import LoginForm from "../components/login/LoginForm"

const Login = () => {
  return (
    <Layout noCTA name="Login">
      <section className="py-20 text-dark bg-accent-light min-h-screen">
        <div className="container px-4 mx-auto">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-wrap items-center">
              <div className="w-full lg:w-1/2 px-10">
                <LoginForm redirect={"/profile"} />
              </div>
              <div className="w-full lg:w-1/2 px-10 mb-16 lg:mb-0 order-first lg:order-last">
                <div className="max-w-md">
                  <h2 className="mt-8 mb-12 text-5xl font-bold">
                    Log in or create an account to start improving your chess
                    today
                  </h2>
                  <p className="text-xl pb-2">
                    Our main features are always free. Forever.
                  </p>
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
