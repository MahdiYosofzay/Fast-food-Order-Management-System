const mongoose = require('mongoose');

const dbConnection = async () => {
  try {
    await mongoose
      .connect('mongodb://localhost/dehkadahDB', {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
      })
      .then(() => console.log('connected to mongo server'))
      .catch((err) => console.error('could not connect to mongo server', err));
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

module.exports = dbConnection;
