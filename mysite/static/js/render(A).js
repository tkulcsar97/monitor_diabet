
function renderAG_addValue(){
    document.getElementById("initial_state").style.display = 'none';
    document.getElementById("view_addValue").style.display = 'block';
}

function renderAG_showValues(message){
    document.getElementById("initial_state").style.display = 'none';
    document.getElementById("view_showValues").style.display = 'block';
    if (message)
        document.getElementById("message2").innerHTML = message;
}

function renderAG_initState(message){
    document.getElementById("view_addValue").style.display = 'none';
    document.getElementById("view_showValues").style.display = 'none';
    document.getElementById("initial_state").style.display = 'block';

    if (message){
        document.getElementById("message1").innerHTML = message;
        document.getElementById("message1").style.display = 'block';
    }
}

function renderRG_addValue(){
    document.getElementById("initial_state").style.display = 'none';
    document.getElementById("view_addValue").style.display = 'block';
}

function renderRG_showValues(){
    document.getElementById("initial_state").style.display = 'none';
    document.getElementById("view_showValues").style.display = 'block';
}

function renderRG_initState(){
    document.getElementById("view_addValue").style.display = 'none';
    document.getElementById("view_showValues").style.display = 'none';
    document.getElementById("initial_state").style.display = 'block';
}