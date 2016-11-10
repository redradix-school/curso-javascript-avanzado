import React, { Component } from 'react';

class EventHandlerES6 extends Component {
  constructor(){
    super()
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e){
    alert('Click!');
  }
  render(){
    return <button onClick={ this.handleClick }>Click me</button>;
  }
}

export default EventHandlerES6;