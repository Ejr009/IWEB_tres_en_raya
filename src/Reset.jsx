import React from 'react';

export default function Reset(props) {
  function click() {
    props.resetClick();
  }

  return(
    <button className="reset" onClick={click} >
      Reset
    </button>
  );
}
