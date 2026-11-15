import React from 'react';

function PlayerCard(props) {
  const { piece, name, active, won } = props;
  const cls = `player-card ${piece === 'X' ? 'x' : 'o'}`
    + (active ? ' active' : '')
    + (won ? ' won' : '');

  return (
    <div className={cls}>
      <span className={"mini mini-" + (piece === 'X' ? 'x' : 'o')} />
      <span className="player-name">{name}</span>
      <span className="player-tag">{won ? "¡Ganador!" : active ? "Tu turno" : "Esperando"}</span>
    </div>
  );
}

export default function Header(props) {
  const { piece, winner, draw } = props;
  const gameOver = Boolean(winner) || draw;

  let banner;
  let bannerClass = "banner " + (piece === 'X' ? "turn-x" : "turn-o");
  if (winner) {
    banner = `¡Ha ganado ${winner === 'X' ? 'Player 1' : 'Player 2'}!`;
    bannerClass = "banner " + (winner === 'X' ? "turn-x" : "turn-o");
  } else if (draw) {
    banner = "Empate";
    bannerClass = "banner draw";
  } else {
    banner = `Turno de ${piece === 'X' ? 'Player 1' : 'Player 2'}`;
  }

  return (
    <div className="header">
      <div className="players">
        <PlayerCard piece="X" name="Player 1" active={!gameOver && piece === 'X'} won={winner === 'X'} />
        <span className="vs">VS</span>
        <PlayerCard piece="O" name="Player 2" active={!gameOver && piece === 'O'} won={winner === 'O'} />
      </div>
      {/* key fuerza a re-ejecutar la animación en cada cambio de turno */}
      <div key={banner} className={bannerClass}>{banner}</div>
    </div>
  );
}
