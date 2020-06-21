const Joi = require('joi');

module.exports = {
  validateBody: (schema) => {
    return (req, res, next) => {
      const result = Joi.validate(req.body, schema, { abortEarly: false });
      if (result.error) {
        return res.status(400).json(result.error);
      }

      if (!req.value) {
        req.value = {};
      }
      req.value['body'] = result.value;
      next();
    };
  },

  schemas: {
    authSchema: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required()
    }),
    registerSchema: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required()
    }),
    profileSchema: Joi.object()
      .keys({
        status: Joi.string().required(),
        skills: Joi.string().required()
      })
      .unknown(true),
    experienceSchema: Joi.object()
      .keys({
        title: Joi.string().required(),
        company: Joi.string().required(),
        from: Joi.date().required(),
        current: Joi.bool().required()
      })
      .unknown(true),
    educationSchema: Joi.object()
      .keys({
        school: Joi.string().required(),
        degree: Joi.string().required(),
        fieldofstudy: Joi.string().required(),
        from: Joi.date().required()
      })
      .unknown(true),
    postSchema: Joi.object().keys({
      text: Joi.string().required()
    }),
    commentsSchema: Joi.object().keys({
      text: Joi.string().required()
    })
  }
};
