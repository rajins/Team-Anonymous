/**
 * Created by Krish on 22-01-2015.
 */
myApp.controller('MyAppController', ['$scope', '$resource', function ($scope, $resource) {

    $scope.message = "It was always you!";

    $scope.data = [];

    $scope.getListData = function () {
        $resource('http://localhost:8080/Team-Anonymous/app/getListData').query().then(function(response) {
            $scope.data = response.data;
        });
    };

}]);