const  express  = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require('body-parser');
const app = express();

//Make App to serve public
app.use(express.static('public'));
app.use('/images',express.static("images"));

const ConnectDB = require('./config/ConnectDB');
app.use(bodyParser.json({limit:"30mb", extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb", extended:true}));
app.use(cors());
dotenv.config();
ConnectDB();

//Routes
app.use('/auth',require('./routes/AuthRoute'));
app.use('/user',require('./routes/UserRoute'));
app.use('/post',require("./routes/PostRoute"));
app.use('/upload',require("./routes/UploadRoute"));
//Middlewares


const PORT = process.env.PORT || 3500;
mongoose.connection.once('open', () => {
    console.log("MongoDB Database connected !");
    app.listen(PORT, () => {
        console.log(`Server Running on the Port : localhost:${PORT}`);
    });
})