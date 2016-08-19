

var angular = require('angular');
var rxDecorateDirective = require('./3rdParty/rxDecorateDirective');

require('angular-material');
require('rx-angular');

var app = angular.module('History View', ['ngMaterial', 'rx']);

app.config(['$provide', function ($provide) {
        rxDecorateDirective($provide, 'ngShow');
        rxDecorateDirective($provide, 'ngHide');
        rxDecorateDirective($provide, 'ngDisabled');
        rxDecorateDirective($provide, 'ngIf');
        rxDecorateDirective($provide, 'ngBind');
    }]);

require('./services');
require('./directives');
//require('./controllers');

angular.bootstrap(document, ['History View']);