
let companyIndex=null;

function getCompanies(){
return JSON.parse(localStorage.getItem("hazelCompanies"))||[];
}

function saveCompanies(companies){
localStorage.setItem("hazelCompanies",JSON.stringify(companies));
}

function loadCompany(){

const params=new URLSearchParams(window.location.search);

companyIndex=Number(params.get("index"));

const companies=getCompanies();

const company=companies[companyIndex];

if(!company)return;

document.getElementById("companyTitle").innerText=`${company.name} 취준방`;

document.getElementById("statusSelect").value=company.status;

document.getElementById("companyMemo").value=company.memo||"";
updatePinButton();

}

function saveStatus(){

const companies=getCompanies();

companies[companyIndex].status=document.getElementById("statusSelect").value;

saveCompanies(companies);

}

function saveMemo(){

const companies=getCompanies();

companies[companyIndex].memo=document.getElementById("companyMemo").value;

saveCompanies(companies);

alert("메모 저장 완료!");

}


function openChatGPT(){

const companies=getCompanies();
const company=companies[companyIndex];

const prompt=
`너는 ${company.name} 취준방 전담 코치야.

현재 진행 상태: ${company.status}

내 메모:
${company.memo || "아직 메모 없음"}

이 내용을 이어받아서
1. 자소서 첨삭
2. 면접 준비
3. 직무 분석
4. 기업 분석
을 계속 도와줘.`;

const url=
`https://chatgpt.com/?q=${encodeURIComponent(prompt)}`;

window.open(url,"_blank");

}

function updatePinButton(){

const btn=document.getElementById("pinBtn");

if(!btn)return;

const companies=getCompanies();
const company=companies[companyIndex];

let favorites=JSON.parse(localStorage.getItem("hazelFavorites"))||[];

const exists=favorites.some(item=>item.name===`${company.name} 취준방`);

btn.innerText=exists ? "★ Pinned" : "☆ Pin";

}

function toggleFavorite(){

const companies=getCompanies();
const company=companies[companyIndex];

let favorites=JSON.parse(localStorage.getItem("hazelFavorites"))||[];

const name=`${company.name} 취준방`;

const exists=favorites.some(item=>item.name===name);

if(exists){

favorites=favorites.filter(item=>item.name!==name);

}else{

favorites.unshift({
name,
icon:"📌",
url:`pages/company-room.html?index=${companyIndex}`
});

favorites=favorites.slice(0,5);

}

localStorage.setItem("hazelFavorites",JSON.stringify(favorites));

updatePinButton();

}