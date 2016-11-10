import React, { Component } from 'react';

class StateComp extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentValue: 0
    }
  }
  render(){
    const { currentValue } = this.state;

    return (<p>Mi valor es { currentValue }</p>);
  }
}

export default StateComp;