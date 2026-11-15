import React from 'react';

export default function Square(props) {
  const playable = props.value === "-" && !props.gameOver;

  function squareClick() {
    if(playable) {
      props.boardClick(props.rowIndex, props.columnIndex);
    }
  }

  // Clase según la ficha: 'X' -> x, '0' u 'O' -> o, '-' -> vacía
  let pieceClass = "";
  if (props.value === "X") pieceClass = "x";
  else if (props.value === "0" || props.value === "O") pieceClass = "o";

  const stateClass = playable ? "clickable" : "no_clickable";
  const winClass = props.winning ? "win" : "";

  return(
    <button
      className={`square ${pieceClass} ${stateClass} ${winClass}`}
      onClick={squareClick}
      aria-label={props.value === "-" ? "Casilla vacía" : "Ficha " + props.value}
    >
      {props.value}
    </button>
  );

}
