var express = require('express');
var app = express();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var port = process.env.PORT || 3000;

mongoose.connect('mongodb://koko1304:gno654171@mov-db-shard-00-00-0pvr7.mongodb.net:27017,mov-db-shard-00-01-0pvr7.mongodb.net:27017,mov-db-shard-00-02-0pvr7.mongodb.net:27017/test?ssl=true&replicaSet=mov-db-shard-0&authSource=admin');

var personSchema = new Schema({

	name: String

});

var Person = mongoose.model('person', personSchema);


app.get('/add', function (req, res) {

	var person1 = new Person({ name: "Joe"});
	person1.save();

	res.send('Added');

});

app.get('/find', function (req, res) {

	Person.find({}, function(err, person) {

		if (err) throw err;

		res.send(person);

	});

});

app.get('/remove', function (req, res) {

	Person.remove({ name: 'Joe'}, function(err) {

		if (err) throw err;

		res.send("Remove");

	});

});

app.get('/update', function (req, res) {

	Person.update({ name: 'Joe'}, { name: 'John'}, function(err) {

		if (err) throw err;

		res.send("Updated");

	});

});

app.listen(port);