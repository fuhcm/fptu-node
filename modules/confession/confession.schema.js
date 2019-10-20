const Joi = require("@hapi/joi");
const validateMiddleware = require("utils/handlers/validate.middleware");

const confessionSendSchema = Joi.object({
  content: Joi.string()
    .min(10)
    .required(),
  senderID: Joi.string().required(),
  pushID: [Joi.string().optional(), Joi.allow(null)],
  captcha: Joi.string().required()
});

const confessionGetBySchema = Joi.object({
  senderID: Joi.string().required()
});

const confessionSendValidator = validateMiddleware(confessionSendSchema);
const confessionGetByValidator = validateMiddleware(confessionGetBySchema);

module.exports = { confessionSendValidator, confessionGetByValidator };
