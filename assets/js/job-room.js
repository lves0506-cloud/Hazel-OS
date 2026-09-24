
function getCompanies(){
return JSON.parse(localStorage.getItem("hazelCompanies"))||[];
}

function saveCompanies(companies){
localStorage.setItem("hazelCompanies",JSON.stringify(companies));
}

function addCompany(){

const name=prompt("회사명을 입력하세요.");

if(!name)return;

const companies=getCompanies();

companies.push({
name,
status:"직무 분석 완료"
});

saveCompanies(companies);

renderCompanies();

}

function renderCompanies(){

const container=document.getElementById("companyList");

if(!container)return;

const companies=getCompanies();

container.innerHTML="";

companies.forEach((company,index)=>{

container.innerHTML+=`

<div class="company-card"
onclick="location.href='company-room.html?index=${index}'">

<h3>${company.name}</h3>

<p>${company.status}</p>

</div>

`;

});

}