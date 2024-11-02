import app from './src/config/app';
import { MongoDB } from './src/config/mongoDB/mongoDB.config';
import { Swagger } from './src/config/swagger/swagger.config';

Swagger(app);
MongoDB();

app.listen(3333, () => {
  console.log('Server started on port 3333!');
});
