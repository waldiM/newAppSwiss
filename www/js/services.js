var swissServices = angular.module('swissServices', ['ngResource']);

// REST requests
swissServices.factory('REST', ['$resource', 'API_SERVER', 'Auth', function($resource, API_SERVER, Auth){
    return {
        // login
        Login: function(){
            var token = Auth.get();
            return $resource(API_SERVER + 'login', {}, {
                 get: {method:'POST', params:{email:null, password:null}}
            });
        },
        // portfolio
        Portfolio: function(){
            var token = Auth.get();
            return $resource(API_SERVER + 'portfolio/:portfolioId', {}, {
                 get: {method:'GET', params:{portfolioId: null}, headers: { 'Accesstoken': token.hash } }
            });
        },
        // portfolio list
        PortfolioList: function(){
            var token = Auth.get();
            return $resource(API_SERVER + 'portfolioList', {}, {
                 get: {method:'GET', params:{}, headers: { 'Accesstoken': token.hash } }
            });
        },
        // get short info about company
        CompanyShort: function(){
            var token = Auth.get();
            return $resource(API_SERVER + 'companyShort/:companyId/:companyKind', {companyId: '@companyId', companyKind: '@companykind'}, {
                 get: {method:'GET', params:{}, headers: { 'Accesstoken': token.hash } }
            });
        },
        // get full info about company
        Company: function(){
            var token = Auth.get();
            return $resource(API_SERVER + 'company/:companyId/:companyKind', {companyId: '@companyId', companyKind: '@companykind'}, {
                 get: {method:'GET', params:{}, headers: { 'Accesstoken': token.hash } }
            });
        },
        // get notes
        Notes: function(){
            var token = Auth.get();
            return $resource(API_SERVER + 'notes/:companyId/:companyKind', {}, {
                 get: {method:'GET', params:{companyId: null, companyKind: null}, headers: { 'Accesstoken': token.hash } }
            });
        },
        // save note
        AddNote: function(){
            var token = Auth.get();
            return $resource(API_SERVER + 'addNote/:companyId/:companyKind', {companyId: '@companyId', companyKind:'@companyKind'}, {
                 save: {method:'POST', params:{subject: null, note: null, priority: null}, headers: { 'Accesstoken': token.hash } }
            });
        }
    }
}]);

// save/get auth cookie
swissServices.factory('Auth', ['currentToken', function(currentToken){

    var ret = {};

    ret.put = function(value) {
        localStorage.setItem('smAppToken', value);
        currentToken.hash = value;
        return currentToken.hash;
    }

    ret.get = function() {
        var token = null;
        if(currentToken.hash == 'logout'){
            token = null;
        }
        else{
            var smAppToken = localStorage.getItem('smAppToken');
            token = currentToken.hash ? currentToken.hash : smAppToken;       
        }
        return {hash: token};
    }

    ret.logout = function(){
        currentToken.hash = 'logout';
        localStorage.setItem('smAppToken', null);
        return currentToken.hash;
    }

    return ret;
}]);


