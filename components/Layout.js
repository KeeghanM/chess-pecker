import Head from "next/head";
import Footer from "./Footer";
import Header from "./Header";

const Layout = (props) => (
  <div>
    <Head>
      <title>ChessTraining.app - {props.name}</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <div className="flex flex-col h-screen overflow-x-hidden bg-black">
      <Header noCTA={props.noCTA} name={props.name} />
      <div>{props.children}</div>
      <Footer />
    </div>
  </div>
);

export default Layout;
