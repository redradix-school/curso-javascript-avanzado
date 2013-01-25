(function (exports) {

  // Helpers

  function extend(receiver, giver, options) {
    options || (options = {});
    var overwrite = options.overwrite || false;

    for (var prop in giver) if (giver.hasOwnProperty(prop)) {
      if (overwrite || receiver[prop] === undefined) {
        receiver[prop] = giver[prop];
      }
    }
    return receiver;
  }

  // Fix values of loop variables
  function fix(value) {
    return value;
  }

  function buildHash(names, values) {
    var hash = {};
    for (var i=0,_len=names.length; i<_len; i++) {
      hash[names[i]] = values[i];
    }
    return hash;
  }

  function extractKeys(object, keys) {
    var result = {}, key;
    for (var i=0,_len=keys.length; i<_len; i++) {
      key = keys[i];
      result[key] = object[key];
    }
    return result;
  }

  function fill_with_fn(object, keys) {
    for (var i=0,_len=keys.length; i<_len; i++) {
      var key = fix(keys[i]);
      if (!object[key]) {
        object[key] = function(){};
      }
    }
    return object;
  }

  // Factories

  exports['Factory'] = (function () {

    var PropertyFactory = {

      // Numeric
      int_between: function (min, max) {
        var dif = max - min;
        return function() {
          return Math.floor(Math.random() * dif) + min;
        };
      },

      int_sequence: function (start) {
        start || (start = 0);
        return function() {
          return start++;
        };
      },

      // Strings

      string_sequence: function (blueprint, placeholder, start) {
        placeholder || (placeholder = ':n');
        start || (start = 0);
        return function() {
          return blueprint.replace(placeholder, start++);
        };
      },

      string_random: function (length) {
        return function () {
          with (Math) { return floor(random() * pow(36, length)).toString(36); }
        };
      },

      string_random_paragraph: function(n_words, word_length) {
        word_length || (word_length = 7);
        return function () {
          var paragraph = new Array(n_words);
          with (Math) {
            for (var i=0; i<n_words; i++) {
              var len = floor(random() * word_length);
              paragraph[i]= floor(random()*pow(36, len)).toString(36);
            }
          }
          return paragraph.join(' ');
        }
      },

      string_random_combinations: function() {
        var parts = [].slice.call(arguments);
        return function () {
          var result = [], part;
          for (var i=0, _len=parts.length; i<_len; i++) {
            part = parts[i];
            with (Math) { result.push(part[floor(random()*part.length)]); }
          }
          return result.join(' ');
        }
      }

      // Collections

      // Sequences

      // Complex properties (callbacks)

    };

    var FactoryHelpers = {
      array_of: function(number) {
        var result = new Array(number);
        for (var i=0; i<number; i++) {
          result[i] = this();
        }
        return result;
      },
    };

    var FactoryConstructor = function(blueprint) {

      var generate_object = function() {
        var generated = {},
            blue_property;
        for (property in blueprint) if (blueprint.hasOwnProperty(property)) {
          blue_property = blueprint[property];
          if (typeof blue_property == 'function') {
            generated[property] = blueprint[property]();
          } else {
            generated[property] = fix(blue_property);
          }
        }
        return generated;
      }

      return function (override_values) {
        var generated = generate_object();
        return extend(generated, override_values, {overwrite: true});
      }
    };

    var Factory = function(blueprint, user_constructor) {
      if (blueprint['_constructor']) {
        user_constructor = blueprint['_constructor'];
        delete blueprint['_constructor'];
      }
      var generate_instance = FactoryConstructor(blueprint)
      generate_instance = extend(generate_instance, FactoryHelpers);
      if (user_constructor && typeof(user_constructor) == 'function') {
        return function(options) { return user_constructor(generate_instance(options)); };
      } else {
        return generate_instance;
      }
    };

    Factory = extend(Factory, PropertyFactory);
    return Factory;

  })();

  // AJAX mocks

  exports['Request'] = (function() {

    // Route Matching (borrowed from Backbone.js)

    var namedParam   = /:([\w\d]+)/g;
    var splatParam   = /\*([\w\d]+)/g;
    var escapeRegExp = /[-[\]{}()+?.,\\^$|#\s]/g;

    var routeToRegExp = function(route) {
      route = route.replace(escapeRegExp, "\\$&")
                   .replace(namedParam, "([^\/]*)")
                   .replace(splatParam, "(.*?)");
      return new RegExp('^' + route + '$');
    };

    var extractParameters = function(route_regexp, fragment) {
      return route_regexp.exec(fragment).slice(1);
    };

    // Define route handlers

    var defined_routes = [];

    var registerRoute = function(route, verb, handler) {
      route_regexp = routeToRegExp(route);
      defined_routes.push({
        route: route_regexp,
        verb: verb.toLowerCase(),
        param_names: route_regexp.exec(route).slice(1).map(function(p){return p.slice(1);}),
        handler: handler
      });
    };

    // Hijack $.ajax

    var real_ajax = $.ajax;

    $.ajax = function(options) {
      var default_options = {
        type: 'get',
      };
      var relevant_keys = ['complete', 'success', 'error', 'data', 'type', 'url'];
      var relevant_options = extend(extractKeys(options, relevant_keys), default_options);
      relevant_options = fill_with_fn(relevant_options, ['complete', 'success', 'error']);
      var url = relevant_options['url'];

      for (var i=0,_len=defined_routes.length; i<_len; i++) {
        var route_obj = defined_routes[i];
        if (relevant_options.type.toLowerCase() == route_obj.verb
            && url.match(route_obj.route)) {
          var params_array = extractParameters(route_obj.route, url);
          relevant_options.params = buildHash(route_obj.param_names, params_array);
          relevant_options.params = extend(relevant_options.params, relevant_options.data);
          return route_obj.handler(relevant_options);
        }
      }

      // Route not defined, pass through to $.ajax
      real_ajax.apply($, arguments);
    };

    // Interface

    var Request =  function(route, options, handler) {
      var defaults = {
        type: 'get',
        delay: 0,
      };
      if (typeof(options) == 'function') {
        handler = options;
        options = {};
      }
      options || (options = {});
      options = extend(options, defaults);

      registerRoute(route, options.type, function(req) {
        setTimeout(options.delay, handler(req));
      });
    };

    var RequestHelpers = {};
    var verbs = ['get', 'post', 'put', 'delete'];
    for (var i=0,_len=verbs.length; i<_len; i++) {
      (function (verb) {
        RequestHelpers[verb] = function(route, options, handler) {
          if (typeof(options) == 'function') {
            handler = options;
            options = {};
          } else {
            options || (options = {});
          }
          options['type'] = verb;
          return Request(route, options, handler);
        }
      })(verbs[i]);
    }

    return extend(Request, RequestHelpers);
  })();

})(this.Solipsist || (this.Solipsist = {}))
