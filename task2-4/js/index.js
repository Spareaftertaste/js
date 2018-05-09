var leftBtn =document.getElementsByClassName("triangle-left"),
     rightBtn =document.getElementsByClassName("triangle-right");
leftBtn[0].style.display= 'none';//默认隐藏左侧三角形按钮
document.getElementsByClassName("start-btn")[0].onclick= function () {//点击游戏版本进入游戏
    window.location.href="player-allocation.html"
};
function police() {//将游戏版本转换成杀人游戏
    document.getElementsByClassName("article-title")[0].innerHTML="杀人游戏";
    document.getElementsByClassName("start-btn")[0].innerHTML="简化版";
    document.getElementsByClassName("start-btn")[1].innerHTML="警版";
    document.getElementsByClassName("start-btn")[2].innerHTML="3.0版";
    $(".circle").eq(0).css("background-color","#69d1e9");
    $(".circle-active").eq(0).css("background-color","#f0f0f0");
    rightBtn[0].style.display= 'none';
    leftBtn[0].style.display= 'block';
}
function murder() {//游戏内容转换成抓鬼游戏
    document.getElementsByClassName("article-title")[0].innerHTML="捉鬼版";
    document.getElementsByClassName("start-btn")[0].innerHTML="简化版";
    document.getElementsByClassName("start-btn")[1].innerHTML="猜词版本";
    document.getElementsByClassName("start-btn")[2].innerHTML="白痴版";
    $(".circle").eq(0).css("background-color","#f0f0f0");
    $(".circle-active").eq(0).css("background-color","#69d1e9");
    leftBtn[0].style.display= 'none';
    rightBtn[0].style.display= 'block';
}
rightBtn[0].onclick= function () {//点击右侧三角形游戏版本转换
    police();
};
leftBtn[0].onclick= function () {//点击左侧三角形游戏版本转换
    murder();
};
$(".circle").click(function () {//点击下面的小点点游戏版本转换
    police();
});
$(".circle-active").click(function () {//点击下面的小点点游戏版本转换
    murder();
});
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