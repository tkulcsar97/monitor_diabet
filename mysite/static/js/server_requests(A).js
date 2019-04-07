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
            alert("The username or password is incorrect");
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
    renderAG_initState("Valoarea a fost adaugată cu succes!");
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