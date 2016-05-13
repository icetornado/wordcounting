'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'uiTextAreaCtrl'
  });
}])

.controller('uiTextAreaCtrl', ['$window', '$rootScope', '$scope', '$location', function($window, $rootScope, $scope, $location) {
    $scope.wordCount = 150;
    $scope.countType = 1;
    $scope.amounts = [50, 150, 100, 200];

    $scope.patterns = [

    ];
}])
.directive('uiTextArea', [function(){
        return {
            restrict: 'EA', //E = element, A = attribute, C = class, M = comment
            /*scope: {
                //@ reads the attribute value, = provides two-way binding, & works with functions
                //title: '@',
                //wordCount: '=',
            },*/
            scope: true,
            //template: '<div>{{ myVal }}</div>',
            templateUrl: 'template/uitextarea_template.html',
            //controller: controllerFunction, //Embed a custom controller in the directive
            link: function (scope, element, attrs) {   //DOM manipulation
                console.log(scope);
                scope.remaining = 0;
                scope.message =  scope.$parent.wordCount + " left";
                scope.textContent = '';

                var countWords = function(s){
                    s = s.replace(/(^\s*)|(\s*$)/gi,"");//exclude  start and end white-space
                    s = s.replace(/[ ]{2,}/gi," ");//2 or more space to 1
                    s = s.replace(/\n /,"\n"); // exclude newline with a start spacing
                    s = s.replace(/\W+/,"");    // strip non word character

                    return s.split(' ').length;
                };

                var countChars = function(s){
                    s = s.replace(/\W+/,"");    // strip non word character

                    return s.length;
                };

                var calculateRemaining = function(str, type){
                    var wc = 0;
                    if(type == 1) {     //count characters
                        wc = countChars(str);
                    }
                    else if(type == 2) {    //count words
                        wc = countWords(str);
                    }

                    return wc;
                };

                var doCount = function() {
                    scope.remaining =   scope.$parent.wordCount - calculateRemaining(scope.textContent, scope.$parent.countType);
                    scope.message = scope.remaining + (scope.$parent.countType == 1 ? " characters": " words") + " left";
                };

                scope.$watch('textContent', function(){
                    doCount();
                });

                scope.$watch('wordCount', function(){
                   doCount();
                });

                scope.$watch('countType', function(){
                    doCount();
                });

            }
        }
    }
]);
