function renderSidebar(activePage){

const isHome=window.location.pathname.endsWith("index.html")||window.location.pathname==="/";

const homeLink=isHome?"index.html":"../index.html";

const pageLink=(page)=>isHome?`pages/${page}`:page;

document.getElementById("sidebarContainer").innerHTML=`

<aside class="sidebar">

<div class="logo">Hazel OS</div>

<nav>

<div class="nav-item ${activePage==="home"?"active":""}"
onclick="location.href='${homeLink}'">

🏠 Home

</div>

<div class="nav-item ${activePage==="career"?"active":""}"
onclick="location.href='${pageLink("career.html")}'">

💼 Career

</div>

<div class="nav-item ${activePage==="daily"?"active":""}"
onclick="location.href='${pageLink("daily-work-log.html")}'">

✍️ Daily Work Log

</div>

<div class="nav-item"
onclick="alert('일상은 Build 006 예정 🌿')">

🌿 일상

</div>

<div class="nav-item ${activePage==="settings"?"active":""}"
onclick="location.href='${pageLink("settings.html")}'">

⚙️ Settings

</div>

</nav>

</aside>

`;

}