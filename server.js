const express = require('express')
const bodyParser = require('body-parser')
const cors = require("cors");
var multer = require('multer');
var forms = multer(
    {limits: { fieldSize: 25 * 1024 * 1024 }}
);

const mongoose = require('mongoose')
const dbConfig =    require('./config/config')

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Database connected successfully")
}).catch(err => {
    console.log('Could not connect to the database', err);
    process.exit();
});

const cloudinary = require("cloudinary");
require('dotenv').config()

// Cloudinary configuration settings
// This will be fetched from the .env file in the root directory
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});


const app = express();

app.use(bodyParser.json());
app.use(forms.array()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const TestRoute = require('./routes/test')
app.use('/test', TestRoute)

const PostRoute = require('./routes/post')
app.use('/post', PostRoute)

const UserRoute = require('./routes/user')
app.use('/user', UserRoute)

app.listen(5000, () => {
    console.log("server is listening to port 5000")
})