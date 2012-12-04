# Postpone v0.4
Tool to manage a queue of tasks for browser-based apps.

## Purpose
Execute specified tasks, even those that had to be run when the browser window remained closed.

## Work in progress
* Manage OS notifications.
* Improve the cross-device support of storage by using PhoneGap or cookies.

## Change log

### v0.4
* Use the *on* parameter of the *set()* method as a delay from "now" expressed in minutes.
* Fixed bug: *repeatAfter* was always **1**.

### v0.3
* Add the ability to create a recursive task by specifying a delay time.
* Fixed bug: The date received as parameter of the executed task was the creation date of the task.

### v0.2
* Expose the queue as a public member.
* Execute the tasks receiving the task date object as parameter.

### v0.1
* First commit

## License

###The MIT License (MIT)
Copyright (c) 2012 Leandro Linares

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.