Node Motto
==========

A node package to get random motto.

Usage
----------

Install it from `npm`:

```bash
$ npm install node-motto
```

Then you can use it as below:

```javascript
var motto = require("node-motto");

motto.get(function(text) {
	console.log(text);		
});
```

