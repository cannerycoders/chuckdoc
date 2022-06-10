${LANGHEADER}

## ChucK : Language > Events

<div class="chuck_nav">
<center>
 <table border="0"><tr><td>
  <div class="chuck_nav_bar">	
    <a href="./uana.md">&lt; unit analyzers</a>  |
    <a href="./index.md">language specification ^</a>
  </div>
  </td></tr></table>
</center>
</div>

## Events

In addition to the built-in timing mechanisms for internal control, 
ChucK has an __Event__ class to allow exact synchronization across 
an arbitrary number of shreds.  

> [View sample code for events](../examples/index.md#event)


<a id="intro"></a>

## what they are

ChucK events are a native class within the ChucK language.  We can
create an event objects, and then chuck (`=>`) that event to `now`.  
The event places the current shred on the event's waiting list, 
suspends the current shred (letting time advance from that shred's 
point of view). When the the event is triggered, one or more of the 
shreds on its waiting list is shreduled to run immediately.  This 
trigger may originate from another ChucK shred, or from activities 
taking place outside the Virtual Machine (MIDI, OSC, or IPC). 

```chuck
// declare event
Event e;

// function for shred
fun void eventshred( Event event, string msg )
{
    // infinite loop
    while ( true )
    {
        // wait on event
        event => now;

        // print
        <<< msg >>>;
    }
}

// create shreds
spork ~ eventshred ( e, "fee" );
spork ~ eventshred ( e, "fi" );
spork ~ eventshred ( e, "fo" );
spork ~ eventshred ( e, "fum" );

// infinite time loop
while ( true )
{
    // either signal or broadcast
    if( maybe )
    { 
        <<< "signaling..." >>>;
        e.signal();
    }
    else
    { 
        <<< "broadcasting..." >>>;
        e.broadcast();
    }

    // advance time
    0.5::second => now;
}
```

<a id="use"> </a>

## use

Chucking an event to now suspends the current shred, letting time advance:

```chuck
// declare Event
Event e;

// ...

// wait on the event
e => now;

// after the event is trigger
<<< "I just woke up" >>>;
```

As shown above, events can be triggered in two ways.

1. `signal()` releases the _first_ shred in that event's queue, and shredules 
it to run at the current time, respecting the order in which shreds were 
added to the queue.

```chuck
// signal one shred waiting on the event e
e.signal();
```

2. `broadcast()` releases _all_ shreds queued by that event, in the order 
they were added, and at the same instant in time. 

```chuck
// wake up all shreds waiting on the event e
e.broadcast();
```

The released shreds are shreduled to run immediately.  But of course 
they will respect other shreds also shreduled to run at the same time.
Furthermore, the shred that called `signal()` or `broadcast()` will
continue to run until it advances time itself, or yield the Virtual Machine
without advancing time. (see `me.yield()` in [concurrency](spork.md#me)).

<a id="midi"> </a>

## MIDI events

ChucK contains built-in MIDI classes to allow for interaction with MIDI 
based software or devices.

```chuck
MidiIn min;
MidiMsg msg;

// open midi receiver, exit on fail
if ( !min.open(0) ) me.exit(); 

while( true )
{
    // wait on midi event
    min => now;

    // receive midimsg(s)
    while( min.recv( msg ) )
    {
        // print content
        <<< msg.data1, msg.data2, msg.data3 >>>;
    }
}
```

__`MidiIn`__ is a subclass of __`Event`__, and as such can be ChucKed to 
`now`.  MidiIn then takes a MidiMsg object to its `.recv()` method to 
access the MIDI data. 

As a default, MidiIn events trigger the `broadcast()` event behavior. 

<a id="osc"> </a>

## OSC events

In addition to MIDI, ChucK has OSC communication classes as well:<

```chuck
// create our OSC receiver listening to port 6449
OscRecv orec;
6449 => orec.port;

// start listening (launch thread)
orec.listen();

function void rate_control_shred()
{ 
    // create an address in the receiver 
    // and store it in a new variable.
    orec.event("/sndbuf/buf/rate,f") @=> OscEvent rate_event; 

    while ( true )
    { 
        // wait for events to arrive.
        rate_event => now; 

        // grab the next message from the queue. 
        while( rate_event.nextMsg() != 0 )
        { 
            // getFloat fetches the expected float
            // as indicated in the type string ",f"
            buf.play( rate_event.getFloat() );
            0 => buf.pos;
        }
    }       
}
```

The `OscRecv` class listens for incoming OSC packets on the specified port.  
Each instance of OscRecv can create `OscEvent` objects using its `event()`
method to listen for packets at any valid OSC Address pattern.

An `OscEvent` object can then be ChucKed to now to wait for messages to arrive, 
after which the `nextMsg()` and `get{Float|String|Int}()` methods can be used 
to fetch message data.

<a id="extend"> </a>

## creating custom events

Events, like any other class, can be subclassed to add functionality 
and transmit data:

```chuck
// extended event
class TheEvent extends Event
{
    int value;
}

// the event
TheEvent e;

// handler
fun int hi( TheEvent event )
{
    while( true )
    {
        // wait on event
        event => now;
        // get the data
        <<< e.value >>>;
    }
}

// spork
spork ~ hi( e );
spork ~ hi( e );
spork ~ hi( e );
spork ~ hi( e );

// infinite time loop
while( true )
{
    // advance time
    1::second => now;

    // set data
    Math.rand2( 0, 5 ) => e.value;

    // signal one waiting shred
    e.signal();
}
```

${LANGFOOTER}
