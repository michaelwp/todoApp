const { default: localizify } = require('localizify');

const en = require('./lang/en.json');
const id = require('./lang/id.json');

const localLang = localizify.add('en', en).add('id', id);

class Config {
  static lang(lang) {
    localLang.setLocale(lang);
  }
}

module.exports = Config;
