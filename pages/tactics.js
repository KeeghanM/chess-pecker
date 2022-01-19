import Layout from '../components/Layout'
import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../lib/context'
import LoginForm from '../components/LoginForm'


const tactics = () => {
  const { user } = useContext(UserContext)

  return (
    <div>
      <Layout name="Tactics">
        <div className="flex flex-col lg:flex-row space-y-12 p-4 md:p-6 lg:p-12 text-lg text-dark">
          <div className="space-y-4 lg:w-1/3">
            <h1 className="text-4xl font-bold text-primary">
              Tactics Training
            </h1>
            <div>
              Train tactics using the WoodPecker Method developed by GM's Axel
              Smith, and Hans Tikkanen.
            </div>
          </div>
          <div className="lg:pl-12">
            <div className="w-2/3 lg:w-1/3 align-middle m-auto lg:m-0">
              <LoginForm redirect='/tactics' />
            </div>
          </div>
        </div>
      </Layout>
    </div>
  )
}

export default tactics
