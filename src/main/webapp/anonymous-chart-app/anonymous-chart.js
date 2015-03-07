(function () {

    'use strict';

    Chart.defaults.global.responsive = true;
    var anonymousChart = angular.module('anonymousChart', []);

    Chart.defaults.global.colours = [
        { // blue
            fillColor: 'rgba(151,187,205,0.2)',
            strokeColor: 'rgba(151,187,205,1)',
            pointColor: 'rgba(151,187,205,1)',
            pointStrokeColor: '#fff',
            pointHighlightFill: '#fff',
            pointHighlightStroke: 'rgba(151,187,205,0.8)'
        },
        { // light grey
            fillColor: 'rgba(220,220,220,0.2)',
            strokeColor: 'rgba(220,220,220,1)',
            pointColor: 'rgba(220,220,220,1)',
            pointStrokeColor: '#fff',
            pointHighlightFill: '#fff',
            pointHighlightStroke: 'rgba(220,220,220,0.8)'
        },
        { // red
            fillColor: 'rgba(247,70,74,0.2)',
            strokeColor: 'rgba(247,70,74,1)',
            pointColor: 'rgba(247,70,74,1)',
            pointStrokeColor: '#fff',
            pointHighlightFill: '#fff',
            pointHighlightStroke: 'rgba(247,70,74,0.8)'
        },
        { // green
            fillColor: 'rgba(70,191,189,0.2)',
            strokeColor: 'rgba(70,191,189,1)',
            pointColor: 'rgba(70,191,189,1)',
            pointStrokeColor: '#fff',
            pointHighlightFill: '#fff',
            pointHighlightStroke: 'rgba(70,191,189,0.8)'
        },
        { // yellow
            fillColor: 'rgba(253,180,92,0.2)',
            strokeColor: 'rgba(253,180,92,1)',
            pointColor: 'rgba(253,180,92,1)',
            pointStrokeColor: '#fff',
            pointHighlightFill: '#fff',
            pointHighlightStroke: 'rgba(253,180,92,0.8)'
        },
        { // grey
            fillColor: 'rgba(148,159,177,0.2)',
            strokeColor: 'rgba(148,159,177,1)',
            pointColor: 'rgba(148,159,177,1)',
            pointStrokeColor: '#fff',
            pointHighlightFill: '#fff',
            pointHighlightStroke: 'rgba(148,159,177,0.8)'
        },
        { // dark grey
            fillColor: 'rgba(77,83,96,0.2)',
            strokeColor: 'rgba(77,83,96,1)',
            pointColor: 'rgba(77,83,96,1)',
            pointStrokeColor: '#fff',
            pointHighlightFill: '#fff',
            pointHighlightStroke: 'rgba(77,83,96,1)'
        }
    ];

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
                        }
                    } else {
                        console.log("Chart Type undefined!");
                    }
                };

                scope.$watch('chartType', function(newValue, oldValue) {
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

                function addSeriesContext() {
                    element.append('<ul class="list-group">' +
                    '<li class="list-group-item" ng-repeat="each in series">{{each}}</li>' +
                    '</ul>');
                }

                function getRandomColour (alpha) {
                    var colour = [getRandomInt(0, 255), getRandomInt(0, 255), getRandomInt(0, 255)];
                    return getColour(colour, alpha);
                }

                function getColour (colour, alpha) {
                    return rgba(colour, alpha);
                }

                function getRandomInt (min, max) {
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

                function getDataSets(labels, data, series) {
                    return {
                        labels: labels,
                        datasets: data.map(function (item, i) {
                            var dataSet = angular.copy(Chart.defaults.global.colours[i]);
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