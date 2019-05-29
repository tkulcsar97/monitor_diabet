
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

        tbody.appendChild(tr);
    }

    table.appendChild(tbody);
}

function render_date_ssims(data){
    var table = document.getElementById("date-pacient");
    var tbody = document.createElement("tbody");

    console.log(data)

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

        tbody.appendChild(tr);
    }

    table.appendChild(tbody);
}