var express=require('express');
var app=express();
var bodyParser=require('body-parser');
var mongoose=require('mongoose');
app.use(bodyParser.urlencoded({ extended: false }));
var username;
var Item;
mongoose.connect('mongodb+srv://test:test@delta-formsapp-canpc.mongodb.net/test?retryWrites=true&w=majority');

var todoSchema=new mongoose.Schema({
  username: {type:String},
  password: String
})

var inputSchema=new mongoose.Schema({
  title: String,
  description: String,
  lengthofselect: Number,
  typeq: [String],
  formq: [String]

})

var responsesSchema=new mongoose.Schema({
title: String,
responses: [String],
responsetext: [String],
length: Number
})

var User=mongoose.model('users',todoSchema);
var Input=mongoose.model('inputs',inputSchema);
var Responses=mongoose.model('responses',responsesSchema);

app.set('view engine','ejs');

app.use(express.static('./public'));

app.get('/sign-in',function(req,res){
  res.render('sign-in');
});

app.post('/sign-in',function(req,res){
  var username=req.body.username;
  var password=req.body.password;

  User.findOne({username:username,password:password},function(err,user){
    if(err) throw err;
    if(!user){
    res.send("ERROR 404! You have not registered into DELTA FORMS!!");
    }
    else{
      var username=req.body.username;
      res.redirect('/welcome');
    }
  });


});


app.get('/welcome',function(req,res){
  res.render('welcome');
});

app.get('/',function(req,res){
  res.render('home');
});

app.get('/deltaforms/:id/:number',function(req,res){
  var title=req.params.id;
  var lengthofselect=req.params.number;
  Input.findOne({title:title,lengthofselect:lengthofselect},function(err,user){
    if(err) throw err;
    if(!user){
    res.send("ERROR 404! Sorry there is no URL present like that in our system!!Create another form with a different form title and try again!!We apologise for the inconvenience caused.");
    }
    else{
      console.log(user);
      console.log('LETS LEAVE SOME GAP HERE');
      console.log(user.description);
      var description=user.description;
      var typeq=user.typeq;
      var formq=user.formq;
      res.render('deltaforms',{title:req.params.id,description:description,lengthofselect:req.params.number,formq:formq,typeq:typeq});
    }
  });

});


app.get('/deltaforms/:id/:number/responses',function(req,res){
  var id=req.params.id;
var length=req.params.number;

  Responses.find({title:id},function(err,user){
    if(err) throw err;
    if(!user){
    res.send("ERROR 404! Wrong Login!!");
    }
    else{
      console.log("i think i am about to figure it all");
      var resultsofuser=new Array();
      console.log(user.length);
      for(var i=0;i<user.length;i++){
        resultsofuser.push(user[i].responses);
      }
      console.log(resultsofuser);

      res.render('responses',{user:user,length:length,title:user.title,resultsofuser:resultsofuser});

    }
  });
});




app.post('/deltaforms/:id/:number',function(req,res){
  var title=req.body.title;
  var responses=JSON.parse(req.body.responses);
  var responsetext=JSON.parse(req.body.responsetext);
  var length=req.body.length;

console.log("the header is");
console.log(title);
  var newresponse=new Responses();
  newresponse.title=title;
  newresponse.responses=responses;
  newresponse.responsetext=responsetext;
  newresponse.length=length;

  newresponse.save(function(err,savedUser){
   if(err) throw err;

    console.log('Item Saved yet again');

 });

});

app.get('/forms',function(req,res){
  res.render('forms');
});

app.post('/forms',function(req,res){

  var title=req.body.title;
  var description=req.body.description;
  var lengthofselect=req.body.lengthofselect;
  var randomtext=req.body.typeoftext;
  var typeq=JSON.parse(randomtext);

  var randomtexttwo=req.body.formquestion;
  var formq=JSON.parse(randomtexttwo);

   var newinput=new Input();
 newinput.title=title;
 newinput.description=description;
 newinput.lengthofselect=lengthofselect;
 newinput.typeq=typeq;
 newinput.formq=formq;

 Input.findOne({title:title},function(err,inputdata){
   if(err) throw err;

   if(!inputdata){

 newinput.save(function(err,savedUser){
  if(err) throw err;

   console.log('Item Saved');
     res.render('forms');
});
}
else{
  res.send("ERROR 404! Sorry! Please change the form title. The form title has already been used");
 }
});


});

//The following is for congrats and sign-up pages
app.get('/sign-up',function(req,res){
  res.render('sign-up');
});

app.post('/sign-up',function(req,res){

   var username=req.body.username;
   var password=req.body.password;

   var newuser=new User();
   newuser.username=username;
   newuser.password=password;
   User.findOne({username:username},function(err,user){
     if(err) throw err;

     if(!user){

   newuser.save(function(err,savedUser){
    if(err) throw err;

     console.log('Item Saved');
     res.render('congrats');
  });
}
else{   res.send("ERROR 404! Sorry! The username is already taken");
   }
});
});




app.listen(27017);
