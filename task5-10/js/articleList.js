app.controller("articleListCtrl",function ($scope,$state,$stateParams,searchArticleList,changeStatus) {
    //获取url中的参数
    $scope.getList = function () {
        $scope.articleList = null;
        console.log($stateParams);
        if($stateParams.page !== undefined){
            $scope.newPage = parseInt($stateParams.page);
        }

        if($stateParams.size !== undefined){
            $scope.size = parseInt($stateParams.size);
        }
        // $scope.newPage = ($scope.page != $scope.newPage)? $scope.page : 1;
        // $scope.$watch('newPage',function(newValue,oldValue){
        //     $scope.page = $scope.newPage
        // });
        console.log($scope.size,$scope.page);
        $scope.startAt = $stateParams.startAt;
        $scope.endAt = $stateParams.endAt;
        $scope.type = $stateParams.type;
        $scope.status = $stateParams.status;

        console.log("page: ",$scope.page);
        console.log("start: ",$scope.startAt,"end: ",$scope.endAt);

        $scope.dat1 = new Date(Number($scope.startAt));
        $scope.dat2 = new Date(Number($scope.endAt)-86399999);
        console.log($scope.dat1,$scope.dat2);
        searchArticleList.search($scope.articleList,$stateParams.page,$scope.size,$scope.startAt,$scope.endAt,$scope.type,$scope.status).then(
            res => {
                console.log(res);
                $scope.articleList = res.articleList;
                $scope.totalItems = res.total;
                $scope.size = res.size;
                // $scope.page = res.page;
                if($scope.page != $scope.newPage && $scope.newPage != undefined){
                    $scope.page = $scope.newPage;
                }
            },
            error => {
                console.log(error)
            }
        );
    };
    $scope.getList();

    $scope.startDate = "yyyy/MM/dd";
    $scope.endDate = "yyyy/MM/dd";
    $scope.altInputFormats = ['yyyy/M!/d!'];
    $scope.popup1 = {
        opened: false
    };
    $scope.open1 = function () {
        $scope.popup1.opened = true;
    };
    $scope.popup2 = {
        opened: false
    };
    $scope.open2 = function () {
        $scope.popup2.opened = true;
    };
    $scope.today = new Date();


    $scope.search = function () {
        console.log("start: ",$scope.startAt,"end: ",$scope.endAt);
        //检验日期，类型，状态,每页数据是否符合数据格式
        if(isNaN($scope.dat1)){
            $scope.startAt = undefined
        }else {
            $scope.startAt = (Date.parse($scope.dat1) == undefined)? 0 : Date.parse($scope.dat1);
        }
        if(isNaN($scope.dat2) ){
            $scope.endAt = undefined
        }else {
            $scope.endAt = (!$scope.dat2)? $scope.dat2.getTime()+86399999: Date.parse($scope.dat2)+86399999;
        }
        if($scope.page != $scope.newPage && $scope.newPage){
            $scope.newPage = $scope.page;
        }

        if($scope.type == 9){
            $scope.type = undefined
        }
        if($scope.status == 0){
            $scope.status = undefined
        }
        console.log("start: ",$scope.startAt,"end: ",$scope.endAt);
        $state.go('backstage.articleList', {
            'size': $scope.size,
            'page': $scope.page,
            'startAt': $scope.startAt,
            'endAt': $scope.endAt,
            'type': $scope.type,
            'status': $scope.status
        })
    };
    $scope.delete = function () {
        $scope.size = undefined;
        $scope.page = undefined;
        $scope.startAt = undefined;
        $scope.endAt = undefined;
        $scope.dat1 = undefined;
        $scope.dat2 = undefined;
        $scope.type = undefined;
        $scope.status = undefined;
        $scope.search();
    };
    $scope.editArticle = function(a){
        $state.go('backstage.newArticle',{id:a})
    };
    $scope.exitArticle = function (a,b) {
        if(b == 1){
            $scope.tip = "<p style=\"font-size: 16px;color: #999;text-align: center\">" +
                "上线后该图片将在轮播banner中展示。</p>\n" +
                "<h4 style=\"font-size: 20px;text-align: center\">" +
                "是否执行上线操作？</h4>";
        }else {
            $scope.tip =  "<p style=\"font-size: 16px;color: #999;text-align: center\">" +
                "下线后该图片将不展示站轮播banner中。</p>\n" +
                "<h4 style=\"font-size: 20px;text-align: center\">" +
                "是否执行下线操作？</h4>";
        }
        bootbox.confirm({
            title: '操作提示',
            message: $scope.tip,
            buttons: {
                cancel: {
                    label: '取消'
                },
                confirm: {
                    label: '确认'
                }
            },
            callback: function(result) {
                if(result === true){
                    changeStatus.change(a,a,(b == 1)? 2: 1);
                    $state.reload('backstage.articleList');
                }
            }
        })
    };
    $scope.deleteArticle = function (a) {
        bootbox.confirm({
            title: '操作提示',
            message:"确认删除？？？",
            buttons: {
                cancel: {
                    label: '取消'
                },
                confirm: {
                    label: '确认'
                }
            },
            callback: function(result) {
                if(result === true){
                    changeStatus.delete(a,a);
                    $state.reload('backstage.articleList');
                }
            }
        })
    };
});