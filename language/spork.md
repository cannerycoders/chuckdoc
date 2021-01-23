${LANGHEADER}

## ChucK : Language > Concurrency & Shreds

<div class="chuck_nav">
<center>
 <table border="0"><tr><td>
  <div class="chuck_nav_bar">	
    <a href="./func.md">&lt; functions</a>  |
    <a href="./index.md">language specification ^</a> | 
    <a href="./class.md">classes & objects &gt;</a> 
  </div>
  </td></tr></table>
</center>
</div>

## Concurrency & Shreds

ChucK is able to run many processes concurrently (the processes behave as if 
they are running in parallel).  A ChucKian process is called a _shred_.  
To _spork_ a shred means creating and adding a new process to the virtual 
machine.  Shreds may be sporked from a variety of places, and may themselves 
spork new shreds.

ChucK supports sample-synchronous, non-preemptive concurrency.  Via the timing 
mechanism, any number of programs/shreds can be automatically _shreduled_ and 
synchronized use the timing information. A _shreduler_ in the virtual machine 
does the _shreduling_.  The concurrency is _sample-synchronous_, meaning 
that inter-process audio timing is guaranteed to be precise to the sample.  
Note that each process/shred does not necessarily need to know about each 
other - it only has to deal with time locally. The virtual machine will make 
sure things happen correctly "across the board".  Finally, concurrency - 
like timing - is deterministic in ChucK.

The simplest way to to run shreds concurrently is to specify them on the 
command line:

```sh
% chuck foo.ck bar.ck boo.ck
```

This command runs chuck on `foo.ck`, `bar.ck`, and `boo.ck. concurrently.  
There are other ways to run shreds concurrently (see 
[on-the-fly-programming commands](../program/otfp.md)).  Next, we show 
how to create new shreds from within ChucK programs.

> [View sample code for shreds & sporking](../examples/index.md#spork)


<a id="spork"></a>

## sporking shreds (in code)

To _spork_ means to shredule a new shred. To spork a shred, use 
the __`spork`__ keyword/operator:

* `spork` dynamically sporks shred from a function call
* this operation is sample-synchronous, the new shred is shreduled to execute 
  immediately
* the parent shred continues to execute, until time is advanced 
  (see [manipulating time](./time.md)) or until the parent explicitly 
  yields (see next section).
* in the current implementation, when a parent shred exits, all child shreds 
  exit (this behavior will be enhanced in the future).
* `spork`ing a function returns a reference to the new shred. Note that this 
  operation does not return the functions return value - the ability to get 
  back the return value at some later point in time will be provided in a 
  future release.

```ck
// define function go()
fun void go()
{
    // insert code
}

// spork a new shred to start running from go()
spork ~ go();

// spork another, store reference to new shred in offspring
spork ~ go() => Shred @ offspring;
```

A slightly longer example:

```ck
// define function
fun void foo( string s )
{
    // infinite time loop
    while( true )
    {
        // print s
        <<< s >>>;
        // advance time
        500::ms => now;
    }
}

// spork shred, passing in "you" as argument to foo
spork ~ foo( "you" );
// advance time by 250 ms
250::ms => now;
// spork another shred
spork ~ foo( "me" );

// infinite time loop - to keep child shreds around
while( true )
    1::second => now;
```

See also [function section](./func.md) for more information on working 
with functions.

<a id="me"></a>

## the `me` keyword

The __`me`__ keyword (of type `Shred`) refers the current shred.

Sometimes it is useful to suspend the current shred _without advancing time_, 
and let other shreds shreduled for the current time to execute.  `me.yield()` 
does exactly that. This is often useful immediately after sporking a new shred, 
and you would like for that shred to have a chance to run but you do not want 
to advance time yet for yourself.

```ck
// spork shred
spork ~ go();

// suspend the current shred ...
// ... give other shreds (shreduled for 'now') a chance to run
me.yield();
```

It may also be useful to exit the current shred.  For example if a MIDI device 
fails to open, you may exit the current shred.

```ck
// make a MidiIn object
MidiIn min;

// try to open device 0 (chuck --probe to list all device)
if( !min.open( 0 ) )
{
    // print error message
    <<< "can't open MIDI device" >>>;
    // exit the current shred
    me.exit();
}
```

You can get the shred id:

```ck
// print out the shred id
<<< me.id(); >>>;
```

These functions are common to all shreds, but yield() and exit() are commonly 
used with the current shred.

<a id="add"></a>

## using machine.add()

__`Machine.add( string path )`__ takes the path to a chuck program, and sporks 
it. Unlike `spork ~`, there is no parent-child relationship between the shred 
that calls the function and the new shred that is added.  This is useful for 
dynamically running stored programs.

```ck
// spork "foo.ck"
Machine.add( "foo.ck" );
```

Presently, this returns the id of the new shred, not a reference to the shred.
This will likely be changed in the future.

Similarly, you can remove shreds from the virtual machine.

```ck
// add
Machine.add( "foo.ck" ) => int id;

// remove shred with id
Machine.remove( id );

// add
Machine.add( "boo.ck" ) => id

// replace shred with "bar.ck"
Machine.replace( id, "bar.ck" );
```

<a id="com"></a>

## inter-shred communication

Shreds sporked in the same file can share the same global variables.  They 
can use time and events to synchronize to each other (see [events](./event.md)).
Shreds sporked from different files can share data (including events).  For now, 
this is done through a public class with static data (see [classes](./class.md").
Static data is not completely implemented!  We will fix this very soon!

<a id="arguments"></a>

## command line arguments

ChucK supports passing arbitrary data from the command line into ChucK 
programs using optional command line arguments.  An argument is specified by 
appending a colon character ':' to the name of the ChucK program to which 
you wish to send that argument, followed by the argument itself.  

```sh
 % chuck foo.ck:foo
```

Multiple arguments can be specified, each separated by the colon character.  

```sh
 % chuck foo.ck:foo:bar:boo
```

Furthermore, each ChucK program has its own set of arguments, which are 
specified separately.  

```sh
 % chuck foo.ck:foo bar.ck:bar boo.ck
```

Command line arguments can also be used when using on-the-fly programming 
facilities of ChucK.

```sh
 % chuck + foo.ck:foo bar.ck:bar:boo
```

__`Machine.add()`__ and __`Machine.replace()`__ accept command line arguments 
in a similar fashion.  

```ck
// add foo.ck
// pass foo and bar as command line arguments
Machine.add( "foo.ck:foo:bar" ) => int id;

// replace shred with "bar.ck"
// pass foo and bar as command line arguments
Machine.replace( id, "bar.ck:foo:bar" );
```

To access command line arguments within a ChucK program, use the 
__`me.args()`__ and __`me.arg()`__ functions.  

```ck
// print out all arguments
for( int i; i < me.numArgs(); i++ )
    <<< me.arg( i ) >>>;
```

${LANGFOOTER}