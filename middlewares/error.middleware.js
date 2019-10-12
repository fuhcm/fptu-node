function errorMiddleware(err, _, res, next) {
  function handleError(res) {
    const isDevelopment = process.env.ENVIRONMENT !== "production";

    const errorResponse = {
      message: err instanceof Error ? err.toString() : err,
      stack: err.stack && typeof err.stack === "string" && err.stack
    };

    const hiddenError = {
      message: "Unexpected error, please contact support!"
    };

    res.status(400).send(isDevelopment ? errorResponse : hiddenError);

    return false;
  }

  return err ? handleError(res) : next();
}

module.exports = errorMiddleware;
