// R.Class <-> Backbone integration

var R = (function (my) {
  var wrapBackboneClass = function(className) {
    var backboneWrapped = Backbone[className],
        F = function() {},
        K = function() {};
    F.prototype = backboneWrapped.prototype;
    K.prototype = new F();
    _.extend(K, R.Class, {constructor: backboneWrapped});
    _.extend(K.prototype, R.Class.prototype);
    K.prototype.init = function() {
      return backboneWrapped.apply(this, arguments);
    };
    return K;
  };

  my.Model = wrapBackboneClass('Model');
  my.View = wrapBackboneClass('View');
  my.Collection = wrapBackboneClass('Collection');

  return my;
}(R || {}));
