const joi = require('joi');

class Validation {
  constructor(data) {
    this.data = data;
  }
}

class RegisterValidation extends Validation {
  constructor(validationInfo) {
    super(validationInfo);
  }

  schema() {
    return joi.object({
      // businessName: joi.string().min(2).max(30).required(),
      fullName: joi.string().min(2).max(100).required(),

      email: joi
        .string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ['com', 'net', 'org', 'net'] },
        })
        .required()
        .messages({
          'string.empty': ` Email field cannot be empty `,
          'object.regex': 'Email Must Be A Valid Email',
          'string.pattern.base': 'Email Must Be A Valid Email Address',
        }),
      password: joi
        .string()
        .pattern(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'))
        .min(8)
        .max(30)
        .required()
        .label('Password')
        .messages({
          'string.empty': ` password field cannot be empty `,
          'object.regex': 'Must have at least 8 characters',
          'string.pattern.base':
            'Password Must Contain Minimum eight characters,at least one upper case,one lower case letter , one digit and  one special character',
        }),
      phone: joi
        .string()
        .pattern(/^(\+?\d{1,3}[- ]?)?\d{11}$/) // Phone number regular expression pattern
        .messages({
          'string.pattern.base': `phone number must have  11 digits.`,
        }),
      bvn: joi
        .string()
        .pattern(/^\d{10}$/)
        .messages({
          'string.pattern.base': `BNV number must have  10 digits.`,
        }),
    });
  }

  checkValidation() {
    let validateSchema = this.schema();
    return validateSchema.validate(this.data);
  }
}

class LoginValidation extends Validation {
  constructor(validationInfo) {
    super(validationInfo);
  }

  schema() {
    return joi.object({
      email: joi
        .string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ['com', 'net', 'org', 'net'] },
        })
        .required()
        .messages({
          'string.empty': ` Email field cannot be empty `,
          'object.regex': 'Email Must Be A Valid Email',
          'string.pattern.base': 'Email Must Be A Valid Email Address',
        }),
      password: joi
        .string()
        .pattern(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'))
        .min(8)
        .max(30)
        .required()
        .label('Password')
        .messages({
          'string.empty': ` password field cannot be empty `,
          'object.regex': 'Must have at least 8 characters',
          'string.pattern.base':
            'Minimum eight characters,at least one upper case,one lower case letter , one digit and  one special character,',
        }),
    });
  }
  validate() {
    let validateSchema = this.schema();
    return validateSchema.validate(this.data);
  }
}


class ProfileValidator extends Validation {
  constructor(validationInfo) {
    super(validationInfo);
  }

  schema() {
    return joi.object({
      phone: joi
        .string()
        .pattern(/^(\+?\d{1,3}[- ]?)?\d{11}$/) // Phone number regular expression pattern
        .messages({
          'string.pattern.base': `phone number must have  11 digits.`,
        }),
      full_name: joi.string().min(4).max(100).required(),
    });
  }

  validate() {
    let validateSchema = this.schema();
    // console.log(validateSchema);
    return validateSchema.validate(this.data);
  }
}
class EmailValidation extends Validation {
  constructor(validationInfo) {
    super(validationInfo);
  }

  schema() {
    return joi.object({
      email: joi
        .string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ['com', 'net', 'org', 'ng'] },
        })
        .required()
        .messages({
          'string.empty': ` Email field cannot be empty `,
          'object.regex': 'Email Must Be A Valid Email',
          'string.pattern.base': 'Email Must Be A Valid Email Address',
        }),
    });
  }

  validate() {
    let validateSchema = this.schema();
    // console.log(validateSchema);
    return validateSchema.validate(this.data);
  }
}

class PasswordValidation extends Validation {
  constructor(validationInfo) {
    super(validationInfo);
  }

  schema() {
    return joi.object({
      password: joi
        .string()
        .pattern(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'))
        .min(8)
        .max(30)
        .required()
        .label('Password')
        .messages({
          'string.empty': ` password field cannot be empty `,
          'object.regex': 'Must have at least 8 characters',
          'string.pattern.base':
            'Password Must Contain Minimum eight characters,at least one upper case,one lower case letter , one digit and  one special character',
        }),
    });
  }
  validate() {
    let validateSchema = this.schema();
    // console.log(validateSchema);
    return validateSchema.validate(this.data);
  }
}
module.exports = {

  RegisterValidation,
  PasswordValidation,
  ProfileValidator,
  LoginValidation,
  EmailValidation,
};
// return next(createCustomError(response, 400));