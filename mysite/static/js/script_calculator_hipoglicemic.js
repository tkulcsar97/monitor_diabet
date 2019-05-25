var rezultat;

function isSelected(name)
{
	var element = document.getElementById(name);
	if(element.checked) return true;
	else return false;
}

function setColour2(name1,name2,colour)
{
	rezultat = name2;
	var element1 = document.getElementById(name1).style.backgroundColor=colour;
	var element2 = document.getElementById(name2).style.backgroundColor=colour;
}

function resetResults()
{
	setColour2("risc-ridicat","risc-ridicat-1","white");
	setColour2("risc-ridicat-2","risc-ridicat-2","white");
	setColour2("risc-scazut","risc-scazut-1","white");
	setColour2("risc-scazut-2","risc-scazut-3","white");
	setColour2("risc-interm-1","risc-interm","white");
}

function Output()
{
	resetResults();
	if(isSelected("C1_3plus")) setColour2("risc-ridicat-1","risc-ridicat","red");
	else if(isSelected("C1_sub2") && isSelected("C3_insulina_da")) setColour2("risc-ridicat-2","risc-ridicat","red");
	else if(isSelected("C1_niciodata") && isSelected("C3_insulina_nu") && isSelected("C4_sulfoniluree_nu")) setColour2("risc-scazut-1","risc-scazut","green");
	else if(isSelected("C1_niciodata") && isSelected("C3_insulina_nu") && isSelected("C5_insuficienta_renala_nu") && isSelected("C6_varsta_sub_77_da")) setColour2("risc-scazut-2","risc-scazut","green");
	else if(isSelected("C1_niciodata") && isSelected("C3_insulina_da") && isSelected("C3_insulina_da") && isSelected("C2_sub2") && isSelected("C6_varsta_sub_77_da")) setColour2("risc-scazut-3","risc-scazut","green");
	else setColour2("risc-interm-1","risc-interm","yellow");
}
