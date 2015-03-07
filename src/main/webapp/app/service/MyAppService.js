/**
 * Created with IntelliJ IDEA.
 * User: 608209607
 * Date: 07/03/15
 * Time: 12:45
 * To change this template use File | Settings | File Templates.
 */

myApp.service('myAppService', function(appFactory) {

    return {
        getData: function () {
            return appFactory.ncGetNoMask('http://172.16.10.35:9091/Team-Anonymous/cricket/data/player.htm', {});
        }
    }
});
