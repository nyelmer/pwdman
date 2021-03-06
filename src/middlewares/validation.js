const Joi = require("joi");

const registerValidation = (userObj) => {
    const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().min(6).required()
    });

    let {error} = schema.validate(userObj);
    return error
}

module.exports = {
    registerValidation
}