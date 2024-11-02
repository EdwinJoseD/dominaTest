const variableTest = () => {
  /**
   * Manejo de variables para test unitarios
   */
  process.env.PORT = '3000';
  process.env.PREFIX = '/prefix';
  process.env.KEYCLOAK_HOSTNAME = 'http://localhost:3000/v1/request';
  process.env.JWT_SECRET = 'secretTest';
};
module.exports = variableTest;
