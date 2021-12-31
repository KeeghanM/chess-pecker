import LoginForm from "../components/LoginForm"
import Layout from "../components/Layout";
import { useState } from 'react'
import Router from 'next/router'
import { useUser } from '../lib/hooks'
import { Magic } from 'magic-sdk'

const Login = () => {
  useUser({ redirectTo: '/', redirectIfFound: true })

  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()

    if (errorMsg) setErrorMsg('')

    const body = {
      email: e.currentTarget.email.value,
    }

    try {
      const magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_PUB_KEY)
      const didToken = await magic.auth.loginWithMagicLink({
        email: body.email,
      })
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + didToken,
        },
        body: JSON.stringify(body),
      })
      if (res.status === 200) {
        Router.push('/')
      } else {
        throw new Error(await res.text())
      }
    } catch (error) {
      console.error('An unexpected error happened occurred:', error)
      setErrorMsg(error.message)
    }
  }

  return (
      <Layout noCTA>
          <section class="py-20 2xl:py-40 overflow-hidden"><div class="container px-4 mx-auto">
          <div class="max-w-5xl mx-auto">
              <div class="flex flex-wrap items-center -mx-10">
                <LoginForm errorMessage={errorMsg} onSubmit={handleSubmit} />
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
