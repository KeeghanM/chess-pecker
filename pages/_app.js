// pages/_app.js
import '../styles/globals.css'
import { UserContext } from '../lib/context'
import { useUserData } from '../lib/hooks'

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const userData = useUserData() // { user: { name: 'Keeghan', rating: 1850 } }
  return (
    <UserContext.Provider value={userData}>
      <Component {...pageProps} />
    </UserContext.Provider>
  )
}
