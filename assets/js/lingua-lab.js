// =========================
// Lingua Lab Stable v1.1
// =========================

let currentLinguaIndex = null;

// =========================
// 탭 전환
// =========================
function switchTab(tab){

    const panels={
        en:document.getElementById("englishPanel"),
        jp:document.getElementById("japanesePanel"),
        word:document.getElementById("wordPanel")
    };

    const tabs={
        en:document.getElementById("enTab"),
        jp:document.getElementById("jpTab"),
        word:document.getElementById("wordTab")
    };

    Object.values(panels).forEach(p=>p&&p.classList.remove("active-panel"));
    Object.values(tabs).forEach(t=>t&&t.classList.remove("active-tab"));

    panels[tab]?.classList.add("active-panel");
    tabs[tab]?.classList.add("active-tab");
}

// =========================
// 새 일기
// =========================
function newLinguaDiary(){

    currentLinguaIndex=null;

    document.getElementById("koreanDiary").value="";
    document.getElementById("englishResult").value="";
    document.getElementById("japaneseResult").value="";
    document.getElementById("wordVaultResult").value="";

    renderWordVaultPreview();
    updateArchiveButton();
    switchTab("en");

    window.scrollTo({
        top:0,
        behavior:"smooth"
    });

}

// =========================
// ChatGPT 열기
// =========================
function openTranslatePrompt(){

    const diary=document.getElementById("koreanDiary").value.trim();

    if(!diary){
        alert("먼저 3줄 일기를 입력해줘.");
        return;
    }

    const prompt=`아래 한국어 업무 일기를 자연스럽게 번역해줘.

출력 형식

## English
(영어 번역)

## 日本語
(일본어 번역)

## Word Vault

한국어 - English - 日本語

예시

운송 밸리데이션 - Shipping Validation - 輸送バリデーション
검토 - Review - レビュー

원문:
${diary}`;

    window.open(
        "https://chatgpt.com/?q="+encodeURIComponent(prompt),
        "_blank",
        "noopener,noreferrer"
    );
}

// =========================
// Word Vault 미리보기
// =========================
function renderWordVaultPreview(){

    const textarea=document.getElementById("wordVaultResult");
    const preview=document.getElementById("wordVaultPreview");

    if(!textarea||!preview)return;

    const text=textarea.value.trim();

    if(!text){
        preview.innerHTML="";
        return;
    }

    const rows=text.split("\n").filter(line=>line.includes(" - "));

    let html=`
    <table class="word-table">
    <tr>
        <th>🇰🇷 한국어</th>
        <th>🇺🇸 English</th>
        <th>🇯🇵 日本語</th>
    </tr>
    `;

    rows.forEach(line=>{

        const parts=line.split(" - ");

        if(parts.length===3){

            html+=`
            <tr onclick="copyWordRow('${parts[0].trim()}','${parts[1].trim()}','${parts[2].trim()}')">
                <td>${parts[0].trim()}</td>
                <td>${parts[1].trim()}</td>
                <td>${parts[2].trim()}</td>
            </tr>
            `;

        }

    });

    html+="</table>";

    preview.innerHTML=html;
}

// =========================
// Word Vault 복사
// =========================
async function copyWordRow(ko,en,jp){

    try{

        await navigator.clipboard.writeText(`${ko}
${en}
${jp}`);

        showToast("복사됨 ✓");

    }catch{

        alert("복사 완료!");

    }

}

// =========================
// 저장 / 수정
// =========================
function saveLinguaDiary(){

    const original=document.getElementById("koreanDiary").value.trim();
    const english=document.getElementById("englishResult").value.trim();
    const japanese=document.getElementById("japaneseResult").value.trim();
    const wordVault=document.getElementById("wordVaultResult").value.trim();

    if(!original||!english||!japanese){

        alert("한국어, 영어, 일본어를 모두 입력한 뒤 저장해줘.");
        return;

    }

    const diaries=JSON.parse(localStorage.getItem("linguaDiaries"))||[];

    const diary={
        date:new Date().toISOString().split("T")[0],
        original,
        english,
        japanese,
        wordVault
    };

    if(currentLinguaIndex===null){

        diaries.unshift(diary);
        showToast("저장 완료 ✓");

    }else{

        diaries[currentLinguaIndex]=diary;
        currentLinguaIndex=null;
        showToast("수정 완료 ✓");

    }

    localStorage.setItem("linguaDiaries",JSON.stringify(diaries));

    renderLinguaHistory();
    updateArchiveButton();

}

// =========================
// Saved Diaries
// =========================
function renderLinguaHistory(){

    const container=document.getElementById("linguaHistory");

    if(!container)return;

    const diaries=JSON.parse(localStorage.getItem("linguaDiaries"))||[];

    if(diaries.length===0){

        container.innerHTML="<p>아직 저장된 다이어리가 없어.</p>";
        return;

    }

    container.innerHTML="";

    diaries.forEach((d,index)=>{

        container.innerHTML+=`
        <div class="log-item" onclick="openLinguaDiary(${index})">

            <div class="log-header">

                <h3>${d.date}</h3>

                <div class="log-tags-mini">
                    <span>🇺🇸</span>
                    <span>🇯🇵</span>
                    ${d.wordVault?'<span>🔒</span>':''}
                </div>

            </div>

            <p>${d.english.substring(0,45)}...</p>

        </div>
        `;

    });

}

// =========================
// 불러오기
// =========================
function openLinguaDiary(index){

    currentLinguaIndex=index;

    const diaries=JSON.parse(localStorage.getItem("linguaDiaries"))||[];
    const d=diaries[index];

    document.getElementById("koreanDiary").value=d.original;
    document.getElementById("englishResult").value=d.english;
    document.getElementById("japaneseResult").value=d.japanese;
    document.getElementById("wordVaultResult").value=d.wordVault||"";

    renderWordVaultPreview();
    updateArchiveButton();
    switchTab("en");

    window.scrollTo({
        top:0,
        behavior:"smooth"
    });

    showToast("불러오기 완료 ✓");
}

// =========================
// 버튼 텍스트 변경
// =========================
function updateArchiveButton(){

    const btn=document.getElementById("archiveBtn");

    if(!btn)return;

    btn.innerText=currentLinguaIndex===null
        ?"🔒 Archive Entry"
        :"✏️ Save Changes";
}

// =========================
// Toast
// =========================
function showToast(text){

    const toast=document.getElementById("toast");

    if(!toast)return;

    toast.innerText=text;
    toast.classList.add("show");

    setTimeout(()=>{
        toast.classList.remove("show");
    },1200);

}

// =========================
// 시작
// =========================
window.addEventListener("load",()=>{

    const wordInput=document.getElementById("wordVaultResult");

    if(wordInput){
        wordInput.addEventListener("input",renderWordVaultPreview);
    }

    // Build 007.1 핵심:
    // 이전 작성 중인 내용 자동 복원 안 함
    // 항상 새 일기 상태로 시작

    newLinguaDiary();

    renderLinguaHistory();

});