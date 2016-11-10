import dependencies from './dependencies';
import Text from './text'

dependencies.register('text', 'JS Pro');

class App extends React.Component {
  getChildContext() {
    return dependencies;
  }
  render() {
    return <Text/>;
  }
};

App.childContextTypes = {
  data: React.PropTypes.object,
  get: React.PropTypes.func,
  register: React.PropTypes.func
};
