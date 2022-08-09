const express = require("express");
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");

const connect = require("./schemas");

const projectInfoRouter = require("./routes/projectInfo");
const projectManualRouter = require("./routes/projectManual");

const app = express();

connect();

app.use(cors());

app.set("port", process.env.PORT || 8000);

app.use(morgan("dev"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json({ limit: 500000000 }));
app.use(express.urlencoded({ extended: false }));

//Router Area Start
app.use("/projectInfo", projectInfoRouter);
app.use("/projectManual", projectManualRouter);
//Router Area Finish

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "빈 포트에서 대기 중");
});
