import React from 'react';
import ReactDOM from 'react-dom';
import HolaMundo, { HolaMundoES6, HolaMundoStateless, HolaMundoArrow } from './components/hello_world';
import Lista from './components/lista';
import HelloWorldProps from './components/hello_world_props';
import StateES6 from './components/state_es6.js';
import EventHandlerES6 from './components/eventhandler_es6';
import Counter from './components/counter';

window.onload = function(){
  //HelloWorld sample
  //ReactDOM.render(<HolaMundoArrow />, document.getElementById('app'));

  //Lista sample
  //ReactDOM.render(<Lista />, document.getElementById('app'));

  //HelloWorld with prop validation
  //ReactDOM.render(<HelloWorldProps />, document.getElementById('app'));

  //Estado interno con ES6 class
  //ReactDOM.render(<EventHandlerES6 />, document.getElementById('app'));

  //Counter
  ReactDOM.render(<Counter />, document.getElementById('app'));
}