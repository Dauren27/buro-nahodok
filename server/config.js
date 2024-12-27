const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config()

const URL = "mongodb+srv://dauren:27112003dauren@cluster0.ns8dtvf.mongodb.net/?retryWrites=true&w=majority"
mongoose.set('strictQuery', true)
const connectToMongo = async () => {
    try {
        let db = await mongoose.connect(URL)
        console.log(db.connection.host);
    } catch (error) {
        console.log(error);
    }

    // const f = await User.find();
    // console.log(f);
}

module.exports = connectToMongo;