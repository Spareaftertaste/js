var time={
    state:"night",
    trans:function () {
        switch (this.state){
            case "day":
                if(start.innerText==="投票"){
                    this.state="night";
                    $("<section>\n" +
                        "    <h3>第一天</h3>\n" +
                        "    <div class=\"flex content\">\n" +
                        "        <div class=\"content-left\"></div>\n" +
                        "        <div class=\"content-right\">\n" +
                        "            <div class=\"flex\">\n" +
                        "                <div class=\"moon\"></div>\n" +
                        "                <div class=\"step murder\"><span class=\"triangle\"></span>杀手杀人</div>\n" +
                        "            </div>\n" +
                        "            <div class=\"game-content\">\n" +
                        "                <!--3号被杀死，真实身份是平民-->\n" +
                        "            </div>\n" +
                        "            <div class=\"flex\">\n" +
                        "                <div class=\"sun\"></div>\n" +
                        "                <div class=\"step lastWord\"><span class=\"triangle\"></span>亡灵发表遗言</div>\n" +
                        "            </div>\n" +
                        "            <div class=\"flex\">\n" +
                        "                <div class=\"step speak\"><span class=\"triangle\"></span>玩家依次发言</div>\n" +
                        "            </div>\n" +
                        "            <div class=\"flex\">\n" +
                        "                <div class=\"step vote\"><span class=\"triangle\"></span>全民投票</div>\n" +
                        "            </div>\n" +
                        "            <div class=\"game-content\">\n" +
                        "                <!--5号被投票投死，真是身份是平民-->\n" +
                        "            </div>\n" +
                        "        </div>\n" +
                        "    </div>\n" +
                        "</section>").appendTo("main");
                    $("#headTitle").innerText="杀手杀人";
                    $("#navTitle").innerText="杀手请睁眼，杀手请选择要啥的对象";
                    $("#mainTitle").innerText="点击下方玩家头像对被杀玩家进行标记";
                }
                break;
            case "night":
                if(start.innerText==="确认"){
                    this.state="day";
                    start.innerText="投票";
                    $("#headTitle").innerText="投票";
                    $("#navTitle").innerText="发言讨论结束，大家请投票";
                    $("#mainTitle").innerText="点击票数最多的人";
                }
                break;
        }


    }
};
