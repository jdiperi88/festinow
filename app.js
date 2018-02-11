const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys')
require('./services/passport')
require('./models/User')

mongoose.connect(keys.mongoURI)

const app = express();




//production environment variable or use 3000 for dev 
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Horrible people listen to my port ${PORT}`);
});