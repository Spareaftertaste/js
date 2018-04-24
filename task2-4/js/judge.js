var player= sessionStorage.getItem('player'),
    playerIdentity= sessionStorage.getItem('playerIdentity'),
    headerBackBtn= $("#headerBackBtn"),
    close=$('#close'),
    content=$('.content'),
    day=$('h3'),
    gameOver=$('#gameOver'),
    diary=$('#diary');

headerBackBtn.click(function(){
    window.location.href='judge-diary.html';
});
close.click(function(){
    if (confirm("您确定要退出游戏吗？")) {
        window.location.href = 'index.html';
    }
});
gameOver.click(function(){
    if (confirm("您确定要结束本轮游戏吗？")) {
        window.location.href = 'index.html';
    }
});
diary.click(function(){
    window.location.href='judge-diary.html';
});
// var menu = {
//     // 当前状态
//     initial: 'hide',
//     // 绑定事件
//     initialize: function() {
//         // var self = this;
//         day.on("hover", content.transition);
//     },
//     // 状态转换
//     transition: function(event){
//         switch(this.currentState) {
//             case "hide":
//                 this.currentState = 'show';
//                 content.show();
//                 break;
//             case "show":
//                 this.currentState = 'hide';
//                 content.hide();
//                 break;
//             default:
//                 console.log('Invalid State!');
//                 break;
//         }
//     }
//
// };
