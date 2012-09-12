// use rest client js.
var rc = require('../index');

rc.set({
  url: 'http://www.google.com/hello',
});

rc.set({
  url: {
    protocol: 'http',
    host: 'tw.yahoo.com' + ':80',
    hostname: 'tw.yahoo.com',
    port: 80
  },
  method: 'DELETE',
  timeout:0
});

rc.set({
  url: '/test/hello',
})
