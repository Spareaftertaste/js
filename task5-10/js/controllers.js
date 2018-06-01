
app.controller("loginCtrl",function ($scope,$http,$location) {
    $scope.loginFiled = false;
    $scope.login = function() {
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
app.controller("articleListCtrl",function ($scope,getArticleList,searchArticleList) {
    $scope.articleList = null;
    var page = 1,
        size = 10;
    getArticleList.getList($scope.articleList,page,size).then(
        res => {
            $scope.articleList = res.articleList;
            $scope.total =  parseInt(res.total) ;
            $scope.size = parseInt(res.size);
            $scope.page = res.page;
            $scope.btnList = [];
            for(var i= 0;i < Math.ceil($scope.total/$scope.size);i++){
                $scope.btnList.push(i+1)
            }
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
            },
            error => {
                console.log(error)
            }
        );
    };
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

    $scope.search = function (a,b,c,d,size) {
        a = Date.parse(a);
        b = Date.parse(b);
        if(isNaN(a)){
            a = ""
        }
        if(isNaN(b)){
            b = ""
        }
        switch (c) {
            case "首页Banner":
                c = 0;
                break;
            case "找职位Banner":
                c = 1;
                break;
            case "行业大图":
                c = 3;
                break;
            case "找精英Banner":
                c = 2;
                break;
            case "全部":
                c = undefined;
                break;
        }
        switch (d) {
            case "草稿":
                d = 1;
                break;
            case "上线":
                d = 2;
                break;
            case "全部":
                d = undefined;
                break;
        }
        console.log(a, b, c, d, size);
        console.log(typeof c);
        searchArticleList.search($scope.articleList, a, b, c, d, size).then(
            res => {
                $scope.articleList = res.articleList;
                $scope.total = parseInt(res.total);
                $scope.size = parseInt(res.size);
                $scope.btnList = [];
                for (var i = 0; i < Math.ceil($scope.total / $scope.size); i++) {
                    $scope.btnList.push(i + 1)
                }
            },
            error => {
                console.log(error)
            }
        );
    };
    $scope.clear = function (a,b,c,d,size) {
        a = undefined;
        b = undefined;
        c = undefined;
        d = undefined;
        $scope.search(a,b,c,d,size)
    }
});

app.controller("newArticleCtrl",function ($scope,$http) {
    $scope.reader = new FileReader();   //创建一个FileReader接口
    // $scope.thumb = {};      //用于存放图片的base64
    $scope.onload = false;
    $scope.imgUpload = function(files) {
        $scope.reader.readAsDataURL(files[0]);  //FileReader的方法，把图片转成base64
        $scope.reader.onload = function () {
            $scope.$apply(function () {
                $scope.img = files[0];
                $scope.imgSize = files[0].size > 1024 * 1024 ? (files[0].size / 1024 / 1024).toFixed(2) + 'MB' : (files[0].size / 1024).toFixed(2) + 'KB';
                $scope.imgName = files[0].name;
                $scope.onload = true;
            });
        };
    };
    $scope.upLoad = function () {//上传图片
        var form = new FormData();
        form.append("file", $scope.img);
        console.log(form);
        console.log($scope.img);
        $http({
            method: 'post',
            url: '/carrots-admin-ajax/a/u/img/task',
            data:form,
            headers: {'Content-Type': undefined},
            uploadEventHandlers: {
                progress: function(eb) {
                    if(eb.lengthComputable) {
                        $scope.progress = Math.round(eb.loaded * 100/ eb.total);
                    }
                }
            },
        }).then(function(res) {
            $scope.success = res.data.message;
            if(res.data.message === "success"){
                $scope.imgSrc = res.data.data.url;
                console.log("上传成功");
            }else {
                alert(res.data.message);
            }

        })
    };
    $scope.delete = function () {
        $scope.onload = false;
        $scope.success = 2333;
        $scope.imgSrc = "";
    };
    $scope.onLine = function () {
        if(!$scope.newTitle || !$scope.newType || !$scope.content || !$scope.newUrl || !$scope.imgSrc ){
            alert("请填写完所有内容再提交，蟹蟹");
            return false;

        }else if($scope.newType == 3 && !$scope.job){
            alert("请选择职业");
            return false
        }else {



        }
    };
    $scope.draft = function () {

    }
});