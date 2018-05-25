


angular.module('myApp', ['ui.router']);

<div ng-controller="DemoController">
    <div ui-view></div>
</div>

    .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('start', {
            url: '/start',
            templateUrl: 'partials/start.html'
        })
});

$stateProvider.state('home', {
    template: '<h1>Hello {{ name }}</h1>'
});

$stateProvider
    .state('inbox', {
        url: '/inbox/:inboxId',
        template: '<div><h1>Welcome to your inbox</h1>\
                <a ui-sref="inbox.priority">Show priority</a>\
                <div ui-view></div>\
                </div>',
        controller: function($scope, $stateParams) {
            $scope.inboxId = $stateParams.inboxId;
        }
    })
    .state('inbox.priority', {
        url: '/priority
        template: '<h2>Your priority inbox</h2>'
    });

<div>
    <div ui-view="filters"></div>
    <div ui-view="mailbox"></div>
    <div ui-view="priority"></div>
</div>

$stateProvider
    .state('inbox', {
        views: {
            'filters': {
                template: '<h4>Filter inbox</h4>',
                controller: function($scope) {}
            },
            'mailbox': {
                templateUrl: 'partials/mailbox.html'
            },
            'priority': {
                template: '<h4>Priority inbox</h4>',
                resolve: {
                    facebook: function() {
                        return FB.messages();
                    }
                }
            }
        }
    });