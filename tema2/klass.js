var Class = (function(Class) {

  function mixin(target, source) {
    for (var prop in source) if (source.hasOwnProperty(prop)) {
      if (!target[prop]) { target[prop] = source[prop]; }
    }
  }

  Class.extend = function(prop) {
    var _super = this.prototype;

    function F() {}
    F.prototype = _super;
    var proto = new F();

    for (var name in prop) {
      if (typeof prop[name] == "function" &&
          typeof _super[name] == "function") {
        proto[name] = (function(name, fn) {
          return function() {
            var tmp = this._super;
            this._super = _super[name];
            var ret = fn.apply(this, arguments);
            this._super = tmp;
            return ret;
          }
        })(name, prop[name]);
      } else {
        proto[name] = prop[name];
      }
    }

    function Klass() {
      if (this.init) this.init.apply(this, arguments);
    }

    Klass.prototype = proto;
    Klass.prototype.constructor = Klass;

    Klass.extend = this.extend;
    Klass.include = function(m) {
      mixin(Klass, m);
      if (m.included) { m.included(Klass); }
    };
    Klass.mixin = function(m) {
      mixin(Klass.prototype, m);
      if (m.mixed) { m.mixed(Klass); }
    };

    return Klass;
  };

  return Class;
}(Class || function(){}));
