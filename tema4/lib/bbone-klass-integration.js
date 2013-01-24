// ProJS.Class <-> Backbone integration

var ProJS = (function (my) {
  var wrapBackboneClass = function(className) {
    var backboneWrapped = Backbone[className],
        F = function() {},
        K = function() {};
    F.prototype = backboneWrapped.prototype;
    K.prototype = new F();
    _.extend(K, ProJS.Class, {constructor: backboneWrapped});
    _.extend(K.prototype, ProJS.Class.prototype);
    K.prototype.init = function() {
      return backboneWrapped.apply(this, arguments);
    };
    return K;
  };

  my.Model = wrapBackboneClass('Model');
  my.View = wrapBackboneClass('View');
  my.Collection = wrapBackboneClass('Collection');

  return my;
}(ProJS || {}));
