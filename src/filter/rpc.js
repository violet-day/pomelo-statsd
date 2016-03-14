/**
 * Created by Nemo on 16/3/14.
 */

'use strict';

let lynx = require('lynx');

module.exports = function ({prefix,host='localhost',port=8125}) {
  return new Filter({prefix, host, port});
};

let Filter = function ({prefix,host='localhost',port=8125}) {
  this.metrics = new lynx(host, port, {scope: `${prefix}.rpcRemote`});
};

Filter.prototype.before = function (serverId, {serverType,service,method}, opts, next) {
  opts = opts || {};
  opts._timer = this.metrics.createTimer(`${serverType}.${service}.${method}`);
  next();
};

Filter.prototype.after = function (serverId, msg, opts, next) {
  try {
    opts._timer.stop();
  } catch (e) {
    console.error(e)
  } finally {
    next();
  }
};
