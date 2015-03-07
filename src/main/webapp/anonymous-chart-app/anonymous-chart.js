(function () {

    'use strict';

    Chart.defaults.global.responsive = true;

    var anonymousChart = angular.module('anonymousChart', []);

    anonymousChart.directive('chart', function ($log) {
        return {
            restrict: 'CA',
            scope: {
                data: '=',
                series: '=',
                labels: '=',
                onclick: '&',
                colors: '=',
                chartType: '=',
                options: '=',
                legend: '@'
            },

            link: function (scope, element, attrs) {

                scope.processNewChartCreation = function (type) {
                    var _chartType = type || scope.chartType;
                    if (_chartType !== undefined && _chartType !== '') {
                        switch (_chartType) {
                            case 'line':
                                createLineChart();
                                break;
                            case 'bar':
                                createBarChart();
                                break;
                            case 'radar':
                                createRadarChart();
                                break;
                            case 'pie':
                                createPieChart();
                                break;
                            case 'doughnut':
                                createDoughnutChart();
                                break;
                            case 'polar':
                                createPolarChart();
                                break;
                            case 'grid':
                                createGrid();
                                break;
                        }
                    } else {
                        console.log("Chart Type undefined!");
                    }
                };

                scope.$watch('chartType', function (newValue, oldValue) {
                    if (newValue !== undefined && newValue !== '' && newValue != oldValue) {
                        scope.processNewChartCreation(newValue);
                    }
                });

                function createChart() {
                    var chartCtxElement = element.get(0).getContext("2d");
                    return new Chart(chartCtxElement);
                }

                function createLineChart() {
                    addSeriesContext();
                    var chartCtxElement = createChart();
                    chartCtxElement.Line(getDataSets(scope.labels, scope.data, scope.series), scope.options || {});
                }

                function createBarChart() {
                    var chartCtxElement = createChart();
                    chartCtxElement.Bar(getDataSets(scope.labels, scope.data, scope.series), scope.options || {});
                }

                function createRadarChart() {
                    addSeriesContext();
                    var chartCtxElement = createChart();
                    chartCtxElement.Radar(getDataSets(scope.labels, scope.data, scope.series), scope.options || {});
                }

                function createPieChart() {
                    var chartCtxElement = createChart();
                    chartCtxElement.Pie(getDataSetsForPolar(scope.data, scope.series), scope.options || {});
                }

                function createDoughnutChart() {
                    var chartCtxElement = createChart();
                    chartCtxElement.Doughnut(getDataSetsForPolar(scope.data, scope.series), scope.options || {});
                }

                function createPolarChart() {
                    var chartCtxElement = createChart();
                    chartCtxElement.PolarArea(getDataSetsForPolar(scope.data, scope.series), scope.options || {});
                }

                function createGrid() {
                    element.get(0).replaceAll('');
                }

                function addSeriesContext() {
                    element.append('<ul class="list-group">' +
                    '<li class="list-group-item" ng-repeat="each in series">{{each}}</li>' +
                    '</ul>');
                }

                function getRandomColour(alpha) {
                    var colour = [getRandomInt(0, 255), getRandomInt(0, 255), getRandomInt(0, 255)];
                    return getColour(colour, alpha);
                }

                function getColour(colour, alpha) {
                    return rgba(colour, alpha);
                }

                function getRandomInt(min, max) {
                    return Math.floor(Math.random() * (max - min + 1)) + min;
                }

                function rgba(colour, alpha) {
                    return 'rgba(' + colour.concat(alpha).join(',') + ')';
                }

                function getDataSetsForPolar(data, series) {
                    return data.map(function (item, i) {
                        var dataSet = {};
                        dataSet.label = series[i];
                        dataSet.value = item;
                        dataSet.color = getRandomColour(1);
                        dataSet.highlight = getRandomColour(0.2);
                        return dataSet;
                    });
                }

                function getRandomColorConfig() {

                    var colour = [getRandomInt(0, 255), getRandomInt(0, 255), getRandomInt(0, 255)];
                    return {
                        fillColor: rgba(colour, 0.2),
                        strokeColor: rgba(colour, 1),
                        pointColor: rgba(colour, 1),
                        pointStrokeColor: '#fff',
                        pointHighlightFill: '#fff',
                        pointHighlightStroke: rgba(colour, 0.8)
                    };
                }

                function getDataSets(labels, data, series) {
                    return {
                        labels: labels,
                        datasets: data.map(function (item, i) {
                            var dataSet = getRandomColorConfig();
                            dataSet.label = series[i];
                            dataSet.data = item;
                            return dataSet;
                        })
                    };
                }

                scope.processNewChartCreation();
            }
        };
    })
})();