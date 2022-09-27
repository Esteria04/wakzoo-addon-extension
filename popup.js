window.onload = function() {
    if (typeof browser === "undefined") {
        var browser = chrome;
    }
    const articleList = ["search.boardtype=L&search.totalCount=151&search.cafeId=27842958&search.page=",
"amp;search.menuid=327&amp;search.boardtype=L&amp;search.totalCount=151&amp;search.cafeId=27842958&amp;search.page=",
"search.menuid=347&search.boardtype=L&search.totalCount=151&search.cafeId=27842958&search.page=",
"amp;search.menuid=397&amp;search.boardtype=L&amp;search.totalCount=151&amp;search.cafeId=27842958&amp;search.page=",
"search.menuid=361&search.boardtype=L&search.totalCount=151&search.cafeId=27842958&search.page=",
"search.menuid=409&search.boardtype=L&search.totalCount=151&search.cafeId=27842958&search.page=",
"search.menuid=331&search.boardtype=L&search.totalCount=151&search.cafeId=27842958&search.page=",
"search.menuid=344&search.boardtype=I&search.totalCount=201&search.cafeId=27842958&search.page=",
"search.menuid=551&search.boardtype=I&search.totalCount=201&search.cafeId=27842958&search.page=",
"search.menuid=501&search.boardtype=I&search.totalCount=125&search.cafeId=27842958&search.page=",
"search.menuid=380&search.boardtype=I&search.totalCount=401&search.cafeId=27842958&search.page=",
"search.menuid=500&search.boardtype=I&search.totalCount=201&search.cafeId=27842958&search.page=",
"search.menuid=362&search.boardtype=L&search.totalCount=151&search.cafeId=27842958&search.page=",
"search.menuid=300&search.boardtype=L&search.totalCount=151&search.cafeId=27842958&search.page=",
"search.menuid=511&search.boardtype=L&search.totalCount=151&search.cafeId=27842958&search.page=",
"search.menuid=489&search.boardtype=L&search.totalCount=151&search.cafeId=27842958&search.page=",
"search.menuid=299&search.boardtype=I&search.totalCount=201&search.cafeId=27842958&search.page=",
"search.menuid=438&search.boardtype=L&search.totalCount=151&search.cafeId=27842958&search.page=",
"search.menuid=138&search.boardtype=L&search.totalCount=151&search.cafeId=27842958&search.page=",
"search.menuid=428&search.boardtype=L&search.totalCount=151&search.cafeId=27842958&search.page=",
"search.menuid=57&search.boardtype=L&search.totalCount=151&search.cafeId=27842958&search.page=",
"search.menuid=66&search.boardtype=L&search.totalCount=151&search.cafeId=27842958&search.page=",
"search.menuid=58&search.boardtype=I&search.totalCount=201&search.cafeId=27842958&search.page=",
"search.menuid=59&search.boardtype=I&search.totalCount=201&search.cafeId=27842958&search.page=",
"search.menuid=415&search.boardtype=L&search.totalCount=151&search.cafeId=27842958&search.page=",
"search.menuid=122&search.boardtype=L&search.totalCount=151&search.cafeId=27842958&search.page=",
"search.menuid=1&search.boardtype=L&search.totalCount=151&search.cafeId=27842958&search.page=",
"search.menuid=25&search.boardtype=L&search.totalCount=151&search.cafeId=27842958&search.page=",
"search.menuid=132&search.boardtype=I&search.totalCount=201&search.cafeId=27842958&search.page=",
"search.menuid=124&search.boardtype=L&search.totalCount=151&search.cafeId=27842958&search.page=",
"search.menuid=433&search.boardtype=L&search.totalCount=151&search.cafeId=27842958&search.page=",
"search.menuid=84&search.boardtype=I&search.totalCount=201&search.cafeId=27842958&search.page=",
"search.menuid=261&search.boardtype=L&search.totalCount=151&search.cafeId=27842958&search.page=",
"search.menuid=50&search.boardtype=L&search.totalCount=151&search.cafeId=27842958&search.page=",
"search.menuid=4&search.boardtype=L&search.totalCount=151&search.cafeId=27842958&search.page="];

    const button = document.getElementById("submit");
    function onButtonClick() {
        const article = Number(document.getElementById("dropdown").value);
        const choosedUrl = articleList[article];
        const choosedPage = String(document.getElementById("page-number").value);
        const finalUrl = `https://cafe.naver.com/steamindiegame/ArticleList.nhn?search.clubid=27842958&${choosedUrl+choosedPage}`
        chrome.tabs.create({active: true, url: finalUrl});
    }

    button.onclick = onButtonClick;

    const Input = document.getElementById("page-number");
    function onInput() {
        Input.value.length > 4 ? Input.value = Input.value.slice(0,2) : null;
        Number(Input.value) > 1000 ? Input.value = "1000" : null;
    }

    Input.oninput = onInput;

    function getCurrentTabUrl(callback) {
        const queryInfo = {
          active: true,
          currentWindow: true
        };
        chrome.tabs.query(queryInfo, function(tabs) {
          const tab = tabs[0];
          callback(tab.id);
        });
    }
    let highlights=[];
    const settings=document.getElementById("settings");
    settings.style.display="none";
    const toggle=document.getElementById("toggleSwitch");
    function onToggle() {
        toggle.checked===true ? settings.style.display="block" : settings.style.display="none";
    }
    toggle.onchange = onToggle;
    
    const etc = document.getElementById("etc");
    etc.onkeydown=onEnter;
    function onEnter(e) {
        if (e.keyCode==13) {
            highlights.push(etc.value);
            etc.value='';
        }
    }

    const wakgood = document.getElementsByName("wakgood")[0];
    const isedol = document.getElementsByName("isedol")[0];
    const save = document.getElementById("save");
    
    try {document.getElementById("input-color").value = window.localStorage.getItem("color").replaceAll('"','');}
    catch {document.getElementById("input-color").value = '#4497AB';}
    save.onclick=onSave;
    function onSave() {
        if (wakgood.checked==true){
            highlights.push(wakgood.value);
        }
        if (isedol.checked==true) {
            highlights=[...highlights, ...isedol.value.split(",")];
        }
        const color = document.getElementById("input-color").value;
        window.localStorage.setItem("highLights", JSON.stringify(highlights));
        window.localStorage.setItem("color",color);
        getCurrentTabUrl(function(tabID){
            browser.tabs.sendMessage(tabID, {
                "highLights": highlights,
                "color": color
            });
        });
    }
    const reset = document.getElementById("reset");
    reset.onclick=onReset;
    function onReset() {
        wakgood.checked=false;
        isedol.checked=false;
        highlights=[];
    }
}