/**
 * Created by Nemo on 16/3/14.
 */

'use strict';

let lynx = require('lynx');

module.exports = function ({prefix,host='localhost',port=8125}) {
  return new Filter({prefix, host, port});
};

let Filter = function ({prefix,host='localhost',port=8125}) {
  this.metrics = new lynx(host, port, {scope: `${prefix}.doForward`});
};

Filter.prototype.before = function (msg, session, next) {
  session._timer = this.metrics.createTimer(msg.__route__);
  next();
};

Filter.prototype.after = function (err, msg, session, resp, next) {
  try {
    session._timer.stop();
  } catch (e) {
    console.error(e)
  } finally {
    next();
  }
};