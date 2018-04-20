var headerBackBtn= document.getElementById("headerBackBtn");
var close=document.getElementById('close');
headerBackBtn.onclick =function () {
    window.location.href='player-allocation.html';
};
close.onclick= function () {
    if (confirm("您确定要退出游戏吗？")){
        window.location.href='index.html';
    }
};
var killer = parseInt(sessionStorage.getItem("killer")) ;
var civilian= parseInt(sessionStorage.getItem("civilian"));

function shuffle(arr){
    var _floor = Math.floor, _random = Math.random,
        len = arr.length,
        i, j, arri, n = _floor(len/2)+1;
    while( n-- ){
        i = _floor(_random()*len);
        j = _floor(_random()*len);
        if( i!==j ){
            arri = arr[i];
            arr[i] = arr[j];
            arr[j] = arri;
        }
    }
    //增加切牌操作
    i = _floor(_random()*len);
    arr.push.apply(arr, arr.splice(0,i));
    return arr;
}
var arr=[];
function creatarr(arr) {
    for(var i=1;i<(killer+civilian+1);i++){
        arr.splice(i-1,0,i);
    }
    return arr;
}//建立玩家数组
var player= creatarr(arr);//创建玩家数
shuffle(player);//打乱玩家
function identity() {
    var yahah = [];
    for (var i = 0; i < arr.length; i++) {
       if(i<killer) {
           yahah.splice(i,0,"角色：杀手");
       }else {
           yahah.splice(i,0,"角色：平民")
       }
    }
    return yahah
}
var shufflePlayer= identity();//给玩家赋予身份
console.log(player);
console.log(shufflePlayer);
function search(arr,dst){
    var i = arr.length;
    while(i-=1){
        if (arr[i] === dst){
            return i;
        }
    }
    return 0;
}


var w=1;
document.getElementById('next').onclick= function (){
    abb();
    console.log(w);
    ++w;
};
function abb() {
    if(w<(player.length*2-1)){//展示除最后一名玩家外玩家的身份
        if(w%2===0){
            document.getElementById("photo").src="img/yohuo.png";
            document.getElementById("identity").style.display= "none";
            document.getElementById("next").innerHTML="查看"+ (w+2)/2 + "号玩家身份";
            document.getElementById("number").innerHTML=(w+2)/2 +"";
        }else {
            document.getElementById("photo").src = "img/aha.png";
            document.getElementById("identity").style.display = "block";
            document.getElementById("identity").innerHTML = shufflePlayer[search(player,((w+1)/2))];
            document.getElementById("next").innerHTML = "隐藏并传递给" + (w + 3) / 2 + "号";
            document.getElementById("number").innerHTML = (1 + w)/ 2 +"" ;
            console.log(search(player,((w+1)/2)));
        }
    }
    if (w===(player.length*2-1)) {//展示最后一名玩家身份
        if (w % 2 === 0) {
            document.getElementById("photo").src="img/yohuo.png";
            document.getElementById("identity").style.display= "none";
            document.getElementById("next").innerHTML="上交手机";
            document.getElementById("number").innerHTML=(w+2)/2 +"";

        }else {
            document.getElementById("photo").src = "img/aha.png";
            document.getElementById("identity").style.display = "block";
            document.getElementById("identity").innerHTML = shufflePlayer[search(player,((w+1)/2))];
            document.getElementById("next").innerHTML = "上交手机";
            document.getElementById("number").innerHTML = (1 + w)/ 2 +"" ;
            console.log(search(player,((w+1)/2)));
        }
    }
    if (w>(player.length*2-1)){
        if (confirm("请把手机交给法官")){
            window.location.href='game.html';
        }
    }
}
// console.log(a);
