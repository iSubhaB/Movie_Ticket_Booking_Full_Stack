const mongoose = require("../../DetaBase/dbConnect");

const movieSchema = new mongoose.Schema({
    poster:{type: String,required: true},
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    releaseDate: {
        type: String, // You can also use Date type if you want actual date objects
        required: true
    },
    totalLikes: {
        type: Number,
        default: 0
    },
    length: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        default: 0
    },
    totalHalls: {
        type: Number,
        default: 0
    }
});

const Movie = mongoose.model("movie_list", movieSchema);

module.exports = Movie;
