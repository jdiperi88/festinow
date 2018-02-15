const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({

    facebook: {
        id: String,
        email: String,
        name: String,
    },

    google: {
        id: String,
        email: String,
        name: String,
    },
    
})




mongoose.model('users', userSchema);