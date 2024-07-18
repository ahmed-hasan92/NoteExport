const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connection = require("./dataBase");
const errorHandler = require("./middleware/errorHandler");
const notFound = require("./middleware/notFound");
const userRoutes = require("./api/user/user.routes");
const noteRoutes = require("./api/note/note.routes");
const passport = require("passport");
const { jwtStrategy, localStrategy } = require("./middleware/passport");
require("dotenv").config();
const port = process.env.Port;
const corsOptions = {
  origin: "*",
  methods: "GET,POST,PUT,DELETE,PATCH",
  credentials: true,
};
const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors(corsOptions));
app.use(passport.initialize());
passport.use("local", localStrategy);
passport.use("jwt", jwtStrategy);

app.use("/api", userRoutes);
app.use("/api", noteRoutes);

app.use(errorHandler);
app.use(notFound);
connection();
app.listen(port, () => {
  console.log(`This app is running on port: ${port}`);
});
