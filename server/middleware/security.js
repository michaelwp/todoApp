const jwt = require('jsonwebtoken');
const { t } = require('localizify');

const key = process.env.KEY;
const expiresIn = 60 * 60 * 24 * 7;
const bcrypt = require('bcrypt');

const saltRounds = 10;

class Security {
  static jwtSign(payload) {
    // token will expires in 7 days
    return new Promise((resolve, reject) => {
      jwt.sign({ payload }, key, { expiresIn }, (err, token) => {
        if (err) {
          reject(err);
        } else {
          resolve(token);
        }
      });
    });
  }

  static jwtVerify(token) {
    return new Promise((resolve) => {
      jwt.verify(token, key, (err, decoded) => {
        if (err) {
          resolve({
            code: 0,
            message: err.name,
            data: err.message,
          });
        } else {
          resolve({
            code: 1,
            message: '',
            data: decoded,
          });
        }
      });
    });
  }

  static async checkToken(req, res, next) {
    if (req.headers.authorization === undefined) {
      res.status(401).json({
        code: 0,
        message: t('{n} is required', { n: 'Token' }),
        data: null,
      });
    } else {
      const token = req.headers.authorization.split(' ')[1];
      const { code, message, data } = await Security.jwtVerify(token);

      if (code === 1) {
        req.userId = data.payload;
        next();
      } else {
        res.status(401).json({ code, message, data });
      }
    }
  }

  static bcryptHash(plainText) {
    return new Promise((resolve, reject) => {
      bcrypt.hash(plainText, saltRounds, (err, hash) => {
        if (err) {
          reject(err);
        } else {
          resolve(hash);
        }
      });
    });
  }

  static bcryptCompare(plainText, hash) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(plainText, hash, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
}

module.exports = Security;
