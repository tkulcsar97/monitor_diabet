google.charts.load('current', {packages: ['corechart', 'line']});
google.charts.setOnLoadCallback(drawCurveTypes);



var t1=t2=t3=t4=t5=t6=t7=t8=t9=t10=t11=t12=0;


function getValues()
{
t1=parseInt(document.getElementById('1').value);
t2=parseInt(document.getElementById('2').value);
t2=parseInt(document.getElementById('3').value);
t2=parseInt(document.getElementById('4').value);
t2=parseInt(document.getElementById('5').value);
t2=parseInt(document.getElementById('6').value);
t2=parseInt(document.getElementById('7').value);
t2=parseInt(document.getElementById('8').value);
t2=parseInt(document.getElementById('9').value);
t2=parseInt(document.getElementById('10').value);
t2=parseInt(document.getElementById('11').value);
t2=parseInt(document.getElementById('12').value);

}


function Calculeaza()
{
  getValues();

   
      
      drawChart();
          
}    
  
    

    function drawCurveTypes() {
      var data = new google.visualization.DataTable();
      data.addColumn('number', 'X');
      data.addColumn('number', 'Glicemia normala');
      data.addColumn('number', 'Glicemia pacientului');

      data.addRows([

        [0, 0, 0],    [1, 10, 5],   [2, 23, 15],  [3, 17, 9],   [4, 18, 10],  [5, 9, 5],
        [6, 11, 3],   [7, 27, 19],  [8, 33, 25],  [9, 40, 32],  [10, 32, 24], [11, 35, 27],
        [12, 30, 22], [13, 40, 32], [14, 42, 34], [15, 47, 39], [16, 44, 36], [17, 48, 40],
        [18, 52, 44], [19, 54, 46], [20, 42, 34], [21, 55, 47], [22, 56, 48], [23, 57, 49],
        [24, 60, 52], [25, 50, 42], [26, 52, 44], [27, 51, 43], [28, 49, 41], [29, 53, 45],
        [30, 55, 47], [31, 60, 52], [32, 61, 53], [33, 59, 51], [34, 62, 54], [35, 65, 57],
        [36, 62, 54], [37, 58, 50], [38, 55, 47], [39, 61, 53], [40, 64, 56], [41, 65, 57],
        [42, 63, 55], [43, 66, 58], [44, 67, 59], [45, 69, 61], [46, 69, 61], [47, 70, 62],
        [48, 72, 64], [49, 68, 60], [50, 66, 58], [51, 65, 57], [52, 67, 59], [53, 70, 62],
        [54, 71, 63], [55, 72, 64], [56, 73, 65], [57, 75, 67], [58, 70, 62], [59, 68, 60],
        [60, 64, 56], [61, 60, 52], [62, 65, 57], [63, 67, 59], [64, 68, 60], [65, 69, 61],
        [66, 70, 62], [67, 72, 64], [68, 75, 67], [69, 80, 72]
       
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
        series: {
          1: {curveType: 'function'}
        }
      };

      var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
      chart.draw(data, options);
    }
         
      
   
     

