function errorHandler(err, req, res, next) {
  console.error('[Error]', err.stack || err.message || err);
  const status = err.status || 500;
  res.status(status).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
}

module.exports = errorHandler;
