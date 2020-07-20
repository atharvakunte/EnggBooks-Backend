require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

//declaring port

const port = 8000 || process.env.PORT;

//Start the server

app.listen(port, () => {
  console.log(`APP IS RUNNING AT PORT ${port}`);
});

//DB Connection

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB CONNECTED SUCCESSFULLY");
  });

//Import routes

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const subcategoryRoutes = require("./routes/subcategory");
const bookRoutes = require("./routes/book");

//declare middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//Use routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", subcategoryRoutes);
app.use("/api", bookRoutes);
