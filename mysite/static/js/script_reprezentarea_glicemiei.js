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
            tabelValNormale[i]=parseFloat(this);
            i++;
        });

    
  });
});
}


function getInputValues()
{
for(var i=0;i<size;i++)
  {
    if(!isNaN(tabelInput[i])) 
    tabelInput[i]=Math.abs(parseFloat(document.getElementById('timp'+(i+1)).value));
    else tabelInput[i]=0;
  }
}


function Calculeaza()
{
  getInputValues();
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

          title: 'Concentratia glicemiei (mg/dl)',
          ticks: [0,20,40,60,80,100,120,140,160,180] 
        },
        curveType: 'function',


      };

      var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
      chart.draw(data, options);

    }
         
      
   
     

