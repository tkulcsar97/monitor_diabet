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
       [0, 0, tabel[0]],    
       [1, 10, tabel[1]],  
       [2, 23, tabel[2]], 
       [3, 17,tabel[3]],
       [4, 18, tabel[4]],
       [5, 9, tabel[5]],
       [6, 11, tabel[6]], 
       [7, 27,tabel[7]],
       [8, 33, tabel[8]], 
       [9, 40, tabel[9]], 
       [10, 32, tabel[10]], 
       [11, 35, tabel[11]]
       
      ]);

      var options = {
        
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

      var chart = new google.visualization.LineChart(document.getElementById('chart-container'));
      chart.draw(data, options);

    }
         
      
   
     

