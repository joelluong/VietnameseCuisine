const app = angular.module("myApp", []);

app.controller("getCtrl", function($scope, $http) {
    $http.get('data/food.json')
    .then (
        function(response) {
            $scope.dishes = response.data;
            dishesPag = response.data;
            console.log(dishesPag);

            $scope.dishesPerPage = 3;
            $scope.currentPage = 0;

            $scope.range = function() {
                var rangeSize = 5;
                var ret = [];
                var start = $scope.currentPage;
                if (start > $scope.pageCount() - rangeSize ) {
                    start = $scope.pageCount() - rangeSize;
                }
                for (var i=start; i<start + rangeSize; i++) {
                    ret.push(i);
                }
                return ret;
                };

            $scope.prevPage = function() {
            if ($scope.currentPage > 0) {
                $scope.currentPage--;
            }
        };


            $scope.prevPageDisabled = function() {
            return $scope.currentPage === 0 ? "disabled" : "";
        };
        $scope.nextPage = function() {
            if ($scope.currentPage < $scope.pageCount() - 1) {
                $scope.currentPage++;
            }
        };

            $scope.nextPageDisabled = function() {
            return $scope.currentPage === $scope.pageCount() - 1 ? "disabled" : "";
        };
        $scope.pageCount = function() {
            return Math.ceil($scope.total/$scope.dishesPerPage);
        };
        $scope.setPage = function(n) {
            if (n >= 0 && n < $scope.pageCount()) {
                $scope.currentPage = n;
            }
        };
        $scope.$watch("currentPage", function(newValue, oldValue) {
            $scope.pagedDishes =dishesPag.slice(newValue*$scope.dishesPerPage, newValue*$scope.dishesPerPage+ $scope.dishesPerPage);
            $scope.total = dishesPag.length;
        });


            });

});
