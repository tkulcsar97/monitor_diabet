function login(){
    var username = document.getElementById("nume_utilizator").value;
    var password = document.getElementById("parola").value;
    var url = 'http://localhost:8000/login/';
    var data_to_send = {
        username: username,
        password: password
    }
    
    f = function(data_recived, user){
        if (data_recived.successful == true){
            window.location.href = "http://localhost:8000/index.htm";
        }
        else{
            document.getElementById("error").innerHTML = "The username or password is incorrect";
        }
    }

    ajax_request(url,data_to_send,f);
}

function register(){
    username = document.getElementById("nume_utilizator").value;
    password = document.getElementById("parola").value;
    birth_date = document.getElementById("data_nasterii").value;
    onset_age = document.getElementById("varsta_debut").value;
    doctor = document.getElementById("medici").options[document.getElementById("medici").options.selectedIndex].text;

    url = "http://localhost:8000/register/";
    data_to_send = {
        username: username,
        password: password,
        birth_date: birth_date,
        onset_age: onset_age,
        doctor: doctor
    }

    f = function(data_recived){
        if (data_recived.successful == true){
            alert("Register successful!");
        }
        else{
            alert("Something went wrong!");
        }
    }

    ajax_request(url,data_to_send,f);
}

function logout(){
    console.log("se delogheaza");
    var url = "http://localhost:8000/logout/"
    data_to_send = {"data": null}
    f = function(data_recived){ window.location.href = "http://localhost:8000/index.htm"; }

    ajax_request(url, data_to_send, f);
}

function adauga_glicemie(){
    var data_valoare = document.getElementById("data_valoare").value;
    var timp_valoare = document.getElementById("timp_valoare").value;
    var valoare = document.getElementById("valoare").value;
    var moment_valoare = new Date(data_valoare + " " + timp_valoare);

    console.log(moment_valoare);

    var url = "http://localhost:8000/set_analiza/";
    var data_to_send = {
        "moment_valoare": moment_valoare.toJSON().replace("Z", "-03:00"),
        "valoare": valoare
    }

    f = function(data_recived){
        if (data_recived.successful == true)
            renderAG_initState("Valoarea a fost adaugată cu succes!");
        else
            renderAG_initState("A apărut o eroare, incearcă din nou!");
    }

    ajax_request(url,data_to_send,f);
}

function preia_glicemie(){
    var start_date = new Date(document.getElementById("start_date").value);
    var end_date = new Date(document.getElementById("end_date").value);

    var diffTime = Math.abs(end_date.getTime() - start_date.getTime());
    var diffDays = Math.ceil(diffTime/(1000 * 60 * 60 * 24));

    if (start_date.getTime() > end_date.getTime() ||  diffDays > 7)
        renderAG_showValues("Datele nu sunt alese corespunzator");
    else{
        var url = "http://localhost:8000/get_analiza/";
        var data_to_send = {
            "start_date": start_date.toJSON(),
            "end_date": end_date.toJSON()
        }

        f = function(data_recived){
            for (var key in data_recived){
                data_recived[key].date = data_recived[key].date.replace("Z","+03:00");
                data_recived[key].date = new Date(data_recived[key].date);
            }

            array_format = [];

            for (var key in data_recived){
                array_format.push(data_recived[key]);
            }

            array_format.sort(function(o1, o2){
                return o1.date - o2.date;
            })

            data = [];

            for (var i=0; i<array_format.length; i++){
                var month = parseInt(array_format[i].date.getMonth()) + 1;
                var hour = parseInt(array_format[i].date.getHours());
                var minute = parseInt(array_format[i].date.getMinutes());
                if (hour < 10)
                    hour = "0" + hour.toString();
                if (minute < 10)
                    minute = "0" + minute.toString();

                var date = array_format[i].date.getDate() + "-" + month + "-" + array_format[i].date.getFullYear();
                var time = hour + ":" + minute;
                if (!(date in data))
                    data[date] = [];
                
                data[date].push({"time": time, "value": array_format[i].value})
                data.length++;
            }

            console.log(data);

            renderAG_tableValues(data);
        }

        ajax_request(url,data_to_send,f);
    }
}

function add_RG(){
    var data_valoare = new Date(document.getElementById("data_valoare").value);
    var moment_valoare = document.getElementById("moment").value;
    var valoare = document.getElementById("valoare").value;

    var flag = moment_valoare.search("ora");
    moment_valoare = moment_valoare.substr(flag, moment_valoare.length);

    var url = "http://localhost:8000/setare_date_reprezentare/";
    var data_to_send = {
        "date": data_valoare.toJSON(),
        "valoare": valoare,
        "moment": moment_valoare
    }

    f = function(data_recived){
        if (data_recived.successful == true)
            renderRG_initState("Valoarea a fost adaugată cu succes!");
        else
            renderRG_initState("A apărut o eroare, incearcă din nou!");
    }

    ajax_request(url, data_to_send, f);
}

function show_RG(){
    var date = new Date(document.getElementById("zi_valoare").value);

    var url = "http://localhost:8000/get_reprezentare/";
    var data_to_send = {
        "zi_valoare": date.toJSON(),
    }

    f = function(data_recived){
        console.log(data_recived);

        show(data_recived);
    }

    ajax_request(url, data_to_send, f);
}

function cauta_pacient(){
    var pacient = document.getElementById("pacient").value;
    var url = "http://localhost:8000/cautare_pacient/";
    var data_to_send = {
        "pacient": pacient
    }
    f = function(data_recived){
        if (data_recived.successful == false)
            renderCP_error("Pacientul nu a fost gasit!");
        else
            location.reload();
    }

    ajax_request(url, data_to_send, f);
}

function deselectare_pacient(){
    var url = "http://localhost:8000/deselectare_pacient/";
    data_to_send = {"data": null}
    f = function(data_recived){ location.reload() }

    ajax_request(url, data_to_send, f);
}

function adauga_np(){
    var filtrare_glomerulara = document.getElementById("filtrare_glomerulara").value;
    var albuminurie = document.getElementById("albuminuria").value;
    var unitate_masura = null;
    if (document.getElementById("g").checked);
        unitate_masura = document.getElementById("g").value;
    if (document.getElementById("mmol").checked);
        unitate_masura = document.getElementById("mmol").value;

    var url = "http://localhost:8000/setare_nefropatie/";
    var data_to_send = {
      "rata_filtrare_glomerulara": filtrare_glomerulara,
      "albuminurie": albuminurie,
      "unitate_masura": unitate_masura,
      "rezultat": rezultat
    }
    f = function(data_recived){
        if (data_recived.successful == true)
            alert("succes");
        else
            alert("erroare");
    }
    ajax_request(url, data_to_send, f);
}

function adauga_risc_hipo(){
    var c1,c2,c3,c4,c5,c6;

    if (isSelected("C1_niciodata")) c1 = document.getElementById("C1_niciodata").value;
    if (isSelected("C1_sub2")) c1 = document.getElementById("C1_sub2").value;
    if (isSelected("C1_3plus")) c1 = document.getElementById("C1_3plus").value;

    if (isSelected("C2_sub2")) c2 = document.getElementById("C2_sub2").value;
    if (isSelected("C2_2plus")) c2 = document.getElementById("C2_2plus").value;

    if (isSelected("C3_insulina_da")) c3 = document.getElementById("C3_insulina_da").value;
    if (isSelected("C3_insulina_nu")) c3 = document.getElementById("C3_insulina_nu").value;

    if (isSelected("C4_sulfoniluree_da")) c4 = document.getElementById("C4_sulfoniluree_da").value;
    if (isSelected("C4_sulfoniluree_nu")) c4 = document.getElementById("C4_sulfoniluree_nu").value;

    if (isSelected("C5_insuficienta_renala_da")) c5 = document.getElementById("C5_insuficienta_renala_da").value;
    if (isSelected("C5_insuficienta_renala_nu")) c5 = document.getElementById("C5_insuficienta_renala_nu").value;

    if (isSelected("C6_varsta_sub_77_da")) c6 = document.getElementById("C6_varsta_sub_77_da").value;
    if (isSelected("C6_varsta_sub_77_nu")) c6 = document.getElementById("C6_varsta_sub_77_nu").value;

    var url = "http://localhost:8000/set_risc_hipoglicemie/";
    var data_to_send = {
      "urgente_hipo": c1,
      "urgente": c2,
      "insulina": stringToBoolean(c3),
      "sulfoniluree": stringToBoolean(c4),
      "insuficienta_renala": stringToBoolean(c5),
      "varsta_sub_77": stringToBoolean(c6),
      "rezultat": rezultat
    }

    f = function(data_recived){
        if (data_recived.successful == true)
            alert("succes");
        else
            alert("erroare");
    }

    ajax_request(url, data_to_send, f);
}

function adauga_risc_diabet(){

    if (CMDSTotal > 0  && ModifiedCMDSTotal > 0)
        alert("Nu se pot memora ambele variante")
    else{
        data_to_send["cmds"] = CMDSTotal;
        data_to_send["cmds_modificat"] = ModifiedCMDSTotal;
        data_to_send["risc_cmds"] = risc_CMDS;
        data_to_send["risc_cmds_modificat"] = risc_ModifiedCMDS;

        url = "http://localhost:8000/set_risc_diabet/"

        f = function(data_recived){
            if (data_recived.successful == true)
                alert("succes");
            else
                alert("erroare");
        }
        ajax_request(url, data_to_send, f);
    }
}

function adauga_ssims(){
    if (score_ref == null || score_patient == null)
        alert("Este nevoie de ambele scoruri");
    else{
        console.log(rezultat);
        var data_to_send = {
            'sex': gender == 1.02 ? 'male' : 'female',
            'diabet_familie': family == 1.2 ? 'True' : 'False',
            'inaltime': height,
            'talie': parseFloat(waist),
            'glicemia': parseFloat(glycemia),
            'trigliceride': parseFloat(triglycerides),
            'tensiune_sistolica': parseFloat(TA_systolic),
            'colesterol': parseFloat(hdl),
            'siMS_scor': parseFloat(score_patient),
            'siMS_scor_risc': parseFloat(risk_score_patient),
            'PsiMS_scor': parseFloat(psiMS),
            'siMS_scor_ref': parseFloat(score_ref),
            'siMS_scor_risc_ref': parseFloat(risk_score_ref),
            'rezultat': rezultat
        }

        console.log(data_to_send)
        var url = "http://localhost:8000/set_indice_siMS/";

        f = function(data_recived){
            if (data_recived.successful == true)
                alert("succes");
            else
                alert("erroare");
        }
        ajax_request(url, data_to_send, f);

    }
}

function preia_date_nefropatie(){
    var url = "http://localhost:8000/get_nefropatie/"
    data_to_send = {"data": null}
    f = function(data_recived){
        console.log(data_recived)
        if (data_recived.array)
            render_date_nefropatie(data_recived);
    }

    ajax_request(url, data_to_send, f);
}

function preia_date_hipoglicemie(){
    var url = "http://localhost:8000/get_risc_hipoglicemie/"
    data_to_send = {"data": null}
    f = function(data_recived){ 
        if (data_recived.array)
            render_date_hipoglicemie(data_recived);
    }

    ajax_request(url, data_to_send, f);
}

function preia_date_calculator_diabet(){
    var url = "http://localhost:8000/get_risc_diabet/"
    data_to_send = {"data": null}
    f = function(data_recived){
        if (data_recived.array)
            render_date_calculator_diabet(data_recived);
    }

    ajax_request(url, data_to_send, f);
}

function preia_date_ssims(){
    var url = "http://localhost:8000/get_indice_siMS/"
    data_to_send = {"data": null}
    f = function(data_recived){
        if (data_recived.array)
            render_date_ssims(data_recived);
    }

    ajax_request(url, data_to_send, f);
}

function preluare_tabel_analiza(){
    var url = "http://localhost:8000/get_analiza_table/"

    var start_date = new Date(document.getElementById("data_inceput_valoare").value);
    var end_date = new Date(document.getElementById("data_sfarsit_valoare").value);
    data_to_send = {
        "start_date": start_date.toJSON(),
        "end_date": end_date.toJSON()
    }

    f = function(data_recived){
        date_analiza = data_recived;
        render_date_analiza();
    }

    ajax_request(url, data_to_send, f);
}

function preluare_tabel_reprezentare(){
    var url = "http://localhost:8000/get_reprezentare_table/"

    var start_date = new Date(document.getElementById("data_inceput_valoare").value);
    var end_date = new Date(document.getElementById("data_sfarsit_valoare").value);

    data_to_send = {
        "start_date": start_date.toJSON(),
        "end_date": end_date.toJSON()
    }

    f = function(data_recived){
        console.log(data_recived);
        date_reprezentare = data_recived;
        render_date_reprezentare();
    }

    ajax_request(url, data_to_send, f);
}

function statistica(){
    var modul = document.getElementById("module").options.selectedIndex;
    var rezultat = document.getElementById("rezultate").options[document.getElementById("rezultate").options.selectedIndex].text;
    var varsta_start = document.getElementById("varsta_start").value;
    var varsta_stop = document.getElementById("varsta_stop").value;
    var varsta_debut_start = document.getElementById("varsta_debut_start").value;
    var varsta_debut_stop = document.getElementById("varsta_debut_stop").value;
    var data_start = new Date(document.getElementById("data_start").value);
    var data_stop = new Date(document.getElementById("data_stop").value);

    var url;
    switch (modul){
        case 0: url = "http://localhost:8000/statistics_nefropatie/"; break;
        case 1: url = "http://localhost:8000/statistics_risc_hipoglicemie/"; break;
        case 2: url = "http://localhost:8000/statistics_risc_diabet/"; break;
        case 3: url = "http://localhost:8000/statistics_indice_siMS/"; break;
    }

    data_to_send = {
        "rezultat": rezultat,
        "varsta_start": varsta_start,
        "varsta_stop": varsta_stop,
        "debut_start": varsta_debut_start,
        "debut_stop": varsta_debut_stop,
        "data_start": data_start.toJSON(),
        "data_stop": data_stop.toJSON()
    }

    f = function(data_recived){
        render_afisare_statistica(data_recived, rezultat);
    }

    ajax_request(url, data_to_send, f);
}

function ajax_request(url,data,f){
    $(document).ready(function(){
        $.ajax({
            url: url,
            data: data,
            dataType: 'json',
            success: f
        });
    });
}

function stringToBoolean(string){
    if (string == "da")
        return 'True';
    else
        return 'False';
}