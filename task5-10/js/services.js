app.service('getArticleList', function($http,$q) {
    this.getList = function (x,page,size) {
        var x = $q.defer();
        $http({
            method: 'GET',
            params:{size: size,page: page},
            url: '/carrots-admin-ajax/a/article/search',
            // params: $scope.infoParams,
            header:{'Content-Type':'application/x-www-form-urlencoded'}//表头
        }).then(function successCallback(response) {
            //请求成功的代码
            // x = response.data.data.articleList;
            // console.log(response);
            x.resolve(response.data.data);

        }, function errorCallback(response) {
            // 请求失败执行代码
            alert("error");
            x.reject("error");
        });
        return  x.promise ;
    };
    this.search = function () {

    }

});