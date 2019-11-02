# log-suspend

## why need this.
Like other globals, console is a property of the Window object.  We can reference it using Window.console but it's usually shortened to console:
```js
console.log('lalalalala.')
```
Logging like this is useful for development when we're creating a feature or debugging an issue.

It's not recommended to keep when deploying to production though.   Why?   Any site visitor would be able to view the messages if they took a peek at their browser console.  

In particular, when we use `mocha` or `tap` to test the code, we want the `console` to only output analysis of `mocha` or `tap` tests.
And for the function to be able to suspend the console, it is like ban the player in the football game.