import expressJSDocSwagger, { Options } from 'express-jsdoc-swagger';
import { Application } from 'express';
const { PREFIX } = process.env;

import path from 'path';

export const Swagger = async (app: Application) => {
  const options: Options = {
    info: {
      title: 'API REST BACK TODO',
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
    filesPattern: ['../../**/*.ts'],
    swaggerUIPath: PREFIX + '/api-docs',
    exposeSwaggerUI: true,
    exposeApiDocs: false,
    apiDocsPath: PREFIX + '/v3/api-docs',
    notRequiredAsNullable: false,
  };
  expressJSDocSwagger(app)(options);
};
