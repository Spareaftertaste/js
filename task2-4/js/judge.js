var player= sessionStorage.getItem('player'),
    playerIdentity= sessionStorage.getItem('playerIdentity'),
    headerBackBtn= $("#headerBackBtn"),
    close=$('#close'),
    content=$('.content'),
    day=$('h3'),
    gameOver=$('#gameOver'),
    diary=$('#diary');
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
var switchMenu={
    state:"off",//当前状态
    trans:function(){//状态和状态变化规则 //包含了动作
        switch (this.state){
            case "off":
                this.state="on";
                content.hide();
                day.css("border","none");
                break;
            case "on":
                this.state="off";
                content.show();
                day.css("border-bottom","#999 solid");
                break;
            default:
                // this.state="off";
                // content.hide();
                // day.css("border","none");
        }

    },
    //事件，不同的事件对应不同的规则
    event:function(){this.trans();console.log(switchMenu)}
};
day.on("click",function(){switchMenu.event()});//给按钮添加点击事件 //控制菜单的折叠
$(".step").click(function () {
    window.location.href='game.html';
});
