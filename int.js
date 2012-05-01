
var Int = function(num) {
    // can be called as a function
    if (!(this instanceof Int)) {
        return new Int(num);
    }

    var self = this;

    if(num instanceof Int){
        self._s = num._s;
        self._d = num._d.slice();
        return;
    }

    // sign
    self._s = (num += '').charAt(0) === '-';

    // remove any leading - or +
    num = num.replace(/[^\d]/g, '');

    // _d is the array of numbers
    for(var i = (num = self._d = num.split('')).length; i; num[--i] = +num[i]);
};

/// add num and return new integer
Int.prototype.add = function(num) {
    var self = this;

    if(self._s !== (num = Int(num))._s) {
        num._s ^= 1;
        return self.sub(num);
    }

    // new output number
    var out = Int(self);

    var a = out._d;
    var b = num._d;
    var la = a.length;
    var lb = b.length;

    la != lb && ((lb = la - lb) > 0 ? zeroes(b, lb, 1) : zeroes(a, -lb, 1));

    var i = (la = a.length) == (lb = b.length) ? a.length : ((lb = la - lb) > 0 ? zeroes(b, lb) : zeroes(a, -lb)).length;

    for(var r = 0; i; r = (a[--i] = a[i] + b[i] + r) / 10 >>> 0, a[i] %= 10);

    r && a.unshift(r);

    return out;
}

Int.prototype.sub = function(num) {
    var self = this;

    if(self._s != (num = Int(num))._s) {
        num._s ^= 1;
        return this.add(num);
    }

    var out = Int(self);

    // make a the larger number
    var c = out.abs().lt(num.abs());
    var a = c ? out._d : num._d;
    var b = c ? num._d : out._d;

    var la = a.length;
    var lb = b.length;

    // pad shorter number with 0's
    la != lb && zeroes(a, lb - la, 1);

    // prep borrow by subtracting away all we need
    for (var i=lb-1 ; i>0 ; --i) {
        if (b[i] < 0 || a[i] > b[i]) {
            b[i] += 10;
            b[i-1] -= 1;
        }
    }

    // perform actual subtraction
    for (var i=0 ; i<lb ; ++i) {
        b[i] -= a[i];
    }

    c && (out._s ^= 1);
    out._d = b;
    return out;
};

Int.prototype.mul = function(n) {
    var o = Int(this);
    var r = o._d.length >= (n = Int(n))._d.length;
    var a = (r ? o : n)._d;
    var b = (r ? n : o)._d;
    var la = a.length;
    var lb = b.length;
    var x = Int(), j, s;

    for(var i = lb; i; r && s.unshift(r), x.set(x.add(Int(s.join(''))))) {
        for(s = (new Array(lb - --i)).join('0').split(''), r = 0, j = la; j; r += a[--j] * b[i], s.unshift(r % 10), r = (r / 10) >>> 0);
    }
    o._s = o._s != n._s, o._f = ((r = la + lb - o._f - n._f) >= (j = (o._d = x._d).length) ? zeroes(o._d, r - j + 1, 1).length : j) - r;
    return o;
};

Int.prototype.div = function(num) {
    var self = this;

    if((num = Int(num)) == '0') {
        throw new Error('Division by 0');
    }
    else if(this == '0') {
        return Int();
    }

    var out = Int(0);
    var zero = Int(0);

    // TODO (shtylman) changeme from naive implementation
    while(zero.lt(self)) {
        out = out.add(1);
        zero = zero.add(num);
    }

    return out;
};

Int.prototype.mod = function(num) {
    return this.sub(this.div(num).mul(num));
};

Int.prototype.pow = function(num) {
    var out = Int(this);
    if((num = (Int(num))) == 0) {
        return out.set(1);
    }

    for(var i = Math.abs(num); --i; out.set(out.mul(this)));
    return num < 0 ? out.set((Int(1)).div(out)) : out;
};

/// set this number to the value of num
Int.prototype.set = function(num) {
    this.constructor(num);
    return this;
};

/// -1 if self < n, 0 if self == n, 1 if self > n
Int.prototype.cmp = function(n) {
    var self = this;
    var b = Int(n);

    if (self._s != b._s) {
        return self._s ? -1 : 1;
    }

    var la = self._d.length;
    var lb = b._d.length;

    var a = self._d;
    var b = b._d;

    if (la != lb) {
        return ((la > lb) ^ self._s) ? 1 : -1;
    }

    var l = Math.min(la, lb);
    for (var i = 0; i < l; ++i) {
        if (a[i] != b[i]) {
            return ((a[i] > b[i]) ^ self._s) ? 1 : -1;
        }
    }

    var r = [-1, 1];
    return la != lb ? r[(la > lb) ^ self._s] : 0;
};

Int.prototype.neg = function() {
    var out = Int(this);
    out._s ^= 1;
    return out;
};

Int.prototype.abs = function() {
    var out = Int(this);
    out._s = 0;
    return out;
};

Int.prototype.valueOf = Int.prototype.toString = function(){
    var self = this;
    return (self._s ? '-' : '') + self._d.join('');
};

Int.prototype.gt = function (num) {
    return this.cmp(num) > 0;
};

Int.prototype.gte = function (num) {
    return this.cmp(num) >= 0;
};

Int.prototype.eq = function (num) {
    return this.cmp(num) === 0;
};

Int.prototype.ne = function (num) {
    return this.cmp(num) !== 0;
};

Int.prototype.lt = function (num) {
    return this.cmp(num) < 0;
};

Int.prototype.lte = function (num) {
    return this.cmp(num) <= 0;
};

/// private api

function zeroes(n, l, t) {
    var s = ['push', 'unshift'][t || 0];
    for(++l; --l; n[s](0));
    return n;
};

module.exports = Int;

