/*
** © 2013 by Philipp Dunkel <pip@pipobscure.com>. Licensed under MIT-License.
*/
/*jshint node:true, browser:false*/
'use strict';

module.exports = KVSString;
module.exports.kvt = 'utility';

var Abstract = require('kvs-abstract');

Abstract.bequeath(KVSString);
function KVSString(store) {
  Abstract.instantiate(this);
  this.store = store;
  this._list = store.list.bind(store);
  this._remove = store.remove.bind(store);
}

KVSString.prototype._get = function(name, callback) {
  this.store.get(name, function(err, val) {
    if (err) return callback(err);
    val = val.toString();
    callback(null, val);
  });
};

KVSString.prototype._set = function(name, value, callback) {
  value = Buffer.isBuffer(value) ? value : new Buffer(String(value));
  this.store.set(name, value, callback);
};
