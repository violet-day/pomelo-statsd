## Pomelo Statsd Metrics

statsd trace for pomelo project

## Features

* online user
* do forward timer
* rpc remote

### Online User

```js

var onlineUser = require('pomelo-statsd').onlineUser;

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


### doForward

```js

var timerFilter = require('pomelo-statsd').timerFilter;

app.filter(timerFilter({
    prefix: 'your prefix',
    host:'localhost',
    port:8125,
}));

```

metrics:

* `${opt.prefix}.doForward.${route}`


### rpcRemote

```js

var rpcFilter = require('pomelo-statsd').rpcFilter;

app.filter(rpcFilter({
    prefix: 'your prefix',
    host:'localhost',
    port:8125,
}));

```

metrics:

* `${opt.prefix}.rpcRemote.${serverType}.${service}.${method}`