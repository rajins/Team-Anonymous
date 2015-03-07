/**
 * Created by Krish on 22-01-2015.
 */
myApp.controller('MyAppController', ['$scope', 'myAppService', function ($scope, myAppService) {

    $scope.message = "It was always you!";
    $scope.chartTypes = ["radar", 'line', 'bar', 'pie', 'doughnut', 'polar'];
    $scope.data = [];
    $scope.data2 = [34, 59, 12, 81, 54, 55, 55];
    $scope.labels = [];
    $scope.series = [];
    $scope.selectedChartType = '';


    $scope.loadDataForChartType = function (chartType) {
        myAppService.getData().then(function (responseData) {
            if (responseData.success) {
                $scope.data = responseData.data.data;
                $scope.labels = responseData.data.labels;
                $scope.series = responseData.data.series;
            }
        });
    };


}]);