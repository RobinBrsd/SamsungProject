// Some Import
import React from 'react';
import './App.css';
import './custom.css';
import DrawCanvas from './script';

// Font Awesome Plugin
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faPen, faEraser, faVectorSquare, faCircleNotch, faPencilRuler, faPlus, faMinus, faFillDrip } from '@fortawesome/free-solid-svg-icons'
library.add(
  faPen,
  faEraser,
  faVectorSquare,
  faCircleNotch,
  faPencilRuler,
  faPlus,
  faMinus,
  faFillDrip,
  faSave
)

// Main Component
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 id="title"> My Paint </h1>
        <Board/>
      </header>
    </div>
  );
}

// Some Style Component
function Board() {
  return (
    <div className="container">
      <button className="btn-size" onClick={()=>DrawCanvas.setSize(0)}>
          <FontAwesomeIcon icon="plus"/>
      </button>
      <button className="btn-size" onClick={()=>DrawCanvas.setSize(1)}>
          <FontAwesomeIcon icon="minus" />
      </button>
      <button className="btn-fill" onClick={DrawCanvas.setFill}>
          <FontAwesomeIcon icon="fill-drip" />
      </button>
      <canvas className="board" height="500px" width="545px"
      onMouseDown={DrawCanvas.onMouseDown}
      onMouseLeave={DrawCanvas.endDrawing}
      onMouseUp={DrawCanvas.endDrawing}
      onMouseMove={DrawCanvas.onMouseMove} 
      onClick={DrawCanvas.onMouseClick} > 
      </canvas>
      <div className="btn-bar">
        <Button id="pen" func={DrawCanvas.setActive} nb="0" name="pen"/>
        <Button id="line" func={DrawCanvas.setActive} nb="1" name="pencil-ruler"/>
        <Button id="square" func={DrawCanvas.setActive} nb="2" name="vector-square"/>
        <Button id="circle" func={DrawCanvas.setActive} nb="3" name="circle-notch"/>
        <Button id="eraser" func={DrawCanvas.setActive} nb="4" name="eraser"/>
        <input onChange={DrawCanvas.setColor} className="btn btn-color" id="color" type="color"/>
      </div>
      <button className="btn-download" onClick={DrawCanvas.saveCanvas}> 
          <FontAwesomeIcon icon="save"/>
      </button>
    </div>
  );
}

function Button(props) {
  return (
    <button id={ props.id } className="btn" onClick={()=>props.func(props.nb)} > 
      <FontAwesomeIcon icon={ props.name } /> 
    </button>
  );
}

export default App;
