'use strict';

const _setTimeout = setTimeout;
const _clearTimeout = clearTimeout;
const timeControllerDefault = {
    now: function now() {
        return Date.now();
    },
    setTimeout: typeof window === 'undefined'
        ? setTimeout
        : function setTimeout() {
            return _setTimeout.apply(window, arguments);
        },
    clearTimeout: typeof window === 'undefined'
        ? clearTimeout
        : function clearTimeout() {
            return _clearTimeout.apply(window, arguments);
        },
};

exports.timeControllerDefault = timeControllerDefault;
