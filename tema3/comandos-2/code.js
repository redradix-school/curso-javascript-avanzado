var Mosca = Class.extend({
  init: function(selector) {
    this.el = $(selector);
    this.left = 50;
    this.top = 50;
  },
  move: function(amount, axis) {
    this[axis] += amount;
    this.el.css({left: this.left + "%",
                 top: this.top + "%"});
  }
});

var Movement = Class.extend({
  init: function(amount, axis) {
    this.amount = amount;
    this.axis = axis;
  },
  execute: function(mosca) {
    mosca.move(this.amount, this.axis);
  },
  undo: function(mosca) {
    mosca.move(-this.amount, this.axis);
  }
});

var ActionQueue = Class.extend({
  init: function(subject) {
    this.commands = [];
    this.subject = subject;
  },
  run: function(command) {
    command.execute(this.subject);
    this.commands.push(command);
  },
  undo: function() {
    var command = this.commands.pop();
    if (command) command.undo(this.subject);
  }
});

var ButtonBar = Class.extend({
  init: function(selector, queue) {
    this.ul = $(selector);
    this.queue = queue;
  },
  append: function(name, command) {
    var action = curry(this.queue.run, command);
    var li = $("<li>")
        .append($('<a/>', {html:name,
                           href:'#',
                           class: "button"}))
        .click(bind(this.queue, action))
        .prependTo(this.ul);
  }
});

var Button = Class.extend({
  init: function(selector, command) {
    this.el = $(selector);
    this.el.click(bind(command, command.execute));
  }
});

var mosca = new Mosca('#mosca'),
    queue = new ActionQueue(mosca),
    buttons = new ButtonBar('#menu', queue);

buttons.append('Derecha', new Movement(5, 'left'));
buttons.append('Izquierda', new Movement(-5, 'left'));
buttons.append('Abajo', new Movement(5, 'top'));
buttons.append('Arriba', new Movement(-5, 'top'));

var undoButton = new Button('#undo', {
  execute: function() {
    queue.undo();
  }
});

