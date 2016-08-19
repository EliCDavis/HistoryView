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

module.exports = HistoryService;

var Rx = require('rx');

var microsecondsPerWeek = 1000 * 60 * 60 * 24 * 7;
var oneWeekAgo = (new Date).getTime() - microsecondsPerWeek;

function HistoryService() {

    var self = this;

    self.loadedHistory$ = new Rx.ReplaySubject(1);

    self.getHistory = function () {

        console.log("Fetching");
        chrome.history.search({
            'text': '',
            'startTime': oneWeekAgo
        },
//                function (historyItems) {
//                    // For each history item, get details on all visits.
//                    for (var i = 0; i < historyItems.length; ++i) {
//                        var url = historyItems[i].url;
//                        var processVisitsWithUrl = function (url) {
//                            // We need the url of the visited item to process the visit.
//                            // Use a closure to bind the  url into the callback's args.
//                            return function (visitItems) {
//                                processVisits(url, visitItems);
//                            };
//                        };
//                        chrome.history.getVisits({url: url}, processVisitsWithUrl(url));
//                    }
//                });
        function(data){
            self.loadedHistory$.onNext(data);
        });
    };
    
    self.getHistory();
    
    
    /**
     * Deletes all of the users history.
     * It's going to suck testing this function.
     * 
     * @returns {undefined}
     */
    self.deleteAllHistory = function() {
        chrome.history.deleteAll(function() {
            self.loadedHistory$.onNext([]);
        });
    };
    
    /**
     * Different from delete URL.  This removes the signle instance of the history
     * @param {type} item
     * @returns {undefined}
     */
    self.deleteItem = function(item) {
        chrome.history.deleteRange({
            startTime: item.lastVisitTime,
            endTime: item.lastVisitTime
        }, function(){
            self.getHistory();
        });
    };
    
}