import Head from 'next/head'
import Center from './Center'
import Footer from './Footer'
import Header from './Header'

const Layout = (props) => (
  <>
    <Head>
      <title>ChessPecker</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <div className="flex flex-col h-screen justify-between overflow-x-hidden">
        <Header />

        <Center>{props.children}</Center>

        <Footer />  
    </div>  
  </>
)

export default Layout
