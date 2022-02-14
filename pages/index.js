import Layout from "../components/Layout"
import FeatureRow from "../components/index/FeatureRow"
import HeroBanner from "../components/index/HeroBanner"

export default function Home() {
  return (
    <Layout name="Home">
      <HeroBanner />
      <FeatureRow />
    </Layout>
  )
}
