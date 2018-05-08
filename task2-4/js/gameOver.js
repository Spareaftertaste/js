var deathNote = sessionStorage.getItem("deadMan"),
    date = parseInt(sessionStorage.getItem("date")),//游戏中的时间
    playerIdentity= sessionStorage.getItem('playerIdentity'),
    player= sessionStorage.getItem('player'),
    killerNum = sessionStorage.getItem("killer"),
    step = sessionStorage.getItem("step"),
    civilianNum = sessionStorage.getItem("civilian");

$("#vote-btn").click(function () {
    location.href = "index.html";
    sessionStorage.clear();
});
$("#share-btn").click(function () {
    location.href = "index.html";
    sessionStorage.clear();
});
window.onload = function() {
    deathNote = deathNote.split(",");//将死亡名单转换成数组
    playerIdentity= playerIdentity.split(",");
    player = player.split(",");


    if(killerNum === 0){//根据剩余的杀手数目判定到底哪一方胜利
        $(".text")[0].innerHTML = "平民胜利"
    }else {
        $(".text")[0].innerHTML = "杀手胜利"
    }
    $(".civilianKey").hide();
    $(".killerKey").hide();


    $(".murder")[0].innerHTML = killerNum;
    $(".civilian")[0].innerHTML = civilianNum;
    for (var i = 0;i <date-1 ; i++){//根据天数加载出所有内容
        $(".blank").before("<div class=\"content\">\n" +
            "        <div class=\"night\">\n" +
            "            <div class=\"day\">第1天</div>\n" +
            "            <div></div>\n" +
            "        </div>\n" +
            "        <div class=\"killing\">晚上：5号被杀手杀死，5号是水民</div>\n" +
            "        <div class=\"voting\">白天：8号被全民投票投死，8号是杀手</div>\n" +
            "    </div>");

    }

    if(step === "murder"){//最后一步是杀手杀人时游戏结束
        kill();
    }else {//最后一步是投票结束游戏时
        vote();
    }
    for (var a= 1;a < date+1;a++){
        $(".day")[a-1].innerHTML = "第" + a + "天"
    }
    console.log(deathNote);
    console.log("date:" +date );
    console.log("killerNum: "+killerNum);
    console.log("civilianNum: "+civilianNum);
    console.log("step: "+step);
    console.log("pI: "+ playerIdentity);
    console.log("p: "+player);
};
function kill() {
    var voting = $(".voting"),
        killing = $(".killing");
    voting.eq(date-1).hide();
    for(var b = 0;b< date-1;b++ ){
        var c = b+1,
            d = deathNote[2*c-1],//被投死人的编号
            killedIndex = player.indexOf(d),//被投死人的下标
            index = deathNote[2*c-2],//被杀人的编号
        // console.log("被投死人的编号： "+ killedIndex);
            killed = playerIdentity[killedIndex].slice(3);//被投死人的身份
        voting[b].innerHTML = d + "号被全民投死，"+ d +"的身份是" + killed ;
        if(index === "none"){//当杀手这一晚没有杀人时
            killing[b].innerHTML = "这一晚杀手没有杀人";
        }else {//当杀手这一晚杀人时
            killing[b].innerHTML = index + "号被杀手杀死，" + index + "号的身份是平民";
        }

    }
    killing[date-1].innerHTML = deathNote[deathNote.length-1] + "号被杀手杀死，" + deathNote[deathNote.length-1] + "号的身份是平民";
}
function vote() {
    var voting = $(".voting"),
        killing = $(".killing");
    for( var b = 0;b< date;b++ ){
        var c = b+1,
            d = deathNote[2*c-1],//被投死人的编号
            killedIndex = player.indexOf(d),//被投死人的下标
            index = deathNote[2*c-2],//被杀人的编号
        // console.log(killedIndex);
        // console.log(d);
        // console.log("deathNote: "+deathNote[2*c-1]);
        // console.log("被投死人的编号： "+ playerIdentity[killedIndex-1].slice(3));
            killed = playerIdentity[killedIndex].slice(3);//被投死人的身份
        voting[b].innerHTML = d + "号被全民投死，"+ d +"的身份是" + killed ;
        if(index === "none"){//当杀手这一晚没有杀人时
            killing[b].innerHTML = "这一晚杀手没有杀人";
        }else {//当杀手这一晚杀人时
            killing[b].innerHTML = index + "号被杀手杀死，" + index + "号的身份是平民";
        }

    }
}