[![Build Status](https://secure.travis-ci.org/shtylman/node-int.png)](http://travis-ci.org/shtylman/node-int)

### Don't let javascript numbers hold you back. Let your true large numbers shine!! ###

**int** is an arbitrary size integer library written in pure javascript. Why? Because I can and because you need it.

## quick and dirty ##

```
npm install int
```

```javascript
var int = require('int');

var large = int('1234567890').mul('1234567890');

// did it work?
console.log(large.toString());
//'1524157875019052100' hell yea

// other cool stuff
var add_me = int('123456').add('-123456');
var power_up = int(2).pow(10);

```

## api ##

Besides the **int** function, all of the other methods operate on the objects returned by **int**

### int (value) ###
> construct a new aribtrary precision integer

> valid values are intergers, or strings, anything after a decimal point will be discarded

### add (value) ###
> add {value} to our number and return a new int

### sub (value) ###
> subtract {value} from our number and return a new int

### mul (value) ###
> multiply our int by {value} and return a new int

### div (value) ###
> divide our int by {value} and return a new int (can truncate)

### pow (value) ###
> raise our int by {value} and return a new int
