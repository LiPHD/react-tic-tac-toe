import React, { useState, useEffect } from 'react';
import Board from './Board';

function Game() {
    const [setpNo, setStepNo] = useState(0);
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [gameCourses, setGameCourses] = useState([{ player: 'O', squareIdx: -1 }]);

    useEffect(() => {
        setSquares(calcSquares());
    }, [setpNo])

    const calcSquares = () => {
        console.log(gameCourses.length);
        let sq = Array(9).fill(null);
        if (setpNo > 0) {
            const curCourses = gameCourses.slice(0, setpNo + 1)
            for (const course of curCourses) {
                sq[course.squareIdx] = course.player;
            }
        }

        return sq;
    }

    const calcWinner = () => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (const line of lines) {
            const [a, b, c] = line;
            if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
                return squares[a];
            }
        }

        return null;
    }

    // const squares = calcSquares();
    const winner = calcWinner();
    const player = gameCourses[setpNo].player === 'O' ? 'X' : 'O';
    const status = winner ? 'Winner is ' + winner : 'Next Player is ' + player;
    const moves = gameCourses.map((course, step) => {
        const st = step ? 'Move to #' + step : 'Start Game';
        return (
            <li key={step}>
                <button onClick={() => setStepNo(step)}>
                    {st}
                </button>
            </li>
        )
    });

    const clickSquare = idx => {
        if (!winner && !squares[idx]) {
            const newCourses = gameCourses.slice(0, setpNo + 1)
                .concat({ player: player, squareIdx: idx});
            setGameCourses(newCourses);
            setStepNo(setpNo + 1);
        }
    }

    return (
        <div className='game'>
            <div className='game-board'>
                <Board 
                    onClick={(idx) => clickSquare(idx)}
                    squares={squares}
                />
            </div>
            <div className='game-info'>
                <div>{status}</div>
                <ul>{moves}</ul>
            </div>
        </div>
    );
}

export default Game;