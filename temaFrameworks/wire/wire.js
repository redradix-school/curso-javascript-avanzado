export default function wire(Component, dependencies) {
  class Inject extends React.Component {
    render() {
      var props = dependencies.reduce((acc, p) => {
        acc[p] = this.context.get(p);
        return acc
      }, {})
      return React.createElement(Component, props);
    }
  }
  Inject.contextTypes = {
    data: React.PropTypes.object,
    get: React.PropTypes.func,
    register: React.PropTypes.func
  };
  return Inject;
};
