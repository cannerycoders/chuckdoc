${LANGHEADER}

## ChucK : Language > Type

<div class="chuck_nav">
<center>
 <table border="0"><tr><td>
 <div class="chuck_nav_bar">	
  <a href="./overview.md">&lt; overview</a>  |
  <a href="./index.md">language specification ^</a> | 
  <a href="./array.md">arrays &gt;</a>
 </div>
 </td></tr></table>
</center>
</div>

## Types, Values and Variables

ChucK is a strongly-typed language, meaning that types are resolved at
compile-time. However, it is not quite statically-typed, because the 
compiler/type-system is a part of the ChucK virtual machine, and is a 
_runtime_ component. This type system helps to impose precision and clarity 
in the code, and naturally lends to organization of complex programs. At 
the same time, it is also _dynamic_ in that changes to the type system 
can take place (in a well-defined manner) at runtime. This dynamic aspect
forms the basis for [on-the-fly programming](http://on-the-fly.cs.princeton.edu/).

This section deals with types, values, and the declaration and usage of
variables. As in other strongly-typed programming languages, we can think of a
type as associated behaviors of data. (For example, an 'int' is a type that 
means integer, and adding two integer is defined to produce a third integer
representing the sum.) Classes and objects allow us to extend the type system 
with our own custom types, but we won't cover them in this section. We will 
focus mainly on primitive types here, and leave the discussion of more complex 
types for [classes and objects](./class.md).

> View [sample code](../examples/index.md#type) for types, values and variables.

### primitive types

The primitive, or intrinsic types are those which are simple datatypes
(they have no additional data attributes). Objects are not primitive types. 
Primitive types are passed by value. Primitive types cannot be extended. The 
primitive types in ChucK are:

* __`int`__ : integer (signed)
* __`float`__ : floating point number (in ChucK, a float is by default
double-precision)
* __`time`__: ChucKian time
* __`dur`__: ChucKian duration
* __`void`__: (no type)
* __`complex`__: complex number in _rectangular_ form _`a + bi`_ (see [below](#complex))
* __`polar`__: complex number in _polar_ form (see [below](#complextypes))
* __`vec3`__, __`vec4`__: vector types of length 3, 4 (see [below](#vectortypes))

### values (literals)

Literal values are specified explicitly in code and are assigned a type by 
the compiler. The following are some examples of literal values:

```ck
// int:
42 => int a;
0xaf30 => int b;

// float:
1.323 => float x;

// dur:
5.5::second => dur d1;
```

In the above code, `second` is an existing duration variable. For more on 
durations, see the [manipulating time section](./time.md).

### variables

Variables are locations in memory that hold data. Variables have to be 
declared in ChucK before they are used. For example, to declare a variable 
of type `int` called `foo`:

```ck
// declare an 'int' called 'foo'
int foo;
```

We can assign a value to an existing variable by using the ChucK operator 
(`=>`). This is one of the most commonly used operators in ChucK, it's 
the way to do work and take action! We will discuss this family of operators
in [operators and operations](./oper.md).

```ck
// assign value of 2 to previously declared 'foo' 
2 => foo;
```

It is possible to combine the two statements into one:

```ck
// assign 2 to a new variable 'foo' of type 'int'
// 2 => int foo;
```

To use a variable, just refer to it by name:

```ck
// debug-print the value of foo
<<< foo >>>
```

To update the value of foo, for example:

```ck
// multiply 'foo' by 10, assign back to 'foo'
foo * 10 => foo;

// You can also do the above using a `*=>` (mult-chuck):
10 *=> foo;
```

Here is an example of a duration:

```ck
// assign value of '5 seconds' to new variable bar
5::second => dur bar;

// Once you have bar, you can inductively use it to 
// construct new durations:

// 4 bar, a measure
4::bar => dur measure;
```

Since time is central to programming ChucK, it is important to understand time,
dur, the relationship and operations between them. You can find more information
on this topic in the [manipulating time section](./time.md).

### reference types

Reference types are types which inherit from the `object` class. Some default
reference types include:

* `Object` : base type that all classes inherit from (directly or indirectly)
* `array` : N-dimensional ordered set of data (of the same type)
* `Event` : fundamental, extendable, synchronization mechanism
* `UGen` : extendable unit generator base class
* `string` : string (of characters)

New classes can be created. All classes are reference types. We will
leave the full discussion to the [objects and classes section](./class.md).


### vector types

* `vec3` - access .x .y .z OR .r .g .b OR .value .goal .slew
* `vec4` - access .x .y .z .w OR .r .g .b .a

### complex types

Two special primitive types are available to represent complex data, such as 
the output of an FFT: `complex` and `polar`. A complex number of the form 
_`a + bi`_, can be declared as

```ck
#(2,3) => complex cmp; // cmp is now 2 + 3i 
```

where the `#(...)` syntax explicitly denotes a complex number in rectangular 
form. Similarly, explicit complex numbers can be manipulated directly:

```ck
#(5, -1.5) => complex cmp; // cmp is 5 - 1.5i
#(2,3) + #(5,6) + cmp => complex sum; // sum is now 12 + 7.5i
```

The (floating point) real and imaginary parts of a complex number can
be accessed with the __`.re`__ and  __`.im`__ components of a 
`complex` number:

```ck
#(2.0,3.5) => complex cmp;
cmp.re => float x; // x is 2.0
cmp.im => float y; //y is 3.5
```

The `polar` type offers an equivalent, alternative representation of complex 
numbers in terms of a magnitude and phase value. A polar representation of 
a complex number can be declared as:

```ck
%(2, .5*pi) => polar pol; // pol is 2 units and .5*pi radians
```

The magnitude and phase values can be accessed via __`.mag`__ and 
__`.phase`__ :

```ck
%(2, .5*pi) => polar pol;
pol.mag => float m; // m is 2
pol.phase => float p; // p is .5*pi;
```

__`polar`__ and __`complex`__ representations can be cast to each other and
multiplied/added/assigned/etc. Here, `$` is the cast operator and can also 
be used to cast float to int:

```ck
%(2, .5*pi) => polar pol;
#(3, 4) => complex cmp;
pol $ complex + #(10, 3) + cmp => complex cmp2; 
cmp $ polar + %(10, .25*pi) - pol => polar pol2;
```

${LANGFOOTER}