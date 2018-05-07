var start= document.getElementById('start');
var end= document.getElementById('end');
var box= document.querySelectorAll('.box');
function game(){
    for (var a=0; a<9; a++){
        box[a].style.backgroundColor= '#ffa600';
    }
    for (var i=0 ,q=9,three= [0,1,2,3,4,5,6,7,8],t=Math.floor(Math.random()*q), j= three[t]; i< 3; i++, q--, three.splice(t,1), t=Math.floor(Math.random()*q), j= three[t]){
        var r= Math.floor(Math.random()*256);
        var g= Math.floor(Math.random()*256);
        var b= Math.floor(Math.random()*256);
        box[j].style.backgroundColor= "r" +"g" +"b" + "(" +r +"," +g +"," +b +")";
    }
}
start.onclick= function () {
    gameEnd= setInterval(game,1000);
    start.disabled= true;
};
end.onclick= function() {
    clearInterval(gameEnd);
    for (var i=0; i<9; i++){
        box[i].style.backgroundColor= '#ffa600';
    }
    start.disabled= false;
};

// for (i=0;i<5;i++){
//     i=i+1;
//     console.log(i);
// };
var byId = document.getElementById("end"),
    byClass = document.getElementsByClassName("box"),
    byqs = document.querySelectorAll('.box'),
    jqById = $("#end"),
    jqByClass = $(".box");
console.log(byId);
console.log(byClass);
console.log(byqs);
console.log(jqById);
console.log(jqByClass);
