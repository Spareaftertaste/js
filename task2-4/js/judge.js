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
    section = $("section");
console.log(section[0]);
$(document).ready(function(){
    section.hide();//隐藏所有
    sessionStorage.setItem("date","1");//存储游戏时间
    sessionStorage.setItem("time","day");//存储昼夜情况
    var time = sessionStorage.getItem("time"),
        date = parseInt(sessionStorage.getItem("date"));
    console.log(date);
    for(var i= date ; i > 0;i-- ){
        section.eq(i-1).show();//利用循环让相应目录显示出来
    }
    sectionTitle.next().toggle();//折叠所有目录
    sectionTitle.click(function () {
        $(this).next().toggle("normal");//点击日期控制内容折叠
    });
    // var a = murder.css("background-color","black"),
    //     b = lastWord.css("background-color","black"),
    //     c = speak.css("background-color","black");
    murder.click(function(){
    })
});
close.click(function(){
    if (confirm("您确定要退出游戏吗？")) {
        window.location.href = 'index.html';
    }
});
headerBackBtn.click(function(){
    window.location.href='judge-diary.html';
});
gameOver.click(function(){
    if (confirm("您确定要结束本轮游戏吗？")) {
        window.location.href = 'index.html';
    }
});
diary.click(function(){
    window.location.href='judge-diary.html';
});
//定义一个有限状态机
// var switchMenu={
//     state:"off",//当前状态
//     trans:function(){//状态和状态变化规则 //包含了动作
//         switch (this.state){
//             case "off":
//                 this.state="on";
//                 content.hide(300);
//                 sectionTitle.css("border","none");
//                 break;
//             case "on":
//                 this.state="off";
//                 content.show(300);
//                 sectionTitle.css("border-bottom","#999 solid");
//                 break;
//             default:
//                 this.state="off";
//                 content.hide(300);
//                 sectionTitle.css("border","none");
//         }
//     },
//     //事件，不同的事件对应不同的规则
//     event:function(){this.trans();console.log(switchMenu)}
// };
// sectionTitle.on("click",function(){
//     switchMenu.event();//给按钮添加点击事件 //控制菜单的折叠
// });
sessionStorage.setItem("step","none");
var game = {
    state : sessionStorage.getItem("step"),//当前状态
    murderStep : function () {
        switch (game.state) {
            case "none" :
                sessionStorage.setItem("step","murder");
                location.href = "game.html";
                break;
            case "dead" :
                alert("请勿重复操作");
                break;
            case"speak" :
            case"vote":
                alert("请按游戏步骤进行");
                break;
        }

    },
    lastWordStep : function () {
        switch (game.state) {
            case "none":
            case "murder":
            case "vote" :
                alert("请按照游戏步骤进行");
                break;
            case "speak":
                alert("请勿重复操作");
                break;
            case "dead" :
                alert("请死者亮明身份并发表遗言");
                game.state = "speak" ;
                sessionStorage.setItem("step",game.state);
                lastWord.css("background-color","#83b09a");
                $(".lastWord .triangle").css("background-color","#83b09a");
                break;
        }
    },
    speakStep : function () {
        switch (game.state) {
            case "none":
            case"kill":
            case"dead":
                alert("请按照游戏步骤进行");
                break;
            case"vote":
                alert("请勿重复操作");
                break;
            case "speak":
                alert("请玩家依次发言讨论");
                game.state = "vote";
                sessionStorage.setItem("step",game.state);
                speak.css("background-color","#83b09a");
                $(".speak .triangle").css("background-color","#83b09a");
                break;
        }
    },
    voteStep : function () {
        switch (game.state){
            case"none":
            case"murder":
            case"dead":
            case"speak":
                alert("请按照游戏步骤进行");
                break;
            case "vote":
                location.href = "game.html";
                break;
        }
    }
};
murder.on("click",function(){game.murderStep()});//点击第一个按钮开始杀人
lastWord.on("click",function(){game.lastWordStep()});//点击第二个按钮发表遗言
speak.on("click",function(){game.speakStep()});//点击点三个按钮玩家开始发言讨论
vote.on("click",function(){game.voteStep()});//点击第四个按钮开始投票
