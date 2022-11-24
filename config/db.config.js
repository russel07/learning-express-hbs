//const mongoose = require("mongoose");
const { MongoClient } = require('mongodb');
const client = new MongoClient("mongodb+srv://russel:plAMC71qGKpH5gjU@mytest.hl8n9.mongodb.net/?retryWrites=true&w=majority");
/*mongoose.connect(
    "mongodb+srv://russel:plAMC71qGKpH5gjU@mytest.hl8n9.mongodb.net/?retryWrites=true&w=majority",
    {
        useNewUrlParser: true
    }
);*/

/*const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Connected to MongoDB database")
});*/

client.connect(err => {
    if(err){ console.error(err); return false;}
    // connection to mongo is successful, listen for requests
    app.listen(PORT, () => {
        console.log("listening for requests");
    })
});

module.exports = client;
