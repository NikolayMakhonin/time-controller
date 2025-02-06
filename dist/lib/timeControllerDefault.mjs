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

export { TimeControllerDefault, timeControllerDefault };
