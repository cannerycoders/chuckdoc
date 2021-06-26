
${LANGHEADER}

## ChucK : Language > Control Structures

<div class="chuck_nav">
<center>
 <table border="0"><tr><td>
  <div class="chuck_nav_bar">	
    <a href="./oper.md">&lt; operators</a>  |
    <a href="./index.md">language specification ^</a> | 
    <a href="./time.md">manipulating time &gt;</a> 
  </div>
  </td></tr></table>
</center>
</div>

## Control Structures

ChucK includes standard control structures similar to those in most 
programming languages. A condition (of type 'int') is evaluated and 
then a proceeding block is potentially executed. Blocks are separated 
either by semicolons or by curly brackets `{}`. 

> [View sample code for control structures](../examples/index.md#ctrl)

<a id="if"></a>

## `if` / `else`

The if statement executes a block if the condition is evaluated as non-zero.

```chuck
if( condition )
{
    // insert code here
}
```

In the above code, _condition_ is any expression that evaluates to an `int`.

An `else` statement can be put after the `if` block to handle the case where 
the condition evaluates to 0.

```chuck
if( condition )
{
    // your code here
}
else
{
    // your other code here
}
```

If statements can be nested.


<a id="while"></a>

## `while`

The while statement is a loop that repeatedly executes the body as long as 
the condition evaluates as non-zero.

```chuck
// here is an infinite loop
while( true )
{
    // your code loops forever!

    // (sometimes this is desirable because we can create
    // infinite time loops this way, and because we have
    // concurrency)
} 
```

The while loop will first check the condition, and executes the body 
as long as the condition evaluates as non-zero. To execute the body of the 
loop before checking the condition, you can use a `do` / `while`
loop.  This guarantees that the body gets executed as least once.

<a id="do"></a>

## `do`

```chuck
do {
    // your code executes here at least once
} while( condition );
```

A few more points:

* while statements can be nested.
* see [break/continue](#break) for additional control over your loops.

<a id="until"></a>
## `until`

The until statement is the opposite of while, semantically. A until loop 
repeatedly executes the body __until__ the condition evaluates as non-zero.

```chuck
// an infinite loop
until( false )
{
    // your great code loops forever!
}
```

The until loop will first check the condition, and executes the body as long 
as the condition evaluates as zero. To execute the body of the loop before 
checking the condition, you can use a `do` / `until` loop.  This guarantees that
the body gets executed as least once.

```chuck
do {
    // your code executes here at least once
} until( condition );
```

A few more points:

* until statements can be nested.
* see [break/continue](#break) for additional control over your loops.

<a id="for"></a>

## `for`

A loop that iterates a given number of times. A temporary variable is declared 
that keeps track of the current index and is evaluated and incremented at each 
iteration.

```chuck
// for loop
for( 0 => int foo; foo < 4 ; foo++ )
{
    // debug-print value of 'foo'
    <<< foo >>>;
}
```

<a id="repeat"></a>

## `repeat`

A loop that iterates a number of times. Internal state tracks and decrements
a count parameter.

```chuck
// repeat loop
repeat(10)
{
    // debug-print value of 'foo'
    <<< foo >>>;
}
```

<a id="break"></a>

## `break` / `continue`

`break` allows the program flow to jump out of a loop.

```chuck
// infinite loop
while( 1 )
{
    if( condition ) 
        break;
}
```

`continue` allows a loop to continue looping but not to execute the rest of 
the block for the iteration where continue was executed.

```chuck
// another infinite loop
while( 1 )
{
    // check condition
    if( condition )
        continue;

    // some great code that may get skipped (if continue is taken)
}
```

${LANGFOOTER}