# Postpone v0.2
Tool to manage a queue of tasks for browser games.

## Purpose
Provide a tool to use when a browser game needs to set a queue of tasks to be executed in specific times, even if the game window was closed.

## Work in progress
* Add cross-browsing support by using an exact imitation of the DOM storage, but making use of cookies.
* Manage OS notifications.

## Change log

### v0.2
* Expose the queue as a public member.
* Execute the tasks passing the task date object as parameter.

### v0.1
* First commit