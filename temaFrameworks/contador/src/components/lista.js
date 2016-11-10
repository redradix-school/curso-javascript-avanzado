import React, { Component } from 'react';

function ListItem(){
  return <div>Soy un item</div>
}

class Lista extends Component {
  constructor(){
    super();
    this.items = [];
    for(let i=0; i < 10; i++){
      this.items.push(i);
    }
  }
  render(){
    return (
      <div>
      {
        this.items.map(i => <ListItem key={ i } />)
      }
      </div>
    )
  }
}

export default Lista;