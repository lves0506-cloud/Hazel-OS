function renderSidebar(activePage){

const sidebar=`
<aside class="sidebar">

<div class="logo">Hazel OS</div>

<nav>

<div class="nav-item ${activePage==="home"?"active":""}"
onclick="location.href='${activePage==="home"?"index.html":"../index.html"}'">

🏠 Home

</div>

<div class="nav-item ${activePage==="career"?"active":""}"
onclick="location.href='career.html'">

💼 Career

</div>

<div class="nav-item ${activePage==="daily"?"active":""}"
onclick="location.href='daily-work-log.html'">

✍️ Daily Work Log

</div>

<div class="nav-item"
onclick="alert('일상은 Build 006 예정 🌿')">

🌿 일상

</div>

<div class="nav-item ${activePage==="settings"?"active":""}"
onclick="location.href='settings.html'">

⚙️ Settings

</div>

</nav>

</aside>
`;

document.getElementById("sidebarContainer").innerHTML=sidebar;

}