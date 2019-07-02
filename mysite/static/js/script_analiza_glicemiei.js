var cols=7;
var rows=12;
var cookieJsonTabel;
var nrRezultate=5;

//declare table
var tabel=new Array(cols);
for(var i=0;i<cols;i++)
tabel[i]=new Array(rows);

//declare result table
var rezultateAnaliza=new Array(cols);
for(var i=0;i<cols;i++)
rezultateAnaliza[i]=new Array(nrRezultate);


//event for cookies to change if a value has changed
//and delete invalid numbers
$(document).ready(function(){
    $(':input[type="number"]').change(function() {
    	
    	if(validNr(this.value)) getValues();
		else this.value=null;
    });
});


function setColour(name,colour)
{
	var element = document.getElementById(name).style.backgroundColor=colour;
}

function resetColours()
{
setColour("ValNormMedie1", "white");
setColour("ValNormMedie2", "white");

setColour("ValNormDS1", "white");
setColour("ValNormDS2", "white");

setColour("ValNormCD1", "white");
setColour("ValNormCD2", "white");
setColour("ValNormCD3", "white");
setColour("ValNormCD4", "white");

setColour("ValNormJ1", "white");
setColour("ValNormJ2", "white");
setColour("ValNormJ3", "white");
setColour("ValNormJ4", "white");

setColour("ValNormMODD1", "white");
setColour("ValNormMODD2", "white");
setColour("ValNormMODD3", "white");
}

function compareResults(day)
{
	resetColours();
	for(var j=0;j<nrRezultate;j++)
	{
		switch(j)
		{
		case 0:
			if(rezultateAnaliza[day][j]<=154) setColour("ValNormMedie1","red");
			else if(rezultateAnaliza[day][j]>154) setColour("ValNormMedie2","red");
			break;
		case 1:
			if(rezultateAnaliza[day][j]<60) setColour("ValNormDS1","red");
			else if(rezultateAnaliza[day][j]>60) setColour("ValNormDS2", "red");
			break;
		case 2:
			if(rezultateAnaliza[day][j]<33.5) setColour("ValNormCD1","red");
			else if(rezultateAnaliza[day][j]>=33.5 && rezultateAnaliza[day][j]<36.8) setColour("ValNormCD2", "red");
			else if(rezultateAnaliza[day][j]>=36.8  && rezultateAnaliza[day][j]<=40.6) setColour("ValNormCD3", "red");
			else if(rezultateAnaliza[day][j]>40.6) setColour("ValNormCD4", "red");
			break;
		case 3:
			if(rezultateAnaliza[day][j]>=10 && rezultateAnaliza[day][j]<20) setColour("ValNormJ1","red");
			else if(rezultateAnaliza[day][j]>=20 && rezultateAnaliza[day][j]<30) setColour("ValNormJ2", "red");
			else if(rezultateAnaliza[day][j]>=30 && rezultateAnaliza[day][j]<=40) setColour("ValNormJ3","red");
			else if(rezultateAnaliza[day][j]>40)  setColour("ValNormJ4","red");
			break;
		case 4:
			if(rezultateAnaliza[day][j]<7) setColour("ValNormMODD1", "red");
			else if(rezultateAnaliza[day][j]>=7 && rezultateAnaliza[day][j]<=25) setColour("ValNormMODD2", "red");
			else if(rezultateAnaliza[day][j]>40) setColour("ValNormMODD3", "red");
			break;
		}

		
	}
	
}

//file stuff
var parseFileSucces=false;
function addFile()
{
	document.getElementById("upload").addEventListener('change',parseFile(event), false);
	getValues();
}

function parseFile(event)
{
	 if (!document.getElementById('upload').files[0]) 
       return;
     else {
	let file = document.getElementById('upload').files[0];
	Papa.parse(file,{
		header: false,
		dynamicTyping:true,
		complete: function(results) {
			parseFileSucces=true;
			tabel=results.data;

			for(var i=0;i<cols;i++)
			{ 
			for(var j=0;j<rows;j++)
				{			
				document.getElementById('val'+(j+1)+'day'+(i+1)).value=tabel[i][j];
				}
		 	}

		 	changeCookie();
		}
	})
	}
}


function makeCsvFile()
{
getValues();
var tabelString=new Array(cols);
for(var i=0;i<cols;i++)
tabelString[i]=new Array(rows);

	for(var i=0;i<cols;i++)
		{ 
		for(var j=0;j<rows;j++)
			{
				if(tabel[i][j]==null || isNaN(tabel[i][j])) tabelString[i][j]="";
				else tabelString[i][j]=""+tabel[i][j]+"";
			}
		}

	var csvData=Papa.unparse(JSON.stringify(tabelString),{header:false});
	
	//download the file
	downloadCsvFile(csvData);
}

//make download link
function downloadCsvFile(csv)
{
var downloadLink = document.createElement("a");
var blob = new Blob(["\ufeff", csv]);
var url = URL.createObjectURL(blob);
downloadLink.href = url;
downloadLink.download = "analiza_glicemiei.csv";

document.body.appendChild(downloadLink);
downloadLink.click();
document.body.removeChild(downloadLink);
}

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  
}

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function checkCookie()
{

if(document.cookie.indexOf('cookie_tabel=')!= -1) 
	{
		cookieJsonTabel=getCookie('cookie_tabel');
		tabel=JSON.parse(cookieJsonTabel);
		for(var i=0;i<cols;i++)
		{ 
			for(var j=0;j<rows;j++)
			document.getElementById('val'+(j+1)+'day'+(i+1)).value=tabel[i][j];
		}
	}
}

//add / edit cookies for 7days
function changeCookie()
{
	cookieJsonTabel=JSON.stringify(tabel);	
	if(document.cookie.indexOf('cookie_tabel=')== -1) 
		setCookie('cookie_tabel', cookieJsonTabel,7);
	else{
		document.cookie = 'cookie_tabel=;';
		setCookie('cookie_tabel', cookieJsonTabel,7);
		}
}

function validNr(a)
{
	if(a!=0 && a>9 && a<999) return true;
	 else return false;
}


function getValues()
{
 	if(parseFileSucces==false)
 	{
		for(var i=0;i<cols;i++)
		{ 
		for(var j=0;j<rows;j++)
			{
				var number=Math.abs(parseInt(document.getElementById('val'+(j+1)+'day'+(i+1)).value));

				if(validNr(number)) tabel[i][j]=number;
			}
		}
	}	

	changeCookie();
 }


function Medie(i)
{
var suma=0;
var count=0;
	
	
	for(var j=0;j<rows;j++)
	{
	if(validNr(tabel[i][j])) 
		{
		count++;
		suma+=tabel[i][j];
		}
	}
	return (suma/count).toFixed(1);
}


function DS(i)
{
	var sumOfSquares=0;
	var count=0;
	
	for(var j=0;j<rows;j++)
			{
				if(validNr(tabel[i][j])) 
				{
				count++;
				sumOfSquares+=Math.pow(tabel[i][j]-Medie(i),2); 	
				}
			}

	return (Math.sqrt(sumOfSquares/(count-1))).toFixed(1);
}

function CV(i)
{
	return (DS(i)/Medie(i)*100).toFixed(1);
}

function Jindex(i)
{
	return (0.001*Math.pow((parseFloat(Medie(i)) + parseFloat(DS(i))),2)).toFixed(1);
}


function MODD(i)
{
	var medie1=medie2=count=suma=0;

	if(i==0) return NaN;
	for(var j=0;j<rows;j++)
		{
			if(validNr(tabel[i][j])  && validNr(tabel[i-1][j]))
			{
			count++;
			suma+=Math.abs(parseFloat(tabel[i][j]-tabel[i-1][j]));
			}
		}
	medie2=parseFloat(suma/7);

	if(suma != 0)  medie1=parseFloat(suma/count);
		else medie1=0;
		
		return (parseFloat(medie1)+parseFloat(medie2)).toFixed(1);
		
}


function Output()
{
		getValues();
		
		for(var i=0;i<cols;i++)
		{	
		document.getElementById('media'+i).value=Medie(i);
		rezultateAnaliza[i][0]=parseInt(document.getElementById('media'+i).value=Medie(i));

		document.getElementById('ds'+i).value=DS(i);
		rezultateAnaliza[i][1]=parseInt(document.getElementById('ds'+i).value=DS(i));

		document.getElementById('cv'+i).value=CV(i);
		rezultateAnaliza[i][2]=parseInt(document.getElementById('cv'+i).value=CV(i));

		document.getElementById('jindex'+i).value=Jindex(i);
		rezultateAnaliza[i][3]=parseInt(document.getElementById('jindex'+i).value=Jindex(i));

		document.getElementById('modd'+i).value=MODD(i);
		rezultateAnaliza[i][4]=parseInt(document.getElementById('modd'+i).value=MODD(i));
		}

}

