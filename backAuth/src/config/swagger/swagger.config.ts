import expressJSDocSwagger, { Options } from 'express-jsdoc-swagger';
import { Application } from 'express';
const { PREFIX } = process.env;

export const Swagger = async (app: Application) => {
  const options: Options = {
    info: {
      title: 'API REST BACK AUTH',
      version: '1.0.0',
      description: 'api rest for Domina',
    },
    security: {
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
      },
    },
    baseDir: __dirname,
    filesPattern: ['./src/**/*.js', './src/**/*.ts', './dist/src/**/*.js'],
    swaggerUIPath: PREFIX + '/api-docs',
    exposeSwaggerUI: true,
    exposeApiDocs: true,
    apiDocsPath: PREFIX + '/v3/api-docs',
    notRequiredAsNullable: false,
  };
  expressJSDocSwagger(app)(options);
};
