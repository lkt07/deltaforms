$(function(){
  var form=('#ajax-contact');
var i=0;
  $(form).submit(function(event){
    alert("The dynamic url is generated below. Copy the link and share it with other people to fill up the form you have created");
     event.preventDefault();

     var title=$("#titlebar").val();

     var description=$("#description").val();

     var lengthofselect=$("#questions").find('select').length;

     var typeoftext= new Array();
     $("select").each(function(){ typeoftext.push($(this).children("option:selected").val()); });

     var formquestion= new Array();
     $(".fillup").each(function(){ formquestion.push($(this).val()); });

$('#results').text("DYNAMIC URL:   http://localhost:27017/deltaforms/"+title+"/"+lengthofselect);

var formq=JSON.stringify(formquestion);
var typeq=JSON.stringify(typeoftext);

 $.post("/forms",{title:title,description:description,lengthofselect:lengthofselect,typeoftext:typeq,formquestion:formq},function(data){
   console.log("seems it has been posted");

  });

  });


});





/*   var variable=$('input[type=text]').length;
   var textlength=variable-2;

   var array=[];
   var current=$('#myselect');
    var currentchild=current.children("option:selected").val();
   for(i=0;i<textlength;i++){

     array.push(currentchild);
     current=current.next();
     console.log(array);
   }
   console.log(array);*/
/*   var array = $.makeArray($('select').children("option:selected").val());
   console.log(array);*/


   /*   $( "#results" ).text( str );
    }
    $( "input" ).on( "click", showValues );
   $('#myselect').on( "change", showValues );
    showValues();*/
