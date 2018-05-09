var headerBackBtn= document.getElementById("headerBackBtn"),
    close=document.getElementById('close'),
    key = $("#key"),
    killerTarget = sessionStorage.getItem("killerTarget"),
    civilianTarget = sessionStorage.getItem("civilianTarget"),
    deadMan = "";//存储死亡玩家名单
sessionStorage.setItem("date","1");//存储游戏时间
sessionStorage.setItem("deadMan",deadMan);
key.hide();
console.log(killerTarget);
console.log(civilianTarget);
headerBackBtn.onclick =function () {
    sessionStorage.clear();
    window.location.href='player-allocation.html';
};
close.onclick= function () {
    if (confirm("您确定要退出游戏吗？")){
        sessionStorage.clear();
        window.location.href='index.html';
    }
};
var killer = parseInt(sessionStorage.getItem("killer")) ;
var civilian= parseInt(sessionStorage.getItem("civilian"));

function shuffle(arr){//洗牌算法打乱数组
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
function creatarr(arr) {//将玩家编号组成一个数组但是好像弄复杂了。。。
    for(var i=1;i<(killer+civilian+1);i++){
        arr.splice(i-1,0,i);
    }
    return arr;
}//建立玩家数组
var player= creatarr(arr);//创建玩家数
shuffle(player);//打乱玩家数组

function identity() {//将玩家的身份依次按照杀手平民组成数组
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
sessionStorage.setItem('player',player);
sessionStorage.setItem('playerIdentity',shufflePlayer);
console.log(player);
console.log(shufflePlayer);
function search(arr,dst){//自制可以返回数组下标的方法
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
    console.log(shufflePlayer[search(player,((w+1)/2))]);
    abb();
    console.log(w);
    ++w;

};
function abb() {
    if(w<(player.length*2-1)){//展示除最后一名玩家外玩家的身份
        if(w%2===0){
            key.hide();
            document.getElementById("photo").src="img/yohuo.png";
            document.getElementById("identity").style.display= "none";
            document.getElementById("next").innerHTML="查看"+ (w+2)/2 + "号玩家身份";
            document.getElementById("number").innerHTML=(w+2)/2 +"";
        }else {
            key.show();
            document.getElementById("photo").src = "img/aha.png";
            document.getElementById("identity").style.display = "block";
            document.getElementById("identity").innerHTML = shufflePlayer[search(player,((w+1)/2))];
            document.getElementById("next").innerHTML = "隐藏并传递给" + (w + 3) / 2 + "号";
            document.getElementById("number").innerHTML = (1 + w)/ 2 +"" ;
            console.log(search(player,((w+1)/2)));
        }
    }
    if (w===(player.length*2-1)) {//展示最后一名玩家身份
        key.show();
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
            window.location.href='judge-diary.html';
        }
    }
    if(w%2 === 0){
        return false;
    }else {
        if(shufflePlayer[search(player,((w+1)/2))] === "角色：杀手"){
            key.html(killerTarget);
        }else {
            key.html(civilianTarget);
        }
    }
}
// $(function () {
//     key.hide();
//    if(document.getElementById("photo").src !== "img/yohuo.png"){
//        return false;
//    }else {
//        if(shufflePlayer[search(player,((w+1)/2))] === "角色：杀手"){
//            key.html(killerTarget);
//        }else {
//            key.html(civilianTarget);
//        }
//    }
// });
// console.log($("#identity").css("display"));
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
