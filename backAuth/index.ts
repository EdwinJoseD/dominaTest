import app from './src/config/app';
import { MongoDB } from './src/config/mongoDB/mongoDB.config';

MongoDB();

app.listen(3333, () => {
  console.log('Server started on port 3333!');
});
