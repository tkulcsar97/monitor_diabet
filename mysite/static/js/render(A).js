
function renderAG_addValue(){
    document.getElementById("initial_state").style.display = 'none';
    document.getElementById("view_tableValues").style.display = 'none';
    document.getElementById("view_addValue").style.display = 'block';
}

function renderAG_showValues(message){
    document.getElementById("initial_state").style.display = 'none';
    document.getElementById("view_tableValues").style.display = 'none';
    document.getElementById("view_showValues").style.display = 'block';
    
    if (message)
        document.getElementById("message2").innerHTML = message;
}

function renderAG_initState(message){
    document.getElementById("view_addValue").style.display = 'none';
    document.getElementById("view_showValues").style.display = 'none';
    document.getElementById("view_tableValues").style.display = 'none';
    document.getElementById("initial_state").style.display = 'block';

    var table = document.getElementById("table-logged");
    table.removeChild(table.getElementsByTagName("tbody")[0]);

    if (message){
        document.getElementById("message1").innerHTML = message;
        document.getElementById("message1").style.display = 'block';
    }
}

function renderAG_tableValues(data){
    document.getElementById("view_addValue").style.display = 'none';
    document.getElementById("view_showValues").style.display = 'none';
    document.getElementById("view_tableValues").style.display = 'block';
    document.getElementById("initial_state").style.display = 'none';

    var table = document.getElementById("table-logged");
    var tbody = document.createElement("tbody");

    var th = document.createElement("th");
    th.appendChild(document.createTextNode("-"));
    tbody.appendChild(th);

    var maxim = 0;

    var statistic_values = [];

    for (var index in data){
        var th = document.createElement("th");
        th.appendChild(document.createTextNode(index));
        tbody.appendChild(th);

        statistic_values[index] = {
            "Media" : null,
            "Deviatia_standard": null,
            "Coeficient_de_variatie": null,
            "J_index": null
        };

        if(data[index].length > maxim)
            maxim = data[index].length;
    }

    for (var i=0; i<maxim; i++){
        var tr = document.createElement("tr");
        var th = document.createElement("th");
        th.appendChild(document.createTextNode("Valoare " + i));
        tr.appendChild(th);

        for (var index in data){
            var td = document.createElement("td");
            if (i < data[index].length)
                td.appendChild(document.createTextNode("Ora:" + data[index][i].time + " Valoarea:" + data[index][i].value));
            else
                td.appendChild(document.createTextNode("-"));
            tr.appendChild(td);
        }

        tbody.appendChild(tr);
    }

    var statistic_index = ["Media", "Deviatia standard", "Coeficient de variatie", "J index"];

    for (var i=0; i<statistic_index.length; i++){
        var tr = document.createElement("tr");
        var th = document.createElement("th");
        th.appendChild(document.createTextNode(statistic_index[i]));
        tr.appendChild(th);

        switch(statistic_index[i]){
            case "Media":{
                for (var index in data){
                    var td = document.createElement("td");
                    var suma = 0;

                    for (var v in data[index]){
                        suma = suma + data[index][v].value;
                    }
                    medie = (suma/data[index].length).toFixed(1);

                    statistic_values[index].Media = medie;
                    td.appendChild(document.createTextNode(medie.toString()));
                    tr.appendChild(td);
                }
            } break;
            case "Deviatia standard":{
                for (var index in data){
                    var td = document.createElement("td");
                    var suma = 0;
                    for (var v in data[index]){
                        suma = suma + Math.pow(data[index][v].value - statistic_values[index].Media, 2);
                    }
                    ds = Math.sqrt(suma/data[index].length).toFixed(1);
                    statistic_values[index].Deviatia_standard = ds;
                    td.appendChild(document.createTextNode(ds.toString()));
                    tr.appendChild(td);
                }
            } break;
            case "Coeficient de variatie":{
                for (var index in data){
                    var td = document.createElement("td");
                    cv = (parseFloat(statistic_values[index].Deviatia_standard ) / parseFloat(statistic_values[index].Media) * 100).toFixed(1);
                    statistic_values[index].Coeficient_de_variatie = cv;
                    td.appendChild(document.createTextNode(cv.toString()));
                    tr.appendChild(td);
                }
            } break;
            case "J index":{
                for (var index in data){
                    var td = document.createElement("td");
                    j_index = (0.001*Math.pow((parseFloat(statistic_values[index].Media) + parseFloat(statistic_values[index].Deviatia_standard)),2)).toFixed(1)
                    statistic_values[index].J_index = j_index;
                    td.appendChild(document.createTextNode(j_index.toString()));
                    tr.appendChild(td);
                }
            } break;

        }
        tbody.appendChild(tr);
    }

    table.appendChild(tbody);
    
}

function renderRG_addValue(){
    document.getElementById("initial_state").style.display = 'none';
    document.getElementById("view_addValue").style.display = 'block';
}

function renderRG_showValues(){
    document.getElementById("initial_state").style.display = 'none';
    document.getElementById("view_showValues").style.display = 'block';
}

function renderRG_initState(message){
    document.getElementById("view_addValue").style.display = 'none';
    document.getElementById("view_showValues").style.display = 'none';
    document.getElementById("initial_state").style.display = 'block';

    if (message){
        document.getElementById("message").innerHTML = message;
        document.getElementById("message").style.display = 'block';
    }
}

function renderCP_error(message){
    document.getElementById("message1").innerHTML = message
}