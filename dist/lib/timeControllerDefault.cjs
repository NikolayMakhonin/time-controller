'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

class TimeControllerDefault {
    constructor() {
        this._nowUnique = 0;
    }
    now() {
        return Math.max(this._nowUnique, Date.now());
    }
    nowUnique() {
        const next = this.now() + 1;
        this._nowUnique = next;
        return next;
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
