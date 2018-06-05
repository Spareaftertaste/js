
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
                sessionStorage.setItem("logo","233");
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

app.controller("backStageCtrl",function ($scope,$state,$http) {
    $scope.logo = sessionStorage.getItem("logo");
    if ($scope.logo !== "233"){
        $state.go('login');
    }
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
    $scope.list1Change = function () {
        $scope.list1 = !$scope.list1;
        if($scope.list1){
            $scope.list2 = false;
            $scope.triangle1 = "glyphicon glyphicon-hand-down";
            $scope.triangle2 = "glyphicon glyphicon-hand-left";
        }else {
            $scope.triangle1 = "glyphicon glyphicon-hand-left";
        }
    };
    $scope.list2Change = function () {
        $scope.list2 = !$scope.list2;
        if($scope.list2){
            $scope.list1 = false;
            $scope.triangle2 = "glyphicon glyphicon-hand-down";
            $scope.triangle1 = "glyphicon glyphicon-hand-left";
        }else {
            $scope.triangle2 = "glyphicon glyphicon-hand-left";
        }
    };
    $scope.jobClass = false;
    $scope.companyClass = false;
    $scope.articleClass = false;
    $scope.job = function () {
        $scope.jobClass = true;
        $scope.companyClass = false;
        $scope.articleClass = false;
    };
    $scope.company = function () {
        $scope.jobClass = false;
        $scope.companyClass = true;
        $scope.articleClass = false;
    };
    $scope.article = function () {
        $scope.jobClass = false;
        $scope.companyClass = false;
        $scope.articleClass = true;
    };

});
app.controller("articleListCtrl",function ($scope,$state,$stateParams,searchArticleList,changeStatus) {
    //获取url中的参数
    $scope.articleList = null;
    console.log($stateParams);
    if($stateParams.page !== undefined){
        $scope.page = parseInt($stateParams.page);
    }
    if($stateParams.size !== undefined){
        $scope.size = parseInt($stateParams.size);
    }
    console.log($scope.size,$scope.page);
    $scope.startAt = $stateParams.startAt;
    $scope.endAt = $stateParams.endAt;
    $scope.type = $stateParams.type;
    $scope.status = $stateParams.status;


    console.log("start: ",$scope.startAt,"end: ",$scope.endAt);
    searchArticleList.search($scope.articleList,$scope.page,$scope.size,$scope.startAt,$scope.endAt,$scope.type,$scope.status).then(
        res => {
            console.log(res);
            $scope.articleList = res.articleList;
            $scope.totalItems = res.total;
            $scope.size = res.size;
            $scope.page = res.page;
        },
        error => {
            console.log(error)
        }
    );

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

    //搜索功能，分页功能全部通过 search函数来重新加载页面，通过前面的的searchArticleList服务中的search方法来获取列表
    $scope.search = function () {
        console.log("start: ",$scope.startAt,"end: ",$scope.endAt);
        //检验日期，类型，状态,每页数据是否符合数据格式
        if(isNaN($scope.startAt)){
            $scope.startAt = undefined
        }else {
            $scope.startAt = Date.parse($scope.startAt);
        }
        console.log("startAt ",$scope.startAt );
        if(isNaN($scope.endAt)){
            $scope.endAt = undefined
        }else {
            $scope.endAt =Date.parse($scope.endAt);
        }

        console.log("start: ",$scope.startAt,"end: ",$scope.endAt);
        if($scope.type == 9){
            $scope.type = undefined
        }
        if($scope.status == 0){
            $scope.status = undefined
        }
        // $scope.$watch('currentPage',function(newValue,oldValue){
        //     $scope.page = $scope.currentPage;
        // });
        $state.go('backstage.articleList', {
            'size': $scope.size,
            'page': $scope.page,
            'startAt': $scope.startAt,
            'endAt': $scope.endAt,
            'type': $scope.type,
            'status': $scope.status
        })
    };

    // $scope.pageChange = function () {
    //     //检验日期，类型，状态,每页数据是否符合数据格式
    //     if(isNaN($scope.startAt)){
    //         $scope.startAt = undefined
    //     }else {
    //         $scope.startAt = Date.parse($scope.startAt);
    //     }
    //     if(isNaN($scope.endAt)){
    //         $scope.endAt = undefined
    //     }else {
    //         $scope.endAt =Date.parse($scope.endAt);
    //     }
    //
    //     if($scope.type == 9){
    //         $scope.type = undefined
    //     }
    //     if($scope.status == 0){
    //         $scope.status = undefined
    //     }
    //     $state.go('backstage.articleList', {
    //         size: $scope.size,
    //         page: $scope.hengPage,
    //         startAt: $scope.startAt,
    //         endAt: $scope.endAt,
    //         type: $scope.type,
    //         status: $scope.status
    //     })
    // };
    $scope.delete = function () {
        $scope.size = undefined;
        $scope.page = undefined;
        $scope.startAt = undefined;
        $scope.endAt = undefined;
        $scope.type = undefined;
        $scope.status = undefined;
        $scope.search();
    };

    $scope.editArticle = function(a){
        $state.go('backstage.newArticle',{id:a})
    };
    $scope.exitArticle = function (a,b) {
        if(b == 2){
            if(confirm("确认要让这篇文章下线么？")){
                changeStatus.change(a,a,1);
                $state.reload('backstage.articleList');
            }
        }else {
            if(confirm("确认要让这篇文章上线么？")){
                changeStatus.change(a,a,2);
                $state.reload('backstage.articleList');
            }
        }

    };
    $scope.deleteArticle = function (a) {
        if(confirm("确定要删除这篇文章么？")){
            changeStatus.delete(a,a);
            $state.reload('backstage.articleList');
        }
    };
});

app.controller("newArticleCtrl",function ($scope,$http,$state,$stateParams) {
    let id = $stateParams.id;
    console.log(id);
    console.log($scope.formTitle);
    if(id){
        $scope.formTitle = "编辑文章";
        $http({
            method: 'get',
            url: '/carrots-admin-ajax/a/article/'+id,
        }).then(function(res) {
            console.log(res.data.data.article);
            if(res.data.code === 0){
                $scope.creatAt = res.data.data.article.createAt;
                $scope.success = "success";
                $scope.onload = true;
                $scope.newTitle = res.data.data.article.title;
                $scope.newType = res.data.data.article.type+"";
                $scope.newJob =res.data.data.article.industry+"";
                $scope.imgSrc = res.data.data.article.img;
                $scope.url = res.data.data.article.url;
                $scope.content = res.data.data.article.content;
                console.log($scope.newTitlt,$scope.newType,$scope.newJob,$scope.imgSrc,$scope.url,$scope.content)
            }else {
                console.log(res);
            }
        },function () {
            alert('读取文章失败')
        })
    }else {
        $scope.formTitle = "新增文章";
    }

    $scope.imgUpload = function(files) {
        $scope.reader = new FileReader();   //创建一个FileReader接口
        $scope.onload = false;
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
        $scope.success = undefined;
        $scope.imgSrc = undefined;
    };
    $scope.onLine = function () {
        if(id){
            $http({
                method: 'PUT',
                params:{
                    title: $scope.newTitle,
                    type:$scope.newType,
                    status: 2,
                    img: $scope.imgSrc,
                    content: $scope.content,
                    url: $scope.url,
                    industry:($scope.newType == 3)?$scope.newJob : undefined,
                    createAt: $scope.creatAt,
                },
                url: '/carrots-admin-ajax/a/u/article/'+id,
            }).then(function(res) {
                if(res.data.code === 0){
                    alert("上线成功");
                    $state.go('backstage.articleList');

                }else {
                    console.log(res);
                }
            },function () {
                alert('上线失败')
            })
        }else {
            $http({
                method: 'post',
                url: '/carrots-admin-ajax/a/u/article',
                params:{
                    title: $scope.newTitle,
                    status: 2,
                    img: $scope.imgSrc,
                    content: $scope.content,
                    url: $scope.url,
                    type: $scope.newType,
                    industry:$scope.newJob,

                },
            }).then(function(res) {
                if(res.data.code === 0){
                    alert("上线成功");
                    $state.go('backstage.articleList');

                }else {
                    console.log(res);
                }
            },function () {
                alert('上线失败')
            })
        }

    };
    $scope.draft = function () {
        if(id){
            $http({
                method: 'PUT',
                params:{
                    title: $scope.newTitle,
                    type:$scope.newType,
                    status: 1,
                    img: $scope.imgSrc,
                    content: $scope.content,
                    url: $scope.url,
                    industry:parseInt($scope.newJob),
                    createAt: $scope.creatAt,
                },
                url: '/carrots-admin-ajax/a/u/article/'+id,
            }).then(function(res) {
                if(res.data.code === 0){
                    alert("保存草稿成功");
                    $state.go('backstage.articleList');

                }else {
                    console.log(res);
                }
            },function () {
                alert('保存失败')
            })
        }else {
            $http({
                method: 'post',
                url: '/carrots-admin-ajax/a/u/article',
                params:{
                    title: $scope.newTitle,
                    type: $scope.newType,
                    status: 1,
                    img: $scope.imgSrc,
                    content: $scope.content,
                    url: $scope.url,
                    industry:$scope.newJob,
                },
            }).then(function(res) {
                if(res.data.code === 0){
                    alert("保存草稿成功");
                    $state.go('backstage.articleList');

                }else {
                    console.log(res);
                }
            },function () {
                alert('保存失败')
            })
        }
    };
});