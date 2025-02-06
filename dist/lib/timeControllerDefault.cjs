'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

class TimeControllerDefault {
    now() {
        return Date.now();
    }
    setTimeout(handler, timeout) {
        return setTimeout(handler, timeout);
    }
    clearTimeout(handle) {
        clearTimeout(handle);
    }
}
const timeControllerDefault = new TimeControllerDefault();

exports.TimeControllerDefault = TimeControllerDefault;
exports.timeControllerDefault = timeControllerDefault;
