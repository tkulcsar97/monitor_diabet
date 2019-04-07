
function renderAG_addValue(){
    document.getElementById("initial_state").style.display = 'none';
    document.getElementById("view_addValue").style.display = 'block';
}

function renderAG_showValues(){
    document.getElementById("initial_state").style.display = 'none';
    document.getElementById("view_showValues").style.display = 'block';
}

function renderAG_initState(message){
    document.getElementById("view_addValue").style.display = 'none';
    document.getElementById("view_showValues").style.display = 'none';
    document.getElementById("initial_state").style.display = 'block';

    if (message){
        document.getElementById("message").innerHTML = message;
        document.getElementById("message").style.display = 'block';
    }
}