# Postpone v0.5.3
Tool to manage a queue of tasks for browser-based apps.

## Purpose
Execute specified tasks, even those that had to be run when the browser window remained closed.

## Work in progress
* Manage OS notifications.
* Improve the cross-device support of storage.

## API
### postpone.queue / postpone.q
Stores all the tasks with its execution date.
```javascript
{
    'Wed Sep 26 2012 17:00:00 GMT-0300 (ART)': 'function () { ... }',
    'Fri Jan 04 2013 13:00:00 GMT-0300 (ART)': 'function () { ... }'
}
```

### postpone.set()
Associates a task with the corresponding date string.
```javascript
postpone.set(on, callback[, repeatAfter]);
```

* **on**
    * A number representing the delay in minutes from "now" to use as key on the queue map. Also, it can be a valid *date string*.

* **callback**
    * Method to be saved into the queue map to execute via its *date string*.

* **repeatAfter** (optional)
    * A number that determines when to execute a clone of the current task. Expressed in minutes.

**Example:** Task to be executed in half an hour.
```javascript
postpone.set(30, function () { ... });
```

**Example:** Task to be executed on September 26th.
```javascript
postpone.set('2012/09/26 17:15', function () { ... });
```

**Example:** Execute each hour starting on May 3rd at 10pm.
```javascript
postpone.set('Thu May 03 2012 22:00:00 GMT-0300 (ART)', function () { ... }, 60);
```

### postpone.check()
Executes all the past tasks by comparing the dates into the queue with today's date and time.

**Example:** Initialize the check cicle (each minute)
```javascript
setInterval(postpone.check, 60000);
```

### postpone.clear()
Resets the queue.

## Change log

### v0.5.3
* Fixed bug: The delay of the new task created with the `repeatAfter` parameter, was a string. It wasn't recursive.
* Keep the tasks unsorted but now `check()` analizes all the *date strings* of the queue.
* When `set()` is executed, round seconds of the task date to get a normalized date.

### v0.5.2
* Fixed bug: Now the saved tasks are sorted because `check()` only verifies one task at a time (the first one).

### v0.5.1
* Use the `repeatAfter` parameter to get recursivity, instead to calculate the next date from execution.
* Create the `q` alias for the `queue` property to fastest access when debugging.
* Beautify the code of the callback function (as a string).
* Use spaces instead tabs to indentate, and get a full validation at JSLint.

### v0.5
* Fixed bug: Tasks were not saved into the queue, because the native methods `JSON.stringify()` and `JSON.parse()` did not support "function" as JSON value. Now, it creates a custom method as string for each task and executes it by using a `<script>` tag (not `eval()` and not `new Function()`).
* Add `postpone.clear()` to reset the queue.

### v0.4
* Use the `on` parameter of `set()` as a delay from "now" expressed in minutes.
* Fixed bug: `repeatAfter` was always `1`.

### v0.3
* Add the ability to create a recursive task by specifying a delay time.
* Fixed bug: The date received as parameter of the executed task was the creation date of the task.

### v0.2
* Expose the queue as a public member.
* Execute the tasks receiving the task date object as parameter.

### v0.1
* First commit

## License

### The MIT License (MIT)
Copyright (c) 2013 Leandro Linares

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
