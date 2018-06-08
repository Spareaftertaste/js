
var app = angular.module("backStage",["ngAnimate","ui.router","ui.bootstrap",'ng.ueditor']);
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
            url:"/articleList?startAt&endAt&type&status&size&page",
            templateUrl: 'html/article-list.html',
            controller: 'articleListCtrl'
        })
        .state('backstage.newArticle',{
            url:"/newArticle?id",
            templateUrl: 'html/newarticle.html',
            controller: 'newArticleCtrl'
        })
});