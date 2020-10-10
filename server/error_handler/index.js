const { t } = require('localizify');

const errorHandler = (err, req, res, next) => {
  const errMsg = err.errmsg;

  const response = {
    code: 0,
    message: err.message,
    data: null,
  };

  if (err.name === 'CastError') {
    res.status(400).json(response);
  } else if (err.name === 'ValidationError') {
    res.status(400).json(response);
  } else if (err.code === 11000) {
    if (/duplicate key/.test(errMsg)) {
      if (/email/.test(errMsg)) {
        response.message = t('{n} already registered', { n: 'email' });
        res.status(200).json(response);
      } else if (/title/.test(errMsg)) {
        response.message = t('{n} already registered', { n: 'title' });
        res.status(200).json(response);
      } else {
        response.message = t('internal server error');
        res.status(500).json(response);
      }
    }
  } else {
    response.message = errMsg;
    res.status(err.code).json(response);
  }
};

module.exports = errorHandler;
