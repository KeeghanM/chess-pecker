// pages/_app.js
import '../styles/globals.css'
import { UserContext } from '../lib/context'
import { useUserData } from '../lib/hooks'
import { useEffect } from 'react'
import { hotjar } from 'react-hotjar'

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const userData = useUserData()

  useEffect(() => {
    hotjar.initialize(2807495, 6)
  }, [])

  return (
    <UserContext.Provider value={userData}>
      <Component {...pageProps} />
    </UserContext.Provider>
  )
}
