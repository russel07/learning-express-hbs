const validator = require("email-validator");
const User = require("../models/user.model");
const Article = require("../models/article.model");
const mongoose = require("mongoose");
const path = require("path");
const randomstring  = require('randomstring');
module.exports = app => {
    const router = require("express").Router();
    var validator = require("email-validator");
    const User = require("../models/user.model");
    const Article = require("../models/article.model");
    const mongoose = require('mongoose');
    let session;
    //Blog route
    router.get("/", (req, res) => {
        let user = false;
        if(req.session.user && req.session.user.length)
            user = req.session.user;
        Article.find({}).lean()
            .exec()
            .then(results => {
                res.render('blog',{title:'Blog Post', data: results, user: user, show_hero:true});
            })
            .catch(err => {
                console.log(err)
            });
    });
    //Blog route
    router.get("/blog", (req, res) => {
        let user = false;
        if(req.session.user && req.session.user.length)
            user = req.session.user;
        Article.find({}).lean()
            .exec()
            .then(results => {
                res.render('blog',{title:'Blog Post', data: results, user:user, show_hero:true});
            })
            .catch(err => {
                console.log(err)
            });
    });
    //Blog route
    router.get("/dashboard", (req, res) => {
        let user = false;
        if(req.session.user && req.session.user.length){
            user = req.session.user;
            Article.find({}).lean()
                .exec()
                .then(results => {
                    res.render('dashboard',{title:'Blog Post', data: results, user:user, show_hero:false});
                })
                .catch(err => {
                    console.log(err)
                });
            }else{console.log("user is not logged in");
                res.render('login', {layout: 'no_menu.handlebars', title:'Login'});
            }
    });


    //Article route
    app.get("/article/:id", (req, res) => {
        let user = false;
        if(req.session.user && req.session.user.length)
            user = req.session.user;
        Article.findById(req.params.id, (err, article) => {
            if (!err) {
                res.render('article',{title:'Article Post', data: article, user: user, show_hero:true});
            }else {
                res.render('article',{title:'Article Post', data: article, user: user, show_hero:true});
            }
        }).lean();
    });

    //Login route
    app.get("/login", (req, res) => {
        if(req.session.user && req.session.user.length){
            res.redirect('/dashboard');
            res.end();
        }else{
            res.render('login', {layout: 'no_menu.handlebars', title:'Login'});
        }
    });

    //Submit login form route
    app.post("/login", (req, res) => {
        if(req.session.user && req.session.user.length){
            res.redirect('/dashboard');
            res.end();
        }else{
            const email = req.body.email;
            const password = req.body.password;

            let data = {};
            data.valid = false;
            data.hasError = false;
            if(!validator.validate(email)){
                data.email = {
                    'has_error': true,
                    'value': email,
                    'message': "Provided email address is invalid"
                }
                data.hasError = true;
            }else if(password === ''){
                data.password = {
                    'has_error': true,
                    'value': password,
                    'message': "Password can not be blank"
                }
                data.hasError = true;
            }else if(password.length < 8){
                data.password = {
                    'has_error': true,
                    'value': password,
                    'message': "Password must contain minimum 8 characters"
                }
                data.hasError = true;
            }
            if(data.hasError){
                res.render('login', {layout: 'no_menu.handlebars', title:'Login', data: data});
            }
            else{
                User.find({
                    email: email,
                    password: password
                }).lean()
                    .exec()
                    .then(user => {
                        if(user)
                        {
                            session = req.session;
                            session.user = user;
                            res.redirect('/dashboard');
                            res.end();
                        }else {
                            data.hasError = true;
                            res.render('login', {layout: 'no_menu.handlebars', title:'Login', data: data});
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    });
            }
        }
    });

    //Login route
    app.get("/logout", (req, res) => {
        req.session.destroy();
        res.redirect('/blog');
        res.end();
    });

    //Register route
    app.get("/register", (req, res) => {
        if(req.session.user && req.session.user.length){
            res.redirect('/dashboard');
            res.end();
        }else{
            res.render('register', {layout: 'no_menu.handlebars', title:'Register'});
        }
    });

    //Submit register form
    app.post("/register", (req, res) => {
        const first_name = req.body.first_name;
        const last_name = req.body.last_name;
        const email = req.body.email;
        const password = req.body.password;
        const confirm_password = req.body.confirm_password;
        const phone = req.body.phone;
        const company = req.body.company;
        const street = req.body.street;
        const street2 = req.body.street2;
        const city = req.body.city;
        const state = req.body.state;
        const post_code = req.body.post_code;
        const country = req.body.country;
        const tax_id = req.body.tax_id;
        var data = {};
        data.valid = false;
        data.hasError = false;
        if(!validator.validate(email)){
            data.email = {
                'has_error': true,
                'value': email,
                'message': "Provided email address is invalid"
            }
            data.hasError = true;
        }
        else if(password === ''){
            data.password = {
                'has_error': true,
                'value': password,
                'message': "Password can not be blank"
            }
            data.hasError = true;
        }
        else if(password.length < 8){
            data.password = {
                'has_error': true,
                'value': password,
                'message': "Password must contain minimum 8 characters"
            }
            data.hasError = true;
        }
        else if(confirm_password === ''){
            data.confirm_password = {
                'has_error': true,
                'value': confirm_password,
                'message': "Confirm Password can not be blank"
            }
            data.hasError = true;
        }
        else if(confirm_password.length < 8){
            data.confirm_password = {
                'has_error': true,
                'value': password,
                'message': "Confirm Password must contain minimum 8 characters"
            }
            data.hasError = true;
        }
        else if(confirm_password !== password){
            data.password = {
                'has_error': true,
                'value': password,
                'message': "Password and confirm password must be equal"
            }
            data.hasError = true;
        }
        else if(first_name === ''){
            data.first_name = {
                'has_error': true,
                'value': first_name,
                'message': "First Name can not be blank"
            }
            data.hasError = true;
        }
        else if(last_name === ''){
            data.last_name = {
                'has_error': true,
                'value': last_name,
                'message': "Last Name can not be blank"
            }
            data.hasError = true;
        }
        else if(phone === ''){
            data.phone = {
                'has_error': true,
                'value': phone,
                'message': "Phone can not be blank"
            }
            data.hasError = true;
        }
        else if(street === ''){
            data.street = {
                'has_error': true,
                'value': street,
                'message': "Street Address can not be blank"
            }
        }
        else if(city === ''){
            data.city = {
                'has_error': true,
                'value': city,
                'message': "City can not be blank"
            }
            data.hasError = true;
        }
        else if(state === ''){
            data.state = {
                'has_error': true,
                'value': state,
                'message': "State can not be blank"
            }
            data.hasError = true;
        }
        else if(post_code === ''){
            data.post_code = {
                'has_error': true,
                'value': post_code,
                'message': "Post Code can not be blank"
            }
            data.hasError = true;
        }
        else if(country === ''){
            data.country = {
                'has_error': true,
                'value': country,
                'message': "Country can not be blank"
            }
            data.hasError = true;
        }

        if(data.hasError){
            res.render('register', {layout: 'no_menu.handlebars', title:'Register', data: data});
        }
        else{
            const user = new User({
                _id: mongoose.Types.ObjectId(),
                first_name:first_name,
                last_name:last_name,
                email:email,
                phone:phone,
                company:company,
                street_one: street,
                street_two: street2,
                city:city,
                state:state,
                post_code:post_code,
                country:country,
                tax_id:tax_id,
                password:password,
            });
            user.save()
                .then(result => {
                    if(result.length) {
                        session=req.session;
                        session.user=user;
                        res.redirect('/dashboard');
                        res.end();
                    }else{
                        res.render('register', {layout: 'no_menu.handlebars', title:'Register', data: data});
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
    });

    app.get("/add-article-form", (req, res) => {
        let user = false;
        if(req.session.user && req.session.user.length){
            user = req.session.user;
            res.render('add-article',{title:'Add Article', user: user, show_hero:true});
        }else{
            res.redirect('/login');
            res.end();
        }
    });

    app.post('/add_article', (req, res) => {
        if(req.session.user && req.session.user.length){
            let thumbnail = '';
            let author_image = '';
            if(req.files) {
                let temp = req.files.thumbnail;
                let rand_name = randomstring.generate({
                    length: 10,
                    charset: 'alphanumeric'
                });

                rand_name += path.extname(temp.name);

                let upload_file = path.resolve('public'+'/img/articles/'+rand_name)
                thumbnail = 'img/articles/'+rand_name;
                temp.mv(upload_file);

                temp = req.files.author_image;
                rand_name = randomstring.generate({
                    length: 10,
                    charset: 'alphanumeric'
                });

                rand_name += path.extname(temp.name);
                upload_file = path.resolve('public'+'/img/users/'+rand_name)
                author_image = 'img/users/'+rand_name;
                temp.mv(upload_file);
            }
            const article = new Article({
                _id: mongoose.Types.ObjectId(),
                title:req.body.title,
                description:req.body.description,
                thumbnail:thumbnail,
                author:req.body.author,
                author_bio:req.body.author_bio,
                author_image:author_image
            });
            article.save()
                .then(result => {
                    res.redirect('/dashboard');
                    res.end();
                })
                .catch(err => {
                    console.log(err);
                });
        }else{
            res.render('login', {layout: 'no_menu.handlebars', title:'Register'});
        }
    });

    app.get('/delete-article/:id', (req, res) => {
        const rid = req.body.id;

        Article.deleteOne(rid)
            .exec()
            .then(article => {
                res.redirect('/dashboard');
                res.end();
            })
            .catch(err => {
                console.log(err)
            });
    });
    app.use('/', router);
}
