import './App.css';
import Header from './Header';
import Board from './Board';
import Reset from './Reset';
import EndScreen from './EndScreen';
import { useState, useEffect } from 'react';

const PLAYERX = "Player 1 - Xs";
const PLAYER0 = "Player 2 - 0s";
const MYURL = "https://api.npoint.io/c734e05e43c5b87dd971";

const EMPTY_BOARD = [
  ['-', '-', '-'],
  ['-', '-', '-'],
  ['-', '-', '-']
];

const LINES = [
  [[0,0],[0,1],[0,2]], [[1,0],[1,1],[1,2]], [[2,0],[2,1],[2,2]], // filas
  [[0,0],[1,0],[2,0]], [[0,1],[1,1],[2,1]], [[0,2],[1,2],[2,2]], // columnas
  [[0,0],[1,1],[2,2]], [[0,2],[1,1],[2,0]],                      // diagonales
];

// Devuelve { piece: 'X' | 'O', line } si hay ganador, o null
function getWinner(v) {
  for (const line of LINES) {
    const [a, b, c] = line;
    const x = v[a[0]][a[1]];
    if (x !== '-' && x === v[b[0]][b[1]] && x === v[c[0]][c[1]]) {
      return { piece: x === 'X' ? 'X' : 'O', line };
    }
  }
  return null;
}

function App() {
  const [turn, setTurn] = useState(PLAYERX);
  const [moves, setMoves] = useState(0);
  const [values, setValues] = useState(EMPTY_BOARD);
  const [endDismissed, setEndDismissed] = useState(false);

  const winner = getWinner(values);
  const draw = !winner && moves >= 9;
  const gameOver = Boolean(winner) || draw;
  const piece = turn === PLAYERX ? 'X' : 'O';

  useEffect(() => {
    if (winner) document.title = `¡Gana ${winner.piece}!`;
    else if (draw) document.title = "¡Empate!";
    else document.title = `Turn of ${turn}`;
  }, [turn, winner, draw]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(MYURL);
        if (!res.ok) return;
        const myjson = await res.json();
        if (!myjson || !Array.isArray(myjson.values)) return;
        setTurn(myjson.turn);
        setMoves(myjson.moves);
        setValues(myjson.values);
      } catch (e) {
        console.log("No se pudo cargar la partida guardada", e);
      }
    }

    fetchData();
  }, []);

  function appClick(rowNumber, columnNumber){
    if (gameOver) return;
    let valuesCopy = values.map(row => [...row]);
    valuesCopy[rowNumber][columnNumber] = piece === 'X' ? 'X' : '0';
    setTurn(turn === PLAYERX ? PLAYER0 : PLAYERX);
    setValues(valuesCopy);
    setMoves(moves => moves + 1);
  }

  function resetClick(){
    setTurn(PLAYERX);
    setMoves(0);
    setValues(EMPTY_BOARD.map(row => [...row]));
    setEndDismissed(false);
  }

  return (
    <div className='App'>
      <h2>Tic Tac Toe</h2>
      <Header piece={piece} winner={winner?.piece} draw={draw}/>
      <Board values={values} appClick={appClick} piece={piece}
             gameOver={gameOver} winLine={winner?.line}/>
      <h3>Número de movimientos: {moves}</h3>
      <Reset resetClick={resetClick}></Reset>

      {gameOver && !endDismissed && (
        <EndScreen winner={winner?.piece} moves={moves}
                   onRestart={resetClick}
                   onClose={() => setEndDismissed(true)}/>
      )}
    </div>
  );
}

export default App;
