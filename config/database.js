const mongoose = require("mongoose");
require("dotenv").config();

const dbConnection = async () => {
  try {
    await mongoose
      .connect(process.env.DB_CONNECTION, {
        dbName: "dehkadeh",
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
      })
      .then(() => console.log("connected to mongo server"))
      .catch((err) => console.error("could not connect to mongo server", err));
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

module.exports = dbConnection;
