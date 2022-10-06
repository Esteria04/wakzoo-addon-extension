if (typeof browser === "undefined") {
    var browser = chrome;
}
window.onload = function() {
    if (window.location.href.includes("steamindiegame")) {
        function anonymization() {
            const thumbnails = [document.getElementById("cafe_main").contentWindow.document.getElementsByClassName("thumb")[0],document.getElementById("cafe_main").contentWindow.document.getElementsByClassName("thumb")[1], ...document.getElementById("cafe_main").contentWindow.document.getElementsByClassName("comment_thumb")];
            for (let t of thumbnails) {
                t.remove();
            }
            document.getElementById("cafe_main").contentWindow.document.getElementsByClassName("more_area")[1].remove();
            const comments = document.getElementById("cafe_main").contentWindow.document.getElementsByClassName("comment_nickname");
            const innerComments = document.getElementById("cafe_main").contentWindow.document.getElementsByClassName("text_nickname");
            let nicknames = [document.getElementById("cafe_main").contentWindow.document.getElementsByClassName("nickname")[0],...Array.from(comments),...Array.from(innerComments)];
            let nicknameTexts = [document.getElementById("cafe_main").contentWindow.document.getElementsByClassName("nickname")[0].innerText,...Array.from(comments).map(function(element){return element.innerText}),...Array.from(innerComments).map(function(element){return element.innerText})];
            nicknameTexts = new Set(nicknameTexts);
            nicknameTexts = Array.from(nicknameTexts);
            let counter = 0;
            for (let text of nicknameTexts) {
                for (let nickname of nicknames) {
                    if (text==nickname.innerText) {
                        if (nicknameTexts.indexOf(text)==0) {
                            nickname.innerText="[작성자팬치]";
                        }
                        else{nickname.innerText=`[팬치${counter}]`;}
                    }
                }
                counter+=1;
            }
        }
        const anonymoBtn = document.createElement("button");
        const text = document.createElement("span");
        text.innerHTML="<strong>익명화</strong>";
        anonymoBtn.style.background = "#EFF0F2";
        anonymoBtn.style.width = "52px";
        anonymoBtn.style.height = "36px";
        anonymoBtn.style.borderRadius = "6px";
        anonymoBtn.style.marginLeft = "10px";
        anonymoBtn.appendChild(text);
        anonymoBtn.onclick = anonymization;
        setTimeout(function () {
            document.getElementById("cafe_main").contentWindow.document.getElementsByClassName("ArticleTopBtns")[0].getElementsByClassName("right_area")[0].appendChild(anonymoBtn);
        },500);
    }
    else if (window.location.href.includes("twitch.tv")) {
        function DelUnfollowBtn() {
            const unfollow = document.querySelector("#live-channel-stream-information > div > div > div > div > div.Layout-sc-nxg1ff-0.jYkTYc > div.Layout-sc-nxg1ff-0.cuTDLl.metadata-layout__support > div.Layout-sc-nxg1ff-0.eNUtIR > div.Layout-sc-nxg1ff-0.hvLsAn > div.Layout-sc-nxg1ff-0.fcPbos > div > div:nth-child(2) > div > div.Layout-sc-nxg1ff-0.ceTLz > div > div > div > div > button");
            unfollow.remove();
        }
        DelUnfollowBtn();
    }
}
//naver cafe area
function autoVisit() {
    if (window.location.href.includes("steamindiegame")) {
        try {
            const url = document.querySelector("#app > div > div > div.ArticleContentBox > div.article_header > div.ArticleTool > a.button_url").href;
            window.location=url;
        }
        catch {
            window.location = window.location;
        }
    }
    else {
        return
    }
}
setTimeout(function() {
    autoVisit();
}, 1800000);

function commentRefresh() {
    if (window.location.href.includes("steamindiegame")) {
        try {
            const refreshBtn = document.querySelector("#app > div > div > div.ArticleContentBox > div.article_container > div.CommentBox > div.comment_option > div > button");
            refreshBtn.click();
        }
        catch {}
    }
}
setInterval(function() {
    commentRefresh();
},2000);

//twitch area
const selector = "#live-page-chat > div > div > div > div > div > section > div > div.Layout-sc-nxg1ff-0.fwjUjn.chat-input > div:nth-child(2) > div.Layout-sc-nxg1ff-0.ejhEzS.chat-input__buttons-container > div.Layout-sc-nxg1ff-0.cwwMDL > div > div > div > div.Layout-sc-nxg1ff-0.Aqzax > div > div > div > button";
function twitchBonus() {
	if (window.location.href.includes("twitch.tv")) {
        const bonusBox = document.querySelector(selector);
        bonusBox != null ? bonusBox.click() : null;
    }
}

setInterval(function() {
    twitchBonus();
    console.log("working");
}, 7240);

browser.runtime.onMessage.addListener(
    function(response) {
        if (response.type="highlight") {
            const highLights = response.highLights;
            const color = response.color;
            let value=[];
            window.localStorage.getItem("highLights")===null ? null : value = JSON.parse(window.localStorage.getItem("highLights"));
            const temp = new Set([...highLights,...value]);
            window.localStorage.setItem("highLights", JSON.stringify(Array.from(temp)));
            window.localStorage.setItem("color", JSON.stringify(color));
        }
        else if (response.type="screenShot") {
            if (window.location.href.includes("steamindiegame")) {

            }
        }
    }
);

function highlighter() {
    let highLights = [""];
    let color = '';
    window.localStorage.getItem("highLights")===null ? null : highLights = JSON.parse(window.localStorage.getItem("highLights"));
    window.localStorage.getItem("color")===null ? null : color = window.localStorage.getItem("color").replaceAll('"','');
    const chats = document.getElementsByClassName("chat-line__message");
    for(let c of chats) {
        try {
            var nickname = c.getElementsByClassName("chat-author__intl-login")[0].innerHTML;
        }
        catch {
            var nickname = c.getElementsByClassName("chat-author__display-name")[0].innerHTML;
        }
        nickname = nickname.slice(2,nickname.length-1);
        for (let h of highLights) {
            if (h==nickname) {
                c.style.background=color;
            }
        }
    }
}

setInterval(function() {
    if (window.location.href.includes("twitch.tv")) {
       highlighter();
    }
},400);