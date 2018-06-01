app.service('getArticleList', function($http,$q) {
    this.getList = function (x,page,size) {
        var x = $q.defer();
        $http({
            method: 'GET',
            params:{size: size,page: page},
            url: '/carrots-admin-ajax/a/article/search',
            header:{'Content-Type':'application/x-www-form-urlencoded'}//表头
        }).then(function successCallback(response) {
                  x.resolve(response.data.data);

        }, function errorCallback(response) {
            // 请求失败执行代码
            alert("error");
            x.reject("error");
        });
        return  x.promise;
    };


});

app.service('searchArticleList', function($http,$q) {
    this.search = function (x,a,b,c,d,size) {
        var x = $q.defer();
        $http({
            method: 'GET',
            params:{
                size: size, startAt: a, endAt: b, type: c, status: d},
            url: '/carrots-admin-ajax/a/article/search',
            header:{'Content-Type':'application/x-www-form-urlencoded'}//表头
        }).then(function successCallback(response) {
            x.resolve(response.data.data);

        }, function errorCallback(response) {
            // 请求失败执行代码
            alert("error");
            x.reject("error");
        });

        return  x.promise;
    }
});