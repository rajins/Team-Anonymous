/**
 * Created by Krish on 22-01-2015.
 */
myApp.controller('MyAppController', ['$scope', '$resource', function ($scope, $resource) {

    $scope.message = "It was always you!";
    $scope.chartType = {radar: "radar", line: 'line', bar: 'bar', pie: 'pie', doughnut: 'doughnut', polar: 'polar'};
    $scope.data = [[34, 59, 12, 81, 54, 55, 55], [65, 59, 80, 81, 56, 55, 40], [66, 59, 80, 25, 78, 55, 43]];
    $scope.data2 = [34, 59, 12, 81, 54, 55, 55];
    $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
    $scope.series = ["My First dataset", "My First dataset", "My First dataset"];


}]);