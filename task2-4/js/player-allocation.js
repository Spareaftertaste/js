var playerNumber= document.getElementById('playerNumber');
var range=document.getElementById('range');
document.getElementById("headerBackBtn").onclick =function () {
    window.location.href='index.html';
};
document.getElementById('licensing').onclick =function (){
    if(parseInt(document.getElementById('killer').innerHTML)===parseInt(playerNumber.value/4)){
        sessionStorage.setItem("killer",parseInt(playerNumber.value/4));
        sessionStorage.setItem("civilian",playerNumber.value-parseInt(playerNumber.value/4));
        window.location.href='identity-allocation.html';
    }
    else {
        alert("请设置玩家人数后再开始游戏");
    }
};
document.getElementById('setNumber').onclick= function number() {
    var playerNumber= document.getElementById('playerNumber').value;
    document.getElementById('killer').innerHTML=parseInt(playerNumber/4);
    document.getElementById('civilian').innerHTML=playerNumber-parseInt(playerNumber/4);
};
playerNumber.oninput=function () {
    if(playerNumber.value>=4 &&playerNumber.value<=18){
        range.value = playerNumber.value;
    }else {
        alert("请输入4-18的玩家数");
    }
};
range.oninput=function () {
    playerNumber.value=range.value;
};
document.getElementById('add').onclick= function () {
    ++range.value;
    playerNumber.value=range.value;
};
document.getElementById('reduce').onclick= function () {
    --range.value;
    playerNumber.value=range.value;
};
