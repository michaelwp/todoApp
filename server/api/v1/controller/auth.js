const { t } = require('localizify');
const { auth } = require('../../../model');
const { security } = require('../../../middleware');

class Auth {
  static async register(req, res, next) {
    const { name, email, password } = req.body;

    auth
      .create({
        name,
        email,
        password,
      })
      .then((response) => {
        res.status(200).json({
          code: 1,
          message: 'register',
          data: response,
        });
      })
      .catch(next);
  }

  static login(req, res, next) {
    const { email, password } = req.body;

    auth
      .findOne({
        email,
      })
      .then(async (response) => {
        const responseData = {
          code: 0,
          message: t('{n}, not found', { n: `email/${t('password')}` }),
          data: null,
        };

        if (response !== null) {
          // compare password
          const isPassword = await security.bcryptCompare(password, response.password);

          if (isPassword) {
            responseData.code = 1;
            responseData.message = t('login {n}', { n: t('successfully') });
            const token = await security.jwtSign(response.id);
            responseData.data = { token };
          }
        }

        res.status(200).json(responseData);
      })
      .catch(next);
  }
}

module.exports = Auth;
