var leftBtn =document.getElementsByClassName("triangle-left");
var rightBtn =document.getElementsByClassName("triangle-right");
// leftBtn.disabled= true;
leftBtn[0].style.display= 'none';
rightBtn[0].onclick= function () {
    document.getElementsByClassName("article-title")[0].innerHTML="杀人游戏";
    document.getElementsByClassName("start-btn")[0].innerHTML="简化版";
    document.getElementsByClassName("start-btn")[1].innerHTML="警版";
    document.getElementsByClassName("start-btn")[2].innerHTML="3.0版";
    // rightBtn.disabled= true;
    // leftBtn.disabled= false;
    rightBtn[0].style.display= 'none';
    leftBtn[0].style.display= 'block';
};
leftBtn[0].onclick= function () {
    document.getElementsByClassName("article-title")[0].innerHTML="捉鬼版";
    document.getElementsByClassName("start-btn")[0].innerHTML="简化版";
    document.getElementsByClassName("start-btn")[1].innerHTML="猜词版本";
    document.getElementsByClassName("start-btn")[2].innerHTML="白痴版";
    // rightBtn.disabled= false;
    // leftBtn.disabled= true;
    leftBtn[0].style.display= 'none';
    rightBtn[0].style.display= 'block';
};