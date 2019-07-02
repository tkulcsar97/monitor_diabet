var size=12;
var tabelInput=new Array(size);
var tabelValNormale=new Array(size);
var prag;

//validate number
$(document).ready(function(){
    $(':input[type="number"]').change(function() {
      
      if(validNr(this.value)) getInputValues();
        else this.value=null;
    });
});

// cookie stuff
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
    tabelInput=JSON.parse(cookieJsonTabel);
    for(var i=0;i<size;i++)
      document.getElementById('timp'+(i+1)).value=tabelInput[i];
    
  }
}

//add / edit cookies for 7days
function changeCookie()
{
  cookieJsonTabel=JSON.stringify(tabelInput);  
  if(document.cookie.indexOf('cookie_tabel=')== -1) 
    setCookie('cookie_tabel', cookieJsonTabel,7);
  else{
    document.cookie = 'cookie_tabel=;';
    setCookie('cookie_tabel', cookieJsonTabel,7);
    }
}


function init()
{
//init tabels input & valori normale & prag
prag=0;
for(var i=0; i<size;i++)
  {
    tabelValNormale[i]=0;
    tabelInput[i]=0;
  }
ParseJson();
google.charts.load('current', {callback: drawChart, packages: ['corechart']});
}


function ParseJson()
{
$(document).ready(function () {
  //get values for valori normale from json
  var i=0;
  $.getJSON(path, function (data) {
    
    $.each(data.Valori_normale, function () {
            tabelValNormale[i]=parseFloat(this);
            i++;
        });

    //get values for Prag from json
    prag=parseInt(data.Prag);
  });
});
}


function validNr(a)
{
  if(a>=40 && a<=500) return true;
   else return false;
}

function getInputValues()
{
for(var i=0;i<size;i++)
  {
    var number=Math.abs(parseFloat(document.getElementById('timp'+(i+1)).value));
    if(validNr(number))  tabelInput[i]=number;
    else tabelInput[i]=null;

    changeCookie();
  }
}

function afiseazaNrOre()
{
  var nrOre=0;

  for(var i=0;i<size;i++)
    if(tabelInput[i]>=prag) 
      {
        // i=2 (ora 9-11);  i=3 (ora 11-13);  i=6 (ora 15-17); i=7 (ora 17-19)
        if(i==2 || i==3 || i==6 || i==7) nrOre=nrOre+2; 
        else nrOre++;
      }
  
  document.getElementById("verdict").innerHTML = "Numar de ore deasupra pragului ~ " + nrOre;
}

function init_tabelInput(valori){

  var i = 0;

  var momente = ["ora 7", "ora 8", "ora 9", "ora 11", "ora 13", "ora 14", "ora 15", "ora 17", "ora 19", "ora 20", "ora 21", "ora 22"];

  for(var key in valori){
    if (momente[i] == key){
      tabelInput[i] = parseInt(valori[key]);
    }
    else
      tabelInput[i] = 0;
    i++;
  }
}


function Calculeaza()
{
  getInputValues();
  drawChart();
  afiseazaNrOre();
}

function show(valori){
  init_tabelInput(valori);
  drawChart();
}


function drawChart(param) {
  
     var data = google.visualization.arrayToDataTable([
     

       ['X','Glicemia normala','Glicemia pacientului', 'Prag'],
       [0, tabelValNormale[0],  tabelInput[0], prag ],    
       [1, tabelValNormale[1],  tabelInput[1], prag ],  
       [2, tabelValNormale[2],  tabelInput[2], prag ], 
       [3, tabelValNormale[3],  tabelInput[3], prag ],
       [4,  tabelValNormale[4], tabelInput[4], prag ],
       [5,  tabelValNormale[5], tabelInput[5], prag ],
       [6,  tabelValNormale[6], tabelInput[6], prag ], 
       [7, tabelValNormale[7],  tabelInput[7], prag ],
       [8,  tabelValNormale[8], tabelInput[8], prag ], 
       [9, tabelValNormale[9],  tabelInput[9], prag ], 
       [10, tabelValNormale[10],tabelInput[10],prag ], 
       [11, tabelValNormale[11],tabelInput[11],prag ]
       
      ]);

      var options = {
        chartArea:{width:"70%", height:"70%"},
        curveType: 'function',
        width: 1100,
        height: 800,

        hAxis: {
           titleTextStyle: {
            fontSize: 16,
            fontName: 'Arial',
            bold: true,
            italic: true
          },
          title: 'Timp',
          ticks: [{v:0, f:'ora 7'}, {v:1, f:'ora 8'}, {v:2, f:'ora 9'}, {v:3, f:'ora 11'}, {v:4, f:'ora 13'}, {v:5, f:'ora 14'}, 
          {v:6, f:'ora 15'}, {v:7, f:'ora 17'}, {v:8, f:'ora 19'}, {v:9, f:'ora 20'}, {v:10, f:'ora 21'}, {v:11, f:'ora 22'}],

          viewWindow: {
                min:0,
                max: 11
                }
        },
        vAxis: {
           titleTextStyle: {          
            fontSize: 16,
            fontName: 'Arial',
            bold: true,
            italic: true
          },

          title: 'Concentratia glicemiei (mg/dl)'
         // ticks: [0,20,40,60,80,100,120,140,160,180] 
        },

        legend: { 
          position: 'right', 
           textStyle: {fontSize:12} 
         },


        curveType: 'function',
         colors:['blue','green','black']

      };

      var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
      chart.draw(data, options);

    }
         
      
   
     

