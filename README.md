# web-logger

## Initialize db

```
sqlite3 db.sqlite3 < create.sql
```

## How to start

```
npm install
node app.js
```

## Add a log

```
curl -H "Content-type: application/json" -d '{"tag": "aaa", "log": "hello log"}' http://localhost:3001/log
curl -H "Content-type: text/plain" -d 'hello log' http://localhost:3001/log/aaa
```

## View logs

* All logs
  * http://localhost:3001/log
* Filtered by tag
  * http://localhost:3001/log/:tag
    * e.g. http://localhost:3001/log/aaa
