/* Modelos */

var Tarea = ProJS.Model.extend({

  // ???

});

var ListaDeTareas = ProJS.Collection.extend({
  model: Tarea,

  // ???

});

ListaDeTareas.mixin(ProJS.Mediable);

/* Vistas */

var VistaTarea = ProJS.View.extend({

  // ???

});

VistaTarea.mixin(ProJS.Mediable);

var VistaApp = ProJS.View.extend({

  // ???

});

VistaApp.mixin(ProJS.Mediable);

/* Init */

$(function() {

  var mediator = new ProJS.Mediator(function (mediator) {

    // ???

  });

});
