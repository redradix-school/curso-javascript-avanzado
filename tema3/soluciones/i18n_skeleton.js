var I18n = (function() {
  // ???

  var I18n = Class.extend({
    init: function(locale) {
      // ???
    },
    translate: function(path) {
      var position = locales[this.locale],
        path = path.split('.'),
        currentPath;
      while (currentPath = path.shift()) {
        position = position[currentPath];
      }
      return position;
    }
  });

  I18n.addTranslation = function(locale, dict) {
    // ???
  };

  I18n.withCurrentLocale = function() {
    // ???
  };

  return I18n;
}());
