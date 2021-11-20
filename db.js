/*
const config = require('.env');
const mongoose = require('mongoose')
const URI = config.get('MONGODB_URL')

const connectDB = async() => {

    try {
        await mongoose.connect(URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB Connected.')
    } catch (e) {
        console.error("amanan"+e.message);
        // Exit process with failure
        process.exit(1);
    }
}
module.exports = connectDB()*/
