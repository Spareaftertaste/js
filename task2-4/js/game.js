var player= sessionStorage.getItem('player'),
    playerIdentity= sessionStorage.getItem('playerIdentity'),
    close=$('#close'),
    start=$("#start"),
    playerBox= document.querySelectorAll('.player');
close.click(function(){
    if (confirm("您确定要退出游戏吗？")) {
        window.location.href = 'index.html';
    }
});
window.onload=function () {
    player= player.split(",");
    playerIdentity= playerIdentity.split(",");
    console.log(player);
    console.log(playerIdentity);
    var i=0;
    while (i< player.length){ //根据玩家人数显示出相应的盒子
        playerBox[i].style.display="block";
        console.log(i);
        $(".identity")[i].innerHTML= playerIdentity[i].slice(3);  //玩家身份
        $(".number")[i].innerText=++i+"号";   //玩家编号，并控制循环
    }
};
var toBeOrNotTobe={//玩家生死状态机
    state:"live",//当前状态
    trans:function () {//状态和状态变化规则
        switch (this.state){
            case"live":
                this.state="died";
                $(".identity").css("background-color","#83b09a");
                window.location.href = 'judge.html';
                break;
            default:
                break;
        }

    },//事件
    event:function () {
        this.trans();
    }
};
start.on("click",function () {
    toBeOrNotTobe.event()
});
var muder=$(".murder"),
    lastWord=$(".lastWord"),
    speak=$(".speak"),
    vote=$(".vote");

start.on("click",function(){time.event()});//给按钮添加点击事件 //投票或者杀人就会导致时间改变