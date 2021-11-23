const { render } = require('ejs');
const express = require('express');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mongoose_db', {useNewUrlParser: true});

const {AnimalModel} = require( './models/animalModel' );

const app = express();

app.set( 'views', __dirname + '/views' );
app.set( 'view engine', 'ejs' );

app.use( express.urlencoded({extended:true}) );

app.get('/', function(request, response){
    AnimalModel
        .findAllAnimals()
        .then( result =>{
            if( result === null ){
                throw new Error("There are no animals in the database");
            }
            response.render('index', { found: true, animals: result});
        })
        .catch(error =>{
            console.log( error );
            response.render( 'index', {found: false});
        });
});

app.get('/new', function(request, response){
    response.render('add');
});


app.get('/:id', function(request, response){
    var id = request.params.id;
    AnimalModel
        .getAnimalById(id)
        .then( data => {
            console.log( data );
            response.render( 'info', { animal : data } );
        });  
});

app.post('/add', function(request, response){
    const animal = request.body.animal;
    const animalId = request.body.id;
    
    const newAnimal = {
        animal,
        animalId
    };

    AnimalModel
        .addAnimal( newAnimal )
        .then( result =>{
            console.log(result)
        })
        .catch( err =>{
            console.log("Something went wrong!");
            console.log(err);
        })
    response.redirect('/');
});

app.get('/edit/:id', function(request, response){
    var id = request.params.id;
    response.render('update', {id: id});
    console.log(id);
});

app.post('/edit/:id', function( request, response){
    const animal = request.body.animal;
    const animalId = request.params.id;
    
    console.log(animalId);

    const newAnimal={
        animal,
        animalId
    }

    AnimalModel
        .update(animalId, newAnimal)
        .then( result =>{
            console.log(result);
        })
        .catch( err =>{
            console.log(err);
        })
    response.redirect('/');
});

app.post( '/destroy/:id', function( request, response ){
    var animalId = Number(request.params.id);
    console.log(animalId);
    AnimalModel
        .delete( animalId )
        .then( result => {
            console.log(result );
        })
        .catch( err => {
            console.log( "Something went wrong!" );
            console.log( err );
        })
    response.redirect( '/' );
});

app.listen( 8080, function(){
    console.log( "The users server is running in port 8080." );
});