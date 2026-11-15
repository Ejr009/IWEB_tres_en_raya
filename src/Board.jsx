import React from 'react';
import Square from './Square';

export default function Board(props) {
  function boardClick(rowNumber, columnNumber) {
    props.appClick(rowNumber, columnNumber);
  }

  function isWinning(r, c) {
    return Boolean(props.winLine) && props.winLine.some(([wr, wc]) => wr === r && wc === c);
  }

  let board = props.values.map((rowValues, rowIndex) => {
  let row = rowValues.map((value, columnIndex) => {
      return (
          <Square value={value} key={rowIndex + "-" + columnIndex} rowIndex={rowIndex}
                  columnIndex={columnIndex} boardClick={boardClick}
                  gameOver={props.gameOver} winning={isWinning(rowIndex, columnIndex)}/>
      );
   });
   return (
      <div className="board-row" key={"row" + rowIndex}>
        {row}
      </div>
    );
  });

  // next-x / next-o: vista previa de la ficha al pasar el ratón
  const cls = "board " + (props.piece === 'X' ? "next-x" : "next-o")
    + (props.gameOver ? " finished" : "");
  return (
     <div className={cls}>
      {board}
     </div>
  );
}
