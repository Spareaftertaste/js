app.controller("loginCtrl",function ($scope,$http,$state) {
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
                $state.go('backstage');
            }else {
                alert("Please enter the correct username or password")
            }

        }, function errorCallback(response) {
            // 请求失败执行代码
            alert("error");
        });
    }

});