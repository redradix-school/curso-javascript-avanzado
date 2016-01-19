function throttle(fn, delay) {
  var last = 0;
  return function() {
    var now = new Date();
    if (now - last > delay) {
      last = now();
      return fn.apply(this, arguments);
    }
  }  
}

function debounce(fn, delay) {
  var timeout;
  return function() {
    var args = arguments;
    if (timeout) {clearTimeout(timeout);}
    timeout = setTimeout(function() {
      return fn.apply(this, args); 
    }.bind(this), delay);
  }
}

function compose() {
  var fns = Array.slice.call(arguments, 0); 

  return function() {
    var result = arguments[0], fn;
    for (var i=fns.length;i--;) {
      fn = fns[i];
      result = fn(result);
    }  
    return result;
  }
}
