/*
** © 2013 by Philipp Dunkel <pip@pipobscure.com>. Licensed under MIT-License.
*/
/*jshint node:true, browser:false*/
'use strict';

var Lab = require('lab');
var KVString = require('../');

var store = {
  data:{},
  get:function(name, cb) {
    setImmediate(cb.bind(null, null, this.data[name]));
  },
  set:function(name, value, cb) {
    this.data[name]=value; setImmediate(cb.bind(null, null));
  },
  list:function(name, cb) {
    var d = Object.keys(this.data).filter(function(item) { return item.indexOf(name)===0; });
    setImmediate(cb.bind(null, null, { count:d.length, values:d }));
  },
  remove:function(name, cb) {
    delete this.data[name];
    setImmediate(cb.bind(null, null));
  }
};

var testData = 'mein schöner testString';
var kvsS = new KVString(store);

Lab.test('set a value', function(done) {
  kvsS.set('test', testData, function(err) {
    Lab.expect(!err).to.equal(true);
    Lab.expect(!!Buffer.isBuffer(store.data.test)).to.equal(true);
    done();
  });
});

Lab.test('get a value', function(done) {
  kvsS.get('test', function(err,val) {
    Lab.expect(!err).to.equal(true);
    Lab.expect(val).to.be.a('string');
    Lab.expect(val).to.equal(testData);
    done();
  });
});

Lab.test('list proxy', function(done) {
  kvsS.list('test', function(err, res) {
    Lab.expect(!err).to.equal(true);
    Lab.expect(res).to.eql({ count:1, values: ['test'] });
    done();
  });
});

Lab.test('remove proxy', function(done) {
  kvsS.remove('test', function(err) {
    Lab.expect(!err).to.equal(true);
    Lab.expect(!store.data.test).to.equal(true);
    done();
  });
});
