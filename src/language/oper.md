
${LANGHEADER}

## ChucK : Language > Operator & Operations

<div class="chuck_nav">
<center>
 <table border="0"><tr><td>
  <div class="chuck_nav_bar">	
    <a href="./array.md">&lt; arrays</a>  |
    <a href="./index.md">language specification ^</a> | 
    <a href="./ctrl.md">control structures &gt;</a> 
  </div>
  </td></tr></table>
</center>
</div>

## Operators & Operations

Operations on data are achieved through operators.  This sections defines 
how operators behave on various datatypes.  You may have seen many of the
operators in other programming languages (C/Java).  Some others are native
to ChucK.  We start with the family of ChucK operators.

> [View sample code for operators](../examples/index.md#oper)

<!-- body of each sub topic -->

<a id="chuckops"></a>

## __`=>`__ (the ChucK operator)

The ChucK operator (`=>`) is a massively overloaded operator that, depending
on the types involved, performs various actions.  It denotes __action__,
can be chained, and imposes and clarifies order (always goes from left to right).
The ChucK operator is the means by which work is done in ChucK.  Furthermore,
the ChucK operator is not a single operator, but a family of operators.

### `=>` (foundational ChucK operator)

We start with the standard, plain-vanilla ChucK operator (`=>`).  It is 
left-associative (all ChucK operators are), which allows us to specify any 
ordered flow of data/tasks/modules (such as unit generator connection) from 
left-to-right, as in written (English) text.  __What => does depends on the context.__ 
It always depends on the type of the entity on the left (the _chucker_) and the 
one on the right (the _chuckee_), and it sometimes __also__ depends on the 
nature of the entity (such as whether it is a variable or not).

Some examples:

```chuck
// a unit generator patch - the signal flow is apparent
// (in this case, => connects two unit generators)
SinOsc b => Gain g => BiQuad f => dac;

// add 4 to foo, chuck result to new 'int' variable 'bar'
// (in this case, => assigns a value to a variable (int)
4 + foo => int bar;

// chuck values to a function == function call
// (same as Math.rand2f( 30, 1000))
( 30, 1000 ) => Math.rand2f;
```

There are many other well-defined uses of the ChucK operator, depending on 
the context.

### `=^` (upchuck)

The `upchuck` operator is used in Unit Analysis to describe the connections 
between UAnae.

Here's a simple example that combines chuck with upchuck:

```chuck
SinOsc g => FFT fft =^ IFFT ifft => dac;
```

Note that the output of SinOsc is connected to FFT using `=>` while
the output of the analysis (which is not audio data) is routed to
IFF via `=^`.  Finally the output of IFFT _is_ audio data and thus
can be connected to `dac`;

### `=<` (unchuck)

The `unchuck` operator is used to cancel the effects of a previous
`chuck` operation.

Here's a simple example:

```chuck
// start with some filtered noise
Noise n => BiQuad f => dac;
1::second => now;

// unlink the ugen f from dac
f =< dac;

// look, no noise!
1::second => now;

// but f can be relinked
f => dac;
1::second => now

```


### `@=>` (explicit assignment ChucK operator)

In ChucK, there is no stardard assignment operator (`=`), found in many 
other programming languages.  Assignment is carried out using ChucK operators.  
In the previous examples, we have used __`=>`__ for assignment:

```chuck
// assign 4 to variable foo
4 => int foo;

// assign 1.5 to variable bar
1.5 => float bar;

// assign duration of 100 millisecond to duh
100::ms => dur duh;

// assign the time "5 second from now" to later
5::second + now => time later;
```

The `@=>` explicit assignment ChucK operator behaves exactly the same for the 
above types (`int`, `float`, `dur`, `time`).  However, the difference is  
that __`@=>`__ can also be used for reference assignments of objects
(see [objects and classes](./class.md) whereas __`=>`__ _only does assignment 
on primitive types_. The behavior of __`=>`__ on objects is completely 
context-dependent.

```chuck
// using @=> is same as => for primitive types
4 @=> int foo;

// assign 1.5 to variable bar
1.5 @=> float bar;

// (only @=> can perform reference assignment on objects)

// reference assign moe to larry
// (such that both moe and larry reference the same object)
Object moe @=> Object @ larry;

// array initialization
[ 1, 2 ] @=> int ar[];

// using new
new Object @=> moe;
```

In its own screwed-up way, this is kind of nice because there is no confusion 
between assignment (`@=>` or `=>`) and equality (`==`).  In fact the following 
is __not__ a valid ChucK statement:


```chuckerr
    // not a valid ChucK statement!
    int foo = 4;
```

### `+=>` `-=>` `*=>` `/=>`, etc. (arithmetic ChucK operators)</p>

These operators are used with variables (using `int` and `float`) to 
perform one operation with assignment.

```chuck
// add 4 to foo and assign result to foo
foo + 4 => foo;

// add 4 to foo and assign result to foo
4 +=> foo;

// subtract 10 from foo and assign result to foo
// remember this is (foo-10), not (10-foo)
10 -=> foo;

// 2 times foo assign result to foo
2 *=> foo;

// divide 4 into foo and assign result to foo
// again remember this is (foo/4), not (4/foo)
4 /=> foo;
```

It is important to note the relationship between the value and 
variable when using `-=>` and `/=>`, since these operations are not 
commutative.

```chuck
// mod foo by T and assign result to foo
T %=> foo;

// bitwise AND 0xff and bar and assign result to bar
0xff &=> bar;

// bitwise OR 0xff and bar and assign result to bar
0xff |=> bar;
```

That's probably enough operator abuse for now...

<a id="arithmetic"></a>

## `+` `-` `*` `/` (arithmetic)

Can you add, subtract, multiply and divide?  So can ChucK!

```chuck
// divide (and assign)
16 / 4 => int four;

// multiply
2 * 2 => four;

// add
3 + 1 => four;

// subtract
93 - 89 => four;
```

<a id="cast"></a>

## __`$`__ (cast)

ChucK implicitly casts `int` values to `float` when `float` is 
expected, but __not__ the other around.  The latter could result 
in a loss of information and requires an explicit cast.

```chuck
// adding float and int produces a float
9.1 + 2 => float result;

// however, going from float to int requires cast
4.8 $ int => int foo;  // foo == 4

// this function expects two floats
Math.rand2f( 30.0, 1000.0 );

// this is ok because of implicit cast
Math.rand2f( 30, 1000 );
```

<a id="modulo"></a>

## ___`%`___ (modulo)

The modulo operator `%` computes the remainder after integer, floating point, 
duration, and time/duration division.

```chuck
// 7 mod 4 (should yield 3)
7 % 4 => int result;

// 7.3 mod 3.2 floating point mod (should yield .9)
7.3 % 3.2 => float resultf;

// duration mod
5::second % 2::second => dur foo;

// time/duration mod
now % 5::second => dur bar;
```

The latter (time/duration mod) is one of many ways to dynamically 
synchronize timing in shreds.  The examples `otf_01.ck` through `otf_07.ck` 
[see under](../examples/index.md#other") make use of this to on-the-fly synchronize 
its various parts, no matter when each shred is added to the virtual machine:

```chuck
// define period (agreed upon by several shreds)
.5::second => dur T;

// compute the remainder of the current period ...
// and advance time by that amount
T - (now % T) => now;

// when we reach this point, we are synchronized to T period boundary

// the rest of the code
// ...
```

This is one of many ways to compute and reason about time in ChucK.  
The appropriate solution(s) in each case depends on the intended functionality.  
Have fun!

<a id="logical"></a>

## __`&&`__ __`||`__ __`==`__ __`!=`__ __`>`__ __`>=`__ __`<`__ __`<=`__ (logic)

Logical operators - each of these need two operands. __The result is an integer 
value of 0 or 1.__.

* ` &&` : and
* `||` : or
* `==` : equals
* `!=` : does not equal
* `>` : greater than 
* `>=` : greater than or equal to
* `<` : less than 
* `<=` : less than or equal to

```chuck
// test some universal truths
if( 1 <= 4 && true )
    <<<"horray">>>;
```

<a id="bitwise"></a>

## __`>>`__ __`<<`__ __`&`__ __`|`__ __`^`__ (bitwise)

These are used on `int` values at the bit level, often for bit masking.

* `>>` : shift bits right ( 8 >> 1 = 4 )
* `<<` : shift bits left ( 8 << 1 = 16 )
* `&` : bitwise AND
* `|` : bitwise OR
* `^` : bitwise XOR

<a id="incdec"></a>

## __`++`__ __`--`__  (inc / dec)

Values may be incremented or decremented by appending the ++ or -- operators.

```chuck
4 => int foo;
foo++;
foo--;
```

<a id="unary"></a>

## __`!`__ __`+`__ __`-`__ __`new`__ (unary)

These operators come before one operand.

```chuck
// logical invert
if( !true == false )
    <<<"yes">>>;

// negative
-1 => int foo;

// instantiate object
new object @=> object @ bar;
```

<a id="arrayops"></a>

## `<<` (array append)

```chuck
// instantiate empty float array
float arr[0];

<<< "size:", arr.size() >>>; // prints 0

// append items (array grows as needed)
arr << 3.0 << 4 << 5;  // array is now [3., 4., 5.];

<<< "size:", arr.size() >>>; // prints 3

arr.popBack(); // remove the last element of the array
<<< "size:", arr.size() >>>; // prints 2
```

${LANGFOOTER}
