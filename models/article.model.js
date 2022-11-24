const mongoose = require('mongoose');

let ArticleSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {
        type: String,
        required: 'Please enter article title.'
    },
    description: {
        type: String,
        required: 'Please enter article description.'
    },
    thumbnail: {
        type: String,
        required: 'Please enter thumbnail image.'
    },
    author: {
        type: String,
        required: 'Please enter author name.'
    },
    author_bio: {
        type: String,
        required: 'Please enter author bio.'
    },
    author_image: {
        type: String,
        required: 'Please enter author image'
    }
});

let ArticleModel = mongoose.model("Article", ArticleSchema);
module.exports = ArticleModel;
