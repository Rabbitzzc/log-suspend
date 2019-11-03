class LogSus {
    constructor() {
        this.cl = {}
        if (typeof console === 'object') {
            for (let i in console) {
                this.cl[i] = (function () {
                    return console[i]
                })()
            }
        }
        // freeze the obj
        Object.freeze(this.cl)
    }
    /**
     * @param console global.console window.console
     * @param env  environment test/dev not prod
     * @param attr all functions contained in the console
     */
    logSuspend(console, env, attr = 'log') {
        if ((env === 'test' || env === 'dev') && typeof console === 'object') {
            if (attr === 'all') {
                for (let key in console) {
                    console[key] = function () {}
                }
                return
            }
            if (typeof console[attr] === 'function') {
                console[attr] = function () {}
            }
        }
    }
    logResume() {
        if (typeof console === 'object') {
            const self = this
            for (let i in this.cl) {
                console[i] = (function () {
                    return self.cl[i]
                })()
            }
        }
    }
    // when you test, maybe you need the func keep console clean
    notConsoleStatus(console, env, attr = 'log', func) {
        this.logSuspend(console, env, attr = 'log')
        let result = func()
        this.logResume()
        return result
    }
}

module.exports = new LogSus()