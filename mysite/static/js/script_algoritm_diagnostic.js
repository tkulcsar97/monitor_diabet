var masa_corporala=0;
var homa2IR;

function getElement(name)
{
	return parseInt(document.getElementById(name).value);
}
function calculMasaCorporala()
{
var inaltime= getElement("inaltime")/100;
var greutate= getElement("greutate");
masa_corporala=greutate / (inaltime * inaltime);
console.log(masa_corporala.toFixed(2));
}

function calculHoma2IR()
{
var inaltime= getElement("glicemie");
var greutate= getElement("insulina");
homa2IR= inaltime*greutate/405;
console.log(homa2IR.toFixed(2));
}

function Output()
{
	calculMasaCorporala();
	calculHoma2IR();
	
}