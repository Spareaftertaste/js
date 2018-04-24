var player= sessionStorage.getItem('player'),
    playerIdentity= sessionStorage.getItem('playerIdentity'),
    headerBackBtn= $("#headerBackBtn"),
    close=$('#close'),
    playerBox= document.querySelectorAll('.player'),
    start= $("#start");

$('.step').click(function(){
    window.location.href = 'game.html';
});
headerBackBtn.click(function(){
    if (confirm("您确定要返回上一步吗，返回上一部将导致玩家身份重新分配")) {
        window.location.href='.html';
    }
});
close.click(function(){
    if (confirm("您确定要退出游戏吗？")) {
        window.location.href = 'index.html';
    }
});
start.click(function(){
    window.location.href = 'judge.html';
});
window.onload=function () {
    player= player.split(",");
    playerIdentity= playerIdentity.split(",");
    console.log(player);
    console.log(playerIdentity);
    var i=0;
    while (i< player.length){ //根据玩家人数显示出相应的盒子
        playerBox[i].style.display="block";
        console.log(playerIdentity.length);
        $(".identity")[i].innerHTML= playerIdentity[i].slice(3);  //玩家身份
        $(".number")[i].innerText=++i+"号";   //玩家编号，并控制循环
    }
};
