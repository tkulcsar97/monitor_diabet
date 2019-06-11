
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

function render_date_nefropatie(data){
    var table = document.getElementById("date-pacient");
    var tbody = document.createElement("tbody");

    var th = document.createElement("th");
    th.appendChild(document.createTextNode("Data"));
    tbody.appendChild(th);

    var th = document.createElement("th");
    th.appendChild(document.createTextNode("Rată de filtrare glomerulară"));
    tbody.appendChild(th);

    var th = document.createElement("th");
    th.appendChild(document.createTextNode("Albuminuria"));
    tbody.appendChild(th);

    var th = document.createElement("th");
    th.appendChild(document.createTextNode("Albuminuria"));
    tbody.appendChild(th);

    for (var i=0; i<data.array.length; i++){
        var tr = document.createElement("tr");

        var td;

        td = document.createElement("td");
        td.appendChild(document.createTextNode(data.array[i].zi));
        tr.appendChild(td);

        td = document.createElement("td");
        td.appendChild(document.createTextNode(data.array[i].rata_filtrare_glomerulara));
        tr.appendChild(td);

        td = document.createElement("td");
        td.appendChild(document.createTextNode(data.array[i].albuminuria));
        tr.appendChild(td);

        td = document.createElement("td");
        td.appendChild(document.createTextNode(data.array[i].unitate_masura));
        tr.appendChild(td);

        td = document.createElement("td");
        td.appendChild(document.createTextNode(data.array[i].rezultat));
        tr.appendChild(td);

        tbody.appendChild(tr);
    }

    table.appendChild(tbody);
}

function render_date_hipoglicemie(data){
    var table = document.getElementById("date-pacient");
    var tbody = document.createElement("tbody");


    var th = document.createElement("th");
    th.appendChild(document.createTextNode("Data"));
    tbody.appendChild(th);

    th = document.createElement("th");
    th.appendChild(document.createTextNode("De cate ori ai ajuns in ultimele 12 luni la unitatea de primiri urgente e cu diagnostic primar/principal de hipoglicemie?"));
    tbody.appendChild(th);

    th = document.createElement("th");
    th.appendChild(document.createTextNode("De cate ori ai ajuns la unitatea de primiri urgente petru orice alt motiv de sanatate in ultimele 12 luni?"));
    tbody.appendChild(th);

    th = document.createElement("th");
    th.appendChild(document.createTextNode("Folosesti insulina sau nu?"));
    tbody.appendChild(th);

    th = document.createElement("th");
    th.appendChild(document.createTextNode("Folosesti derivate de sulfoniluree?"));
    tbody.appendChild(th);

    th = document.createElement("th");
    th.appendChild(document.createTextNode("Aveti insuficienta renala cronica stadiul 4 sau 5?"));
    tbody.appendChild(th);

    th = document.createElement("th");
    th.appendChild(document.createTextNode("Aveti varsta mai mica de 77 de ani?"));
    tbody.appendChild(th);

    console.log(data);

    for (var i=0; i<data.array.length; i++){
        var tr = document.createElement("tr");

        var td;

        td = document.createElement("td");
        td.appendChild(document.createTextNode(data.array[i].zi));
        tr.appendChild(td);

        td = document.createElement("td");
        td.appendChild(document.createTextNode(data.array[i].urgente_hipo));
        tr.appendChild(td);

        td = document.createElement("td");
        td.appendChild(document.createTextNode(data.array[i].urgente));
        tr.appendChild(td);

        td = document.createElement("td");
        td.appendChild(document.createTextNode(data.array[i].insulina == true ? "Da" : "Nu"));
        tr.appendChild(td);

        td = document.createElement("td");
        td.appendChild(document.createTextNode(data.array[i].derivate_sulfoniluree == true ? "Da" : "Nu"));
        tr.appendChild(td);

        td = document.createElement("td");
        td.appendChild(document.createTextNode(data.array[i].insuficienta_renala == true ? "Da" : "Nu"));
        tr.appendChild(td);

        td = document.createElement("td");
        td.appendChild(document.createTextNode(data.array[i].varsta_sub_77 == true ? "Da" : "Nu"));
        tr.appendChild(td);

        tbody.appendChild(tr);
    }

    table.appendChild(tbody);
}

function render_date_calculator_diabet(data){
    var table = document.getElementById("date-pacient");
    var tbody = document.createElement("tbody");

    var th = document.createElement("th");
    th.appendChild(document.createTextNode("Data"));
    tbody.appendChild(th);

    var th = document.createElement("th");
    th.appendChild(document.createTextNode("Glicemia pe nemancate ≥ 100mg/DL"));
    tbody.appendChild(th);

    var th = document.createElement("th");
    th.appendChild(document.createTextNode("Glicemia la doua ore ≥ 140 mg/dL"));
    tbody.appendChild(th);

    var th = document.createElement("th");
    th.appendChild(document.createTextNode("Talia  (≥ 102 cm la barbati; ≥88 cm la femei)"));
    tbody.appendChild(th);

    var th = document.createElement("th");
    th.appendChild(document.createTextNode("Hipertensiune"));
    tbody.appendChild(th);

    var th = document.createElement("th");
    th.appendChild(document.createTextNode("Hiperlipidemie"));
    tbody.appendChild(th);

    var th = document.createElement("th");
    th.appendChild(document.createTextNode("Scor CMDS"));
    tbody.appendChild(th);

    var th = document.createElement("th");
    th.appendChild(document.createTextNode("Scor CMDS modificat"));
    tbody.appendChild(th);

    var th = document.createElement("th");
    th.appendChild(document.createTextNode("Risc CMDS"));
    tbody.appendChild(th);

    var th = document.createElement("th");
    th.appendChild(document.createTextNode("Risc CMDS modificat"));
    tbody.appendChild(th);

    for (var i=0; i<data.array.length; i++){
        var tr = document.createElement("tr");

        var td;

        td = document.createElement("td");
        td.appendChild(document.createTextNode(data.array[i].zi));
        tr.appendChild(td);

        td = document.createElement("td");
        td.appendChild(document.createTextNode(data.array[i].glicemie_nemancate == true ? "Da" : "Nu"));
        tr.appendChild(td);

        td = document.createElement("td");
        td.appendChild(document.createTextNode(data.array[i].glicemie_doua_ore == true ? "Da" : "Nu"));
        tr.appendChild(td);

        td = document.createElement("td");
        td.appendChild(document.createTextNode(data.array[i].talie == true ? "Da" : "Nu"));
        tr.appendChild(td);

        td = document.createElement("td");
        td.appendChild(document.createTextNode(data.array[i].hipertensiune == true ? "Da" : "Nu"));
        tr.appendChild(td);

        td = document.createElement("td");
        td.appendChild(document.createTextNode(data.array[i].hiperlipidemie == true ? "Da" : "Nu"));
        tr.appendChild(td);

        if (data.array[i].scor_cmds != 0){
            td = document.createElement("td");
            td.appendChild(document.createTextNode(data.array[i].scor_cmds));
            tr.appendChild(td);
        }
        else{
            td = document.createElement("td");
            td.appendChild(document.createTextNode("-"));
            tr.appendChild(td);
        }

        if (data.array[i].scor_cmds_modificat != 0){
            td = document.createElement("td");
            td.appendChild(document.createTextNode(data.array[i].scor_cmds_modificat));
            tr.appendChild(td);
        }
        else{
            td = document.createElement("td");
            td.appendChild(document.createTextNode("-"));
            tr.appendChild(td);
        }

        if (data.array[i].risc_cmds){
            td = document.createElement("td");
            td.appendChild(document.createTextNode(data.array[i].risc_cmds));
            tr.appendChild(td);
        }
        else{
            td = document.createElement("td");
            td.appendChild(document.createTextNode("-"));
            tr.appendChild(td);
        }

        if (data.array[i].risc_cmds_modificat){
            td = document.createElement("td");
            td.appendChild(document.createTextNode(data.array[i].risc_cmds_modificat));
            tr.appendChild(td);
        }
        else{
            td = document.createElement("td");
            td.appendChild(document.createTextNode("-"));
            tr.appendChild(td);
        }

        tbody.appendChild(tr);
    }

    table.appendChild(tbody);
}

function render_date_ssims(data){
    var table = document.getElementById("date-pacient");
    var tbody = document.createElement("tbody");

    var th = document.createElement("th");
    th.appendChild(document.createTextNode("Data"));
    tbody.appendChild(th);

    var th = document.createElement("th");
    th.appendChild(document.createTextNode("Sex"));
    tbody.appendChild(th);

    var th = document.createElement("th");
    th.appendChild(document.createTextNode("Diabet in familie"));
    tbody.appendChild(th);

    var th = document.createElement("th");
    th.appendChild(document.createTextNode("Inaltime"));
    tbody.appendChild(th);

    var th = document.createElement("th");
    th.appendChild(document.createTextNode("Varsta"));
    tbody.appendChild(th);

    var th = document.createElement("th");
    th.appendChild(document.createTextNode("Talie"));
    tbody.appendChild(th);

    var th = document.createElement("th");
    th.appendChild(document.createTextNode("Glicemia"));
    tbody.appendChild(th);

    var th = document.createElement("th");
    th.appendChild(document.createTextNode("Trigliceride"));
    tbody.appendChild(th);
    
    var th = document.createElement("th");
    th.appendChild(document.createTextNode("Tensiunea sistolica"));
    tbody.appendChild(th);

    var th = document.createElement("th");
    th.appendChild(document.createTextNode("Colesterol"));
    tbody.appendChild(th);

    var th = document.createElement("th");
    th.appendChild(document.createTextNode("Scor siMS de referinta"));
    tbody.appendChild(th);

    var th = document.createElement("th");
    th.appendChild(document.createTextNode("Scor siMS obtinut"));
    tbody.appendChild(th);

    var th = document.createElement("th");
    th.appendChild(document.createTextNode("Scor de risc siMS de referinta"));
    tbody.appendChild(th);

    var th = document.createElement("th");
    th.appendChild(document.createTextNode("Scor de risc siMS obtinut"));
    tbody.appendChild(th);

    var th = document.createElement("th");
    th.appendChild(document.createTextNode("Scor PsiMS"));
    tbody.appendChild(th);

    var th = document.createElement("th");
    th.appendChild(document.createTextNode("Rezultat"));
    tbody.appendChild(th);


    for (var i=0; i<data.array.length; i++){
        var tr = document.createElement("tr");

        var td;

        td = document.createElement("td");
        td.appendChild(document.createTextNode(data.array[i].zi));
        tr.appendChild(td);

        td = document.createElement("td");
        td.appendChild(document.createTextNode(data.array[i].sex));
        tr.appendChild(td);

        td = document.createElement("td");
        td.appendChild(document.createTextNode(data.array[i].diabet_familie == true ? "Da" : "Nu"));
        tr.appendChild(td);

        td = document.createElement("td");
        td.appendChild(document.createTextNode(data.array[i].inaltime));
        tr.appendChild(td);

        td = document.createElement("td");
        td.appendChild(document.createTextNode(data.array[i].varsta));
        tr.appendChild(td);

        td = document.createElement("td");
        td.appendChild(document.createTextNode(data.array[i].talie));
        tr.appendChild(td);

        td = document.createElement("td");
        td.appendChild(document.createTextNode(data.array[i].glicemia));
        tr.appendChild(td);

        td = document.createElement("td");
        td.appendChild(document.createTextNode(data.array[i].trigliceride));
        tr.appendChild(td);

        td = document.createElement("td");
        td.appendChild(document.createTextNode(data.array[i].tensiune_sistolica));
        tr.appendChild(td);

        td = document.createElement("td");
        td.appendChild(document.createTextNode(data.array[i].colesterol));
        tr.appendChild(td);

        td = document.createElement("td");
        td.appendChild(document.createTextNode(data.array[i].siMS_scor_ref));
        tr.appendChild(td);

        td = document.createElement("td");
        td.appendChild(document.createTextNode(data.array[i].siMS_scor));
        tr.appendChild(td);

        td = document.createElement("td");
        td.appendChild(document.createTextNode(data.array[i].siMS_scor_risc_ref));
        tr.appendChild(td);

        td = document.createElement("td");
        td.appendChild(document.createTextNode(data.array[i].siMS_scor_risc));
        tr.appendChild(td);

        td = document.createElement("td");
        td.appendChild(document.createTextNode(data.array[i].PsiMS_scor));
        tr.appendChild(td);

        td = document.createElement("td");
        td.appendChild(document.createTextNode(data.array[i].rezultat));
        tr.appendChild(td);

        tbody.appendChild(tr);
    }

    table.appendChild(tbody);
}

var date_analiza, limita_stanga = 0, limita_dreapta = 9;

function render_date_analiza(){

    console.log(date_analiza)

    var tbody_old = document.getElementsByTagName("tbody");

    document.getElementById("mod_introducere").style.display = "none";
    document.getElementById("mod_afisare").style.display = "block";

    var table = document.getElementById("date-pacient");
    var tbody = document.createElement("tbody");

    var th = document.createElement("th");
    th.appendChild(document.createTextNode("Data"));
    tbody.appendChild(th);

    var th = document.createElement("th");
    th.appendChild(document.createTextNode("Ora"));
    tbody.appendChild(th);

    var th = document.createElement("th");
    th.appendChild(document.createTextNode("Valoarea"));
    tbody.appendChild(th);


    for (var i=limita_stanga; i<limita_dreapta && i < date_analiza.array.length ; i++){
        console.log("i:", i);
        var tr = document.createElement("tr");

        var td;

        var data_ora = date_analiza.array[i].data_ora.split("T");

        td = document.createElement("td");
        td.appendChild(document.createTextNode(data_ora[0]));
        tr.appendChild(td);

        td = document.createElement("td");
        td.appendChild(document.createTextNode(data_ora[1]));
        tr.appendChild(td);

        td = document.createElement("td");
        td.appendChild(document.createTextNode(date_analiza.array[i].valoare));
        tr.appendChild(td);


        tbody.appendChild(tr);

    }
    console.log(tbody_old)
    if (tbody_old.length === 0) 
        table.appendChild(tbody);     
    else
        table.replaceChild(tbody,tbody_old[0]);

}

function der_inapoi_analiza(){
    if (limita_stanga != 0 && limita_dreapta != 9){
        limita_stanga = limita_stanga - 10;
        limita_dreapta = limita_dreapta - 10;
        render_date_analiza()
    }
}

function der_inainte_analiza(){
    console.log(limita_dreapta, date_analiza.array.length)
    if (limita_dreapta <= date_analiza.array.length){
        console.log("yy")
        limita_stanga = limita_stanga + 10;
        limita_dreapta = limita_dreapta + 10;
        render_date_analiza()
    }
}


var date_reprezentare;
function render_date_reprezentare(){
    console.log(date_reprezentare);

    var tbody_old = document.getElementsByTagName("tbody");

    document.getElementById("mod_introducere").style.display = "none";
    document.getElementById("mod_afisare").style.display = "block";

    var table = document.getElementById("date-pacient");
    var tbody = document.createElement("tbody");

    var th = document.createElement("th");
    th.appendChild(document.createTextNode("Data"));
    tbody.appendChild(th);

    var th = document.createElement("th");
    th.appendChild(document.createTextNode("Ora"));
    tbody.appendChild(th);

    var th = document.createElement("th");
    th.appendChild(document.createTextNode("Valoarea"));
    tbody.appendChild(th);


    for (var i=limita_stanga; i<limita_dreapta && i < date_reprezentare.array.length ; i++){
        console.log("i:", i);
        var tr = document.createElement("tr");

        var td;

        td = document.createElement("td");
        td.appendChild(document.createTextNode(date_reprezentare.array[i].data));
        tr.appendChild(td);

        td = document.createElement("td");
        td.appendChild(document.createTextNode(date_reprezentare.array[i].moment));
        tr.appendChild(td);

        td = document.createElement("td");
        td.appendChild(document.createTextNode(date_reprezentare.array[i].valoare));
        tr.appendChild(td);


        tbody.appendChild(tr);

    }
    console.log(tbody_old)
    if (tbody_old.length === 1) 
        table.appendChild(tbody);     
    else
        table.replaceChild(tbody,tbody_old[0]);
}

function der_inapoi_reprezentare(){
    if (limita_stanga != 0 && limita_dreapta != 9){
        limita_stanga = limita_stanga - 10;
        limita_dreapta = limita_dreapta - 10;
        render_date_reprezentare()
    }
}

function der_inainte_reprezentare(){
    console.log(limita_dreapta, date_reprezentare.array.length)
    if (limita_dreapta <= date_reprezentare.array.length){
        limita_stanga = limita_stanga + 10;
        limita_dreapta = limita_dreapta + 10;
        render_date_reprezentare()
    }
}

function render_stare_intr_date(){
    document.getElementById("mod_introducere").style.display = "block";
    document.getElementById("mod_afisare").style.display = "none";
}

function optiuni_module_statistica(){
    var rezultate = document.getElementById("rezultate").options;
    while (rezultate.length) {
        rezultate.remove(0);
    }
    switch (document.getElementById("module").options.selectedIndex){
        case 0: {
            c1 = document.createElement("option");
            c2 = document.createElement("option");
            c3 = document.createElement("option");
            c4 = document.createElement("option");

            c1.text = "Risc scăzut de ND";
            c2.text = "Risc moderat de ND";
            c3.text = "Risc crescut de ND";
            c4.text = "Risc foarte crescut de ND";

            rezultate.add(c1);
            rezultate.add(c2);
            rezultate.add(c3);
            rezultate.add(c4);

        } break;
        case 1: {
            c1 = document.createElement("option");
            c2 = document.createElement("option");
            c3 = document.createElement("option");

            c1.text = "risc-scazut";
            c2.text = "risc-interm";
            c3.text = "risc-ridicat";

            rezultate.add(c1);
            rezultate.add(c2);
            rezultate.add(c3);

        } break;
        case 2: {
            c1 = document.createElement("option");
            c2 = document.createElement("option");
            c3 = document.createElement("option");
            c4 = document.createElement("option");
            c5 = document.createElement("option");
            c6 = document.createElement("option");
            c7 = document.createElement("option");
            c8 = document.createElement("option");
            c9 = document.createElement("option");
            c10 = document.createElement("option");
            c11 = document.createElement("option");
            c12 = document.createElement("option");
            c13 = document.createElement("option");
            c14 = document.createElement("option");

            c1.text = "≤7";
            c2.text = "≤10";
            c3.text = "≤11";
            c4.text = "≤13";
            c5.text = "≤16";
            c6.text = "≤18";
            c7.text = "≤23";
            c8.text = "≤24";
            c9.text = "≤32";
            c10.text = "≤33";
            c11.text = "≤43";
            c12.text = "≤59";
            c13.text = ">43";
            c14.text = ">59";

            rezultate.add(c1);
            rezultate.add(c2);
            rezultate.add(c3);
            rezultate.add(c4);
            rezultate.add(c5);
            rezultate.add(c6);
            rezultate.add(c7);
            rezultate.add(c8);
            rezultate.add(c9);
            rezultate.add(c10);
            rezultate.add(c11);
            rezultate.add(c12);
            rezultate.add(c13);
            rezultate.add(c14);
        } break;
        case 3:{
            c1 = document.createElement("option");
            c2 = document.createElement("option");

            c1.text = "Sindrom metabolic";
            c2.text = "Sănătos";

            rezultate.add(c1);
            rezultate.add(c2);
        }
    }
}

function render_afisare_statistica(data_recived, rezultat){
    document.getElementById("mod_introducere").style.display = "none";
    document.getElementById("mod_afisare").style.display = "block";

    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(function () { drawChart(data_recived) });

    function drawChart(data_recived) {

        var data = google.visualization.arrayToDataTable([
            [ rezultat, 'Numar cazuri'],
            [ rezultat, data_recived.numar_cazuri ],
            [ 'Alte rezultate',data_recived.total_cazuri - data_recived.numar_cazuri ]
        ]);

        var options = {
            title: "Numar cazuri totale: " + data_recived.total_cazuri
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechart'));

        chart.draw(data, options);
    }
}