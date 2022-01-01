// import Chess from '../lib/chess.js'
import dynamic from 'next/dynamic.js';
const Chessground = dynamic(() => import('react-chessground'), {ssr: false});
import "react-chessground/dist/styles/chessground.css"

const Chessboard = () => {

    return (
        <div>
            <Chessground />
        </div>
    )
}

export default Chessboard