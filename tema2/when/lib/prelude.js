// Utilidades generales

function bind(ctx, fn) {
  var oldargs = [].slice.call(arguments, 2);
  return function() {
    var newargs = [].slice.call(arguments);
    return fn.apply(ctx, oldargs.concat(newargs));
  };
}

function curry(fn) {
  var oldargs = [].slice.call(arguments, 1);
  return function() {
    var newargs = [].slice.call(arguments);
    return fn.apply(this, oldargs.concat(newargs));
  };
}

function augment(target) {
  var sources = [].slice.call(arguments, 1);
  sources.forEach(function(source) {
    for (var prop in source) {
      if (source.hasOwnProperty(prop)) {
        target[prop] = source[prop];
      }
    }
  });
  return target;
}

function merge() {
  var sources = [].slice.call(arguments);
  return augment.apply(this, [{}].concat(sources));
}

function clone(orig) {
  function F() {}
  F.prototype = orig;
  return new F();
}

function pick(obj) {
  var keys = [].slice.call(arguments, 1),
      target = {};
  keys.forEach(function(key) {
    if (obj.hasOwnProperty(key)) target[key] = obj[key];
  });
  return target;
}

function rand(a, b) {
  var top = b ? (b - a) : a,
      delta = b ? a : 0;
  return Math.floor(Math.random() * top + delta);
}

function randString(length) {
  length || (length = 10);
  return rand(Math.pow(36, length)).toString(36);
}

var R = (function(my) {
  augment(my, {
    bind: bind,
    curry: curry,
    augment: augment,
    merge: merge,
    clone: clone,
    pick: pick,
    rand: rand,
    randString: randString
  });
  return my;
}(R || {}));

// Un par de aumentos por comodidad (cuidado con colisiones...)

String.prototype.format = function() {
  var args = [].slice.call(arguments),
      result = this.slice(),
      regexp;
  for (var i=args.length; i--;) {
    regexp = new RegExp("%"+(i+1), "g");
    result = result.replace(regexp, args[i]);
  }
  return result;
};

Number.prototype.times = function(cb) {
  for (var i=0, _times=this; i < _times; i++) cb(i);
};

String.prototype.times = function(cb) {
  parseInt(this, 10).times(cb);
};

String.prototype.f = function() {
  var code = this.replace(/\%(\d+)/g, "(arguments[parseInt($1, 10) - 1])"),
      statements = code.split(';'),
      last = statements.pop();
  if (!(/return/.test(last))) last = "return " + last;
  statements.push(last);
  return new Function(statements.join(';'));
};

// Herencia clásica y mixins

var R = (function(my) {

  function mixin(target, source) {
    for (var prop in source) {
      if (source.hasOwnProperty(prop)) {
        if (!target[prop]) { target[prop] = source[prop]; }
      }
    }
  }

  var Class = function() {};

  Class.include = function(m) {
    mixin(this, m);
    if (m.included) { m.included(this); }
  };
  Class.mixin = function(m) {
    mixin(this.prototype, m);
    if (m.mixed) { m.mixed(this); }
  };

  Class.extend = function(prop) {
    var _super = this.prototype;

    function F() {}
    F.prototype = _super;
    var proto = new F();

    for (var name in prop) {
      if (typeof prop[name] === "function" &&
          typeof _super[name] === "function" &&
          prop[name].constructor === Function &&
          _super[name].constructor === Function ) {
        proto[name] = (function(name, fn) {
          return function() {
            var tmp = this._super;
            this._super = _super[name];
            var ret = fn.apply(this, arguments);
            this._super = tmp;
            return ret;
          };
        }(name, prop[name]));
      } else {
        proto[name] = prop[name];
      }
    }

    function Klass() {
      if (this.init) return this.init.apply(this, arguments);
    }

    // Heredamos las propiedades de clase
    for (var classProp in this) {
      if (this.hasOwnProperty(classProp)) {
        Klass[classProp] = this[classProp];
      }
    }
    Klass.prototype = proto;
    Klass.prototype.constructor = Klass;

    return Klass;
  };

  // The global super-constructor, wich does
  // nothin gexcept being the top of the chain
  Class.prototype.init = function() { };

  my.Class = Class;

  return my;

}(R || function(){}));

// Namespace

var R = (function(my) {
  my.namespace = function(string, sandbox) {
    var spaces = string.split('.'),
        root = this,
        space = spaces.shift();
    while (space) {
      root = root[space] || (root[space] = {});
      space = spaces.shift();
    }
    return sandbox(root);
  };
  return my;
}(R || {}));

// Templates

var R = (function (my) {

  my.Template = function(text) {
    var code = '%>' + text + '<%';
    code = code.replace(/[\n\r\t]/g,' ');
    code = code.replace(/\s+/g, ' ');
    code = code.replace(/##/g, '');  // Just for security
    code = code.replace(/<%=(.*?);?\s*%>/g, "##, $1, ##");
    code = code.replace(/%>(.*?)<%/g, "_t_.push(##$1##); ");
    code = code.replace(/##(.*?)##/g, function(_, str) {
      str = str.replace(/(['"])/g, '\\$1');
      return "'" + str + "'";
    });
    code = "var _t_ = [];" + code + "; return _t_.join('');";
    var fn = new Function('obj', code);
    return function(data) { return fn.call(data); };
  };

  my.Template.byId = function (id) {
    var el = document.getElementById(id);
    if (el) return my.Template(el.innerHTML);
  };

  return my;

})(R || {});


// Mixins

var R = (function (my) {

  // Observable

  my.Observable = {
    mixed: function(klass) {
      var klass_init = klass.prototype.init || function() {};
      klass.prototype.init = function() {
        this._subscribers = {};
        return klass_init.apply(this, arguments);
      };
    },
    on: function(event, callback, ctx) {
      if (typeof event != "string") {
        this._onMany(event);
      } else {
        this._subscribers[event] || (this._subscribers[event] = []);
        this._subscribers[event].push({cb:callback, ctx: ctx || {}});
      }
    },
    _onMany: function(desc) {
      for (var key in desc) { this.on(key, desc[key]); }
    },
    off: function(event, callback) {
      var subs = this._subscribers[event];
      if (!subs) { return; }
      for (var i=0; i<subs.length; i++) {
        if (subs[i] === callback) {
          subs.splice(i, 1);
          break;
        }
      }
    },
    trigger: function(event) {
      var args = [].slice.call(arguments),
          eventArgs = args.slice(1),
          subscribers = this._subscribers[event] || [],
          subscribersToAll = this._subscribers['*'] || [];
      subscribers.forEach(function(sub){ sub.cb.apply(sub.cbx, eventArgs); });
      subscribersToAll.forEach(function(sub) { sub.cb.apply(sub.ctx, args); });
    }
  };


  // Mediable

  my.Mediable = {
    setMediator: function(mediator) {
      this._mediator = mediator;
    },
    notify: function(event) {
      return this._mediator.trigger.apply(this._mediator, arguments);
    }
  };

  return my;
}(R || {}));

// Mediator

var R = (function(my) {
  my.Mediator = R.Class.extend({
    init: function(desc) {
      if (desc) desc.call({}, this);
    },
    add: function() {
      var elems = [].slice.call(arguments);
      elems.forEach(bind(this, function(e) {
        if (e.setMediator) e.setMediator(this);
      }));
    }
  });
  my.Mediator.mixin(R.Observable);

  return my;
}(R || {}));

/* CommonJS exports */

(function() {
  if (this.exports) { augment(exports, R); }
}());
