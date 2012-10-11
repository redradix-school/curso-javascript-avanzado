ProJS.namespace('MVC', function(my) {

  var Class = ProJS.Class;


  // Store Interfaz

  var Store = Class.extend({
    save: function(data, path, succ, err) {
    },
    find: function(cid, succ, err) {
    },
    destroy: function(path, succ, err) {
    }
  });


  // LocalStore Singleton

  var LocalStore = (function() {
    var instance,
        LocalStore = Store.extend({
          init: function() {
            if (instance) {
              return instance;
            } else {
              return (instance = this);
            }
          },
          save: function(data, path, succ, err) {
            localStorage[path] = JSON.stringify(data);
            if (succ) succ(model);
          },
          find: function(path, succ, err) {
            var result = localStorage[path];
            if (result) {
              succ(JSON.parse(result));
            } else {
              err(cid);
            }
          },
          destroy: function(path, succ, err) {
            localStorage.removeItem(path);
            if (succ) succ(path);
          }
        });
    return LocalStore;
  }());


  // Generador de CIDs

  var CIDGenerator = Class.extend({
    init: function(prefix) {
      this.prefix = prefix;
      this.index = 0;
    },
    getId: function() {
      return this.prefix + (this.index++);
    }
  });


  // Model

  var Model = Class.extend({
    init: function(values) {
      this.data = merge((this.defaults || {}), values);
      for (var key in this.data) if (typeof this.data[key] === "function") {
        this.data[key] = this.data[key].call(this);
      }
      this.store = (this.store || Model.defaultStore);
      this.cid = Model.cidGenerator.getId();
    },
    get: function(key) {
      return this.data[key];
    },
    set: function(newData, options) {
      options = options || {};
      var oldData = this.data;
      this.data = merge(this.data, newData);
      if (this.isValid() || options.skipValidation) {
        for (var prop in newData) {
          if (!options.slient) this.publish("change:%1".format(prop), newData[prop]);
        }
        if (!options.silent) this.publish("change", newData);
        return this;
      } else {
        this.data = oldData;
        if (!options.silent) this.publish("invalid", newData);
        return false;
      }
    },
    toJSON: function(options) {
      options = options || {};
      var data = this.data;
      if (options.withId) data.cid = this.cid;
      return data;
    },
    save: function() {
      if (this.isValid()) {
        this.store.save(this.data, this.getPath());
        return true;
      } else {
        return false;
      }
    },
    getPath: function() {
      if (this.url) {
        return "%1/%2".format(this.url, this.cid);
      } else {
        return this.cid;
      }
    },
    destroy: function() {
      this.store.destroy(this.getPath());
      this.publish("deleted");
    },
    validate: function() {
    },
    isValid: function() {
      return this.validate() === undefined;
    }
  });

  Model.mixin(ProJS.Observable);

  Model.defaultStore = new LocalStore();
  Model.cidGenerator = new CIDGenerator("model-");

  Model.find = function(cid, options) {
    var store = options.store || this.prototype.store ||
                this.defaultStore || Model.defaultStore,
        succ = options.success,
        err = options.error,
        cb = bind(this, function(data) {
          var model = new this(data);
          model.cid = cid;
          succ(model);
        });
    store.find(cid, cb, err);
  };


  // Collection

  var Collection = Class.extend({
    init: function(data, options) {
      augment(this, pick(options || {}, 'store', 'url'));
      if (!this.model) throw new Error("Colección sin modelo!");
      this.url = this.url || this.model.prototype.url;
      this.store = this.store || this.model.defaultStore;
      this.reset(data);
    },
    reset: function(data) {
      data = data || [];
      this.models = [];
      data.forEach(bind(this, function(data) {
        this.add(data, {silent: true});
      }));
      this.publish('reset');
    },
    add: function(data, options) {
      options = options || {};
      var model;
      if (data instanceof Model) {
        model = data;
      } else {
        model = new this.model(data);
        model.cid = (data.id || data.cid || model.cid);
      }
      model.subscribe('*', curry(bind(this, this._broadcast), model));
      this.models.push(model);
      if (!options.slient) this.publish('added', model);
    },
    remove: function(cid, onlyLocal) {
      this.models = this.models.filter(function(model) {
        if (model.cid == cid) {
          if (!onlyLocal) model.destroy();
          return false;
        } else {
          return true;
        }
      });
      this.publish('removed', cid);
    },
    toJSON: function() {
      return this.models.map("%1.toJSON({withId: true})".to_f());
    },
    get: function(cid) {
      var result;
      for (var i=this.models.length; i--;) if (this.models[i].cid == cid) {
        result = this.models[i];
        break;
      }
      return result;
    },
    each: function(fn) {
      this.models.forEach(fn);
    },
    save: function() {
      if (this.url) {
        this.store.save(this.toJSON(), this.url);
      }
    },
    fetch: function() {
      if (this.url) {
        this.store.find(this.url, bind(this, this.reset));
      }
    },
    // La coleccion retransmite los eventos de los modelos
    _broadcast: function(model, event) {
      var eventArgs = [].slice.call(arguments, 1);
      if (event == 'deleted') {
        model.unsubscribe('*', arguments.callee);
        this.remove(model.cid, true);
      } else {
        this.publish(event, [model].concat(eventArgs));
      }
    }
  });

  Collection.mixin(ProJS.Observable);


  // Vista

  var Evented = Class.extend({
    init: function(el) {
      this._parseEvents(el);
    },
    _parseEvents: function(el) {
      if (el) this.el = el;
      if (this.events) for (var key in this.events) {
        this._processEvent(key, this.events[key]);
      }
    },
    _processEvent: function(desc, handler) {
      var parts = desc.split(" "),
          eventName = parts.shift(),
          selector = parts.join(" "),
          args = [];
      this.el.on(eventName, selector, bind(this, function(e) {
        var target = e.currentTarget;
        if (typeof handler !== "function") {
          args = handler.split(" ");
          handler = this[args.shift()];
        }
        if (handler) return handler.apply(this, args.concat([target, e]));
      }));
    }
  });

  var View = Evented.extend({
    init: function(options) {
      options = options || {};
      augment(this, pick(options,
                         'model', 'template', 'tagName', 'parent', 'el'));
      this._delegate = options.delegate;
      if (this.model) {
        this.model.subscribe('change', bind(this, this.render));
        this.model.subscribe('deleted', bind(this, this.remove));
      }
      if (this.el) this._parseEvents();
    },
    template: "return %1".to_f(),
    tagName: 'div',
    delegate: function(method) {
      var args = [].slice.call(arguments, 1);
      if (this._delegate[method]) {
        this._delegate[method].apply(this._delegate,
                                     [this].concat(args));
      }
    },
    render: function() {
      var data = this.model.toJSON();
      if (!this.el) {
        this.el = $("<%1>".format(this.tagName));
        if (this.parent) this.parent.append(this.el);
        this._parseEvents();
      }
      this.el.html(this.template(data));
      return this;
    },
    remove: function() {
      if (this.el) this.el.remove();
    }
  });

  View.mixin(ProJS.Observable);

  var Delegate = ProJS.Class.extend({
    init: function(options) {
      augment(this, pick(options || {}, 'model'));
    }
  });


  // Exportar los módulos

  my.Store = Store;
  my.LocalStore = LocalStore;
  my.Model = Model;
  my.Collection = Collection;
  my.View = View;
  my.Delegate = Delegate;

  return my;

});

