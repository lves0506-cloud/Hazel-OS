// home.js

const greeting=document.getElementById("greeting");

if(greeting){

    const hour=new Date().getHours();

    if(hour<12){
        greeting.innerText="Good Morning, Hazel.";
    }
    else if(hour<18){
        greeting.innerText="Good Afternoon, Hazel.";
    }
    else{
        greeting.innerText="Good Evening, Hazel.";
    }

}