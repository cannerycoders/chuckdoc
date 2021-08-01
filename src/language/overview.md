${LANGHEADER}

## ChucK : Language Specification > Overview

<div class="chuck_nav">
<center>
<table border="0"><tr><td>
 <div class="chuck_nav_bar">	
  <a href="./index.md">^ language specification</a> | 
  <a href="./type.md">types, values, &amp; variables &gt;</a>
 </div>
 </td></tr>
</table>
</center>
</div>

## Overview

ChucK is a strongly-typed, __strongly-timed__, concurrent audio 
and multimedia programming language.  It is compiled into virtual 
instructions, which is immediately run in the ChucK Virtual Machine.  
This guide documents the features of the Language, Compiler, and Virtual 
Machine for a ChucK programmer.

## Running ChucK

Some quick notes on running ChucK. Please see [VM options](../program/vm.md) 
for a more complete guide to the command line options).

* you can install ChucK or run it from a local directory.
* ChucK is a command line application called `chuck`  (see also the [Audicle](http://audicle.cs.princeton.edu)).
* use command line prompt/terminal to run ChucK: 
  * OS X: `Terminal` or `xterm`
  * Windows: `cmd`, [`cygwin`](http:///www.cygwin.com), or [`gitbash`](https://git-scm.com/)
  * Linux: you surely have your preferred terminal.

To run ChucK with a chuck-program/patch called `foo.ck` :

```shell
% chuck foo.ck
```

To run ChucK with multiple patches concurrently (or the same one multiple times):

```shell
% chuck foo.ck bar.ck bar.ck boo.ck
```

There are several flags you can specify to control how ChucK operates, 
or to find out about the system.  For example, the following will probe the 
audio system on your computer and print out all available audio and MIDI devices.
You may then refer to them (by number usually) from the command line or 
from your program.  (see [VM Options](../program/vm.md") for a complete list)

```shell
% chuck --probe
```

ChucK can be run in a different terminal as a host/listener that patches may 
be sent to.  The server should invoke the --loop flag to specify that the 
virtual machine should not halt automatically (when the current programs exit).

```shell
% chuck --loop 
```

If a ChucK listener is running, we can (from a second terminal) send a 
program/patch to to the listener by using the `+` command line option:

```shell
% chuck + foo.ck 
```

Similarly, you can use `-` and `=` to remove/replace a patch in the listener, 
and use `^` to find out the status. 

See the guide to [On-the-fly Programming](../program/otfp.md) for more 
information.

To run most of the code or examples in this language specification, you only 
need to use the basic `chuck` program.

## Chuck Program Syntax and Structure

### Comments

Comments are sections of code that are ignored by a compiler. These 
help other programmers (and yourself) interpret your code. Double slashes 
indicate to the compiler to skip the rest of the line.  /* and */ 
denotes block commenting - the compiler ignores the text in between.  
(Note: block comments cannot be nested)

```chuck
// this is a comment
int foo; // another comment

/* 
    this is a block comment
    still going...
*/
```

### Debug Print

For the time being, `stdout` and `chout` have been temporarily disabled for the 
present release.  In their place we have provided a debug print syntax:

```chuck
// prints out value of _expression_
<<< expression >>>;
```

This will print the values and types of any expressions placed within 
them.  This debug print construction may be placed around any 
non-declaration expression (non l-value) and will not affect the 
execution of the code. Expressions which represent an object will print 
the value of that object's reference address:

```chuck
// assign 5 to a newly declared variable
5 => int i;
// prints "5 : (int)"
<<<i>>>;

// prints "hello! : (string)"
<<<"hello!">>>; //prints "hello! : (string)"

// prints "3.5 : (float)"
<<<1.0 + 2.5>>> => float x;
```

For more formatted data output, a comma-separated list of expressions 
will print only their respective values (with one space between):

```chuck
// prints "the value of x is 3.5" (x from above)
<<<"the value of x is", x>>>;

// prints "4 + 5 is 9"
<<<"4 + 5 is", 4 + 5>>>;

// prints "here are 3 random numbers ? ? ?"
<<<"here are 3 random numbers", 
    Std.rand2(0,9), 
    Std.rand2(0,9),
    Std.rand2(0,9) >>>;
```

### Reserved Words

Like any programming language, ChucK reserves certain words and character 
sequences. These have special meanings.

### primitive types

* `int`
* `float`
* `time`
* `dur`
* `void`
* `same` (unimplemented)

### control structures

* `if`
* `else`
* `while`
* `until`
* `for`
* `repeat`
* `break`
* `continue`
* `return`
* `switch` (unimplemented)

### class keywords

* `class`
* `extends`
* `public`
* `static`
* `pure`
* `this`
* `super` (unimplemented)
* `interface` (unimplemented)
* `implements` (unimplemented)
* `protected` (unimplemented)
* `private` (unimplemented)

### other chuck keywords

* `function`
* `fun`
* `spork`
* `const`
* `new`

### special values

* `now`
* `true`
* `false`
* `maybe`
* `null`
* `NULL`
* `me`
* `pi`

### special durations

* `samp`
* `ms`
* `second`
* `minute`
* `hour`
* `day`
* `week`

### special global ugens

* `dac`
* `adc`
* `blackhole`

${LANGFOOTER}
