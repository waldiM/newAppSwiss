var swissApp = angular.module('swissApp', ['ngRoute', 'swissCntls', 'swissServices']);

//swissApp.constant('API_SERVER', 'http://localhost/sm/api/rest/');
swissApp.constant('API_SERVER', 'http://rwd.swiss-metrics.com/api/rest/');
swissApp.value('currentToken', {hash: null});

swissApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/home', {
            templateUrl: 'partials/home.html',
            controller: 'loginController'
        }).when('/portfolio', {
            templateUrl: 'partials/portfolio.html',
            controller: 'portfolioController'
        }).when('/add-note/:companyId/:companyKind', {
            templateUrl: 'partials/addNote.html',
            controller: 'addNoteController'
        }).when('/notes/:companyId/:companyKind', {
            templateUrl: 'partials/notesRead.html',
            controller: 'notesReadController'
        }).when('/company/:companyId/:companyKind', {
            templateUrl: 'partials/company.html',
            controller: 'companyController'
        }).otherwise({
            redirectTo: '/home'
        });
}]);
