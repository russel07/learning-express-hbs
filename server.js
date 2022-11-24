const express = require('express'),
    exphbs  = require('express-handlebars'),
    bodyParser = require('body-parser'),
    path = require('path'),
    port = 8000,
    app = express(),
    fileUpload = require('express-fileupload'),
    cookieParser = require("cookie-parser"),
    sessions = require('express-session');

const oneDay = 1000 * 60 * 60 * 24;
app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.engine('handlebars', exphbs({
    helpers: {
        shortDesc: function () { return this.description.slice(0, 50) + '...'; },
        shortBio: function () { return this.author_bio.slice(0, 50) + '...'; },
    },
    defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

// enable files upload
app.use(fileUpload({
    createParentPath: true
}));

//session middleware
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));

// cookie parser middleware
app.use(cookieParser());

require("./config/db.config");

//Include route
require("./controllers/mainController")(app);

app.listen(port, ()=>{
    console.log(`server running on port: ${port}`);
});
