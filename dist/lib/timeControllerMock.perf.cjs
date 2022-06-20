'use strict';

var tslib = require('tslib');
var rdtsc = require('rdtsc');
var timeControllerMock = require('./timeControllerMock2.cjs');
require('@flemist/pairing-heap');

describe('time-controller > timeControllerMock perf', function () {
    this.timeout(600000);
    it('base', function () {
        return tslib.__awaiter(this, void 0, void 0, function* () {
            let timeController;
            let handle;
            function func() { }
            const timeControllerFilled = new timeControllerMock.TimeControllerMock();
            for (let i = 0; i < 100; i++) {
                timeControllerFilled.setTimeout(func, 4);
            }
            let result = rdtsc.calcPerformance(10000, () => {
            }, () => {
                timeController = new timeControllerMock.TimeControllerMock();
            }, () => {
                handle = timeController.setTimeout(func, 4);
            }, () => {
                timeController.clearTimeout(handle);
            }, () => {
                handle = timeControllerFilled.setTimeout(func, 4);
            }, () => {
                timeControllerFilled.clearTimeout(handle);
            });
            console.log(result);
        });
    });
});
