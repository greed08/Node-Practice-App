var mongoose=require('mongoose');
var dbURI='mongodb://localhost/Mydb';
mongoose.connect(dbURI);
mongoose.connection.on('connected', function () {
console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('disconnected', function () {
console.log('Mongoose disconnected');
})
process.on('SIGINT', function() {
mongoose.connection.close(function () {
console.log('Mongoose disconnected through app termination');
process.exit(0);
});
});