import Head from "next/head"
import Footer from "./Footer"
import Header from "./Header"

const Layout = (props) => (
  <div>
    <Head>
      <title>ChessTraining.app - {props.name}</title>
      <link rel="icon" href="/favicon.ico" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="true"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,700;1,300&display=swap"
        rel="stylesheet"
      />
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7394948634783516"
        crossorigin="anonymous"
      ></script>
    </Head>
    <div className="flex flex-col h-screen overflow-x-hidden bg-black">
      <Header noCTA={props.noCTA} name={props.name} />
      <div>{props.children}</div>
      <Footer />
    </div>
  </div>
)

export default Layout
