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
    //antibodies = document.getElementById("anticorpi").value;
    antibodies = true;

    url = "http://localhost:8000/register/";
    data_to_send = {
        username: username,
        password: password,
        birth_date: birth_date,
        onset_age: onset_age,
        antibodies: antibodies
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
    
}

function adauga_glicemie(){
    var data_valoare = document.getElementById("data_valoare").value;
    var timp_valoare = document.getElementById("timp_valoare").value;
    var valoare = document.getElementById("valoare").value;
    var moment_valoare = new Date(data_valoare + " " + timp_valoare);

    var url = "";
    var data_to_send = {
        "moment_valoare": moment_valoare,
        "valoare": valoare
    }

    f = function(data_recived){
        if (data_recived.successful == true)
            renderAG_initState("Valoarea a fost adaugată cu succes!");
        else
            renderAG_initState("A apărut o eroare, incearcă din nou!");
    }
    
}

function preia_glicemie(){
    var start_date = new Date(document.getElementById("start_date").value);
    var end_date = new Date(document.getElementById("end_date").value);

    console.log(start_date.getDate());
    var diffTime = Math.abs(end_date.getTime() - start_date.getTime());
    var diffDays = Math.ceil(diffTime/(1000 * 60 * 60 * 24));

    if (start_date.getTime() > end_date.getTime() ||  diffDays > 7)
        renderAG_showValues("Datele nu sunt alese corespunzator");
    else{
        var url = "";
        var data_to_send = {
            "start_date": start_date.getDate(),
            "end_date": end_date.getDate()
        }

        f = function(data_recived){

        }
    }
}

function add_RG(){

}

function show_RG(){

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