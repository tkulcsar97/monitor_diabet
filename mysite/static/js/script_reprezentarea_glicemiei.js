var size=12;
var tabelInput=new Array(size);
var tabelValNormale=new Array(size);


function init()
{
//init tabels input & valori normale
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
  var i=0;
  $.getJSON(path, function (data) {
    $.each(data.Valori_normale, function () {
            tabelValNormale[i]=parseInt(this);
            i++;
        });

    
  });
});
}


function getValues()
{
for(var i=0;i<size;i++)
  {
    if(!isNaN(tabelInput[i])) 
    tabelInput[i]=Math.abs(parseInt(document.getElementById('timp'+(i+1)).value));
    else tabelInput[i]=0;
  }

  console.log(tabelInput);
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

  console.log(tabelInput);
}

function Calculeaza()
{
  getValues();
  drawChart();
}

function show(valori){
  init_tabelInput(valori);
  drawChart();
}
  
function drawChart(param) {
  
     var data = google.visualization.arrayToDataTable([
     

       ['X','Glicemia normala','Glicemia pacientului'],
       [0, tabelValNormale[0], tabelInput[0]],    
       [1, tabelValNormale[1], tabelInput[1]],  
       [2, tabelValNormale[2], tabelInput[2]], 
       [3, tabelValNormale[3],tabelInput[3]],
       [4,  tabelValNormale[4], tabelInput[4]],
       [5,  tabelValNormale[5], tabelInput[5]],
       [6,  tabelValNormale[6], tabelInput[6]], 
       [7, tabelValNormale[7],tabelInput[7]],
       [8,  tabelValNormale[8], tabelInput[8]], 
       [9, tabelValNormale[9], tabelInput[9]], 
       [10, tabelValNormale[10], tabelInput[10]], 
       [11, tabelValNormale[11], tabelInput[11]]
       
      ]);

      var options = {
        curveType: 'function',
        width: 1000,
        height: 800,

        hAxis: {
           titleTextStyle: {
            fontSize: 16,
            fontName: 'Arial',
            bold: true,
            italic: true
          },
          title: 'Timp',
          ticks: [{v:0, f:'ora 7'}, {v:10, f:'ora 8'}, {v:20, f:'ora 9'}, {v:30, f:'ora 11'}, {v:40, f:'ora 13'}, {v:50, f:'ora 14'}, 
          {v:60, f:'ora 15'}, {v:70, f:'ora 17'}, {v:80, f:'ora 19'}, {v:90, f:'ora 20'}, {v:100, f:'ora 21'}, {v:110, f:'ora 22'}] 
        },
        vAxis: {
           titleTextStyle: {          
            fontSize: 16,
            fontName: 'Arial',
            bold: true,
            italic: true
          },

          title: 'Concentratia glicemiei (mg/dl)',
          ticks: [0,20,40,60,80,100,120,140,160,180] 
        },
        curveType: 'function',
      };

      var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
      chart.draw(data, options);

    }
         
      
   
     

