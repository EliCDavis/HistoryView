/* 
 * The MIT License
 *
 * Copyright 2016 Eli Davis.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */


module.exports = HistoryListingDirective;

function HistoryListingDirective(){
    return {
        restrict: 'E',
        templateUrl: 'partials/directives/HistoryListing.directive.html',
        controllerAs: 'listing',
        controller: /*@ngInject*/ function ($scope, History) {
            
            var self = this;

            self.items = [];
            $scope.selectedItems = [];
            
            History.loadedHistory$.safeApply($scope, function(history) {
                console.log(history);
                self.items = history;
                $scope.selectedItems = [];
            }).subscribe();
            
            $scope.getSelectedItems = function(){
                
                var selected =[];
                
                for (var i = 0; i < $scope.selectedItems.length; i ++) {
                    if ($scope.selectedItems[i]) {
                        selected.push(self.items[i]);
                    }
                }
                
                return selected;
                
            };
        }
    };
    
}