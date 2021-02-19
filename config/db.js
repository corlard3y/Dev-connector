const mongooose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
    try { 
        await mongooose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true ,
            useCreateIndex:true,
            useFindAndModify: false
        });

        console.log('MongoDB Connected...');
    } catch (err) {
        console.error(err.message);
        
        //Exit
        process.exit(1);
        
    }
};
 
module.exports = connectDB;