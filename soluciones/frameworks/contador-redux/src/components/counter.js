import React, { Component } from 'react';

const buttonStyle = {
  fontFamily: 'sans-serif',
  padding: '10px 20px',
  background: '#456',
  color: '#fff',
  fontWeight: 'bold',
  fontSize: '16px'
};

class Counter extends Component {
  constructor(){
    super();
    this.state = { clicks: 0 };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(){
    this.setState({ clicks: this.state.clicks + 1 });

  }
  render(){
    return (
      <button style={ buttonStyle } onClick={ this.handleClick }>
        { this.state.clicks }
      </button>
    )
  }
}

export default Counter;