var masa_corporala=0;

function calculMasaCorporala()
{
var inaltime= parseInt(document.getElementById("inaltime").value)/100;
var greutate= parseInt(document.getElementById("greutate").value);
masa_corporala=greutate / (inaltime * inaltime);
}


function Output()
{
	calculMasaCorporala();
	console.log(masa_corporala);
}