${LANGHEADER}

## ChucK : Language > Arrays

<div class="chuck_nav">
<center>
 <table border="0"><tr><td>
  <div class="chuck_nav_bar">	
    <a href="./type.md">&lt; type</a>  |
    <a href="./index.md">language specification ^</a> | 
    <a href="./oper.md">operators &gt;</a> 
  </div>
  </td></tr></table>
  </center>
</div>

## Arrays

Arrays are used represent N-dimensional ordered sets of data (of the same type).  This sections
specifies how arrays are declared and used in ChucK.  Some quick notes:

* arrays can be indexed by integer (0-indexed).
* any array can also be used as an associative map, indexed by strings.
* it is important to note that the integer-indexed portion and the associative 
  portion of an array are stored in _separate_ namespaces.
* arrays are _Objects_ (see [objects and classes](./class.md), and will behave 
  similarly under reference assignment and other operations common to objects.

> [View sample code for arrays]("../examples/index.md#array")

### declaration

Arrays can be declared in the following way:

```chuck
// declare 10 element array of int, called foo
int foo[10];

// since array of int (primitive type), the contents
// are automatically initialized to 0
```

Arrays can also be initialized:

```chuck
// chuck intializer to array reference
[ 1, 1, 2, 3, 5, 8 ] @=> int foo[];
```

In the above code, there are several things to note.

* initializers must contain the same or similar types.  The compiler will 
  attempt to find the highest common base type of all the elements.  If no 
  such common element is found, an error is reported.
* the type of the initializer `[ 1, 1, 2, 3, 5, 8 ]` is `int[]`.  The 
  intializer is an array that can be used directly when arrays are expected.
* the __at-chuck__ operator (`@=>`) means assignment, and is discussed at 
  length in [operators and operations section](./oper.md).
* `int foo[]` is declaring an empty reference to an array. The statement 
  assigns the initializer array to foo.
* arrays are `Objects`.

When declaring an array of objects, the objects inside the array are 
automatically instantiated.

```chuck
// objects in arrays are automatically instantiated
Object group[10];

// If you only want an array of object references:
// array of null object references
Object @ nullgroup[10];
```

[Check here](./class.md) for more information on object declaration and 
instantation in Chuck.

The above examples are 1-dimensional arrays (or vectors).  Coming up next 
are multi-dimensional arrays!

### dynamic arrays

It is possible to dynamically add and remove elements from an array.
This is done with the _append operator_ `<<` the the array methods
`popBack()`, `clear()`, `erase()`, and `find()` can be used in conjunction
to achieve a modicum of dynamism.

```chuck
float argh[0]; // instantiate int array
<<< "array size:", argh.size() >>>; // prints array size: 0
// append items (array should grow dynamically as needed)
argh << 3.0 << 4 << 5;
<<< "array size:", argh.size() >>>; // prints  array size: 3
<<< "contents:", argh[0], argh[1], argh[2] >>>; // prints 3.000, 4.000, 5.000
argh.popBack(); // pops the last item (5.0)
<<< "array size:", argh.size() >>>; // prints array size: 2
```

### multi-dimensional arrays

It is possible (and equally easy) to declare multi-dimensional arrays:

```chuck
// declare 4 by 6 by 8 array of float
float foo3D[4][6][8];

// Initializers work in similar ways:
// declare 2 by 2 array of int
[ [1,3], [2,4] ] @=> int bar[][];
```

In the above code, note the two `[][]` since we're contructing a 2x2 matrix.

### lookup

Elements in an array can be accessed using `[]` (in the appropriate quantities).

```chuck
// declare an array of floats
[ 3.2, 5.0, 7 ] @=> float foo[];

// access the 0th element (debug print)
<<< foo[0] >>>; // hopefully 3.2

// set the 2nd element
8.5 => foo[2];
```

Looping over the elements of an array:

```chuck
// array of floats again
[ 1, 2, 3, 4, 5, 6 ] @=> float foo[];

// loop over the entire array
for( 0 => int i; i < foo.cap(); i++ )
{
    // do something (debug print)
    <<< foo[i] >>>;
}
```

Accessing multi-dimensional array:

```chuck
// 2D array
int foo[4][4];

// set an element
10 => foo[2][2];
```

If the index exceeds the bounds of the array in any dimension, an exception 
is issued and the current shred is halted.

```chuck
// array capacity is 5
int foo[5];

// this should cause ArrayOutOfBoundsException
// access element 6 (index 5)
<<< foo[5] >>>;
```

A longer program: otf_06.ck from [examples](../examples/index.md"):

```chuck
// the period
.5::second => dur T;
// synchronize to period (for on-the-fly synchronization)
T - (now % T) => now;

// our patch
SinOsc s => JCRev r => dac;
// initialize
.05 => s.gain;
.25 => r.mix;

// scale (pentatonic; in semitones)
[ 0, 2, 4, 7, 9 ] @=> int scale[];

// infinite time loop
while( true )
{
    // pick something from the scale
    scale[ Math.rand2(0,4) ] => float freq;
    // get the final freq
    Std.mtof( 69 + (Std.rand2(0,3)*12 + freq) ) => s.freq;
    // reset phase for extra bandwidth
    0 => s.phase;

    // advance time
    if( Std.randf() > -.5 ) .25::T => now;
    else .5::T => now;
}
```

### associative arrays

Any array can be used also as an associative array, indexed on strings.
Once the regular array is instantiated, no further work has to be done
to make it associative as well - just start using it as such.

```chuck
// declare regular array (capacity doesn't matter so much)
float foo[4];

// use as int-based array
2.5 => foo[0];

// use as associative array
4.0 => foo["yoyo"];

// access as associative (print)
<<< foo["yoyo"] >>>;

// access empty element
<<< foo["gaga"] >>>;  // -> should print 0.0
```

It is important to note (again), that the address space of the integer portion 
and the associative portion of the array are _completely separate_.  For example:

```chuck
// declare array
int foo[2];

// put something in element 0
10 => foo[0];

// put something in element "0"
20 => foo["0"];

<<< foo[0], foo["0"] >>>; // prints out 10 20
```

The capacity of an array relates only to the integer portion of it. An array 
with an integer portion of capacity 0, for example, can still have any number 
of associative indexes.

```chuck
// declare array of 0 capacity
int foo[0];

// put something in element "here"
20 => foo["here"];

<<< foo["here"] >>> // prints 20

<<< foo[0] >>> // causes an exception
```

The array `find()` and `erase()` methods can be used to achieve a 
modicum of dynamism in associative arrays.

```chuck
int amap[0];
3 => amap["x"];
4 => amap["x"];
<<< amap["x"], amap.find("x"), amap.find("xx") >>>; // prints 4 1 0
amap.erase("x");
// <<< amap["x"], amap.find("x") >>>; // crashes on amap["x"]
<<< amap.find("x") >>>;  // prints 0
```

__Note__: The associative capacity of an array is not defined, 
so [objects](./class.md) used in the associative namespace must 
be explicitly instantiated, in contrast to those in the integer 
namespace.

Accessing an uninstantiated element of the associate array will 
return a __`null`__ reference.  Please check the 
[class documentation section](./class.md) for an explanation of 
ChucK objects and references.

```chuck
class Item { 
    float weight; 
}

Item box[10]; 

// integer indices ( up to capacity ) are pre-instantiated.
1.2 => box[1].weight; 

// instantiate element "lamp";
new Item @=> box["lamp"]; 

// access allowed to "lamp"
2.0 => box["lamp"].weight; 

// access causes a NullPointerException
2.0 => box["sweater"].weight; 
```


### array assignment

Arrays are objects. So when we declare an array, we are actually 

1. declaring a reference to array (reference variable) and 
2. instantiating a new array and reference assigned to the variable.  
 
A __`null`__ reference is a reference variable that points to no object 
(or the null object).  A null reference to an array can be created in 
this fashion:

```chuck
// declare array reference (by not specifying a capacity)
int foo[];

// we can now assign any int[] to foo
[ 1, 2, 3 ] @=> foo;

// print out 0th element
<<< foo[0] >>>;
```

This is also useful in declaring functions that have arrays as arguments 
or return type.

```chuck
// our function
fun void print( int bar[] )
{
    // print it
    for( 0 => int i; i < bar.cap(); i++ )
        <<< bar[0] >>>;
}

// we can call the function with a literal
print( [ 1, 2, 3, 4, 5 ] );

// or can we can pass a reference variable
int foo[10];
print( foo );
```

Like other objects, it is possible make multiple references to a single array.  
Like other objects, all assignments are <em>reference assignments</em>, meaning 
the contents are __NOT__ copied, only a reference to array is duplicated.

```chuck
// our single array
int the_array[10];

// assign reference to foo and bar
the_array => int foo[] => int bar[];

// (the_array, foo, and bar now all reference the same array)

// we change the_array and print foo...
// they reference the same array, changing one is like changing the other
5 => the_array[0];
<<< foo[0] >>>; // should be 5
```

It is possible to reference sub-sections of multi-dimensional arrays.

```chuck
// a 3D array
int foo3D[4][4][4];

// we can make a reference to a sub-section
foo3D[2] => int bar[][];

// (note that the dimensions must add up!)
```

${LANGFOOTER}
