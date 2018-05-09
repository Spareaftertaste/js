var playerNumber= document.getElementById('playerNumber'),
    range=document.getElementById('range');

document.getElementById("headerBackBtn").onclick =function () {//点击返回按钮返回首页
    sessionStorage.clear();
    window.location.href='index.html';
};
document.getElementById('licensing').onclick =function (){
    var killer = parseInt($('.killerNum')[0].innerHTML),
        civilian = parseInt($('.civilianNum')[0].innerHTML),
        killerTarget = $(".killer-target").val(),
        civilianTarget = $(".civilian-target").val();
    console.log("KT: "+killerTarget);
    console.log("CT: "+civilianTarget);
    console.log("killer: "+killer);
    console.log("civilian: "+civilian);
    if(killer+civilian === parseInt(playerNumber.value)){
        sessionStorage.setItem("killer",parseInt(playerNumber.value/4));
        sessionStorage.setItem("civilian",playerNumber.value-parseInt(playerNumber.value/4));
        sessionStorage.setItem("killerTarget",killerTarget);
        sessionStorage.setItem("civilianTarget",civilianTarget);
        window.location.href='identity-allocation.html';
    }
    else {
        alert("请设置玩家人数后再开始游戏");
    }
};
$('.setNumber').click (function () {
    var player= playerNumber.value;
    $('.killerNum').html(parseInt(player/4));
    $('.civilianNum').html(player-parseInt(player/4));
});
playerNumber.onblur = function () {
    if (playerNumber.value >= 4 && playerNumber.value <= 18) {
        range.value = playerNumber.value;  // 手动输入玩家数量会同时改变滑块到相应位置
    } else {
        alert("游戏限制人数为4~18人");
        range.value = 4;      // 当输入的玩家数量超出范围时，重置玩家数量
        playerNumber.value = 4;
    }
}
range.oninput=function () {
    playerNumber.value=range.value;
};
document.getElementById('add').onclick= function () {
    console.log("当前玩家总数： "+range.value );
    if(range.value == 18){
        alert("最多只能18个玩家一起玩哟");
        return false;
    }
    ++range.value;
    playerNumber.value=range.value;
};
document.getElementById('reduce').onclick= function () {
    console.log("当前玩家总数： "+range.value );
    console.log(range.value == 4);
    if(range.value == 4){
        alert("最少也要四个人才能开始游戏哟");
        return false;
    }
    --range.value;
    playerNumber.value=range.value;

};
