function login(){
    username = document.getElementById("nume_utilizator").value;
    password = document.getElementById("parola").value;
    url = 'http://localhost:8000/login/';
    data_to_send = {
        username: username,
        password: password
    }
    
    f = function(data_recived){
        if (data_recived.successful == true){
            alert("Login successful");
        }
        else{
            alert("The username or password is incorrect");
        }
    }

    ajax_request(url,data_to_send,f);
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