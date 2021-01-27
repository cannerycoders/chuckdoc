${LANGHEADER}

## ChucK : Language > Functions

<div class="chuck_nav">
<center>
 <table border="0"><tr><td>
  <div class="chuck_nav_bar">	
    <a href="./time.md">&lt; manipulating time</a>  |
    <a href="./index.md">language specification ^</a> | 
    <a href="./spork.md">concurrency &gt;</a> 
  </div>
  </td></tr></table>
</center>
</div>

## Functions

Functions provide ways to break up code/common tasks into individual 
units.  This helps to promote code re-usability and readability. 

> [View sample code for functions](../examples/index.md#func)

<a id="write"></a>

## writing

Declare functions with the keyword __`fun`__ (or __`function`__)
followed by the return type and then the name of the function. After the 
name of the function parentheses must be opened to declare the types of the 
input arguments.

```chuck
// define function call 'funk'
fun void funk( int arg )
{
    // insert code here
}
```

The above function returns no values (the return type is `void`).
If the function is declared to return any other type of values, the 
function body must return a value of the appropriate type.

```chuck
// define function 'addOne'
fun int addOne(int x)
{
    // result
    return x + 1;
}
```

<a id="calling"></a>

## calling

To call a function use the name of the function with appropriate arugments.

```chuck
// define 'hey'
fun int hey( int a, int b )
{
    // do something
    return a + b;
}

// call the function; store result
hey( 1, 2 ) => int result;
```

You can also use the ChucK operator to call functions!

```chuck
// call hey
( 1, 2 ) => hey => int result;

// same
hey( 1, 2 ) => int result;

// several in a row
( 10, 100 ) => Std.rand2 => Std.mtof => float foo;

// same
Std.mtof( Std.rand2( 10, 100 ) ) => float foo;
```

<a id="overloading"> </a>

## overloading

Overloading a function allows functions with the same name to be 
defined with different arguments. The function must be written in 
separate instances to handle the input, and the return type must 
agree.

```chuck
// funk( int )
fun int add(int x)
{
    return x + x;
}

// funk( int, int )
fun int add(int x, int y)
{
    return x + y;
}

// compiler automatically choose the right one to call
add( 1 ) => int foo;
add( 1, 2 ) => int bar;
```

${LANGFOOTER}