import React, { Component, PropTypes } from 'react';

const nameStyle = {
  fontFamily: 'Helvetica, Geneva, sans-serif',
  fontSize: 14,
  backgroundColor: '#f93',
  color: '#fff',
  padding: '6px 4px',
  fontWeight: 'bold',
  borderRadius: 8
};

class HelloWorldProps extends Component {
  render(){
    const { name } = this.props;
    return (
      <div>
        <h1>Hola Mundo con hot reloading</h1>
        <p>Te saludo <span style={ nameStyle }>{ name }</span></p>
        <p>Tu nombre tiene { name.length } letras.</p>
      </div>
    )
  }
}

HelloWorldProps.propTypes = {
  name: PropTypes.string.isRequired
}

HelloWorldProps.defaultProps = {
  name: 'Anonymous'
}

export default HelloWorldProps;