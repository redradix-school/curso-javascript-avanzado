import React, { Component } from 'react';

// ES2015 class
export class HolaMundoES6 extends Component {
  render(){
    return <h1>Hola mundo con ES6 class</h1>
  }
}

// React stateless component - una función
export function HolaMundoStateless(){
  return <h1>Hola mundo con ES6 stateless</h1>;
}
// Stateless con arrow functions
export const HolaMundoArrow = () => <h1>Hola mundo con ES6 arrow</h1>

// ES5
const HolaMundo = React.createClass({
  render(){
    return (
      <div>
        <h1>Hola Mundo con hot reloading</h1>
      </div>
    )
  }
});

export default HolaMundo;