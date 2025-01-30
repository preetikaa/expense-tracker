const mongoose = require('mongoose')
const colors = require('colors')


const connectDb = async ()=> {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`Server running on ${mongoose.connection.host}`.bgBlue.white);
        
    } catch (error) {
        console.log(`${error}`.bgRed);
    }
}

// const MONGO_URL = process.env.MONGO_URL1 || "mongodb://localhost:27017/mydatabase";


// const connectDb = async () => {
//     try {
//         await mongoose.connect(MONGO_URL, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true
//         });
//         console.log(`Database connected at ${mongoose.connection.host}`.bgBlue.white);
//     } catch (error) {
//         console.error(`Database connection error: ${error.message}`.bgRed);
//         process.exit(1); // Exit process if connection fails
//     }
// };


module.exports = connectDb