// Type definitions for int 0.2.0
// Project: https://github.com/defunctzombie/int
// Definitions by: Michael Rojas <https://github.com/havelessbemore>

declare namespace int {

  export interface Int {
    (value: number | string | Int): Int;
    new (value: number | string | Int): Int;
  }

  export class Int {

    constructor(value: number | string | Int);

    // add {value} to our number and return a new int
    add(value: number | string | Int): Int;

    // subtract {value} from our number and return a new int
    subtract(value: number | string | Int): Int;

    // multiply our int by {value} and return a new int
    mul(value: number | string | Int): Int;

    // divide our int by {value} and return a new int (can truncate)
    div(value: number | string | Int): Int;

    // raise our int by {value} and return a new int
    pow(value: number | string | Int): Int;

    // mod our int by {value} and return the new int
    mod(value: number | string | Int): Int;

    // return a new int that is the negative
    neg(value: number | string | Int): Int;

    // return a new int that is the absolute value
    abs(value: number | string | Int): Int;

    // compare our value to {value}. Return:
    //    0 if self and value are equal
    //    -1 if self < value
    //    1 if self > value
    cmp(value: number | string | Int): -1 | 0 | 1;

    // return true if self < value
    lt(value: number | string | Int): boolean;

    // return true if self <= value
    lte(value: number | string | Int): boolean;

    // return true if self > value
    gt(value: number | string | Int): boolean;

    // return true if self >= value
    gte(value: number | string | Int): boolean;

    // return true if self == value
    eq(value: number | string | Int): boolean;

    // return true if self != value
    ne(value: number | string | Int): boolean;
  }
}
declare var Int: int.Int;
export = Int;
