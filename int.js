
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
    self._s = ((num += '').charAt(0) === '-') ? 1 : 0;

    // remove any leading - or +
    num = num.replace(/[^\d]/g, '');

    // _d is the array of numbers
    for(var i = (num = self._d = num.split('')).length; i; num[--i] = +num[i]);
};

/// add num and return new integer
Int.prototype.add = function(num) {
    var self = this;

    if(self._s != (num = Int(num))._s) {
        num._s ^= 1;
        return self.sub(num);
    }

    // a will be the smaller number
    if (self._d.length < num._d.length) {
        var a = self._d;
        var b = num._d;
        var out = Int(num);
    }
    else {
        var a = num._d;
        var b = self._d;
        var out = Int(self);
    }

    var la = a.length;
    var lb = b.length;

    // clone the larger number
    var res = out._d;

    var carry = 0;
    for (var i = lb - 1, j = la - 1; i >= 0, j >= 0 ; --i, --j) {
        res[i] += carry + a[j];
        carry = 0;

        if (res[i] >= 10) {
            res[i] -= 10;
            carry = 1;
        }
    }

    // carry the rest of the way
    for (; i >= 0 ; --i) {
        res[i] += carry;
        carry = 0;
        if (res[i] >= 10) {
            res[i] -= 10;
            carry = 1;
        }

        // no carry, rest of the number will be unchanged
        if (carry === 0) {
            break;
        }
    }

    if (carry > 0) {
        res.unshift(1);
    }

    return out;
}

Int.prototype.sub = function(num) {
    var self = this;

    if(self._s != (num = Int(num))._s) {
        num._s ^= 1;
        return this.add(num);
    }

    // make a the smaller number
    var c = self.abs().lt(num.abs());
    var a = c ? self._d : num._d;
    var b = c ? num._d : self._d;

    var la = a.length;
    var lb = b.length;

    var out = Int(b);
    var res = out._d;

    // basic subtraction for common size
    var borrow = 0;
    for (var i = lb - 1, j = la - 1; i >= 0, j >= 0 ; --i, --j) {
        res[i] -= (a[j] - borrow);
        borrow = 0;

        if (res[i] < 0) {
            res[i] += 10;
            borrow = 1;
        }
    }

    // carry the rest of the way
    for (; i >= 0 ; --i) {
        res[i] -= borrow;
        borrow = 0;
        if (res[i] < 0) {
            res[i] += 10;
            borrow = 1;
        }

        // no carry, rest of the number will be unchanged
        if (borrow === 0) {
            break;
        }
    }

    // flip the sign if sub num was larger
    c && (out._s ^= 1);
    return out;
};

Int.prototype.mul = function(num) {
    var self = this;

    var r = self._d.length >= (num = Int(num))._d.length;
    var a = (r ? self : num)._d;
    var b = (r ? num : self)._d;

    var la = a.length;
    var lb = b.length;

    var sum = Int();
    var zeros = [];

    // loop for smaller number
    for (var i = lb - 1 ; i >= 0 ; --i) {
        var out = Int();

        // insert proper number of trailing 0s
        var val = out._d = out._d.concat(zeros);

        // reset carry
        var carry = 0;

        // top number
        for (var j = la - 1; j >= 0; --j) {
            // multiplication result
            var mul = b[i] * a[j] + carry;

            // this is the single digit we keep
            var res = mul % 10;

            // carry amount
            carry = Math.floor(mul / 10);

            // insert the number into our new integer
            val.unshift(res);
        }

        // apply any remaining carry
        if (carry) {
            val.unshift(carry);
        }

        sum = sum.add(out);
        zeros.push(0);
    }

    return sum;
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

