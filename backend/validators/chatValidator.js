const Joi = require("joi");
exports.sendMessageSchema = Joi.object({
  message: Joi.string().min(1).max(4000).required()
});
