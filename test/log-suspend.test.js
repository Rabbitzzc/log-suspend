const test = require('tap').test
const logSus = require('../lib/log-suspend')

// type test
test("should be an Object", t => {
    t.type(logSus, 'object')
    t.end()
})

test("logSuspend should be an Function", t => {
    t.type(logSus.logSuspend, 'function')
    t.end()
})

test("logResume should be an Function", t => {
    t.type(logSus.logResume, 'function')
    t.end()
})

test("logResume should be an Function", t => {
    t.type(logSus.notConsoleStatus, 'function')
    t.end()
})

// freeze test
test("can't motify cl", t => {
    let keys = Object.keys(logSus.cl)
    logSus.a = 1
    let c_keys = Object.keys(logSus.cl)
    t.same(c_keys, keys)
    t.end()
})

// cl must be same as console
test("cl must be equal to the console", t => {
    t.same(logSus.cl, console)
    t.end()
})

// logSuspend test
test("suspend all console", t => {
    logSus.logSuspend(console,'test', 'all')
    t.notSame(console, logSus.cl)
    // t.pass()
    t.end()
})

test("suspend console.log", t => {
    logSus.logSuspend(console,'test', 'log')
    t.notSame(console.log, logSus.cl.log)
    t.end()
})

test("do not change the console when env is not test or dev", t => {
    for (let i in logSus.cl) {
        console[i] = (function () {
            return logSus.cl[i]
        })()
    }
    logSus.logSuspend(console,'prod', 'all')
    t.same(console, logSus.cl)
    t.end()
})

// logResume test
test("resume console.log", t => {
    logSus.logSuspend(console,'test', 'log')
    logSus.logResume()
    t.same(console.log, logSus.cl.log)
    t.end()
})

test("resume all console", t => {
    logSus.logSuspend(console,'test', 'all')
    logSus.logResume()
    t.same(console, logSus.cl)
    t.end()
})

// notConsoleStatus test
test('suspend console', t => {
    function hasConsole() {
        console.log('test')
        return 'test'
    }
    console.log('1. can console.log')
    let res = logSus.notConsoleStatus(console, 'test', 'log', hasConsole)
    console.log('2. can console.log')
    t.equal(res, 'test')
    t.end()
})
