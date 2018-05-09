var player= sessionStorage.getItem('player'),
    playerIdentity= sessionStorage.getItem('playerIdentity'),
    headerBackBtn= $("#headerBackBtn"),
    close=$('#close'),
    playerBox= $('.player'),
    deathNote = sessionStorage.getItem("deadMan"),
    step = sessionStorage.getItem("step"),
    start= $("#start");
headerBackBtn.click(function(){//返回到人数设置页面
    if (confirm("您确定要返回上一步吗，返回上一部将导致玩家身份重新分配")) {
        window.location.href='player-allocation.html';
        sessionStorage.clear();
    }
});
close.click(function(){//退出游戏
    if (confirm("您确定要退出游戏吗？")) {
        window.location.href = 'index.html';
        sessionStorage.clear();
    }
});
start.click(function(){//开始游戏

    window.location.href = 'judge.html';
});
window.onload=function () {
    if(step !== null){
        $(".vote-btn")[0].innerHTML ="返回游戏";
    }
    console.log("step: "+step);
    player= player.split(",");
    playerIdentity= playerIdentity.split(",");
    console.log(player);
    console.log(playerIdentity);
    var i=0;
    while (i< player.length){ //根据玩家人数显示出相应的盒子
        playerBox.eq(i).show();

        var c= i+1,
            b = player.indexOf(c+"");
        console.log(b);
        $(".number")[i].innerText=1+i+"号";   //玩家编号
        $(".identity")[i].innerHTML = playerIdentity[b].slice(3);  //玩家身份

        ++i;
    }
    death();
};
function death() {//判断哪些玩家已经死亡
    var death =deathNote.split(",");
    console.log(death);
    for (var i=0;i<18;i++ ){
        a = i+ "";
        if(death.indexOf(a) >=0 ){
            $(".identity").eq(i-1).css("background-color","#83b09a");
        }
        // console.log(death.indexOf(a) >=0);
    }
}