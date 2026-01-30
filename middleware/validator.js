const { body, validationResult } = require('express-validator')
const userRules = () => {
  return [
    body('firstName').isLength({ min: 2 }).withMessage('The name must be minimumt 3 characters'),
    body('lastName').isLength({ min: 2 }).withMessage('The last name must be minimum 3 characters'),
    body('email').isEmail().withMessage('The email mus have the email estructure(x.@x.com)'),
  ]
}

const productRules = () => {
  return [
    body('name').isLength({ min: 2 }).withMessage('The name of the product must be minimum 2 characters'),
    body('maker').isLength({ min: 2 }).withMessage('The maker name of the product must be minimum  2 characters'),
    body('country').isLength({ min: 3 }).withMessage('The country of origin of the product must be minimum  2 characters'),
    body('description').isLength({ min: 4 }).withMessage('The description most have minimum 2 words'),
    body('price').isFloat().withMessage('The price most be a number'),
    body('stock').isInt().withMessage('The stock most be a integer number'),
    body('category').isLength({ min: 2 }).withMessage('The category of the product must be minimum  2 characters'),
  ]
}

const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(500).json({
    errors: extractedErrors,
  })
}

module.exports = {
  userRules,
  productRules,
  validate
}