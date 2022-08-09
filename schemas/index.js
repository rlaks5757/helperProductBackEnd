const mongoose = require("mongoose");

const mongoDB = require("../mongoDB");

const connect = () => {
  if (process.env.NODE_ENV !== "production") {
    mongoose.set("debug", true);
  }
  mongoose.connect(
    mongoDB,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (error) => {
      if (error) {
        console.log("error");
      } else {
        console.log("연결 성공");
      }
    }
  );
};

mongoose.connection.on("error", (error) => {
  console.error("연결 에러", error);
});

mongoose.connection.on("disconnected", () => {
  console.error("연결 끊김");
});

module.exports = connect;
