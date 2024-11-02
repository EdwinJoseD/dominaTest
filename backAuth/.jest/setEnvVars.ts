const variableTest = () => {
  /**
   * Manejo de variables para test unitarios
   */
  process.env.PORT = '3000';
  process.env.PREFIX = '/prefix';
  process.env.JWT_SECRET = 'secretTest';
};
module.exports = variableTest;
