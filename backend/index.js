const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
app = express(); 
const authRoute = require("./routes/auth");
const categoryRoute = require("./routes/categoryRoute"); 
const blogRoute = require("./routes/blogRoute");
const userRoute = require("./routes/userRoute")
const cors = require("cors");
const multer = require("multer");
const path = require("path");

dotenv.config(); 
app.use(express.json());
app.use(cors());
app.use("/images", express.static(path.join(__dirname, "/images")));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

mongoose.connect(process.env.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(console.log("MongoDB Connected!")).catch((err) => console.log(err)); 


// Routers
app.use("/api/auth/", authRoute); 
app.use("/api/category/", categoryRoute); 
app.use("/api/blog/", blogRoute); 
app.use("/api/users/", userRoute);

app.listen("5000", () => {
  console.log("Server is Running on 5000"); 
})