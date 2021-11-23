const mongoose = require( 'mongoose' );

const AnimalSchema = new mongoose.Schema({
    animal:{
        type: String,
        required: true
    },
    animalId: {
        type: Number,
        required: true
    }
});

const Animal = mongoose.model( 'animals', AnimalSchema);

const AnimalModel = {
    addAnimal: function( newAnimal ){
        return Animal.create( newAnimal );
    },
    findAllAnimals: function(){
        return Animal.find();
    },
    update: function(animalId, newAnimal){
        return Animal.updateOne({animalId: animalId}, newAnimal);
    },
    delete : function( animalId ){
        return Animal.remove({ animalId : animalId });
    },
    getAnimalById : function( animalId ){
        return Animal.findOne({ animalId : animalId });
    }
};

module.exports = {AnimalModel};