import { PairingHeap } from '@flemist/pairing-heap';

function lessThanHandles(o1, o2) {
    if (o1.time > o2.time) {
        return false;
    }
    if (o1.time < o2.time) {
        return true;
    }
    if (o1.id > o2.id) {
        return false;
    }
    if (o1.id < o2.id) {
        return true;
    }
    return false;
}
class TimeControllerMock {
    constructor() {
        this._now = 1;
        this._nextId = 0;
        this._handles = new PairingHeap({
            lessThanFunc: lessThanHandles,
        });
    }
    get queueSize() {
        return this._handles.size;
    }
    get nextQueuedTime() {
        var _a, _b;
        return (_b = (_a = this._handles.getMin()) === null || _a === void 0 ? void 0 : _a.time) !== null && _b !== void 0 ? _b : null;
    }
    addTime(time) {
        this.setTime(this._now + time);
    }
    setTime(time) {
        const { _handles, _now: now } = this;
        if (time < this._now) {
            throw new Error(`time (${time}) should be >= now (${now})`);
        }
        while (true) {
            const minHandle = _handles.getMin();
            if (!minHandle || minHandle.time > time) {
                break;
            }
            this._handles.deleteMin();
            this._now = minHandle.time;
            minHandle.callback();
        }
        this._now = time;
    }
    now() {
        return this._now;
    }
    setTimeout(callback, timeout) {
        const node = this._handles.add(Object.freeze({
            id: this._nextId++,
            time: this._now + timeout,
            callback,
        }));
        return node;
    }
    clearTimeout(handle) {
        this._handles.delete(handle);
    }
}

export { TimeControllerMock };
