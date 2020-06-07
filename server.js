const express = require("express");
const morgan = require("morgan");
//const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const passport = require("passport");

const { port } = require("./config");

const app = express();

// Connect Database
connectDB();

// Init Middlewares
app.use(express.json({ extended: false }));
app.use(passport.initialize());
app.use(morgan("dev"));
app.use(bodyParser.json());
// allow your application to be consumed
// app.use(cors());

// Routes
app.get("/", (req, res) => res.send("API Running"));

// Define routes
app.use("/api/users", require("./routes/api/users"));
// app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));

const PORT = port || 3000;

app.listen(PORT, () => console.log(`Server startedon port: ${PORT}`));
