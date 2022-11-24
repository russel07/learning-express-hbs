const mongoose = require("mongoose");
mongoose.connect(
    "mongodb+srv://russel:plAMC71qGKpH5gjU@mytest.hl8n9.mongodb.net/?retryWrites=true&w=majority",
    {
        useNewUrlParser: true
    }
);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Connected to MongoDB database")
});

module.exports = db;
