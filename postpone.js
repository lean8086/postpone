/*!
 * Postpone
 * Tool to manage a queue of tasks for browser games.
 * @version 0.2
 * @author Leandro Linares (@lean8086)
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
	postpone.queue = JSON.parse(storage.getItem('postponeQueue')) || {};

	/**
	 * Method that associates a task with the corresponding date string.
	 * @name set
	 * @methodOf postpone
	 * @param String on Date string to use as key on the queue map.
	 * @param Function callback Method to be saved into queue map to
	 * execute via key when the match with it task.
	 * @example
	 * postpone.set('2012/09/26 17:00', function () {
	 *     console.log('Task to be executed on September 26th.');
	 * });
	 */
	postpone.set = function (on, callback) {
		// Get the date string of "on". Calling it as a regular function
		// (i.e. without the new operator) will return a string rather
		// than a Date object.
		on = Date(on);
		// Set the method to be executed into the date string key
		postpone.queue[on] = callback;
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
			// Execute the task callback passing the date object as parameter
			postpone.queue[key](taskDate);
			// Forget about this task for future executions
			delete postpone.queue[key];
			// Look for more tasks that shoulda been launched (recursive)
			postpone.check();
		}
	};

	/**
	 * Tool to manage a queue of tasks for browser games.
	 * @name postpone
	 * @namespace
	 */
	window.postpone = postpone;

}(this));