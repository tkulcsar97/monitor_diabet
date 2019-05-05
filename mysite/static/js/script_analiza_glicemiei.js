var cols=7;
var rows=12;
var json_tabel;

var tabel=new Array(rows);
for(var i=0;i<cols;i++)
tabel[i]=new Array(cols);


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
			for(var i=0;i<cols;i++)
			{ 
			for(var j=0;j<results.data.length-1;j++)
				{
				tabel[i][j]=results.data[i][j];
				document.getElementById('val'+(j+1)+'day'+(i+1)).value=tabel[i][j];
				}
		 	}
		console.log(results.data);
		}
	})
	}
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
		json_tabel=getCookie('cookie_tabel');
		tabel=JSON.parse(json_tabel);
		for(var i=0;i<cols;i++)
		{ 
			for(var j=0;j<rows;j++)
			document.getElementById('val'+(j+1)+'day'+(i+1)).value=tabel[i][j];
		}
	}
}

function validNr(a)
{
	if(a!=0 && !isNaN(a)) return true;
}


function getValues()
{
 	if(parseFileSucces==false)
 	{
		for(var i=0;i<cols;i++)
		{ 
		for(var j=0;j<rows;j++)
			if(isNaN(tabel[i][j]) || tabel[i][j]==null) 
			tabel[i][j]=Math.abs(parseInt(document.getElementById('val'+(j+1)+'day'+(i+1)).value));
		}
	}	

	json_tabel=JSON.stringify(tabel);	
	if(document.cookie.indexOf('cookie_tabel=')== -1) 
		setCookie('cookie_tabel', json_tabel,365);
	else{
		document.cookie = 'cookie_tabel=;';
		setCookie('cookie_tabel', json_tabel,365);
	}

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
		document.getElementById('ds'+i).value=DS(i);
		document.getElementById('cv'+i).value=CV(i);
		document.getElementById('jindex'+i).value=Jindex(i);
		document.getElementById('modd'+i).value=MODD(i);
		}

}

