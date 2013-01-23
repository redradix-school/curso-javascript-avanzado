var AlertCommand = Class.extend({
  init: function(msg) { this.msg = msg; },
  execute: function() {
    alert(this.msg);
  }
});

var LogCommand = Class.extend({
  init: function(msg) { this.msg = msg; },
  execute: function() {
    console.log(this.msg);
  }
});

var ActionList = Class.extend({
  init: function(selector) {
    this.ul = $(selector);
  },
  append: function(name, command) {
    var li = $("<li>")
        .append($('<a/>', {html:name, href:'#'}))
        .click(bind(command, command.execute))
        .appendTo(this.ul);
  }
});

var list = new ActionList('#menu');
list.append('saludo', new AlertCommand("Hola!"));
list.append('Achis!', new LogCommand("Salud!"));
