var R = (function(my) {

  function isPromise(objOrPromise) {
    return (objOrPromise instanceof my.Deferred) || (objOrPromise instanceof Promise);
  }

  Promise = R.Class.extend({
    init: function(deferred) {
      this.deferred = deferred;
    },
    then: function() {
      return this.deferred.then.apply(this.deferred, arguments);
    }
  });

  my.Deferred = R.Class.extend({
    init: function() {
      R.augment(this, {
        _promise: new Promise(this),
        _pending: true,
        _state: undefined,
        _suc: [],
        _fail: []
      });
    },
    _invoke: function(list, args) {
      this._pending = false;
      this._values = args;
      // aseguramos que se ejecute en el siguiente turno del event loop
      setTimeout(R.bind(this, function() {
        for (var i=0, _len=this[list].length; i<_len; i++) {
          this[list][i].apply({}, args);
        }
        this[list] = [];
      }), 0);
    },
    resolve: function() {
      this._state = true;
      this._invoke("_suc", arguments);
    },
    reject: function() {
      this._state = false;
      this._invoke("_fail", arguments);
    },
    promise: function() {
      return this._promise;
    },
    then: function(suc, fail) {
      /* La promesa a devolver */
      var nextDeferred = new my.Deferred();
      /* En caso de OK, promsesa o valor convertido en promesa */
      this._suc.push(function() {
        try {
          var val = suc.apply({}, arguments);
          if (isPromise(val)) {
            val.then(
              R.bind(nextDeferred, nextDeferred.resolve),
              R.bind(nextDeferred, nextDeferred.reject)
            );
          } else {
            nextDeferred.resolve.apply(nextDeferred, arguments);
          }
        } catch (e) {
          nextDeferred.reject(e);
        }
      });
      /* En caso de Error, captura o en cascada */
      this._fail.push(fail || function() {
        /* better with bind */
        nextDeferred.reject.apply(nextDeferred, arguments);
      });
      /* Actualiza si ya está resuelto */
      if (!this._pending) {
        this[this._state ? "resolve" : "reject"].apply(this, this._values);
      }
      /* La promesa */
      return nextDeferred.promise();
    }
  });

  my.Deferred.when = function() {
    var valsOPros = [].slice.call(arguments),
        resultados = new Array(valsOPros.length),
        resueltos = 0,
        rechazada = false,
        defer = new my.Deferred();

    function chequearTodosResueltos() {
      if (!rechazada && resueltos == valsOPros.length) {
        /* Aplanamos la lista de resultados */
        resultados = resultados.reduce(function(acc, v) {
          return acc.concat(v);
        }, []);
        /* Se resuelve la promesa final */
        defer.resolve.apply(defer, resultados);
      }
    }

    for (var i=0, _len=valsOPros.length; i < _len; i++) {
      if (isPromise(valsOPros[i])) {

        /* ??? */

      } else {

        /* ??? */

      }
    }

    /* ¿Hemos terminado? Tal vez eran todo valores */
    chequearTodosResueltos();
    /* La promesa que hemos generado */
    return defer;
  };


  return my;

}(R || {}));

/* Código de prueba */

$(function() {

  function newPromiseButton() {
    var el = $($("#prompt-item").html()),
        defer = new R.Deferred();
    el.find(".success").click(R.bind(defer, defer.resolve));
    el.find(".alert").click(R.bind(defer, defer.reject));
    el.appendTo("#promesas");
    defer.then(function() {
      el.html('<div class="panel"> <strong> Resuelta! </strong> </div>');
    }, function() {
      el.html('<div class="panel"> Rechazada...</div>');
    })
    return defer;
  }

  /* El caso de ejemplo */

  var p1 = newPromiseButton(),
      p2 = newPromiseButton(),
      p3 = newPromiseButton();

  R.Deferred.when(p1, p2, p3).then(function() {
    alert("Todas OK!");
  }, function() {
    alert("Algo ha fallado...");
  });


});
