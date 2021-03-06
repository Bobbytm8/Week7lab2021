//https://hub.packtpub.com/building-movie-api-express/
let bodyParser = require('body-parser');
let express = require('express');
let mongoose = require('mongoose');
let actors = require('./routers/actor');
let movies = require('./routers/movie');
let app = express();
let print = console.log;

app.listen(8080);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
mongoose.connect('mongodb://localhost:27017/movies', { useUnifiedTopology: true }, function (err) {
    if (err) {
        return console.log('Mongoose - connection error:', err);
    }
    print('Connect Successfully');
});
//Configuring Endpoints
//Actor RESTFul endpoionts 
app.get('/actors', actors.getAll);
app.post('/actors', actors.createOne);
app.get('/actors/:id', actors.getOne);
app.put('/actors/:id', actors.updateOne);
app.put('/actors/:id/:movieId', actors.addMovie);
app.delete('/actors/:id', actors.deleteOne);
app.delete('/actors/:actorId/:movieId', actors.removeMovie);

//Movie RESTFul  endpoints
app.get('/movies', movies.getAll);
app.post('/movies', movies.createOne);
app.get('/movies/:id', movies.getOne);
app.put('/movies/:id', movies.updateOne);
app.delete('/movies/:id', movies.deleteOne);
app.delete('/movies/:movieId/:actorId', movies.removeActor);
app.put('/movies/:movieId/:actorId', movies.addActor);
app.get('/movies/:year1/:year2', movies.getAllYear);