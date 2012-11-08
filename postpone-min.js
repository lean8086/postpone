/*!
 * Postpone
 * Tool to manage a queue of tasks for browser games.
 * @version 0.1
 * @author Leandro Linares (@lean8086)
 */
(function(e){"use strict";var t=e.localStorage,n=e.Object,r=e.Date,i=e.JSON,s={};s.queue=i.parse(t.getItem("postponeQueue"))||{};s.set=function(e,n){e=r(e);s.queue[e]=n;t.setItem("postponeQueue",i.stringify(s.queue))};s.check=function(){if(n.keys(s.queue).length===0){return false}var e=new r,t=new r(n.keys(s.queue)[0]);if(t<=e){s.queue[t]();delete s.queue[t];s.check()}};e.postpone=s})(this);