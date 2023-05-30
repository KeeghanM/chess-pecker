// pages/_app.js
import "../styles/globals.css"
import { UserContext } from "../lib/context"
import { useUserData } from "../lib/hooks"
import { useEffect } from "react"

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const userData = useUserData()

  return (
    <UserContext.Provider value={userData}>
      <div className="font-serif">
        <Component {...pageProps} />
      </div>
    </UserContext.Provider>
  )
}
