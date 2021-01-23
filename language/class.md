${LANGHEADER}

## ChucK : Language > Classes & Objects

<div class="chuck_nav">
<center>
 <table border="0"><tr><td>
  <div class="chuck_nav_bar">	
    <a href="./spork.md">&lt; concurrency</a>  |
    <a href="./index.md">language specification ^</a> | 
    <a href="./ugen.md">unit generators&gt;</a> 
  </div>
  </td></tr></table>
  </center>
</div>

<a id="intro"> </a>

## Classes & Objects

Chuck implements an object system that borrows from both C++ and Java 
conventions. In our case this means: 

* You can define custom classes as new types and instantiate objects
* ChucK supports _polymorphic inheritance_ (this is the same model used in Java, 
  and also known as virtual inheritance in C++).
* All object variables are _references_ (like Java), but instantiation resembles 
  C++. We will discuss this in detail below.
* There is a default class library.
* All objects inherit from the `Object` class (as in Java).

For the sake of clarity we will define these terms:

* a class is an _abstraction_ of data (members) and behavior (methods).
* a class is a _type_.
* an _object_ is an _instantiation_ of that class.
* a _reference variable_ refers indirectly to an object - it is not the 
  object itself. All ChucK _object variables_ are reference variables 
  (like in Java).
* similarly, _reference assignment duplicates a reference to an object and 
  assigns the reference to a reference variable.  The object itself is not 
  duplicated. All ChucK object assignments are reference assignments.

> [View sample code for classes](../examples/index.md#class)

<a id="base"> </a>

## built-in classes

ChucK has a number of classes defined within the language.

* __`Object`__ : base class to all ChucK objects.
* __`Event`__ : ChucK's basic synchronization mechanism; may be extended to 
  create custom Event functionality (discussed [here](./event.md")).
* __`Shred`__ : basic abstraction for a non-preemptive ChucK process.
* __`UGen`__ : base unit generator class (discussed [here](./ugen.md).
* __`UAna`__ : base unit analysis class (discussed [here](./uana.md).

<a id="new"> </a>

## working with objects

Let's begin with some examples.  For these examples, let's assume 
`Foo` is a defined class.

```ck
// create a Foo object; stored in reference variable bar
Foo bar;
```

This code does two things:

1. a reference variable `bar` is declared. Its type is `Foo`.
2. a new instance of `Foo` is created, and its reference is assigned to `bar`.

Note that in contrast to Java, this statement both declares a reference 
variable _and_ instantiates an instance of that class _and_ assigns the 
reference to the variable.  Also note that in contrast to C++, `foo`
is a reference, and does not represent the object itself.

To declare a reference variable that refers to nothing (also called a 
_null reference_):

```ck
// create a null reference to a Foo object
Foo @ bar;
```

The above code only declare a reference and initializes it to `null`
(random note: the above statement may be read as "Foo at bar").

We can assign a new instance to the reference variable:

```ck
// assign new instance of Foo to bar
new Foo @=> Foo @ bar;
// (this statement is equivalent to 'Foo bar', above)
```

The code above is exactly equivalent to `Foo bar;` as shown above.  The 
`new` operator creates an instance of a class (in this case `Foo`).
The `@=>` operator performs the reference assignment (described [here](./oper.md)).

It is possible to make many references to same object:

```ck
// make a Foo
Foo bar;

// reference assign to duh
bar @=> Foo @ duh;

// (now both bar and duh points to the same object)
```

ChucK objects are reference counted and garbage collection takes place 
automatically.

As stated above, classes usually contain data _and_ behavior, in the form of 
_member variables_ and _member functions_, respectively.  Members are 
accessed by using _dot notation_ - `reference.memberdata` and 
`reference.>memberfunc()`. To invoke a member function of an object (assuming 
class `Foo` has a member function called `compute` that takes two integers 
and returns an integer):

```code
// make a Foo
Foo bar;

// call compute(), store result in boo
bar.compute( 1, 2 ) => int boo;
```


<a id="create"> </a>

## writing a class

If a class has already been defined in the ChucK virtual machine (either in 
the same file or as a public class in a different file) then it can be 
instantiated similar to primitive types.

Unless declared `public`, class definitions are scoped to the shred and 
will not conflict with identically named classes in other running shreds.
 
Classes encapsulate a set of behaviors and data. To define a new object type, 
the keyword __`class`__ is used followed by the name of that class. 

```ck
// define class X
class X
{
    // insert code here
}
```

If a class is defined as __`public`__, it is integrated into the central 
namespace (instead of the local one), and can be instantiated from other 
programs that are subsequently compiled.  There can be at most one public 
class per file.

```ck
// define public class MissPopular
public class MissPopular
{
    // ...
}

// define non-public class Flarg
class Flarg
{
    // ...
}

// both MissPopular and Flarg can be used in this file
// only MissPopular can be used from another file
```

We define member data and methods to specify the data types and functionality
required of the class.  Members, or instance data and instance functions are
associated with individual instances of a class, whereas __`static`__ data 
and functions are only associated with the class (and shared by the instances).


<a id="member"> </a>

## members (instance data + functions)

Instance data and methods are associated with an object.

```ck
// define class X
class X
{
    // declare instance variable 'm_foo'
    int m_foo;
    // another instance variable 'm_bar'
    float m_bar;
    // yet another, this time an object
    Event m_event;

    // function that returns value of m_foo
    fun int getFoo() { return m_foo; }

    // function to set the value of m_foo
    fun void setFoo( int value ) { value => m_foo; }

    // calculate something
    fun float calculate( float x, float y )
    {
        // insert code
    }

    // print some stuff
    fun void print()
    {
        <<< m_foo, m_bar, m_event >>>;
    }
}

// instantiate an X
X x;

// set the Foo
x.setFoo( 5 );
// print the Foo
<<< x.getFoo() >>>;

// call print
x.print();
```

### class constructors

In the current release, constructors aren't supported.  However, we have a 
single _pre-constructor_. The code immediately inside a class definiton 
(and not inside any functions) is run every time an instance of that class 
is created.

```ck
// define class X
class X
{
    // we can put any ChucK statements here as pre-constructor
    
    // initialize an instance data
    109 => int m_foo;

    // loop over stuff
    for( 0 => int i; i < 5; i++ )
    {
        // print out message how silly
        <<< "part of class pre-constructor...", this, i >>>;
    }

    // function
    fun void doit()
    {
        // ...
    }
}

// when we instantiate X, the pre-constructor is run
X x;

// print out m_foo
<<< x.m_foo >>>;
```

<a id="static"> </a>

## static (data + functions)

Static data and functions are associated with a class, and are shared by all 
instances of that class -- in fact,static elements can be accessed without 
an instance, by using the name of the class: `Classname.element`.

```ck
// define class X
class X
{
    // static data
    static int our_data;

    // static function
    fun static int doThatThing()
    {
        // return the data
        return our_data;
    }
}

// do not need an instance to access our_data
2 => X.our_data;
// print out
<<< X.our_data >>>;
// print
<<< X.doThatThing() >>>;

// create instances of X
X x1;
X x2;

// print out their static data - should be same
<<< x1.our_data, x2.our_data >>>;

// change use one
5 => x1.our_data;

// the other should be changed as well
<<< x1.our_data, x2.our_data >>>;
```

<a id="extend"> </a>

## inheritance

Inheritance in object-oriented code allows the programmer to take an existing 
class and extend or alter its functionality.  In doing so we can create a 
taxonomy of classes that all share a specific set of behaviors, while 
implementing those behaviors in different, yet well-defined, ways.  We indicate 
that a new class inherits from another class using the `extends` keyword.  The 
class from which we inherit is referred to as the _parent class_, and the 
inheriting class is the _child class_.  The child class receives all of the 
member data and functions from the parent class, although functions from the 
parent class may be overridden (below).  Because the children contain the 
functionality of the parent class, references to instances of a child class 
may be assigned to a parent class reference type. 

For now, access modifiers (public, protected, private) are included but not 
fully implemented.  Everything is public by default.

```ck
// define class X
class X
{
    // define member function
    fun void doThatThing()
    {
        <<<"Hallo">>>;
    }

    // define another
    fun void hey()
    {
        <<<"Hey!!!">>>;
    }

    // data
    int the_data;
}

// define child class Y
class Y extends X
{
    // override doThatThing()
    fun void doThatThing()
    {
        <<<"No! Get away from me!">>>;
    }
}

// instantiate a Y
Y y;

// call doThatThing
y.doThatThing();

// call hey() - should use X's hey(), since we didn't override
y.hey();

// data is also inherited from X
<<< y.the_data >>>;
```

Inheritance provides us a way of efficiently sharing code between classes which 
perform similar roles.  We can define a particular complex pattern of behavior, 
while changing the way that certain aspects of the behavior operate.

```ck
// parent class defines some basic data and methods 
class Xfunc
{ 
    int x; 

    fun int doSomething( int a, int b ) { 
        return 0; 
    }
}

// child class, which overrides the doSomething function with an addition operation
class Xadds extends Xfunc
{ 
    fun int doSomething ( int a, int b )
    { 
         return a + b ; 
    }
}

// child class, which overrides the doSomething function with a multiply operation 
class Xmuls extends Xfunc
{ 
    fun int doSomething ( int a, int b )
    { 
         return a * b; 
    }
}

// array of references to Xfunc
Xfunc @ operators[2];

// instantiate two children and assign reference to the array 
new Xadds @=> operators[0];
new Xmuls @=> operators[1];

// loop over the Xfunc
for( 0 => int i; i < operators.cap(); i++ )
{
    // doSomething, potentially different for each Xfunc
    <<< operators[i].doSomething( 4, 5 ) >>>;
}
```

Because Xmuls and Xadds each redefine `doSomething( int a, int b )` with their 
own code, we say that they have _overridden_ the behavior of the parent class.
They observe the same interface, but have potentially different implementation.
This is known as _polymorphism_.

<a id="overloadation"> </a>

## Overloading

Function overloading in classes is similar to that of regular functions.  
For more details, see [function](./func.md).


${LANGFOOTER}