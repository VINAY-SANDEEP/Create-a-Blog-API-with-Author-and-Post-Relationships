const ResponseHelper = require('../utils/response');

const errorHandler = (err, req, res, next) => {
  console.error(err);

  // Sequelize Unique Constraint Error
  if (err.name === 'SequelizeUniqueConstraintError') {
    const errors = err.errors.map(e => ({
      field: e.path,
      message: e.message
    }));
    return ResponseHelper.error(res, 'Unique constraint validation failed', 400, errors);
  }

  // Sequelize Validation Error
  if (err.name === 'SequelizeValidationError') {
    const errors = err.errors.map(e => ({
      field: e.path,
      message: e.message
    }));
    return ResponseHelper.error(res, 'Database validation failed', 400, errors);
  }

  // Sequelize Foreign Key Constraint Error
  if (err.name === 'SequelizeForeignKeyConstraintError') {
    return ResponseHelper.error(res, 'Foreign key constraint violation. Ensure referenced resource exists.', 400);
  }

  // Custom HTTP errors (e.g. throwing error with status property)
  const statusCode = err.status || 500;
  const message = err.message || 'Internal Server Error';

  return ResponseHelper.error(res, message, statusCode);
};

module.exports = errorHandler;
