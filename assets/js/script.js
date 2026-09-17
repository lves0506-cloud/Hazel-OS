
const greeting=document.getElementById("greeting");

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

function openPage(page){

if(page==="daily"){
alert("🚀 다음 버전에서 Daily Work Log 페이지를 만들 예정!");
}

}


const dateInput=document.getElementById("date");

if(dateInput){
const today=new Date().toISOString().split("T")[0];
dateInput.value=today;
}