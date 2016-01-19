// --- Modelos

var Tarea = ProJS.Model.extend({
  init: function(data) {
    this._super(data);
  },
  defaults: {
    completed: false,
    title: "Tarea sin título",
    visible: true
  },
  validate: function() {
    var title = this.get('title'),
        completed = this.get('completed'),
        valid = (typeof title == "string") &&
                (title.length > 0 && title.length < 100) &&
                (typeof completed == "boolean");
    return valid ? undefined : "Tarea no válida!";
  },
  toggle: function() {
    this.set({completed: !this.get('completed')});
  },
  hide: function() {
    this.set({visible: false});
  },
  show: function() {
    this.set({visible: true});
  }
});

var ListaDeTareas = ProJS.Collection.extend({
  model: Tarea,
  unchecked: function() {
    var i = 0;
    this.each(function(tarea) {
      if (!tarea.get('completed')) i++;
    });
    return i;
  },
  filter: function(fn) {
    this.each(function(tarea) {
      if (fn(tarea.get('completed'))) {
        tarea.show();
      } else {
        tarea.hide();
      }
    });
  },
  showAll: function() {
    this.filter("true".to_f());
  },
  showActive: function() {
    this.filter("!%1".to_f());
  },
  showCompleted: function() {
    this.filter("%1".to_f());
  }
});

ListaDeTareas.mixin(ProJS.Mediable);

// --- Vistas

var SmartView = ProJS.View.extend({
  init: function(options) {
    this._super(options);
    if (this.templateId) {
      this.template = $(this.templateId).html();
    }
    if (this.model) {
      this.model.on("change", bind(this, this.render));
    }
  },
  render: function() {
    var data = this.model.toJSON();
    this.$el.html(_.template(this.template, data));
    return this;
  }
});

SmartView.mixin(ProJS.Mediable);

var VistaTarea = SmartView.extend({
  events: {
    "change .toggle": "toggleDone",
    "click .destroy": "destroy",
    "dblclick": "edit",
    "keydown .edit": "onKeyDown"
  },
  tagName: 'li',
  templateId: "#item-template",
  toggleDone: function(e) {
    this.model.toggle();
    return false;
  },
  destroy: function() {
    this.notify("delete-task", this.model);
    this.$el.remove();
    return false;
  },
  edit: function() {
    this.$el.addClass("editing");
    this.$("input").select();
  },
  normal: function() {
    this.$el.removeClass("editing");
  },
  onKeyDown: function(e) {
    var target = $(e.currentTarget);
    switch (e.keyCode) {
      case 13:
        this.model.set({title: target.val()},
                       {silent: true});
        this.normal();
        this.render();
        break;
      case 27:
        this.normal();
        this.render();
        break;
    }
  },
  render: function() {
    this._super();

    var done = this.model.get('completed'),
        visible = this.model.get('visible');
    this.$el[done ? 'addClass' : 'removeClass']('completed');
    this.$el[visible ? 'show' : 'hide']();

    return this;
  }
});

var AppView = SmartView.extend({
  init: function(options) {
    this._super(options);
    this.model.on('change:completed', bind(this, this.checkCompleted));
    this.model.on('all', bind(this, this.render));
    this.render();
  },
  events: {
    "keydown #new-todo": "add",
    "change #toggle-all": "toggleAll",
    "click .all": "showAll",
    "click .active": "showActive",
    "click .completed": "showCompleted"
  },
  templateId: "#stats-template",
  add: function(e) {
    var target = $(e.currentTarget);
    switch(e.keyCode) {
      //Return or enter
      case 13:
        this.addTask(target.val());
        target.val("");
        break;
      // Escape
      case 27:
        target.val("");
        target.blur();
        break;
    }
  },
  addTask: function(title) {
    this.model.add({title: title});
  },
  toggleAll: function(e) {
    var done = !!$(e.currentTarget).attr("checked");
    this.model.each(function(tarea) {
      tarea.set({completed: done});
    });
  },
  checkCompleted: function() {
    var sinHacer = this.model.unchecked();
    this.$("#toggle-all").attr("checked", (sinHacer === 0));
  },
  showAll: function() {
    this.model.showAll();
  },
  showActive: function() {
    this.model.showActive();
  },
  showCompleted: function() {
    this.model.showCompleted();
  },
  render: function() {
    this.$("#footer").html(
      _.template(this.template, this.model)
    );
  }
});

// --- Init

$(function() {

  var mediator = new ProJS.Mediator(function (mediator) {

    var listaDeTareas = new ListaDeTareas(),
        nodoLista = $("#todo-list"),
        appView = new AppView({el: $("#todoapp"), model: listaDeTareas});

    mediator.add(listaDeTareas);
    mediator.add(appView);

    window.ldt = listaDeTareas;

    listaDeTareas.on('add', function(tarea) {
      var vista = new VistaTarea({model: tarea}).render();
      mediator.add(vista);
      nodoLista.append(vista.el);
    });

    mediator.on('delete-task', function(task) {
      listaDeTareas.remove(task);
    });

  });

});
