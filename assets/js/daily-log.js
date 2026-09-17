let selectedTime = "오전";

let editingIndex = null;
let editSelectedTime = "오전";

// 날짜 자동 입력
const dateInput = document.getElementById("date");

if (dateInput) {
    dateInput.value = new Date().toISOString().split("T")[0];
}

// 오전/오후 선택
function selectTime(time) {
    selectedTime = time;

    const am = document.getElementById("amBtn");
    const pm = document.getElementById("pmBtn");

    if (am && pm) {
        am.classList.toggle("active-time", time === "오전");
        pm.classList.toggle("active-time", time === "오후");
    }
}

// 저장
function saveLog() {

    const date = document.getElementById("date").value;
    const text = document.querySelector("textarea").value;

    if (!text.trim()) {
        alert("오늘 한 일을 입력해주세요.");
        return;
    }

    const logs = JSON.parse(localStorage.getItem("hazelLogs")) || [];

    const newLog = {
        date,
        time: selectedTime,
        text,
        editedAt: null
    };

    logs.push(newLog);

    localStorage.setItem("hazelLogs", JSON.stringify(logs));

    document.querySelector("textarea").value = "";

    renderLogs("new");

    runCareerBrain(newLog);
}

// 목록 표시
function renderLogs(order = "new") {

    const container = document.getElementById("logContainer");

    if (!container) return;

    const originalLogs = JSON.parse(localStorage.getItem("hazelLogs")) || [];

    let displayLogs = [...originalLogs];

    if (order === "new") {
        displayLogs.reverse();
    }

    container.innerHTML = "";

    displayLogs.forEach((log) => {

        const realIndex = originalLogs.indexOf(log);

        container.innerHTML += `
        <div class="log-item">

            <div class="log-header">

                <h3>${log.date} · ${log.time}</h3>

                <div class="log-actions">

                    <button class="icon-btn" onclick="editLog(${realIndex})">✏️</button>

                    <button class="icon-btn delete" onclick="deleteLog(${realIndex})">🗑️</button>

                </div>

            </div>

            <p>${log.text}</p>

            ${log.editedAt ? `<small class="edited-time">수정됨 · ${log.editedAt}</small>` : ""}

        </div>
        `;
    });

}

// 수정
function editLog(index){

    const logs = JSON.parse(localStorage.getItem("hazelLogs")) || [];

    editingIndex = index;

    document.getElementById("editModal").style.display = "flex";

    document.getElementById("editDate").value = logs[index].date;
    document.getElementById("editText").value = logs[index].text;

    editSelectedTime = logs[index].time;

    selectEditTime(editSelectedTime);

}

function selectEditTime(time){

    editSelectedTime = time;

    document.getElementById("editAm").classList.toggle("active-time", time==="오전");
    document.getElementById("editPm").classList.toggle("active-time", time==="오후");

}

function closeModal(){

    document.getElementById("editModal").style.display = "none";

}

function saveEdit(){

    const logs = JSON.parse(localStorage.getItem("hazelLogs")) || [];

    logs[editingIndex].date = document.getElementById("editDate").value;
    logs[editingIndex].time = editSelectedTime;
    logs[editingIndex].text = document.getElementById("editText").value;

    logs[editingIndex].editedAt = new Date().toLocaleString("ko-KR",{
        month:"2-digit",
        day:"2-digit",
        hour:"2-digit",
        minute:"2-digit"
    });

    localStorage.setItem("hazelLogs", JSON.stringify(logs));

    closeModal();

    renderLogs("new");

}

// 삭제
function deleteLog(index) {

    const logs = JSON.parse(localStorage.getItem("hazelLogs")) || [];

    if (confirm("이 기록을 삭제할까요?")) {

        logs.splice(index, 1);

        localStorage.setItem("hazelLogs", JSON.stringify(logs));

        renderLogs("new");

    }

}

// ---------- Career Brain ----------

// 임시 AI (나중에 OpenAI API로 교체될 자리)
function fakeAI(text){

    return{
        summary:"오늘 업무 경험이 정리되었습니다.",
        related:[
            "업무 Wiki",
            "Career DB",
            "Interview Vault",
            "취준방"
        ]
    };

}

async function runCareerBrain(log){

    const status = document.getElementById("brainStatus");
    const result = document.getElementById("brainResult");
    const brain = document.getElementById("brainIcon");

    if(!status || !result || !brain) return;

    result.innerHTML = "";

    ["step1","step2","step3","step4"].forEach(id=>{
        document.getElementById(id).classList.remove("step-done");
    });

    status.innerHTML = "Analyzing your experience...";
    brain.classList.add("pulse");

    const wait = (ms)=>new Promise(r=>setTimeout(r,ms));

    document.getElementById("step1").classList.add("step-done");
    await wait(400);

    document.getElementById("step2").classList.add("step-done");
    await wait(400);

    document.getElementById("step3").classList.add("step-done");
    await wait(400);

    document.getElementById("step4").classList.add("step-done");

    status.innerHTML = "Connection complete.";

    const analysis = fakeAI(log.text);

    brain.classList.remove("pulse");

    result.innerHTML = `
        <div class="brain-finish">
            ✨ Everything Connects.
        </div>

        <div class="brain-result">

            <b>AI Summary</b><br><br>

            ${analysis.summary}

            <br><br>

            <b>Connected Modules</b>

            <ul>
                ${analysis.related.map(item=>`<li>☑ ${item}</li>`).join("")}
            </ul>

        </div>
    `;

}

// 페이지 열릴 때 저장된 로그 불러오기
renderLogs();