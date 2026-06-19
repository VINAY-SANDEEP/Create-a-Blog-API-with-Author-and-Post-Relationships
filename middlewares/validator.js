const { body, validationResult } = require('express-validator');
const ResponseHelper = require('../utils/response');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map(err => ({
      field: err.path,
      message: err.msg
    }));
    return ResponseHelper.error(res, 'Validation failed', 400, formattedErrors);
  }
  next();
};

const authorValidationRules = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isString().withMessage('Name must be a string'),
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email address')
];

const postValidationRules = [
  body('title')
    .trim()
    .notEmpty().withMessage('Title is required')
    .isString().withMessage('Title must be a string'),
  body('content')
    .trim()
    .notEmpty().withMessage('Content is required')
    .isString().withMessage('Content must be a string'),
  body('author_id')
    .notEmpty().withMessage('author_id is required')
    .isInt({ min: 1 }).withMessage('author_id must be a valid positive integer')
];

const postUpdateValidationRules = [
  body('title')
    .optional()
    .trim()
    .notEmpty().withMessage('Title cannot be empty')
    .isString().withMessage('Title must be a string'),
  body('content')
    .optional()
    .trim()
    .notEmpty().withMessage('Content cannot be empty')
    .isString().withMessage('Content must be a string'),
  body('author_id')
    .optional()
    .isInt({ min: 1 }).withMessage('author_id must be a valid positive integer')
];

module.exports = {
  validate,
  authorValidationRules,
  postValidationRules,
  postUpdateValidationRules
};
