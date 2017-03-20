var express=require('express');
var app=express();
var routes=require('./models/db');

var message=[
   "If you are good at something never do it for free",
   "Power comes from sincere service",
   "Modesty is the clothing of talent",
   "Whenever possible,keep it simple."


];
var tours=[
{"Title":"Home","Year":"2015","Rated":"PG","Released":"27 Mar 2015","Runtime":"94 min","Genre":"Animation, Adventure, Comedy","Director":"Tim Johnson","Writer":"Tom J. Astle (screenplay), Matt Ember (screenplay), Adam Rex (book)","Actors":"Jim Parsons, Rihanna, Steve Martin, Jennifer Lopez","Plot":"An alien on the run from his own people makes friends with a girl. He tries to help her on her quest, but can be an interference.","Language":"English, French","Country":"USA","Awards":"2 wins & 8 nominations.","Poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BMTU0MzU4ODI3Ml5BMl5BanBnXkFtZTgwMzQzODk5NDE@._V1_SX300.jpg","Metascore":"55","imdbRating":"6.7","imdbVotes":"75,959","imdbID":"tt2224026","Type":"movie","Response":"True"}
 
];
var handlebars=require('express3-handlebars').create({defaultLayout:'main'});
app.engine('handlebars',handlebars.engine);
app.set('view engine','handlebars');
app.set('port',process.env.PORT||3112);

app.use(express.static(__dirname+'/public'));
app.use(require('body-parser')());
app.get('/',function(req,res)
{
	
	res.render('home');
});
app.get('/api',function(req,res)
{
	res.json(tours);
});
app.get('/registration', function(req, res){
    // we will learn about CSRF later...for now, we just
    // provide a dummy value
    res.render('regform', { csrf: 'CSRF token goes here' });
});
app.post('/process', function(req, res){
    if(req.xhr || req.accepts('json,html')==='json'){
        // if there were an error, we would send { error: 'error description' }
        res.send({ success: true });
    } else {
        // if there were an error, we would redirect to an error page
        res.redirect(303, '/thankyou');
    }
});
app.get('/thankyou',function(req,res)
{
 res.render('thankyou');

});
app.get('/about',function(req,res)
{
	var randomNum=message[Math.floor(Math.random()*message.length)];

	res.render('about',{message:randomNum});
});
app.get('/headers',function(req,res)
{
  res.set('Content-Type','text/plain');
  var s='';
  for(var name in req.headers)
  	s+=name+':'+req.headers[name]+'\n';
  res.send(s);
 });
app.get('/ip_ddress',function(req,res)
{
	res.set('Content-Type','text/plain');
	res.send(200,req.ip);
});
app.use(function(req,res)
{
	//res.type('text/plain');
	res.status(404);
	res.render('404');
});
app.use(function(err,req,res,next)
{
	console.error(err.status);
	//res.type('text/plain');
	res.status(500);
	res.render('500');
});
app.listen(app.get('port'),function()
{
	console.log('Express started on http://localhost:'+app.get('port')+';press Ctrl+c to terminate.');

});