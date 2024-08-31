const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
app.use(express.json());
const connectDB = require('./db/connect');
require('dotenv').config()
app.use(express.static('./public'));
const notfound = require('./middleware/notfound');
const errorhandler = require('./middleware/errorhandler');


app.use('/api/v1/tasks',tasks);
app.use(notfound);
app.use(errorhandler);

const port = process.env.PORT || 3000;

const start = async ()=>{
    try {
        await connectDB(process.env.MONGO_URL);
        app.listen(port,console.log(`server is listening on port ${port}`));
    } catch (error) {
        console.log(error);
    }
}
start();

