const express = require('express');
const path = require('path');


const errorController = require('./routes/error');
const scrap = require('./routes/scrap');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));

app.use(scrap);

app.use(errorController.get404);

app.listen(3000, function(){
    console.log('connected to port 3000');
});




