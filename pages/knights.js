import Layout from '../components/Layout'
import ChessComponent from '../components/Chessboard'

function knights() {
  return (
    <div>
      <Layout name="Knight Vision">
        <div className="flex flex-col p-4 md:p-6 lg:p-12 space-y-2 text-lg text-dark">
          <h1 className="text-4xl font-bold text-primary">Knight Vision</h1>
          <div className="space-y-1 pb-6">
            <ChessComponent fen="8/6PP/4k3/8/8/4K3/6pp/8 w - - 0 1" />
          </div>
        </div>
      </Layout>
    </div>
  )
}

export default knights
