import Layout from '../components/Layout'
import ChessComponent from '../components/Chessboard'

function knights() {
  return (
    <div>
      <Layout name="Knight Vision">
        <div className="flex flex-col p-4 md:p-6 lg:p-12 space-y-2 text-lg text-dark">
          <h1 className="text-4xl font-bold text-primary">Knight Vision</h1>
          <div className="space-y-1 pb-6">
            <ChessComponent />
          </div>
        </div>
      </Layout>
    </div>
  )
}

export default knights
