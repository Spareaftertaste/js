
var app = angular.module("backStage",["ui.router","ngAnimate","ngTouch","ui.bootstrap"]);
app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/login");
    $stateProvider
        .state('login',{
            url:"/login",
            templateUrl: 'html/login.html',
            controller: 'loginCtrl'
        })
        .state('backstage',{
            url:"/backstage",
            templateUrl: 'html/Backstage.html',
            controller: 'backStageCtrl'
        })
        .state('backstage.company',{
            url:"/company",
            template: '<h1>Company</h1>'
        })
        .state('backstage.job',{
            url:"/job",
            template: '<h1>Job</h1>'
        })
        .state('backstage.articleList',{
            url:"/articleList",
            templateUrl: 'html/article-list.html',
            controller: 'articleListCtrl'
        })



        // .when("/",{
        //     templateUrl: 'html/login.html',
        //     controller: 'loginCtrl'
        // })
        // .when("/backstage",{
        //     templateUrl: 'html/Backstage.html',
        //     controller: 'backStageCtrl'
        // })
        // .when("/articleList",{
        //     templateUrl: 'html/article-list.html',
        //     controller: 'articleListCtrl'
        // })
        // .when("/article",{
        //     templateUrl: 'html/article.html',
        //     controller: 'articleCtrl'
        // })
        // .otherwise({
        //     redirectTo:''
        // });
});