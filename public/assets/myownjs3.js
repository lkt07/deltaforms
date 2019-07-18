$(function(){
  var form=('#formsubmission');
var title=$('h3').text();
var lengthofselect=$("#questions").find('input').length;

  $(form).submit(function(event){

    alert("The dynamic url to view the responses of various users have been generated below");
    event.preventDefault();

     var a= new Array();
      $("#textform").each(function(){ a.push($(this).val()); });

      var a= new Array();
$("input[name='textform']").each(function(){
    a.push($(this).val());
});

     var b= new Array();
     $(".access").each(function(){ b.push($(this).text()); });


  $('#results2').text("DYNAMIC URL:   http://localhost:27017/deltaforms/"+title+"/"+lengthofselect+"/responses");

var responses=JSON.stringify(a);
var responsetext=JSON.stringify(b);

console.log(responses);
console.log(responsetext);


 $.post("/deltaforms/:id/:number",{title:title,responses:responses,responsetext:responsetext,length:lengthofselect},function(data){
   console.log("seems it has been posted");

 });

  });


});
