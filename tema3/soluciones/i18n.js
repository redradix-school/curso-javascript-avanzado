var I18n = (function() {
  var locales = {},
      instancia;

  var I18n = Class.extend({
    init: function(locale) {
      this.locale = locale;
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
    locales[locale] = dict;
  };

  I18n.withCurrentLocale = function() {
    if (!instancia) {
      instancia = new this(Config.locale);
    }
    return instancia;
  };

  return I18n;
}());
