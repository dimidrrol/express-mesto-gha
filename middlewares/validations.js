const { celebrate, Joi } = require('celebrate');
const { ObjectId } = require('mongoose').Types;

const validateUrlRegex = /^(http|https):\/\/(?:www\.)?[a-zA-Z0-9\-._~:/?#\[\]@!$&'()*+,;=]+#?$/;

const validateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(validateUrlRegex)
  }).unknown(true)
});

const validateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(validateUrlRegex),
    email: Joi.string().email().required(),
    password: Joi.string().required()
  }).unknown(true)
});

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  }).unknown(true)
});

const validateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(validateUrlRegex)
  }).unknown(true)
});

const validateProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required()
  }).unknown(true)
});

const validateId = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().custom((value, helpers) => {
      if (ObjectId.isValid(value)) {
        return value;
      }
      return helpers.message('Неправильный id');
    })
  }).unknown(true)
});

module.exports = {
  validateCard,
  validateAvatar,
  validateLogin,
  validateProfile,
  validateUser,
  validateId
}