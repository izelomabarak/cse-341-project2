const { body, validationResult } = require('express-validator')
const userRules = () => {
  return [
    body('firstName').isLength({ min: 2 }),
    body('lastName').isLength({ min: 2 }),
    body('email').isEmail(),
  ]
}

const productRules = () => {
  return [
    body('name').isLength({ min: 2 }),
    body('maker').isLength({ min: 2 }),
    body('country').isLength({ min: 2 }),
    body('description').isLength({ min: 3 }),
    body('price').isLength({ min: 1 }),
    body('stock').isLength({ min: 1 }),
    body('category').isLength({ min: 1 }),
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