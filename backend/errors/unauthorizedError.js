class UnauthorizedError extends Error {
  constructor(message = "Usuário não autorizado") {
    super(message);
    this.statusCode = 401;
  }
}

module.exports = UnauthorizedError;
