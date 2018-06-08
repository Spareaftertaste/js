app.controller("backStageCtrl",function ($scope,$state,$http,sideBar) {
    $scope.logo = sessionStorage.getItem("logo");//验证是否登录
    if ($scope.logo !== "233"){
        $state.go('login');
    }
    $scope.sideBar = sideBar;

    $scope.titleIndex = function (e) {
        $scope.sideBarTitleIndex = ($scope.sideBarTitleIndex == e)? undefined : e;
    };
    //一级菜单
    $scope.content = function (e,index) {
        $scope.sideBarContentt = e;
        sessionStorage.setItem("title",index);
        sessionStorage.setItem("content",e);
    };
    //二级菜单
    $scope.sideBarContentt = sessionStorage.getItem("content");
    $scope.sideBarTitleIndex = sessionStorage.getItem("title");
    //刷新也保持高亮

    $scope.exit = function () {
        if(confirm("确定要退出登录嘛")){
            $http({
                method: 'post',
                url: '/carrots-admin-ajax/a/logout',
            }).then(function(res) {
                if(res.data.code === 0){
                    alert("ヾ(￣▽￣)Bye~Bye~");
                    sessionStorage.clear();
                    $state.go('login');

                }else {
                    console.log(res);
                }
            },function () {
                alert('2333退出失败')
            })
        }
    };
});

app.constant('sideBar',[
    {
        sideBarTitle : '信息管理',
        sideBarContent : [
            {sideBarName : '公司列表', url:'.company' },
            {sideBarName : '职位列表', url:'.job' },
        ]
    },
    {
        sideBarTitle : 'Article管理',
        sideBarContent : [
            {sideBarName : '文章管理', url:'.articleList' },
        ]
    },
]);