import {useState, useEffect, useCallback} from 'react';


import Chess from '../lib/chess.js'
import dynamic from 'next/dynamic.js';
const Chessground = dynamic(() => import('react-chessground'), {ssr: false});
import "react-chessground/dist/styles/chessground.css"


const chessComponent = () => {
    const [fen, setFen] = useState('');
	const [turn, setTurn] = useState('w');
	const [chess, setChess] = useState(new Chess());
    const [history, setHistory] = useState([]);
	const [lastMove, setLastMove] = useState();
	const [moveNumber, setMoveNumber] = useState(0);
	const [orientation, setOrientation] = useState('');
	const [boardColor, setBoardColor] = useState(0);
    const currentPuzzle = {
        "puzzleid":"HxxIU",
        "fen":"2r2rk1/3nqp1p/p3p1p1/np1p4/3P4/P1NBP3/1PQ2PPP/2R2RK1 w - - 0 18",
        "moves":["c3d5","e6d5","c2c8","f8c8"],
        "rating":1683,
        "ratingdeviation":74,
        "themes":["advantage","hangingPiece","middlegame","short"]
    }
    
    /**
	 * Setup the board.
	 */
	useEffect(() => {
		if (!currentPuzzle.Moves) return;
		const chessJs = new Chess(currentPuzzle.FEN);
		const history = currentPuzzle.Moves.split(' ');

		setIsComplete(() => false);
		setPendingMove(() => {});
		setLastMove(() => {});
		setMoveNumber(() => 0);
		setHistory(() => history);
		setChess(() => chessJs);
		setFen(() => chessJs.fen());
		setTurn(() => chessJs.turn());
		setOrientation(() => (chessJs.turn() === 'b' ? 'white' : 'black'));
	}, [currentPuzzle]);

    /**
	 * Allow only legal moves.
	 */
	const calcMovable = () => {
		const dests = new Map();
		for (const s of chess.SQUARES) {
			const ms = chess.moves({square: s, verbose: true});
			if (ms.length > 0)
				dests.set(
					s,
					ms.map(m => m.to),
				);
		}

		return {
			free: false,
			dests,
			color: turn === 'b' ? 'white' : 'black',
			draggable: {
				showGhost: true,
			},
		};
	};

    const onRightMove = async (from, to) => {
		setFen(() => chess.fen());
		setMoveNumber(previousMove => previousMove + 1);
		setLastMove([from, to]);
		const isPuzzleComplete = await checkPuzzleComplete(moveNumber);
		if (isPuzzleComplete) return;
		setRightMoveVisible(() => true);
		setTimeout(() => setRightMoveVisible(() => false), 600);
		setTimeout(computerMove(moveNumber + 1), 800);
	};

	const onWrongMove = () => {
		chess.undo();
		setFen(() => chess.fen());
		setMalus(lastCount => lastCount + 3);
		setMistakesNumber(previous => previous + 1);
		if (!isSoundDisabled) errorSound();
		setWrongMoveVisible(() => true);
		setTimeout(() => setWrongMoveVisible(() => false), 600);
		setText(() => ({
			title: `That's not the move!`,
			subtitle: `Try something else.`,
		}));
	};

    /**
	 * Function called when the user plays.
	 */
	const onMove = async (from, to) => {
		const moves = chess.moves({verbose: true});
		for (let i = 0, length_ = moves.length; i < length_; i++) {
			if (moves[i].flags.includes('p') && moves[i].from === from) {
				setPendingMove([from, to]);
				setSelectVisible(true);
				return;
			}
		}

		const move = chess.move({from, to, promotion: 'x'});
		if (move === null) return;
		if (move.captured && !isSoundDisabled) {
			captureSound();
		} else if (!isSoundDisabled) {
			moveSound();
		}

		const isCorrectMove = validateMove(move);
		if (isCorrectMove || chess.in_checkmate()) {
			await onRightMove(from, to);
		} else {
			onWrongMove();
		}
	};

	/**
	 * Check if the move is valid.
	 */
	const validateMove = move => `${move.from}${move.to}` === history[moveNumber];

    /**
	 * Return the correct turn color as a string.
	 */
	const turnColor = string_ => (string_ === 'w' ? 'white' : 'black');

	/**
	 * Switch board orientation
	 */
	const switchOrientation = () =>
		setOrientation(orientation =>
			orientation === 'white' ? 'black' : 'white',
		);



    return (
        <div>
            <Chessground 
				fen={fen}
				turnColor={turnColor(chess.turn())}
				movable={calcMovable()}
				orientation={orientation}
				lastMove={lastMove}
				check={chess.in_check()}
				onMove={onMove}
                />
        </div>
    )
}

export default chessComponent