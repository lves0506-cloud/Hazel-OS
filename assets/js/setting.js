const builds=[

{
version:"Build 001",
name:"First Breath",
status:"완료",
details:[
"첫 Home 화면",
"Ice Blue 테마"
]
},

{
version:"Build 002",
name:"North Star",
status:"완료",
details:[
"사이드바",
"Career 페이지",
"Daily Work Log",
"Edit/Delete"
]
},

{
version:"Build 003",
name:"Career Brain",
status:"완료",
details:[
"Brain Pulse",
"Everything Connects",
"Detail Modal",
"Smart Log List"
]
}

];

const container=document.getElementById("buildList");

builds.forEach(build=>{

container.innerHTML+=`

<div class="build-card">

<div class="build-header" onclick="toggleBuild(this)">

<div>

<strong>${build.version} — ${build.name}</strong>

<div class="build-status">${build.status}</div>

</div>

<div class="arrow">▾</div>

</div>

<div class="build-details">

${build.details.map(item=>`<p>• ${item}</p>`).join("")}

</div>

</div>

`;

});

function toggleBuild(header){

const card=header.parentElement;

card.classList.toggle("open");

}