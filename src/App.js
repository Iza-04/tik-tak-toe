import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  return (
    <Game/>
  );
}

export default App;

function Square({ value, onSquareClick }) {
    return (
        <button className="square" onClick={onSquareClick}>
            {value}
        </button>
    );
}

function Board({ xIsNext, squares, onPlay }) {
    function handleClick({i}) {
        if (calculateWinner({squares: squares}) || squares[i]) {
            return;
        }
        const nextSquares = squares.slice();
        if (xIsNext) {
            nextSquares[i] = 'X';
        } else {
            nextSquares[i] = 'O';
        }
        onPlay(nextSquares);
    }

    const winner = calculateWinner({squares: squares});
    let status;
    if (winner) {
        status = 'Winner: ' + winner;
    } else {
        status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    }

    return (
        <>
            <div className="status">{status}</div>
            <div className="board-row">
                <Square value={squares[0]} onSquareClick={() => handleClick({i: 0})} />
                <Square value={squares[1]} onSquareClick={() => handleClick({i: 1})} />
                <Square value={squares[2]} onSquareClick={() => handleClick({i: 2})} />
            </div>
            <div className="board-row">
                <Square value={squares[3]} onSquareClick={() => handleClick({i: 3})} />
                <Square value={squares[4]} onSquareClick={() => handleClick({i: 4})} />
                <Square value={squares[5]} onSquareClick={() => handleClick({i: 5})} />
            </div>
            <div className="board-row">
                <Square value={squares[6]} onSquareClick={() => handleClick({i: 6})} />
                <Square value={squares[7]} onSquareClick={() => handleClick({i: 7})} />
                <Square value={squares[8]} onSquareClick={() => handleClick({i: 8})} />
            </div>
        </>
    );
}

export function Game() {
    const [xIsNext, setXIsNext] = useState(true);
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const currentSquares = history[history.length - 1];

    function handlePlay(nextSquares) {
        setHistory([...history, nextSquares]);
        setXIsNext(!xIsNext);
    }

    return (
        <div className="game">
            <div className="game-board">
                <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
            </div>
            <div className="game-info">
                <ol>{/*TODO*/}</ol>
            </div>
        </div>
    );
}

function calculateWinner({squares}) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}