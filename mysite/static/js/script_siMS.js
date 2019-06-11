var gender=age=waist=height=glycemia=triglycerides=TA_systolic=hdl=family=null;

var score_ref = null;
var risk_score_ref = null;

var score_patient = null;
var risk_score_patient = null;

var psiMS = null;

var rezultat = null;
//events

//1. clicked button from the second male/female buttons + change values for waist/hdl
$(document).ready(function(){
    $("#male_female_buttons1 :input").change(function() {
     document.getElementById(this.id+"_pacient").click(); 

    changeHdlAndWaist(this.id);
    });
});

//2. change waist/hdl (value) if user clicks on first male/female buttons
$(document).ready(function(){
    $("#male_female_buttons2 :input").change(function() {
    changeHdlAndWaist(this.id);
    });
});

//3. same as "1" but for family history + change values for family
$(document).ready(function(){
    $("#family_buttons1 :input").change(function() {
     document.getElementById("pacient_"+this.id).click(); 
    changeFamily(this.id);
    });
});

//4. change family (value) if user clicks on first family buttons
$(document).ready(function(){
    $("#family_buttons2 :input").change(function() {
    changeFamily(this.id);
    });
});

document.getElementById("age1").addEventListener("change", function(){
  document.getElementById("age2").value = this.value;
});

document.getElementById("height1").addEventListener("change", function(){
  document.getElementById("height2").value = this.value;
});



function changeHdlAndWaist(id)
{
	 if(id=="scor_male" || id=="scor_male_pacient")
	{
		document.getElementById("waist1").value=102;
		document.getElementById("hdl1").value=1.02;

	}
	if(id=="scor_female" || id=="scor_female_pacient") 
	{
		document.getElementById("waist1").value=88;
		document.getElementById("hdl1").value=1.28;
	}
}

function changeFamily(id)
{
	 if(id=="family+" || id=="pacient_family+")
	{
		family=1.2;
	}
	if(id=="family-" || id=="pacient_family-") 
	{
		family=1;
	}
}

function getValues(id)
{
	if(id==1) 
	{
	 
	 gender=document.getElementById("hdl1").value;
	 age=document.getElementById("age1").value;
	 waist=document.getElementById("waist1").value;
	 height=document.getElementById("height1").value;
	 glycemia=document.getElementById("glycemia1").value;
	 triglycerides=document.getElementById("triglycerides1").value;
	 TA_systolic=document.getElementById("TA_systolic1").value;
	 hdl=document.getElementById("hdl1").value;
	}

	else if(id==2)
	{
	 gender=document.getElementById("hdl1").value; // checks if it's (male/female)
	 age=document.getElementById("age2").value;
	 waist=document.getElementById("waist2").value;
	 height=document.getElementById("height2").value;
	 glycemia=document.getElementById("glycemia2").value;
	 triglycerides=document.getElementById("triglycerides2").value;
	 TA_systolic=document.getElementById("TA_systolic2").value;
	 hdl=document.getElementById("hdl2").value;	
	}

	console.log(family);
}

function sims_score(id)
{
   	getValues(id);
	
	var result=((2*waist)/height) + glycemia/5.6 + triglycerides/1.7 + TA_systolic/130 - hdl/gender;
	return result.toFixed(2);

}

function sims_risk_score(id)
{
	var result;
	if(gender==1.02) result= sims_score(id) * (age/45) * family;
		else if(gender==1.28) result= sims_score(id) * (age/50) * family;

	return result.toFixed(2);
}

function psiMS_score()
{
	getValues(2);
	
	var result=((2*waist)/height) + glycemia/5.6 + triglycerides/1.7 + TA_systolic/130 - hdl/1.02;
	return result.toFixed(2);
}

var scor_ref_siMS; //variabila globala pentru a compara scorurile
function CalculeazaScorReferinta()
{
score_ref = scor_ref_siMS = sims_score(1);
risk_score_ref = sims_risk_score(1);
document.getElementById("scor_ref_siMS").value=scor_ref_siMS;
document.getElementById("scor_ref_siMS_risk").value = sims_risk_score(1);

}

function CalculeazaScorPacient()
{
	score_patient = scor_pacient_siMS=sims_score(2);
	risk_score_patient = sims_risk_score(2);
	psiMS = psiMS_score();

	document.getElementById("scor_pacient_siMS").value=scor_pacient_siMS;
	document.getElementById("scor_pacient_siMS_risk").value=sims_risk_score(2);
	document.getElementById("scor_pacient_PsiMS").value=psiMS_score();

	if(scor_ref_siMS < scor_pacient_siMS){
		document.getElementById("verdict").innerHTML = "Rezultat: Sindrom metabolic.";
		rezultat = "Sindrom metabolic";
	}
	else{
		document.getElementById("verdict").innerHTML = "Rezultat: Sanatos.";
		rezultat = "Sănătos";
	}
	
}
