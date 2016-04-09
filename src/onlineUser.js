/**
 * Created by Nemo on 16/3/14.
 */
'use strict';

const lynx = require('lynx');
const util = require('util');
const debug = util.debuglog('onlineUsers');

module.exports = function (app, opts) {
  let trace = new OnlineUser(app, opts);
  app.set('__onlineUser__', trace);
  return trace;
};

var OnlineUser = function (app, {prefix, host='localhost', port=8125, interval=3000}) {
  this.app = app;
  this.name = '__onlineUser__';
  this.scope = `${prefix}.${app.getServerId()}`;
  this.interval = interval;

  debug('onlineUser:', host, port, this.scope);
  this.metrics = new lynx(host, port, {scope: this.scope});
};

OnlineUser.prototype.start = function (cb) {
  debug(this.app.getServerId(), this.app.isFrontend());
  if (!this.app.isFrontend()) {
    console.warn('this component is used for frontend server');
    return;
  }

  this.tick = setInterval(() => {
    let connectionService = this.app.components.__connection__;
    let info = connectionService.getStatisticsInfo();

    debug(info);
    this.metrics.gauge('totalConnCount', info.totalConnCount);
    this.metrics.gauge('loginedCount', info.loginedCount);
  }, this.interval);
  cb();
};

OnlineUser.prototype.stop = function () {
  this.tick && clearInterval(this.tick);
};