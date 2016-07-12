var sitesServices = angular.module("sitesServices", ['ngResource']);

sitesServices.factory('sites', ['$resource', function($resource){
    return $resource("data/sites.json", {}, {query:{method: "GET", isArray: true}});
}])