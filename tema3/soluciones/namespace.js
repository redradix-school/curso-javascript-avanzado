var MiLib = (function(my) {
  my.namespace = function(string, sandbox) {
    var spaces = string.split('.'),
        root = my,
        space;
    while (space = spaces.shift()) {
      root = root[space] || (root[space] = {});
    }
    return sandbox(root);
  };
  return my;
}(MiLib || {}));