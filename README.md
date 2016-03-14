## pomelo-statsd

statsd trace for pomelo project

## Features

* online user


### Online User

```js

var onlineUser=require('pomelo-statsd').onlineUser;

app.load(onlineUser, {
    prefix: 'your prefix',
    host:'localhost',
    port:8125,
    interval:1000,//your report interval
});

```

metrics:

* `${opt.prefix}.${app.getServerId}.{totalConnCount}`
* `${opt.prefix}.${app.getServerId}.{loginedCount}`