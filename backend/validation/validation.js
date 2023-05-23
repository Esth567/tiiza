const joi = require('joi');

class Validation {
  constructor(data) {
    this.data = data;
  }
}

class RegisterValidator extends Validation {
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
          tlds: {allow: ['com', 'net', 'org', 'net']},
        })
        .required()
        .messages({
          'string.empty': ` Email field cannot be empty `,
          'object.regex': 'Email Must Be A Valid Email',
          'string.pattern.base':
            'Email Must Be A Valid Email Address',
        }),
      password: joi
        .string()
        .pattern(
          new RegExp(
            '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$',
          ),
        )
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
      location: joi.string().required(),
    });
  }

  checkValidation() {
    let validateSchema = this.schema();
    return validateSchema.validate(this.data);
  }
}

class LoginValidator extends Validation {
  constructor(validationInfo) {
    super(validationInfo);
  }

  schema() {
    return joi.object({
      email: joi
        .string()
        .email({
          minDomainSegments: 2,
          tlds: {allow: ['com', 'net', 'org', 'net', 'it']},
        })
        .required()
        .messages({
          'string.empty': ` Email field cannot be empty `,
          'object.regex': 'Email Must Be A Valid Email',
          'string.pattern.base':
            'Email Must Be A Valid Email Address',
        }),
      password: joi
        .string()
        .pattern(
          new RegExp(
            '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$',
          ),
        )
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
    return validateSchema.validate(this.data);
  }
}
class EmailValidator extends Validation {
  constructor(validationInfo) {
    super(validationInfo);
  }

  schema() {
    return joi.object({
      email: joi
        .string()
        .email({
          minDomainSegments: 2,
          tlds: {allow: ['com', 'net', 'org', 'ng', 'it']},
        })
        .required()
        .messages({
          'string.empty': ` Email field cannot be empty `,
          'object.regex': 'Email Must Be A Valid Email',
          'string.pattern.base':
            'Email Must Be A Valid Email Address',
        }),
    });
  }

  validate() {
    let validateSchema = this.schema();
    return validateSchema.validate(this.data);
  }
}

class PasswordValidator extends Validation {
  constructor(validationInfo) {
    super(validationInfo);
  }

  schema() {
    return joi.object({
      password: joi
        .string()
        .pattern(
          new RegExp(
            '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$',
          ),
        )
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
    return validateSchema.validate(this.data);
  }
}

class PhoneValidator extends Validation {
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
    });
  }

  validate() {
    let validateSchema = this.schema();
    return validateSchema.validate(this.data);
  }
}

class CardPaymentValidator extends Validation {
  constructor(validationInfo) {
    super(validationInfo);
  }

  schema() {
    return joi.object({
      email: joi
        .string()
        .email({
          minDomainSegments: 2,
          tlds: {allow: ['com', 'net', 'org', 'it']},
        })
        .required(),

      card_number: joi
        .string()

        .pattern(/^[0-9]+$/)
        .messages({
          'string.pattern.base': `Card number must have  15 digits.`, //TODO: change to 15 in production mode
        })
        .min(16)
        .max(20)
        .required(),
      cvv: joi
        .string()
        .pattern(/^\d{3}$/)
        .messages({
          'string.pattern.base': `CVV number must have  3 digits.`,
        })
        .required(),
      amount: joi.number().required(),
      fullname: joi.string().required(),
      phone_number: joi
        .string()
        .pattern(/^(\+?\d{1,3}[- ]?)?\d{11}$/) // Phone number regular expression pattern
        .messages({
          'string.pattern.base': `phone number must have  11 digits.`,
        })
        .required(),
      expiry_month: joi
        .string()
        .pattern(/^\d{2}$/)
        .messages({
          'string.pattern.base': `Expiry month  must have  2 digits.`,
        })
        .required(),
      expiry_year: joi
        .string()
        .pattern(/^\d{2}$/)
        .messages({
          'string.pattern.base': `Expiry  month must have  2 digits.`,
        })
        .required(),
    });
  }

  validate() {
    let validateSchema = this.schema();
    return validateSchema.validate(this.data);
  }
}

class ItemUpdateValidator extends Validation {
  constructor(validationInfo) {
    super(validationInfo);
  }

  schema() {
    return joi.object({
      item_id: joi.number().required(),
      itemType: joi.string().max(10).min(3).required(),
      status: joi.string().max(10).min(3).required(),
      comment: joi.string().max(15).max(200).required(),
    });
  }
  validate() {
    let validateSchema = this.schema();
    return validateSchema.validate(this.data);
  }
}
module.exports = {
  CardPaymentValidator,
  ItemUpdateValidator,
  PasswordValidator,
  RegisterValidator,
  ProfileValidator,
  LoginValidator,
  EmailValidator,
  PhoneValidator,
};
