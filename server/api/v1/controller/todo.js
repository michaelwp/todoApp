const { t } = require('localizify');
const { todo } = require('../../../model');

class Todo {
  static create(req, res, next) {
    const { title } = req.body;

    todo
      .create({
        title: title.toLowerCase(),
        user: req.userId,
      })
      .then((response) => {
        res.status(201).json({
          code: 1,
          message: t('created {n}', { n: t('successfully') }),
          data: {
            id: response._id,
            title: response.title,
            status: response.status,
          },
        });
      })
      .catch(next);
  }

  static user(req, res, next) {
    const { q, filter } = req.query;

    let f = {};

    if (filter === undefined || filter.toLowerCase() === 'all') {
      f = { title: { $regex: q, $options: 'i' } };
    } else {
      f = { title: { $regex: q, $options: 'i' }, status: filter.toLowerCase() };
    }

    todo
      .find(f)
      .populate('user', 'name email')
      .select('_id title status')
      .then((response) => {
        res.status(200).json({
          code: 1,
          message: 'todo',
          data: response,
        });
      })
      .catch(next);
  }

  static view(req, res, next) {
    todo
      .findById(req.params.id)
      .populate('user', 'name email')
      .select('_id title status')
      .then((response) => {
        const responseData = {
          code: 0,
          message: t('{n}, not found', { n: 'Data' }),
          data: null,
        };

        if (response !== null) {
          responseData.code = 1;
          responseData.message = 'Todo';
          responseData.data = response;
        }

        res.status(200).json({
          code: responseData.code,
          message: responseData.message,
          data: responseData.data,
        });
      })
      .catch(next);
  }

  static update(req, res, next) {
    const { title, status } = req.body;

    if (title === undefined) {
      res.status(400).json({
        code: 0,
        message: t('{n} is required', { n: 'Title' }),
        data: null,
      });

      return;
    }

    if (status === undefined) {
      res.status(400).json({
        code: 0,
        message: t('{n} is required', { n: 'Status' }),
        data: null,
      });

      return;
    }

    todo
      .findByIdAndUpdate(req.params.id, {
        title: title.toLowerCase(),
        status: status.toLowerCase(),
      })
      .populate('user', 'name email')
      .select('_id title status')
      .then((response) => {
        res.status(200).json({
          code: 1,
          message: t('updated {n}', { n: t('successfully') }),
          data: response,
        });
      })
      .catch(next);
  }

  static remove(req, res, next) {
    todo
      .findByIdAndDelete(req.params.id)
      .select('_id title status')
      .then((response) => {
        const responseData = {
          code: 0,
          message: t('{n}, not found', { n: 'Data' }),
          data: null,
        };

        if (response != null) {
          responseData.code = 1;
          responseData.message = t('deleted {n}', { n: t('successfully') });
          responseData.data = response;
        }

        res.status(200).json({
          code: responseData.code,
          message: responseData.message,
          data: responseData.data,
        });
      })
      .catch(next);
  }
}

module.exports = Todo;
