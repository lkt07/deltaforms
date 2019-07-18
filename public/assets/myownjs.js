var c=0;

function add() {

var i=0;
  var p=1;
	var c = document.getElementById("nofields").value;

	var confirmation=confirm("Are you sure you want to add extra "+c+" fields.You cant add more fields once you press (OK)");

	if(confirmation==true){

 while(i<c){
var element = document.createElement("input");

element.setAttribute("type","text");
element.setAttribute("span","any");
element.setAttribute("id",i);
element.setAttribute("placeholder",parseInt(i)+parseInt(1)+".Enter your question statement here!!");
element.setAttribute("required",true);
element.setAttribute("name",i);
element.setAttribute("class","fillup");

var foo = document.getElementById("questions");

foo.appendChild(element);

	var elementH= document.createElement("p")
    foo.appendChild(elementH);
    var statement=elementH.innerHTML="Choose whether you want the user to input a textbox or number as the answer";



var array = ["textbox","number"];
var selectList = document.createElement("select");
selectList.setAttribute("id","myselect");
foo.appendChild(selectList);

for (var j = 0; j < array.length; j++) {
    var option = document.createElement("option");
    option.value = array[j];
    option.text = array[j];
		option.setAttribute("name",array[j]);
		option.setAttribute("required",true);
    selectList.appendChild(option);
}

	i++;

	}

document.getElementById("disappear").remove();

	}
}
