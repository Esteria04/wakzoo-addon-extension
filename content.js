if (typeof browser === "undefined") {
    var browser = chrome;
}
function refresh() {
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
    refresh();
}, 1800000);

const selector = "#live-page-chat > div > div > div > div > div > section > div > div.Layout-sc-nxg1ff-0.fwjUjn.chat-input > div:nth-child(2) > div.Layout-sc-nxg1ff-0.ejhEzS.chat-input__buttons-container > div.Layout-sc-nxg1ff-0.cwwMDL > div > div > div > div.Layout-sc-nxg1ff-0.Aqzax > div > div > div > button";
function twitchBonus() {
	if (window.location.href.includes("twitch.tv")) {
        const bonusBox = document.querySelector(selector);
        bonusBox != null ? bonusBox.click() : null;
    }
}

setInterval(function() {
    twitchBonus();
}, 7240);

browser.runtime.onMessage.addListener(
    function(response) {
        const highLights = response.highLights;
        const color = response.color;
        let value=[];
        window.localStorage.getItem("highLights")===null ? null : value = JSON.parse(window.localStorage.getItem("highLights"));
        const temp = new Set([...highLights,...value]);
        window.localStorage.setItem("highLights", JSON.stringify(Array.from(temp)));
        window.localStorage.setItem("color", JSON.stringify(color));
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