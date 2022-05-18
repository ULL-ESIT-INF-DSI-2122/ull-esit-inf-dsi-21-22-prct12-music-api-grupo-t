import {connect} from 'mongoose';

/**
 * If the enviroment variable is not stablished connects to
 * the url
 */
const mongodb_url = process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/music-app';

/**
 * Connects to the Mongo server
 */
connect(mongodb_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
}).then(() => {
  console.log('Connection to MongoDB server established');
}).catch(() => {
  console.log('Unnable to connect to MongoDB server');
});