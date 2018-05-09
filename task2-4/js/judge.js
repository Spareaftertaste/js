var player= sessionStorage.getItem('player'),
    playerIdentity= sessionStorage.getItem('playerIdentity'),
    headerBackBtn= $("#headerBackBtn"),
    close=$('#close'),
    content=$('.content'),
    sectionTitle = $(".section-title"),
    gameOver=$('#gameOver'),
    diary=$('#diary'),
    murder = $(".murder"),
    lastWord = $(".lastWord"),
    speak = $(".speak"),
    vote = $(".vote"),
    section = $("section"),
    deathNote = sessionStorage.getItem("deadMan");
close.click(function(){
    if (confirm("您确定要退出游戏吗？")) {
        window.location.href = 'index.html';
        sessionStorage.clear();
    }
});
headerBackBtn.click(function(){
    window.location.href='judge-diary.html';
});
gameOver.click(function(){
    if (confirm("您确定要结束本轮游戏吗？")) {
        window.location.href = 'index.html';
        sessionStorage.clear();
    }
});
diary.click(function(){
    window.location.href='judge-diary.html';
});
var game = {
    state : sessionStorage.getItem("step"),//当前状态
    murderStep : function () {
        switch (game.state) {
            case null :
            case "vote":
                location.href = "game.html";
                break;
            case "murder" :
                alert("请勿重复操作");
                break;
            case"speak" :
            case "none":
                alert("请按游戏步骤进行");
                break;
        }
    },
    lastWordStep : function () {
        switch (game.state) {
            case null:
            case "none":
            case "vote" :
                alert("请按照游戏步骤进行");
                break;
            case "speak":
                alert("请勿重复操作");
                break;
            case "murder" :
                alert("请死者亮明身份并发表遗言");
                game.state = "speak" ;
                sessionStorage.setItem("step","speak");
                lastWord.css("background-color","#83b09a");
                $(".lastWord .triangle").css("background-color","#83b09a");
                break;
        }
    },
    speakStep : function () {
        switch (game.state) {
            case null:
            case "vote":
            case"kill":
                alert("请按照游戏步骤进行");
                break;
            case"none":
                alert("请勿重复操作");
                break;
            case "speak":
                alert("请玩家依次发言讨论");
                game.state = "none";
                sessionStorage.setItem("step","none");
                speak.css("background-color","#83b09a");
                $(".speak .triangle").css("background-color","#83b09a");
                break;
        }
    },
    voteStep : function () {
        switch (game.state){
            case null:
            case"vote":
            case"murder":
            case"speak":
                alert("请按照游戏步骤进行");
                break;
            case "none":

                location.href = "game.html";
                break;
        }
    }
};
murder.on("click",function(){game.murderStep()});//点击第一个按钮开始杀人
lastWord.on("click",function(){game.lastWordStep()});//点击第二个按钮发表遗言
speak.on("click",function(){game.speakStep()});//点击点三个按钮玩家开始发言讨论
vote.on("click",function(){game.voteStep()});//点击第四个按钮开始投票
$(document).ready(function(){
    var date = parseInt(sessionStorage.getItem("date"));//取出游戏时间
    section.hide();//隐藏所有目录
    for(var i= date ; i > 0;i-- ){
        section.eq(i-1).show();//利用循环让相应目录显示出来
        console.log(murder.eq(i-1));
    }
    for(var e = date-1;e>0;e-- ){//除了最新的一天，其他的按钮都失效
        murder.eq(e-1).css("background-color","#83b09a");
        murder.eq(e-1).find(".triangle").css("background-color","#83b09a");
        murder.eq(e-1).off("click");
        lastWord.eq(e-1).css("background-color","#83b09a");
        lastWord.eq(e-1).find(".triangle").css("background-color","#83b09a");
        lastWord.eq(e-1).off("click");
        speak.eq(e-1).css("background-color","#83b09a");
        speak.eq(e-1).find(".triangle").css("background-color","#83b09a");
        speak.eq(e-1).off("click");
        vote.eq(e-1).css("background-color","#83b09a");
        vote.eq(e-1).find(".triangle").css("background-color","#83b09a");
        vote.eq(e-1).off("click");
    }
    deathNote = deathNote.slice(0,deathNote.length);
    deathNote = deathNote.split(",");
    console.log("deathNote:"+deathNote);
    switch (game.state){//根据当前游戏进度不同按钮颜色不一样
        case "vote":
            break;
        case"none":
            murder.css("background-color","#83b09a");

            $(".murder .triangle").css("background-color","#83b09a");
            if(deathNote[deathNote.length-1] === "none"){
                $(".murder-content").eq(date-1).html("昨晚没人死亡");
            }else {
                console.log(deathNote);
                $(".murder-content").eq(date-1).html(deathNote[deathNote.length-1]+"号被杀手杀死，真实身份是平民") ;
            }
            lastWord.css("background-color","#83b09a");
            $(".lastWord .triangle").css("background-color","#83b09a");
            speak.css("background-color","#83b09a");
            $(".speak .triangle").css("background-color","#83b09a");
            break;
        case"speak":
            murder.css("background-color","#83b09a");

            $(".murder .triangle").css("background-color","#83b09a");
            if(deathNote[deathNote.length-1] === "none"){
                $(".murder-content").eq(date-1).html("昨晚没人死亡");
            }else {
                console.log(deathNote);
                $(".murder-content").eq(date-1).html(deathNote[deathNote.length-1]+"号被杀手杀死，真实身份是平民") ;
            }
            lastWord.css("background-color","#83b09a");
            $(".lastWord .triangle").css("background-color","#83b09a");
            break;

        case"murder":
            murder.css("background-color","#83b09a");

            $(".murder .triangle").css("background-color","#83b09a");
            if(deathNote[deathNote.length-1] === "none"){
                $(".murder-content").eq(date-1).html("昨晚没人死亡");
            }else {
                console.log(deathNote);
                $(".murder-content").eq(date-1).html(deathNote[deathNote.length-1]+"号被杀手杀死，真实身份是平民") ;
            }
            break;
    }
    sectionTitle.next().toggle(false);//折叠所有目录
    sectionTitle.eq(date-1).next().toggle(true);
    sectionTitle.click(function () {
        $(this).next().toggle("normal");//点击日期控制内容折叠
    });
    murder.click(function(){
    });
    var killerNum =sessionStorage.getItem("killer"),
        civilianNum =sessionStorage.getItem("civilian");
    console.log("date:"+date);
    console.log("state:"+game.state);
    console.log("deathNote:"+deathNote);
    console.log("killer:"+killerNum);
    console.log("civilian:"+civilianNum);
    playerIdentity= playerIdentity.split(",");
    player= player.split(",");
    console.log("PI: "+playerIdentity);
    console.log("p: "+player);
    if (date > 1){
        var death = deathNote;
        console.log(death);
        for(var a =1;a< date; a++){
            var d = death[2*a-1],//被投死人的编号
                killedIndex = player.indexOf(d),//被投死人的下标
                killed = playerIdentity[killedIndex].slice(3);//被投死人的身份
            console.log("被投死人的编号： "+ killed);
            if(death[a*2-2] === "none"){
                $(".murder-content").eq(a-1).html("昨晚没人死亡");
                $(".vote-content").eq(a-1).html(death[2*a-1]+"号被投死，真实身份是"+killed);
            }else {
                $(".murder-content").eq(a-1).html(death[2*a-2]+"号被杀手杀死，真实身份是平民");
                $(".vote-content").eq(a-1).html(death[2*a-1]+"号被投死，真实身份是"+killed);
            }
        }
    }
});
jQuery(document).ready(function () {
    if (window.history && window.history.pushState) {
        $(window).on('popstate', function () {
            /// 当点击浏览器的 后退和前进按钮 时才会被触发，
            window.history.pushState('forward', null, '');
            window.history.forward(1);
        });
    }
    //
    window.history.pushState('forward', null, '');  //在IE中必须得有这两行
    window.history.forward(1);
});
