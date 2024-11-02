import app from './src/config/app';
import { MongoDB } from './src/config/mongoDB/mongoDB.config';
import { Swagger } from './src/config/swagger/swagger.config';

Swagger(app);
MongoDB();
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
