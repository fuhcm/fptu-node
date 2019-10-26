const Joi = require("@hapi/joi");
const validateMiddleware = require("utils/handlers/validate.middleware");

const postSchema = Joi.object({
  title: Joi.string()
    .min(20)
    .required(),
  categories: [Joi.string().optional(), Joi.allow(null)],
  thumbnail: Joi.string()
    .min(10)
    .required(),
  description: Joi.string()
    .min(50)
    .required(),
  content: Joi.string()
    .min(200)
    .required()
});

const putSchema = Joi.object({
  content: Joi.string()
    .min(200)
    .required()
});

const postValidator = validateMiddleware(postSchema);
const putValidator = validateMiddleware(putSchema);

module.exports = { postValidator, putValidator };
