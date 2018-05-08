var player= sessionStorage.getItem('player'),
    playerIdentity= sessionStorage.getItem('playerIdentity'),
    killerNum = sessionStorage.getItem("killer"),
    civilianNum = sessionStorage.getItem("civilian"),
    close=$('#close'),
    start=$("#start"),
    step = sessionStorage.getItem("step"),
    select = 0,//当其值为0时没有杀手不杀人
    index = 0,//被选中玩家的索引
    deathNote = sessionStorage.getItem("deadMan"),
    date = parseInt(sessionStorage.getItem("date")),//游戏中的时间
    playerBox= $('.player');
    console.log(killerNum,civilianNum);
close.click(function(){
    if (confirm("您确定要退出游戏吗？")) {
        window.location.href = 'index.html';
        sessionStorage.clear();
    }
});
window.onload=function () {
    console.log("date:"+ date);
    if(date === 1 && step === "vote"){
        deathNote = deathNote +",";
    }
    console.log("date: "+date);
    if(date > 1){
        deathNote = deathNote +",";
    }
    console.log("deathNote:"+deathNote);
    console.log(step);
    if(step ==="vote"){
        $("#headTitle").text("投票");
        $("#navTitle").text("讨论结束，请大家开始投票");
        $("#mainTitle").text("点击票数最多人的头像");
    }//修改整个页面样式
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
        $(".identity")[i].innerHTML= playerIdentity[b].slice(3);  //玩家身份
        ++i;
    }
    death();
};
function death() {
    var death =deathNote.split(",");
    console.log(death);
    for (var i=0;i<18;i++ ){
        a = i+ "";
        if(death.indexOf(a) >=0 ){
            $(".identity").eq(i-1).css("background-color","#83b09a");
        }
        console.log(death.indexOf(a) >=0);
    }
}
playerBox.click(function () {
    index = 0;
    $(".knife").css("visibility","hidden");
    $(this).find(".knife").css("visibility","visible");//隐藏小刀当选中玩家时小刀出现
    index = $(this).find(".number").text();
    index = index.slice(0,index.length-1);
    select = 1;
    console.log("选中玩家的编号： "+ index);
});
start.click(function () {
    if(date>1){//判断这个玩家是不是个死人
        console.log("deathNote:"+deathNote);
        var death = deathNote;
        death = death.split(",");
        if (death.indexOf(index) >= 0){
            console.log("deathNote:"+deathNote);
            console.log("death:"+death);
            alert("这个人已经死了，请不要再伤害它了");
            return false;
        }
    }
    switch ($("#headTitle").text()){//根据头部标签内容，处决玩家的过程发生改变
        case "杀手杀人" :
            if( select === 0){
                if(confirm("杀手是否放弃杀人")){//当没有玩家被选中时询问杀手是否放弃杀人
                    deathNote = deathNote + "none";
                    sessionStorage.setItem("deadMan",deathNote);
                    window.location.href = 'judge.html';
                }
            }else {
                if($(".identity")[index-1].innerHTML === "杀手"){//判断杀的人的身份是否为杀手
                    alert("请不要做一个25仔");
                }else {
                    if(confirm("确定要杀死它么")){
                        console.log("deathNote: "+deathNote);
                        console.log("index: "+index);
                        deathNote = deathNote + index;
                        console.log("deathNote: "+deathNote);

                        civilianNum--;
                        sessionStorage.setItem("deadMan",deathNote);
                        sessionStorage.setItem("civilian",civilianNum);
                        if(killerNum >= civilianNum){
                            alert("游戏结束杀手获胜");
                            window.location.href = 'gameover.html';
                        }else {
                            window.location.href = 'judge.html';
                        }
                    }
                }
            }
            break;
        case "投票":
            if( select === 0){
                alert("请选择一名玩家并将其拉出去斩了")
            }else {
                if($(".identity")[index-1].innerHTML === "杀手"){//如果投票的人是杀手的话
                    if(confirm("确定要投它么")) {
                        console.log("deathNote: "+deathNote);
                        console.log("index: "+index);
                        deathNote = deathNote + index;
                        console.log("deathNote: "+deathNote);
                        killerNum--;
                        sessionStorage.setItem("deadMan", deathNote);
                        sessionStorage.setItem("killer", killerNum);
                        if (killerNum >= civilianNum) {
                            alert("游戏结束杀手获胜");
                            window.location.href = 'gameover.html';
                        }else if(killerNum === 0){
                            alert("游戏结束平民获胜");
                            window.location.href = 'gameover.html';
                        } else {
                            date++;
                            sessionStorage.setItem("date",date);
                            window.location.href = 'judge.html';
                        }
                    }
                }else {//如果投票的人是平民的话
                    if(confirm("确定要投它么")) {
                        console.log("deathNote: "+deathNote);
                        console.log("index: "+index);
                        deathNote = deathNote + index;
                        console.log("deathNote: "+deathNote);
                        civilianNum--;
                        sessionStorage.setItem("deadMan", deathNote);
                        sessionStorage.setItem("civilian", civilianNum);
                        if (killerNum >= civilianNum) {
                            alert("游戏结束杀手获胜");
                            window.location.href = 'gameover.html';
                        } else {
                            date++;
                            sessionStorage.setItem("date",date);
                            window.location.href = 'judge.html';
                        }
                    }
                }
            }
    }
});
// function toOrNotToBe() {//判断玩家是不是死人
//     console.log("deathNote:"+deathNote);
//     if (deathNote.indexOf(index) >= 0){
//         alert("这个人已经死了，请不要再伤害它了");
//         return false;
//     }
// }
