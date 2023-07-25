//Declare an express app
const dotenv = require('dotenv');
dotenv.config({ path: '.env' });

const mongoose = require('mongoose');
const app = require('./app');

const PORT = process.env.PORT || 8080;

const DB_CONNECTION = process.env.DB_CONNECTION_STRING?.replace(
  '<password>',
  process.env.DB_PASSWORD
);

/* Database Connection to Mongo */
mongoose.connect(DB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Database connection established!');
});

//listen on pot 8080 and log out a msg on the console
app.listen(PORT, console.log(`Server started on port: ${PORT}`));
