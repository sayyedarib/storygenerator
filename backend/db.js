const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = mongoose.connection;

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("we're connected!");
});