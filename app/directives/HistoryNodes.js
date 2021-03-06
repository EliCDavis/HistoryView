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

var NodeView = require("NodeView");
module.exports = HistoryNodes;

function HistoryNodes() {
    return {
        restrict: 'E',
        template: '<canvas flex></canvas>',
        controllerAs: 'control',
        controller: /*@ngInject*/ function ($scope, $element, History) {

            var self = this;

            var canvas = $element.find('canvas');

            var graph = new NodeView(canvas[0]);

            graph.setOption('applyGravity', false);
            graph.createNode();
            graph.createNode();
            graph.createNode();

            History.loadedHistory$.safeApply($scope, function (history) {
                graph.clearNodes();

                history.forEach(function (item) {
                    
                    var node = graph.createNode({
                        radius: 10 + item.visitCount,
                        renderData: {
                            color: "#1C5792",
                            name: item.title
                        }
                    });
                    
                    node.onclick = function(){
                        console.log(item);
                    };
                    
                    node.ondoubleclick = function(){
                        var win = window.open(item.url, '_blank');
                        win.focus();
                    };
                    
                });

            }).subscribe();
        }
    };

}