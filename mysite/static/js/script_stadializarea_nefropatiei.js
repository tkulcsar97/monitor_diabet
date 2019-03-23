google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

var green='stroke-color: #000000; fill-color:#008000; stroke-width:1; fill-opacity: 0.6;';
var yellow='stroke-color: #000000; fill-color:#FFFF00; stroke-width:1; fill-opacity: 0.6;';
var orange='stroke-color: #000000; fill-color:#FFA500; stroke-width:1; fill-opacity: 0.6;';
var red='stroke-color: #000000; fill-color:#FF0000; stroke-width:1; fill-opacity: 0.6;';

var filtrare=albuminuria=0;

// #008000 green ;   #FF0000 red ;  #FFFF00 yellow ; #FFA500 orange

var tabel;
var size=18;
var tabel_cols=2;
var culori=new Array(size);
var mesaj=new Array(size);

function init()
{
for(var i=0;i<size;i++)
  {
    mesaj[i]=' ';
    if(i==0 || i==3) culori[i]=green;
    else if(i==1 || i==4 || i==6) culori[i]=yellow;
    else if(i==2 || i==5 || i==7 || i==9) culori[i]=orange;
    else culori[i]=red;
  }
} 


function validNr(a)
{
  if(a>=0 && !isNaN(a)) return true;
}

function getValues()
{
	init();
filtrare=parseInt(document.getElementById('filtrare_glomerulara').value);
albuminuria=parseInt(document.getElementById('albuminuria').value);

if(!validNr(albuminuria) && !validNr(filtrare))
   {
  alert("Introduce-ti numere valide.");
  location.reload();
   }

if(document.getElementById("mg/g").checked)
    tabel=[
          [90,30],[90,301],[90,999],
          [60,30],[60,301],[60,999],
          [45,30],[45,301],[45,999],
          [30,30],[30,301],[30,999],
          [15,30],[15,301],[15,999],
          [0,30],[0,301],[0,999]
          ];
else if(document.getElementById("mg/mmol").checked) 
     tabel=[
          [91,3],[91,31],[91,999],
          [60,3],[60,31],[60,999],
          [45,3],[45,31],[45,999],
          [30,3],[30,31],[30,999],
          [15,3],[15,31],[15,999],
          [0,3],[0,31],[0,999]
          ];

else {
  alert("Selectați unitatea de măsură a albuminuriei: mg/g sau mg/mmol.");
  location.reload();
      }
}


function Calculeaza()
{
  getValues();
  
  var succes=false;  
  for(var i=0;i<size;i++)
    {
      for(var j=0;j<tabel_cols;j++)
      {
        if(filtrare>=tabel[i][0] &&  albuminuria<tabel[i][1])
          { 
            mesaj[i]="Riscul dvs";
            culori[i]=culori[i].split("stroke-width:1; fill-opacity: 0.6;")+"stroke-width:3;";
    		succes=true;
          }
          if(succes==true) break;
      }
      if(succes==true) break;

    }
      drawChart();
      init();  
}    
  

function drawChart() 
  {
    var data = google.visualization.arrayToDataTable([
        ['Rata de filtrare', 
         'filtrare',{ role: 'style' } ,{ role: 'annotation' }, 
         'albuminuria',{ role: 'style' },{ role: 'annotation' }, 
         'A3', { role: 'style' },{ role: 'annotation'},
         'A4' 
         ],
        ['G1 Normală sau crescută >90',  
                50, culori[0], mesaj[0],  
                50, culori[1], mesaj[1],    
                50, culori[2], mesaj[2],0],
        ['G2 Ușor scăzută 60-89', 
                50, culori[3], mesaj[3],    
                50, culori[4], mesaj[4],    
                50, culori[5], mesaj[5],0],
        ['G3a Usor-moderat scăzută 45-59',
                50, culori[6], mesaj[6],   
                50, culori[7], mesaj[7],    
                50, culori[8], mesaj[8],0],  
        ['G3b Moderat-sever scăzut 30-44', 
                50, culori[9],  mesaj[9],    
                50, culori[10], mesaj[10],    
                50, culori[11], mesaj[11],0],
        ['G4 Sever scăzută 15-29',  
                50, culori[12], mesaj[12],    
                50, culori[13], mesaj[13],    
                50, culori[14], mesaj[14],0],
        ['G5 Insuficiență renală <15',  
                50, culori[15], mesaj[15],      
                50, culori[16], mesaj[16],    
                50, culori[17], mesaj[17],0]
      ]);


    var options = {
        width: 1200,
        height: 800,
        
        // #008000 green ;   #FF0000 red ;  #FFFF00 yellow ; #FFA500 orange
          
          series:{
          0:{fontSize: 22,color: '#008000', labelInLegend:'risc scăzut'},
          1:{color: '#FFFF00', labelInLegend:'risc moderat crescut'},
          2:{color: '#FFA500', labelInLegend:'risc crescut'},
          3:{color: '#FF0000', labelInLegend:'risc foarte crescut'}
          },
          
        vAxis: {
         titleTextStyle: 
         {
            fontSize: 16,
            fontName: 'Arial',
            bold: true,
            italic: false
          },

        title: 'Rata de filtrare glomerulară (ml/min/1,73 m^2), descriere, stadii și intervale de valori' 
    			},
    	chartArea:{left:"21.6%",top:0,width:"60%",height:"40%"},
    	enableInteractivity: false, // sau tooltip: { trigger: 'none'},		
        legend: { position:'right', alignment:'center'},
        bar: { groupWidth: '75%' },
        hAxis: {ticks: ['none']},
        isStacked: 'true'
      };

        var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
         chart.draw(data, options);
         
      }
   
     

