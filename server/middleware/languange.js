const config = require('../config');

class Language {
  static set(req, res, next) {
    const lang = req.headers['accept-language'] || 'en';
    config.lang(lang);
    next();
  }
}

module.exports = Language;
