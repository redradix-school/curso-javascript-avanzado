import wire from './wire';

function Text(props) {
  return <h1>{ props.text }</h1>;
}

export default wire(Text, ['text'])

