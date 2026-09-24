
// home.js

// =========================
// Greeting
// =========================

const greeting = document.getElementById("greeting");

if (greeting) {
    const hour = new Date().getHours();

    if (hour < 12) {
        greeting.innerText = "Good Morning, Hazel.";
    } else if (hour < 18) {
        greeting.innerText = "Good Afternoon, Hazel.";
    } else {
        greeting.innerText = "Good Evening, Hazel.";
    }
}

// =========================
// Recent Visit
// =========================

function recordVisit(name, icon) {

    // Home은 최근 접속에 저장하지 않음
    if (name === "Home") return;

    let recent = JSON.parse(localStorage.getItem("hazelRecent")) || [];

    const url =
        window.location.pathname.replace(/^.*Hazel-OS\//, "") +
        window.location.search;

    recent = recent.filter(item => item.url !== url);

    recent.unshift({
        name,
        icon,
        url,
        time: Date.now()
    });

    recent = recent.slice(0, 5);

    localStorage.setItem("hazelRecent", JSON.stringify(recent));
}

function renderRecent() {

    const grid = document.getElementById("recentGrid");

    if (!grid) return;

    const recent = JSON.parse(localStorage.getItem("hazelRecent")) || [];

    grid.innerHTML = "";

    if (recent.length === 0) {

        grid.innerHTML = `
        <div class="recent-item">
            <div class="recent-icon">✨</div>
            <small>아직 기록 없음</small>
        </div>
        `;

        return;
    }

    recent.forEach(item => {

        const diff = Math.floor((Date.now() - item.time) / 60000);

        let label = "방금";

        if (diff >= 60) label = `${Math.floor(diff / 60)}h`;
        if (diff >= 1440) label = `${Math.floor(diff / 1440)}d`;

        grid.innerHTML += `
        <div class="recent-item"
             onclick="location.href='${item.url}'">

            <div class="recent-icon">

                ${item.icon}

                <span class="recent-badge">
                    ${label}
                </span>

            </div>

            <small>${item.name}</small>

        </div>
        `;
    });
}

renderRecent();
// =========================
// Favorites
// =========================

const defaultFavorites=[
{
name:"Daily Work Log",
icon:"✍️",
url:"pages/daily-work-log.html"
},
{
name:"업무 Wiki",
icon:"📚",
url:"#"
}
];

function getFavorites(){

return JSON.parse(localStorage.getItem("hazelFavorites"))||defaultFavorites;

}

function renderFavorites(){

const container=document.getElementById("favoriteList");

if(!container)return;

const favorites=getFavorites();

container.innerHTML="";

favorites.forEach(item=>{

container.innerHTML+=`
<div class="favorite-card"
onclick="location.href='${item.url}'">

${item.icon} ${item.name}

</div>
`;

});

}

renderFavorites();

// =========================
// Continue Working
// =========================

function renderContinue(){

const card=document.getElementById("continueCard");
const title=document.getElementById("continueTitle");
const time=document.getElementById("continueTime");

if(!card||!title||!time)return;

const recent=JSON.parse(localStorage.getItem("hazelRecent"))||[];

if(recent.length===0){

title.innerText="아직 작업 없음";
time.innerText="첫 작업을 시작해보자.";

card.onclick=null;

return;

}

const latest=recent[0];

title.innerText=latest.name;

const diff=Math.floor((Date.now()-latest.time)/60000);

let label="방금";

if(diff>=60){
label=`${Math.floor(diff/60)}시간 전`;
}

if(diff>=1440){
label=`${Math.floor(diff/1440)}일 전`;
}

time.innerText=`마지막 작업 · ${label}`;

card.onclick=()=>{
location.href=latest.url;
};

}

renderContinue();