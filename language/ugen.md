${LANGHEADER}

## ChucK : Language > Unit Generators (UGen)

<div class="chuck_nav">
<center>
 <table border="0"><tr><td>
  <div class="chuck_nav_bar">	
    <a href="./class.md">&lt; classes & objects</a>  |
    <a href="./index.md">language specification ^</a> | 
    <a href="./uana.md">unit analyzers &gt;</a> 
  </div>
  </td></tr></table>
</center>
</div>

## Unit Generators

Unit Generators are function generators that output signals that can be used 
as audio or control signals.  However, in ChucK, there is 
_no fixed control rate_.  __Any unit generator may be controlled at any rate__.

Using the timing mechanism, you can program your own control rate, and can 
dynamically vary the control over time.  Using concurrency, it is possible 
to have many different parallel controls rates, each at any granularity.

Some more quick facts about ChucK unit generators

* All ChucK unit generators are objects (not primitive types) (see [classes](./class.md)).
* All ChucK unit generators inherit from the __`UGen`__ class.
* The operation __`foo => bar`__ (where `foo` and `bar` are Ugen's), connects
  `foo` to `bar`.
* Unit generators are controlled by calling/chucking to member functions over time.
* All unit generators have these methods (see below):
    * __`gain`__
    * __`op`__
    * __`channels`__
    * __`chan`__ 
    * __`last`__ 
* Three default, global unit generators are provided (see below):
    * __`adc`__
    * __`dac`__
    * __`blackhole`__ 
* Unit generators are specially integrated into the virtual machine such that
  audio is computed for every sample _as time is advanced_.  Via the timing 
  mechanism, we have the ability to assert control over the audio generate 
  process at any point in time and at any desired control rate.

> [View a list of Chuck's built-in UGens](../program/ugen.md)

<a id="decl"> </a>

## declaring

Unit generators (UGens) are objects, and need to be instantiated before they 
can be used. We declare unit generators the same way we declare 
[objects](./class.md#new).

```ck
// instantiate a SinOsc, assign reference to variable s
SinOsc s;
```

<a id="connect"> </a>

## connecting

The ChucK operator (`=>`) is specially overloaded for unit generators: 
ChucKing one UGen to another connects their respective output(s) and input(s).

```ck
// instantiate a SinOsc, connect its output to dac's input
SinOsc s => dac;
```

It is also possible to linearly chain many UGens together in a single statement.

```ck
// connect SinOsc to Gain to reverb to dac
SinOsc s => Gain g => JCRev r => dac;
```

Furthermore, it is possible to introduce feedback in the network.

```ck
// connect adc to Gain to delayline to dac; (feedforward)
adc => Gain g1 => DelayL d => dac;

// adc to Gain to dac (feedforward)
adc => Gain g2 => dac;

// our delayline to Gain back to itself (feedback)
d => Gain g3 => d;
```
    
UGens may be dynamically connected in this fashion into an audio synthesis 
network.  It is essential to note that the above only connects the unit 
generators, but does not actually generate audio - unless time is advanced.  
(see [manipulating time](./time.md) and [using events](./event.md).

```ck
// connect SinOsc to dac
SinOsc s => dac;
// set initial frequency (see next section)
440 => s.freq;

// advance time; allow audio to compute
1::second => now;
```

It is also possible to dynamically disconnect unit generators, using 
the _UnChucK_ operator __`=<`__ or __`!=>`__:

```ck
// connect SinOsc to dac
SinOsc s => dac;

// let time pass for 1 second letting audio be computed for that amount of time
1::second => now;

// disconnect s from the dac
s =< dac;

// let time pass for another second - should hear silence
1::second => now;

// duh, connect them again
s => dac;

// let time pass...
1::second => now;
```

<a id="ctrl"> </a>

## controlling (over time)

In ChucK, parameters of unit generators may be controlled and altered at any 
point in time and at any control rate.  We only have to move through time and 
assert the control at appropriate points in time, by setting various parameters 
on the unit generator.  To set the a value for a parameter of a unit generator 
a value of the proper type should be ChucKed to the corresponding control 
function.

```ck
// connect SinOsc to dac
SinOsc s => dac;
// set initial frequency to 440 hz
440 => s.freq;

// let time pass for 1 second
1::second => now;

// change the frequency to 880 hz
880 => s.freq;
```

Since the control functions are member functions of the unit generator, the 
above syntax is equilavent to calling functions.

```ck
// connect SinOsc to dac
SinOsc s => dac;

// set frequency to 440
s.freq( 440 );

// let time pass
1::second => now;
```

For a list of unit generators and their control methods, consult 
[UGen reference](../program/ugen.md).

To read the current value of certain parameters (not all parameters can 
be read), we may call an overloaded function of the same name.

```ck
// connect SinOsc to dac
SinOsc s => dac;

// store the current value of the freq
s.freq() => float the_freq;
```

You can chain assignments together when you want to assign one value to 
multiple targets. Note that the parentheses are only needed when the read 
function is on the very left.

```ck
// SinOsc to dac
SinOsc foo => dac;
// triosc to dac
triosc bar => dac;

// set frequency of foo and then bar
500 => foo.freq => bar.freq;

// set one freq to the other
foo.freq() => bar.freq;

// the above is same as:
bar.freq( foo.freq() );
```

Of course, varying parameters over time is often more interesting.

```ck
// SinOsc to dac
SinOsc s => dac;

// infinite time loop
while( true )
{
    // set the frequency
    ( s.freq() + 200 ) % 5000 => s.freq;

    // advance time
    100::ms => now;
}
```

All Ugen's have at least the following three control parameters:

* __`gain(float)`__ (of type `float`): set/get the gain of the UGen's output.
* __`last()`__ (of type `float`): get the last sample 
computed by the UGen.  if UGen has more than one channel, the average of all components channels are returned.
* __`channels()`__ (of type `int`): get the number of channels in the UGen.
* __`chan(int)`__ (of type `UGen`): return reference to nth channel (or 
    `null` if no such channel).
* __`op(int)`__ (of type `int`): set/get operation at the UGen. Values:
    * 0 : stop - always output 0
    * 1 : normal operation, add all inputs (default)
    * 2 : normal operation, subtract inputs starting from the earliest connected
    * 3 : normal operation, multiply all inputs
    * 4 : normal operation, divide inputs starting from the earlist connected
    * -1 : passthru - all inputs to the ugen are summed and passed directly to 
      output

<a id="chan"> </a>

## mono + stereo

ChucK supports stereo (default) and multi-channel audio 
(see [command-line options](../program/vm.md)) to select interfaces and number 
of channels). The __`dac`__ and the __`adc`__ are now multi-channel UGens.  
By default, ChucKing two UGens containing the same number of channels (e.g. 
both stereo or both mono) automatically matches the output channels with the 
input channels (e.g. left to left, right to right for stereo).  Stereo UGens 
mix their output channels when connecting to mono UGens.  Mono UGens split 
their output channels when connecting to stereo UGens.  Stereo UGens contain 
the parameters `.left` and `.right`, which allow access to the individual 
channels.

```ck
// adding separate reverb to left and right channels
adc.left => JCRev rl => dac.left;
adc.right => JCRev rr => dac.right;
```

The Pan2 stereo object takes a mono signal and split it to a stereo signal, 
with control over the panning.  The pan position may be changed with the 
.pan parameter (-1 (hard left) <= p <= 1 (hard right)).

```ck
// white noise to pan to dac
Noise n => Pan2 p => dac;

// infinite time loop
while( true )
{
    // modulate the pan
    Math.sin( now / 1::second * 2 * pi ) => p.pan;
    // advance time
    10::ms => now;
}
```

<a id="create"> </a>

## creating

( Coming soon! )

<a id="builtin"> </a>

## built-in unit generators

ChucK has a number of built-in UGen classes, including most of the 
[Synthesis ToolKit (STK)](http://ccrma.stanford.edu/software/stk/). A list of 
built-in ChucK unit generators can be found [here](../program/ugen.md).


${LANGFOOTER}

