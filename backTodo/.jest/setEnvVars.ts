const variableTest = () => {
  /**
   * Manejo de variables para test unitarios
   */
  process.env.PORT = '3000';
  process.env.PREFIX = '/prefix';
  process.env.URI_AUTH = 'http://localhost:3000';
};
module.exports = variableTest;
