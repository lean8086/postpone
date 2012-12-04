/*!
 * Postpone v0.4
 * Tool to manage a queue of tasks for browser-based apps.
 * Copyright (c) 2012 Leandro Linares
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 */
(function (window) {
	'use strict';

	/**
	 * Local cache for fastest access
	 */
	var storage = window.localStorage,
		Object = window.Object,
		Date = window.Date,
		JSON = window.JSON,
		postpone = {};

	/**
	 * Object that saves all the dates with its callbacks.
	 * @name set
	 * @memberOf postpone
	 * @type Object
	 * @example
	 * {
	 *     'Wed Sep 26 2012 17:00:00 GMT-0300 (ART)': function () {
	 *         console.log('Task to be executed on September 26th.');
	 *     },
	 *     'Thu Nov 8 2012 23:30:00 GMT-0300 (ART)': function (date) {
	 *         console.log('Task to be executed on minute ' + date.getMinutes());
	 *         // It logs "Task to be executed on minute 30"
	 *     }
	 * }
	 */
	postpone.queue = JSON.parse(storage.getItem('postponeQueue')) || {};

	/**
	 * Method that associates a task with the corresponding date string.
	 * @name set
	 * @methodOf postpone
	 * @param Number || String on Delay from "now" to use as key on the queue
	 * map. Expressed in minutes. Also, it can be a date string.
	 * @param Function callback Method to be saved into queue map to
	 * execute via key when the match with it task.
	 * @param Number repeatAfter Delay time, expressed in minutes, that
	 * determines when to execute a clone of the current task.
	 * @example
	 * postpone.set(30, function () {
	 *     console.log('Task to be executed in half an hour.');
	 * });
	 * @example
	 * postpone.set('2012/09/26 17:15', function () {
	 *     console.log('Task to be executed on September 26th.');
	 * });
	 * @example
	 * postpone.set('2012/12/03 22:00', function () {
	 *     console.log('Execute each hour from December 3rd at 10pm.');
	 * }, 60);
	 */
	postpone.set = function (on, callback, repeatAfter) {
		// When "on" is a delay value, count it from now
		if (typeof on === 'number') {
			// Grab the delay value apart
			var delay = on;
			// Instance a date object of now
			on = new Date();
			// Count the delay from now
			on.setMinutes(on.getMinutes() + delay);
		// When "on" is just a date reference
		} else {
			// Transform into a Date instance
			on = new Date(on);
		}
		// Set the method to be executed on the date of the string key
		postpone.queue[on] = function () {
			// Execute the specified callback passing the date as parameter
			callback(on);
			// Create a new cloned task by deliying the specified time
			// of the repeatAfter variable
			if (!!repeatAfter) {
				// Update the task date with the new delay
				on.setMinutes(on.getMinutes() + repeatAfter);
				// Set the same task with the new date, the same callback
				// and the same repetition delay
				postpone.set(on, callback, repeatAfter);
			}
		};
		// Save all the postpone queue into local storage
		storage.setItem('postponeQueue', JSON.stringify(postpone.queue));
	};

	/**
	 * Method that executes all the past tasks by comparing the dates
	 * into the queue with today's date and time. When it matchs with
	 * more than one task to launch, it executes again (recursivity).
	 * @name check
	 * @methodOf postpone
	 */
	postpone.check = function () {
		// Proceed only if there are at least ONE task into queue
		if (Object.keys(postpone.queue).length === 0) { return false; }
		// Create a new Date instance of today
		var now = new Date(),
			// The string saved as task key
			key = Object.keys(postpone.queue)[0],
			// Get the first task on queue
			taskDate = new Date(key);
		// Compare task time with the new instance of Date
		// Continue only if it IS or WAS time to execute the task
		if (taskDate <= now) {
			// Execute the task
			postpone.queue[key]();
			// Forget about this task for future executions
			delete postpone.queue[key];
			// Look for more tasks that shoulda been launched (recursive)
			postpone.check();
		}
	};

	/**
	 * Tool to manage a queue of tasks for browser-based apps.
	 * @name postpone
	 * @namespace
	 */
	window.postpone = postpone;

}(this));