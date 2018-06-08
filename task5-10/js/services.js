
app.service('searchArticleList', function($http,$q) {
    this.search = function (x,page,size,startAt,endAt,type,status) {
        var x = $q.defer();
        $http({
            method: 'GET',
            params:{
                size: size,
                startAt: startAt,
                endAt: endAt,
                type: type,
                status: status,
                page: page
            },
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

app.service('changeStatus', function($http,$q) {
    this.change = function (x,a,b) {
        var x = $q.defer();
        $http({
            method: 'put',
            params:{
                id: a,
                status: b,
            },
            url: '/carrots-admin-ajax/a/u/article/status',
        }).then(function successCallback(response) {
            x.resolve(response.data.data);

        }, function errorCallback(response) {
            // 请求失败执行代码
            alert("error");
            x.reject("error");
        });

        return  x.promise;
    };
    this.delete = function (x,a) {
        var x = $q.defer();
        $http({
            method: 'delete',
            url: '/carrots-admin-ajax/a/u/article/' + a,
            header: {'Content-Type': 'application/x-www-form-urlencoded'}//表头
        }).then(function successCallback(response) {
            x.resolve(response.data.data);

        }, function errorCallback(response) {
            // 请求失败执行代码
            alert("error");
            x.reject("error");
        });
    }
});

