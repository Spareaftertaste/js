
app.controller("loginCtrl",function ($scope,$http,$location) {
    $scope.loginFiled = false;
    $scope.login = function() {
        // if($scope.name === ""){
        //     $scope.enterName = true;
        //     return false;
        // }
        // if($scope.passWord === ""){
        //     $scope.enterPassword = true;
        //     return false;
        // }
        $http({
            method: 'POST',
            url: '/carrots-admin-ajax/a/login',
            data:{name:$scope.name,pwd:$scope.passWord},
            headers:{'Content-Type': 'application/x-www-form-urlencoded'},
            transformRequest: function (data) {
                return $.param(data);
            }
        }).then(function successCallback(response) {
            //请求成功的代码
            console.log(response.data.message);
            if(response.data.message === "success") {
                $location.path('/backstage')
            }else {
                alert("Please enter the correct username or password")
            }

            }, function errorCallback(response) {
            // 请求失败执行代码
            alert("error");
        });
    }

});

app.controller("backStageCtrl",function ($scope,getArticleList) {


});
app.controller("articleListCtrl",function ($scope,getArticleList) {
    $scope.articleList = null;
    var page = 1,
        size = 10;
    getArticleList.getList($scope.articleList,page,size).then(
        res => {
            $scope.articleList = res.articleList;
            $scope.total =  parseInt(res.total) ;
            $scope.size = parseInt(res.size);
            $scope.page = res.page;
            // $scope.info = {
            //     articleList : $scope.articleList,
            //     size : $scope.size,
            //     page : $scope.page,
            //     total : $scope.total
            // };
            // return $scope.info;
            $scope.btnList = [];
            for(var i= 0;i < Math.ceil($scope.total/$scope.size);i++){
                $scope.btnList.push(i+1)
            }
            console.log("list: ",$scope.articleList);
            console.log("total: ",$scope.total);
            console.log("size: ",$scope.size);
            console.log("page: ",$scope.page);
            console.log("btnList: ",$scope.btnList);

        },
        error => {
            console.log(error)
        }
    );
    $scope.pageChange = function (b,a) {
        getArticleList.getList($scope.articleList,a,b).then(
            res => {
                $scope.articleList = res.articleList;
            },
            error => {
                console.log(error)
            }
        );
    };
    $scope.pageSizeChange = function (a,b) {
        getArticleList.getList($scope.articleList,b,a).then(
            res => {
                $scope.articleList = res.articleList;
                $scope.total =  parseInt(res.total) ;
                $scope.size = parseInt(res.size);
                $scope.btnList = [];
                for(var i= 0;i < Math.ceil($scope.total/$scope.size);i++){
                    $scope.btnList.push(i+1)
                }
                console.log("list: ",$scope.articleList);
                console.log("total: ",$scope.total);
                console.log("size: ",$scope.size);
                console.log("page: ",$scope.page);
                console.log("btnList: ",$scope.btnList);

            },
            error => {
                console.log(error)
            }
        );
    }
});