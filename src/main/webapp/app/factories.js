var factories = angular.module('common.factories', []);

factories.factory("loadingFactory", [ "$timeout", function ($timeout) {
    var httpList = {}, timeout = {}, count = 0, timed = {};
    return { add: function (url, text) {
        httpList[url] = text;
        timeout[url] = $timeout(function () {
            timed[url] = true;
        }, 30000);
        ++count;
    }, clear: function () {
        $.each(timeout, function (k, v) {
            $timeout.cancel(v);
        });
        httpList = {};
        timeout = {};
        count = 0;
        timed = {};
    }, remove: function (url) {
        $timeout.cancel(timeout[url]);
        delete timeout[url];
        delete httpList[url];
        delete timed[url];
        --count;
    }, contains: function (url) {
        return httpList[url] ? true : false;
    }, get: function (url) {
        return httpList[url];
    }, httpList: function () {
        return httpList;
    }, isEmpty: function () {
        return (count == 0);
    }, getCount: function () {
        return count;
    }, timed: function () {
        var show = false;
        $.each(timed, function (k, v) {
            if (v) {
                show = true;
                return false;
            }
        });
        return show;
    } };
} ]);


factories.factory('HttpModalInterceptor', [ '$q', '$location', 'loadingFactory', function ($q, $location, loadingFactory) {
    return { request: function (config) {
        return config || $q.when(config);
    }, response: function (response) {
        if (loadingFactory.contains(response.config.url)) {
            loadingFactory.remove(response.config.url);
            if (response.data && response.data.indexOf && response.data.indexOf("Access denied") != -1) {
                window.location.replace("/dmdb/invalid-session");
            }
        }
        return response || $q.when(response);
    }, responseError: function (rejection) {
        if (rejection.status == 888) {
            return false;
        }
        if (loadingFactory.contains(rejection.config.url)) {
            loadingFactory.remove(rejection.config.url);
        }
        return $q.reject(rejection);
    } };
} ]);

factories.config(function ($httpProvider) {
    $httpProvider.interceptors.push("HttpModalInterceptor");
});

factories.factory("searchFactory", [
    "$log",
    function (log) {
        var constraints = [
            { EQ: "Equals" },
            { GT: "Greater Than" },
            { LT: "Less Than" },
            { CONTAINS: "Contains" },
            { START_WITH: "Starts With" },
            { END_WITH: "Ends With" }
        ];
        var searchDataTypes = { LONG: [ constraints[0], constraints[1], constraints[2] ], STRING: [ constraints[0], constraints[3], constraints[4], constraints[5] ],
            DATE: [ constraints[0], constraints[1], constraints[2] ] };
        return { searchDataTypes: function () {
            return searchDataTypes;
        }, constraints: function () {
            return constraints;
        } };
    } ]);

factories.factory("appFactory", ["$http", "$q", "$log", 'loadingFactory', 'searchFactory',
    function ($http, $q, log, loadingFactory, searchFactory) {
        return { log: function () {
            log.debug.apply(null, arguments);
        }, get: function (url, msg) {
            msg = msg ? msg : "Loading...";
            loadingFactory.add(url, msg);
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: url
            }).success(function (responseData) {
                deferred.resolve(responseData);
            });
            return deferred.promise;
        }, ncGet: function (url, payload, msg) {
            url = url + '?nocache=' + $.now();
            if (payload) {
                $.each(payload, function (key, value) {
                    url = url + '&' + key + '=' + encodeURIComponent(value);
                });
            }
            msg = msg ? msg : "Loading...";
            loadingFactory.add(url, msg);
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: url

            }).success(function (responseData) {
                deferred.resolve(responseData);
            });
            return deferred.promise;
        }, ncGetNoMask: function (url, payload) {
            url = url + '?nocache=' + $.now();
            if (payload) {
                $.each(payload, function (key, value) {
                    url = url + '&' + key + '=' + encodeURIComponent(value);
                });
            }
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: url

            }).success(function (responseData) {
                deferred.resolve(responseData);
            });
            return deferred.promise;
        }, postUntransformed: function (url, payload, msg) {
            msg = msg ? msg : "Loading...";
            loadingFactory.add(url, msg);
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: url,
                data: payload
            }).success(function (responseData) {
                deferred.resolve(responseData);
            });
            return deferred.promise;
        }, post: function (url, payload, msg) {
            msg = msg ? msg : "Loading...";
            loadingFactory.add(url, msg);
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: url,
                data: payload,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                transformRequest: function (data) {
                    return jQuery.param(data);
                }
            }).success(function (responseData) {
                deferred.resolve(responseData);
            });
            return deferred.promise;
        }, postNoMask: function (url, payload) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: url,
                data: payload,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                transformRequest: function (data) {
                    return jQuery.param(data);
                }
            }).success(function (responseData) {
                deferred.resolve(responseData);
            });
            return deferred.promise;
        }, success: function (params) {
            var responseData = {
                "data": [params],
                "success": true,
                "status": {
                    "statusCode": "200"
                }
            };
            var deferred = $q.defer();
            deferred.resolve(responseData);
            return deferred.promise;
        }, setLoading: function (url, msg) {
            loadingFactory.add(url, msg);
        }, searchDataTypes: function () {
            return searchFactory.searchDataTypes();
        }};
    } ]);
