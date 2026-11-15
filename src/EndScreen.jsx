import React from 'react';

export default function EndScreen(props) {
  const { winner, moves, onRestart, onClose } = props;
  const isDraw = !winner;
  const kind = isDraw ? 'draw' : winner === 'X' ? 'x' : 'o';

  return (
    <div className="end-overlay" role="dialog" aria-modal="true">
      <div className={"end-card end-" + kind}>
        {isDraw ? (
          <div className="end-pieces">
            <span className="mini mini-x big" />
            <span className="mini mini-o big" />
          </div>
        ) : (
          <div className="end-pieces">
            <span className={"mini big mini-" + kind} />
          </div>
        )}

        <p className="end-kicker">{isDraw ? "Fin de la partida" : "¡Victoria!"}</p>
        <h2 className="end-title">
          {isDraw ? "¡Empate!" : `Gana ${winner === 'X' ? 'Player 1' : 'Player 2'}`}
        </h2>
        <p className="end-sub">
          {isDraw
            ? "El tablero está lleno y nadie ha conseguido tres en raya."
            : `Tres en raya con las ${winner === 'X' ? 'X' : 'O'} en ${moves} movimientos.`}
        </p>

        <div className="end-actions">
          <button className="reset" onClick={onRestart}>Jugar de nuevo</button>
          <button className="ghost" onClick={onClose}>Ver tablero</button>
        </div>
      </div>
    </div>
  );
}
