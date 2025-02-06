'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

class TimeControllerDefault {
    constructor() {
        this._handles = new Set();
    }
    now() {
        return Date.now();
    }
    get queueSize() {
        return this._handles.size;
    }
    setTimeout(handler, timeout) {
        const handle = setTimeout(() => {
            this._handles.delete(handle);
            handler();
        }, timeout);
        this._handles.add(handle);
        return handler;
    }
    clearTimeout(handle) {
        clearTimeout(handle);
        this._handles.delete(handle);
    }
}
const timeControllerDefault = new TimeControllerDefault();

exports.TimeControllerDefault = TimeControllerDefault;
exports.timeControllerDefault = timeControllerDefault;
