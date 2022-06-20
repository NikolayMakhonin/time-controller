import { __awaiter } from 'tslib';
import { calcPerformance } from 'rdtsc';
import { T as TimeControllerMock } from './timeControllerMock2.mjs';
import '@flemist/pairing-heap';

describe('time-controller > timeControllerMock perf', function () {
    this.timeout(600000);
    it('base', function () {
        return __awaiter(this, void 0, void 0, function* () {
            let timeController;
            let handle;
            function func() { }
            const timeControllerFilled = new TimeControllerMock();
            for (let i = 0; i < 100; i++) {
                timeControllerFilled.setTimeout(func, 4);
            }
            let result = calcPerformance(10000, () => {
            }, () => {
                timeController = new TimeControllerMock();
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
