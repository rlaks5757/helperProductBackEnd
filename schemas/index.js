const mongoose = require("mongoose");

const connect = () => {
  if (process.env.NODE_ENV !== "production") {
    mongoose.set("debug", true);
  }
  mongoose.connect(
    // "mongodb+srv://rlaks5757:rlaks!153@cluster0.arxzn.mongodb.net/dtsManual?retryWrites=true&w=majority",
    "mongodb+srv://dujin:dujinDTS2@cluster0.xgdtb.mongodb.net/dtsManual?retryWrites=true&w=majority",
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
