/*!
 * Postpone v0.5.5
 * Tool to manage a queue of tasks for browser-based apps.
 * Copyright (c) 2013 Leandro Linares
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 */
(function (win) {
    'use strict';

    var storage = win.localStorage,
        JSON = win.JSON,
        Object = win.Object,
        Date = win.Date,
        Math = win.Math,
        head = win.document.getElementsByTagName('head')[0],
        script = win.document.createElement('script'),
        postpone = {};

    /**
     * Creates a script with the task itself and executes it.
     * @function
     * @private
     * @todo find a fancy way to delete the tag <script>
     */
    function executeTask(dateString) {
        // Get a copy of an empty script element
        var scriptTag = script.cloneNode(),
            // String to be executed as a wrapper of the task
            scriptTagContent;

        // Set an unique identificator
        scriptTag.id = 'postpone_' + Math.floor(Math.random() * 999999);
        // Append the task callback as an auto-executable method into the script element
        scriptTagContent = '(' + postpone.queue[dateString] + '());\n';
        // Identify the script tag
        scriptTagContent += 'var tag = document.getElementById(\'' + scriptTag.id + '\');\n';
        // Add the self-delete feature to the script tag
        scriptTagContent += 'document.getElementsByTagName(\'head\')[0].removeChild(tag);';
        // Append the content to the tag
        scriptTag.innerHTML = scriptTagContent;

        // Add the script tag to the head tag. It forces the execution
        head.appendChild(scriptTag);
        // Forget about this task for future executions
        delete postpone.queue[dateString];
        // Grab on the storage
        storage.setItem('postponeQueue', JSON.stringify(postpone.queue));
    }

    /**
     * Stores all the tasks with its execution date.
     * @name set
     * @memberOf postpone
     * @type Object
     * @example
     * {
     *     'Wed Sep 26 2012 17:00:00 GMT-0300 (ART)': 'function () { ... }',
     *     'Fri Jan 04 2013 13:00:00 GMT-0300 (ART)': 'function () { ... }'
     * }
     */
    postpone.queue = postpone.q = JSON.parse(storage.getItem('postponeQueue')) || {};

    /**
     * Associates a task with the corresponding date string.
     * @name set
     * @methodOf postpone
     * @param Number || String on A number representing the delay in minutes from "now" to use
     * as key on the queue map. Also, it can be a valid date string.
     * @param Function callback Method to be saved into the queue map to execute via its date string.
     * @param Number [repeatAfter] A number that determines when to execute a clone of the current
     * task. Expressed in minutes.
     * @example
     * postpone.set(30, function () {
     *     console.log('Task to be executed in half an hour.');
     * });
     * @example
     * postpone.set('2012/09/26 17:15', function () {
     *     console.log('Task to be executed on September 26th.');
     * });
     * @example
     * postpone.set('Thu May 03 2012 22:00:00 GMT-0300 (ART)', function () {
     *     console.log('Execute each hour from December 3rd at 10pm.');
     * }, 60);
     */
    postpone.set = function (on, callback, repeatAfter) {
        // The callback method as a string. It also contains the recursivity.
        var method,
            // Used to grab the "on" value when it's a number
            delay,
            // Number to differentiate tasks with the same date
            index = 0;

        // When "on" is a delay value, count it from now
        if (typeof on === 'number') {
            // Grab the delay value apart
            delay = on;
            // Instance a date object of now
            on = new Date();
            // Count the delay from now
            on.setMinutes(on.getMinutes() + delay);
        // When "on" is just a date reference, transform into a Date instance
        } else {
            on = new Date(on);
        }

        // Round seconds to get a normalized date
        on.setSeconds(0);
        // Use seconds to get an unique date
        while (postpone.queue[on] !== undefined) {
            on.setSeconds(index += 1);
        }

        method = 'function () {\n';
        // Define the callback as a private member to use more than once
        method += '\tvar postponeCallback = ' + callback + ';\n';
        // Execute the specified callback giving the task date as parameter
        method += '\tpostponeCallback(\'' + on + '\');\n';
        // Create a new cloned task by deliying the specified time of "repeatAfter"
        if (repeatAfter !== undefined) {
            // Set the same task with the new date and the same parameters
            method += '\tpostpone.set(' + repeatAfter + ', postponeCallback, ' + repeatAfter + ');\n';
        }
        method += '}';

        // Grab on the queue
        postpone.queue[on] = method;
        // Update the queue on the storage
        storage.setItem('postponeQueue', JSON.stringify(postpone.queue));
    };

    /**
     * Executes all the past tasks by comparing the dates into the queue with today's date and time.
     * @name check
     * @methodOf postpone
     */
    postpone.check = function () {
        // Proceed only if there are at least ONE task into queue
        if (Object.keys(postpone.queue).length === 0) { return false; }

        // Create a new Date instance of now
        var now = new Date();

        // Work with the array with the queue keys
        Object.keys(postpone.queue).forEach(function (dateString) {
            // Compare task time with the new instance of Date
            // Execute the task only if it IS or WAS time to execute it
            if (new Date(dateString) <= now) { executeTask(dateString); }
        });
    };

    /**
     * Resets the queue.
     * @name clear
     * @methodOf postpone
     */
    postpone.clear = function () {
        // Set the queue as an empty object
        postpone.queue = postpone.q = {};
        // Save the new queue into local storage
        storage.setItem('postponeQueue', '{}');
    };

    /**
     * Tool to manage a queue of tasks for browser-based apps.
     * @name postpone
     * @namespace
     */
    win.postpone = postpone;

}(this));