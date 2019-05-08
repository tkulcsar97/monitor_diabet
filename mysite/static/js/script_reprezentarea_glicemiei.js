google.charts.load('current', {callback: drawChart, packages: ['corechart']});


var size=12;
var tabel=new Array(size);

function getValues()
{
for(var i=0;i<size;i++)
  {
    if(!isNaN(tabel[i])) 
    tabel[i]=Math.abs(parseInt(document.getElementById('timp'+(i+1)).value));
    else tabel[i]=0;
  }
}


function Calculeaza()
{

  getValues();
  drawChart();
}    
  
function drawChart() {
   getValues(); 

     var data = google.visualization.arrayToDataTable([
     

       ['X','Glicemia normala','Glicemia pacientului'],
       [0, 88, tabel[0]],    
       [1, 90, tabel[1]],  
       [2, 93, tabel[2]], 
       [3, 92,tabel[3]],
       [4, 106, tabel[4]],
       [5, 108, tabel[5]],
       [6, 115, tabel[6]], 
       [7, 86,tabel[7]],
       [8, 106, tabel[8]], 
       [9, 90, tabel[9]], 
       [10, 80, tabel[10]], 
       [11, 86, tabel[11]]
       
      ]);

      var options = {
        curveType: 'function',
        width: 1200,
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
        curveType: 'function'
      };

      var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
      chart.draw(data, options);

    }
         
      
   
     

