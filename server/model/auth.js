const mongoose = require('mongoose');
const { t } = require('localizify');
const security = require('../middleware/security');

const authSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, t('{n} is required', { n: t('name') })],
      maxlength: [30, t('{n} {x} {m} characters', { n: t('name'), x: 'max', m: 30 })],
    },
    email: {
      type: String,
      required: [true, t('{n} is required', { n: t('email') })],
      unique: [true, t('{n} already registered', { n: t('email') })],
      validate: {
        validator(email) {
          const emailRegex = /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/;
          return emailRegex.test(email);
        },
        message: t('{n} is not valid', { n: 'email' }),
      },
    },
    password: {
      type: String,
      required: [true, t('{n} is required', { n: t('password') })],
      minlength: [8, t('{n} {x} {m} characters', { n: t('password'), x: 'min', m: 8 })],
      validate: {
        validator(password) {
          const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
          return passwordRegex.test(password);
        },
        message: t('{n} must contain at least {m}', {
          n: t('password'),
          m: `1 ${t('number')}, ${t('letter')}, ${t('symbol')}, ${t('uppercase')} and ${t(
            'lowercase'
          )}`,
        }),
      },
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);

// hook pre save, encrypt password before save
authSchema.pre('save', async function (next) {
  this.password = await security.bcryptHash(this.password);
  next();
});

const Auth = mongoose.model('Auth', authSchema);

module.exports = Auth;
