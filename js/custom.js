var app = angular.module("myApp", []);

app.controller("getCtrl", function($scope, $http) {
    $http.get('data/units.json')
    .then (
        function(response) {
            $scope.swinUnits = response.data;
            });
});
