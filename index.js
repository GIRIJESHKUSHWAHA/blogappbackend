const express = require('express');

const blog = require('./routes/blogs');
const users = require('./routes/users');
const auth = require('./routes/auth');
const app = express();
app.use(express.static('public'));
const cors = require('cors');
app.use(cors());
require('./connection/connection')();

app.use(express.json());

const cookieParser = require('cookie-parser');
app.use(cookieParser());
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage });

app.post("/api/upload", upload.single("file"), function (req, res) {
  const file = req.file;
  res.status(200).json(file.filename);
});



app.use('/api/blog', blog);
app.use('/api/users', users);
app.use('/api/auth', auth);



const PORT = 3000;
app.listen(PORT, () => {
    console.log(`App is listening on port no: ${PORT}`);
})



