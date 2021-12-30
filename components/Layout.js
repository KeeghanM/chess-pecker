import Head from 'next/head'
import Center from './Center'
import Sidebar from './Sidebar'

const Layout = (props) => (
  <>
    <Head>
      <title>ChessPecker</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <div className="h-screen overflow-hidden bg-light text-dark">
      <main className='flex'>
        <Sidebar />
        <Center name={props.name}>{props.children}</Center>
      </main> 
    </div>

    
  </>
)

export default Layout
