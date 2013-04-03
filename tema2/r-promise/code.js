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
      /* ??? */
    },
    resolve: function() {
      this._state = true;
      /* ??? */
    },
    reject: function() {
      this._state = false;
      /* ??? */
    },
    promise: function() {
      return this._promise;
    },
    then: function(suc, fail) {
      /* Diferido para controlar la respuesta a devolver */
      var nextDeferred = new my.Deferred();

      /* ??? */

      if (this._state !== undefined) {
        this[this._state ? "resolve" : "reject"].apply(this, this._values);
      }
      /* La promesa a devolver */
      return nextDeferred.promise();
    }
  });

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

  /* Primero que funcione esto */

  newPromiseButton().then(function() {
    alert("Muy bien");
  }, function() {
    alert("Vaya por Dios...");
  });

  /* Esto para un segundo paso */
  /*

  newPromiseButton().then(function() {
    return newPromiseButton();
  }).then(function() {
    return newPromiseButton();
  }).then(function() {
    return newPromiseButton();
  }).then(function() {
    alert("Todo OK!");
  }, function() {
    alert("Oh, oh...");
  });

  */

});
