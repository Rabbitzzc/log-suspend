class LogSuspend {
    constructor() {
        this.cl = {}
        if (typeof console === 'object') {
            for (let i in console) {
                cl[i] = (function () {
                    return console[i]
                })()
            }
        }
        // freeze the obj
        Object.freeze(cl)
    }
    /**
     * @param console global.console window.console
     * @param env  environment test/dev not prod
     * @param func all functions contained in the console
     */
    logSuspend(console, env, func = 'log') {
        if (env === 'test' || env === 'dev' && typeof console === 'object') {
            if (func === 'all') {
                for (let key in console) {
                    console[key] - function () {}
                }
                return
            }
            if (typeof console[func] === 'function') {
                console[func] = function () {}
            }
        }
    }
    logResume() {
        if (typeof console === 'object') {
            for (let i in this.cl) {
                console[i] = (function () {
                    return cl[i]
                })()
            }
        }
    }
}

module.exports = new LogSuspend()