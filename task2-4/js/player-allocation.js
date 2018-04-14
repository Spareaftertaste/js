var headerBackBtn= document.getElementById("headerBackBtn");
var licensing=document.getElementById('licensing');
headerBackBtn.onclick =function () {
    window.location.href='index.html';
};
licensing.onclick =function (){
    window.location.href='identity-allocation.html';
};
function number() {
    var playerNumber= document.getElementById('playerNumber').value;
    document.getElementById('killer').innerHTML=parseInt(playerNumber/4);
    document.getElementById('civilian').innerHTML=playerNumber-parseInt(playerNumber/4);
    if(playerNumber<3 || playerNumber>18)
    {
        alert('请输入正确的玩家数');
        clearInterval(checkNumber);
        setTimeout(window.onload,3000);
    }
}
window.onload=function () {
    checkNumber= setInterval(number,500);
};
