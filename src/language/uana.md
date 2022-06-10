${LANGHEADER}

## ChucK : Language > Unit Analyzers (UAna)

<div class="chuck_nav">
<center>
 <table border="0"><tr><td>
  <div class="chuck_nav_bar">	
    <a href="./ugen.md">&lt; unit generators</a>  |
    <a href="./index.md">language specification ^</a> | 
    <a href="./event.md">events &gt;</a> 
  </div>
  </td></tr></table>
</center>
</div>

## Unit Analyzers

Unit Analyzers (UAnae) are analyis building blocks, similar in concept to 
unit generators. They perform analysis functions on audio signals and/or 
metadata input, and produce metadata analysis results as output. Unit 
analyzers can be linked together and with unit generators to form 
analysis/synthesis networks. Like unit generators, several unit analyzers 
may run concurrently, each dynamically controlled at different rates. 
Because data passed between UAnae is not necessarily audio samples, and 
the relationship of UAna computation to time is fundamentally different 
than that of UGens (e.g., UAnae might compute on blocks of samples, or
on metadata), the connections between UAnae have a different meaning from 
the connections between UGens formed with the ChucK operator, `=>`. 

This difference is reflected in the choice of a new connection operator, the
__UpChucK operator__: __`=^`__. Another key difference between UGens and
UAnae is that UAnae perform analysis (only) on demand, via the __`upchuck()`__
function (see [below](#below)).

Some more quick facts about ChucK unit analyzers:

* All ChucK unit analyzers are objects (not primitive types) 
  (see [objects](./class.md)).
* All ChucK unit analyzers inherit from the __`UAna`__ 
  [class](../program/uana_full.md#Uana).
* The operation `foo =^ yah`, where `foo` and `yah` are UAnae, connects 
  `foo` to `yah`.
* Unit analyzer parameters and behaviors are controlled by calling / chucking 
  to member functions over time, just like unit generators.
* Analysis results are always stored in an object called a `UAnaBlob`
  The `UAnaBlob` contains a time-stamp indicating when it was computed, and it 
  may store an array of floats and/or complex values. Each UAna specifies what
  information is present in the `UAnaBlob` it produces.
* All unit analyzers have the function `upchuck()`, which when called issues a 
  cascade of analysis computations for the unit analyzer and any upstream 
  unit analyzers on which its analysis depends. In the example of `foo =^ yah`,
  `yah.upchuck()` will result in `foo` first performing its analysis (possibly 
  requesting analysis results from unit analyzers further upstream), then
  `yah` using `foo`'s analysis results in its computation. `upchuck()` returns
  the analysis results in the form of a `UAnaBlob`.
* Unit analyzers are specially integrated into the Virtual Machine such that 
  each unit analyzer performs its analysis on its input whenever it or a 
  downstream UAna is `upchuck()`-ed. Therefore, we have the ability to assert 
  control over the analysis process at any point in time and at any desired 
  control rate.

<!-- link to built-in ugen documentation -->
> [View a list of ChucK's built-in unit analyzer classes](../program/uana.md)

> [View sample code forin unit analyzers](../examples/index.md#uana)

<a id="declaring"></a>

## declaring

Unit analyzers (UAnae) are objects, and thus they need to be instantiated before 
they can be used. We declare unit analyzers the same way we declare UGens 
and other [objects](./class.md#new).

```chuck
// instantiate an FFT, assign reference to variable f 
FFT f;
```

<a id="connecting"></a>

## connecting

The _UpChucK_ operator (`=^`) is only meaningful for unit analyzers. Similar to 
the behavior of the _ChucK_ operator between UGens, using `=^` to connect one 
UAna to another connects the analysis results of the first to the analysis 
input of the second.

```chuck
// instantiate FFT and flux objects. Connect them to trigger 
// computation of spectrum and spectral flux on adc input
adc => FFT fft =^ Flux flux => blackhole;
```

Note that the last UAna in any chain must be chucked to the `blackhole` or
`dac` to _pull_ audio samples from the `adc` or other unit generators 
_upstream_.

It is also possible to linearly chain many UAnae together in a single
statement. In the example below, the analysis of fluxCapacitor
depends on the results of `flux` so the `flux` object will always
perform its analysis computation before the computation of fluxCapacitor.

```chuck
// Set up analysis on adc, via an FFT object, a spectral 
// flux object, and an instance of a hypothetical Uana 
// class, FluxCapacitor, that operates on the flux result.
adc => FFT f =^ Flux flux =^ FluxCapacitor fluxCapacitor => blackhole;
```

Very importantly, it is possible to create connection networks containing
both UAane and UGens. In the example below, an FFT transforms two (added) 
sinusoidal inputs, one of which has reverb added. An IFFT transforms the 
spectrum back into the time domain, and the result is processed with a third
sinusoid by a gain object before being played through the `dac`.
No, this example is not supposed to do anything musically interesting,
only to help you get a feel for the syntax.  Notice that any connection
through which _audio samples_ are passed is denoted with the `=>`
operator, and the connection through which _spectral data_ is passed
(from the FFT to the IFFT) is denoted with the `=^` operator.

```chuck
// Chain a sine into a reverb, 
// Perform FFT, then IFFT, then apply gain, then output.
SinOsc s => JCRev r => FFT f =^ IFFT i => Gain g => dac;

// Chuck a second sine into the FFT
SinOsc s2 => f;

// Chuck a third sine into the final gain
SinOsc s3 => g;
```

`FFT`, `IFFT`, and other UAnae that perform transforms between the 
audio domain and another domain play a special role, as illustrated above.
`FFT` takes audio samples as input, so unit generators connect to it with 
the ChucK operator `=>`. However, it outputs analysis results in the
spectral domain, so it connects to other UAnae with the UpChucK operator `=^`.
Conversely, UAnae producing spectral domain output connect to the 
`IFFT` using `=^` and `IFFT` can connect to the `dac` or other UGens using
`=>`. This syntax allows the programmer to clearly reason about the expected 
behavior of an analysis/synthesis network, while it hides the internal 
mechanics of ChucK timing and sample buffering from the programmer.

Finally, just as with unit generators, it is possible to dynamically disconnect
unit analyzers, using an UnChucK operator, `=<` or `!=>`.

<a id="controlling"></a>

## controlling (over time)

In any ChucK program, it is necessary to advance time in order to pull audio
samples through the UGen network and create sound. Additionally, it is
necessary to trigger analysis computations explicitly in order for any
analysis to be performed, and for sound synthesis that depends on
analysis results (e.g., IFFT) to be performed. To explicitly trigger
computation at a point in time, the UAna's `upchuck()` member function is 
called. In the example below, an FFT computation is triggered every 1024 
samples.

```chuck
adc => FFT fft => dac;
// set the FFT to be of of size 2048 samples
2048 => fft.size;

while (true) 
{
    // let 1024 samples pass 
    1024::samp => now;

    // trigger the FFT computation on the last 2048 
    // samples (the FFT size)
    fft.upchuck();
}
```

In the example above, because the FFT size is 2048 samples, the while-loop 
causes a standard "sliding-window" FFT to be computed, where the hop size 
is equal to half a window. However, ChucK allows you to perform analysis using
nonstandard, dynamically set, or even multiple hop sizes with the same object. 

For example, in the code below, the `FFT` object, `fft` performs computation 
every 5 seconds as triggered by `shred1`, and it additionally performs 
computation at a variable rate as triggered by `shred2`.

```chuck
adc => FFT fft -> dac;
2048 => fft.size;

// spork two shreds: shred1 and shred2
spork ~shred1();
spork ~shred2(); 

// shred1 computes FFT every 5 seconds
fun void shred1() 
{
    while (true) 
    {
        5::second => now;
        fft.upchuck();	
    }
}

// shred2 computes FFT every n seconds, where n is a 
// random number between 1 and 10
fun void shred2() 
{
   while (true) 
   {	
       Std.rand2f(1, 10)::second => now;
       fft.upchuck();
    }
}
```

Parameters of unit analyzers may be controlled and altered at any point in time 
and at any control rate. We only have to assert control at the appropriate 
points as we move through time, by setting various parameters of the unit 
analyzer. To set the a value for a parameter of a UAna, a value of the proper 
type should be ChucKed to the corresponding control function.

```chuck
// connect the input to an FFT
adc => FFT fft => blackhole;

// start with a size of 1024 and a Blackman-Harris window
1024 => fft.size;
Windowing.blackmanHarris(512) => fft.window;

//advance time and compute FFT
1::minute => now;
fft.upchuck();

// change window to Hamming
Windowing.hamming(512) => fft.window;

// let time pass... and carry on.
```

Since the control functions are member functions of the unit analyzer, the
above syntax is equivalent to calling functions. For example, the line
below could alternatively be used to change the FFT window to a Hamming
window, as above.

```chuck
fft.window(Windowing.hamming(512));
```

For a list of unit analyzers and their control methods, consult 
[UAna reference](../program/uana.md).

Just like unit generators, to read the current value of certain parameters of 
a Uana, we may call an overloaded function of the same name. Additionally, 
assignments can be chained together when assigning one value to multiple 
targets.

```chuck
// connect adc to FFT
adc => FFT fft => blackhole;

// store the current value of the FFT size
fft.size() => int fftSize;
```

What if a UAna that performs analysis on a group of audio samples is
`upchuck()`-ed before its internal buffer is filled? This is possible 
if an FFT of size 1024 is instantiated, then `upchuck()`ed after
only 1000 samples, for example. In this case, the empty buffer slots
are treated as 0's (that is, zero-padding is applied). This same
behavior will occur if the FFT object's size is increased from 1024 to
2048, and then only 1023 samples pass after this change is applied; the
last sample in the new (larger) buffer will be 0. Keep in mind, then,
that certain analysis computations near the beginning of time and
analysis computations after certain parameters have changed will
logically involve a short "transient" period.</p>

```chuck
// connect adc to FFT to blackhole
adc => FFT fft => blackhole;

// set the FFT size to 1024 samples
1024 => fft.size;

// allow 1000 samples to pass
1000::samp => now;

// compute the FFT: the last 24 spots in the FFT buffer 
// haven't been filled,  so they are zero-ed out. The 
// computation is nevertheless valid and proceeds.
fft.upchuck(); 

1::minute => now; // let time pass for a while

// increase the size of the FFT, and therefore the size 
// of the sample buffer it uses
2048 => fft.size;

// let 1023 samples pass 
1023::samp =. now;

// at this point, only 2047 of the 2048 buffer spots 
// have been filled the following computation therefore 
// zeros out the last audio buffer spot
fft.upchuck();

1::minute => now; // let time pass for a while

// now the buffer is happy and full
fft.upchuck(); // proceeds normally on a full buffer
```

<a id="representing_metadata"></a>

## representing metadata: the __`UAnaBlob`__

It is great to be able to trigger analysis computations like we've been doing 
above, but what if you want to actually _use_ the analysis results? Luckily, 
calling the `upchuck()` function on a UAna returns a reference to an object
that stores the results of any UAna analysis, called a `UanaBlob`. `UanaBlob`s 
can contain an array of floats, and/or an array of complex numbers (see the 
next section). The meaning and formatting of the `UanaBlob` fields is different 
for each UAna subtype. `FFT`, for example 
([see specification](../program/uana_full.md#FFT")) fills in the complex array
with the spectrum and the floating point array with the magnitude spectrum.
Additionally, all `UanaBlob`s store the time when the blob was last computed.

The example below demonstrates how one might access the results of an FFT:

```chuck
adc => FFT fft => blackhole;
// ... set FFT parameters here ...

UAnaBlob blob;
while (true) 
{
    // use hop size of 50 ms
    500::ms => now; 

    // store the result in blob.
    fft.upchuck() @=> blob; 

    // get the magnitude spectrum as float array	
    blob.fvals() @=> float magSpec[]; 

    // get the whole spectrum as complex array
    blob.cvals() @=> complex spec[]; 

    // get the first bin of the magnitude spectrum
    magSpec[0] => float firstMag; 

    // equivalent way to get first bin of mag spectrum
    blob.fval(0) => float firstMag2; 

    // yet another equivalent way
    fft.upchuck().fval(0) => float firstMag3; 
    
    // similarly, get 1st spectrum bin
    fft.upchuck().cval(0) => complex firstSpec; 
    
    blob.when() => time whenComputed; 
    
    // get the time it was computed
}
```

Beware: whenever a UAna is `upchuck()`-ed, the contents of its previous
`UAnaBlob` are overwritten. In the following code, `blob1` and `blob2`
refer to the same `UAnaBlob`.  When `fft.upchuck()` is called the second time, 
the contents of the `UAnaBlob` referred to by `blob1` are overwritten.

```chuck
adc => FFT fft => blackhole;

UAnaBlob blob1, blob2;

// let time pass for a while
1::minute => now; 

// blob1 points to the analysis results
fft.upchuck() @=> blob1; 

// let time pass again
1::minute => now; 

// now both blob1 and blob2 refer to the 
// same object: the new results!
fft.upchuck() @=> blob2; 
```

Also beware: if time is not advanced between subsequent `upchuck()`s of a UAna, 
any `upchuck()` after the first will not re-compute the analysis, even if UAna
parameters have changed. After the code below, `blob` refers to a `UAnaBlob` 
that is the result of computing the first (size 1024) FFT.

```chuck
adc => FFT fft => blackhole;
1024 => fft.size;

UAnaBlob blob;

// let time pass for a while
1::minute => now; 

// blob holds the result of the FFT
fft.upchuck() @=> blob; 

512 => fft.size; // change fft param

// time hasn't advanced since the last computation, 
// so no re-computation is done
fft.upchuck() @=> blob; 
```

<a id="representing_complex"></a>

## representing complex data: the `complex` and `polar` types

In order to represent complex data, such as the output of an FFT, two new 
datatypes have been added to ChucK: `complex` and `polar`.
These types are described with examples [here](./type.md#complex).

<a id="performing"></a>

## performing analysis in UAna networks

Often, the computation of one UAna will depend on the computation results of 
upstream UAnae. For example, in the UAna network below, the spectral flux is 
computed using the results of an FFT.

```chuck
adc => FFT fft =^ Flux flux => blackhole;
```

The flow of computation in UAna networks is set up so that every time a
UAna `a` is `upchuck()`-ed, each UAna whose output is connected to
`a`'s input via `=^` is `upchuck()`-ed first, passing the results to
`a` for it to use. For example, a call to `flux.upchuck()` will first force
`fft` to compute an FFT on the audio samples in its buffer, then `flux`
will use the `UanaBlob` from `fft` to compute the spectral flux. This flow of 
computation is handled internally by ChucK; you should understand the flow of 
control, but you don't need to do `fft.upchuck()` explicitly. Just writing code 
like that below will do the trick:

```chuck
adc => FFT fft =^ Flux flux => blackhole;
UAnaBlob blob;
while (true) 
{
    100::ms => now;

    // upchuck() causes fft to compute, then computes flux 
    // and stores result in blob
   	flux.upchuck() @=> blob; 
}
```

Additionally, each time a UAna `upchuck()`s, its results are cached until time 
passes. This means that a UAna will only perform its computation once for a 
particular point in time.

```chuck
adc => FFT fft =^ Flux flux => blackhole;
fft =^ Centroid c => blackhole;

UAnaBlob blob, blob2;
while (true) 
{
    100::ms => now;

    // upchuck causes fft to compute, then computes flux 
    // and stores result in blob
    flux.upchuck() @=> blob; 

    // upchuck uses cached fft results from previous line 
    // to compute centroid
    c.upchuck() @=> blob2; 
}
```

When no `upchuck()` is performed on a UAna, or on UAnae that depend on it, it 
will not perform computation. For example, in the network below, the flux is 
never computed.

```chuck
adc => FFT fft =^ Flux flux => blackhole;
UAnaBlob blob;
while (true) 
{
   100::ms => now;

   // compute fft only
   fft.upchuck() @=> blob; 
}
```

The combination of this "compute-on-demand" behavior and UAna caching means 
that different UAnae in a network can be `upchuck()`-ed at various/varying 
control rates, with maximum efficiency. In the example below, the FFT, centroid, 
and flux are all computed at different rates. When the analysis times for
`flux` and `fft` or `centroid` and `fft` overlap, `fft` is computed just once 
due to its internal caching. When it is an analysis time point for `fft`
but not for `flux`, `flux` will not be computed.

```chuck
adc => FFT fft =^ Flux flux => blackhole;
fft =^ Centroid c => blackhole;
UAnaBlob blob1, blob2, blob3;

spork ~doFFT();
spork ~doFlux();
spork ~doCentroid();

while (true) 
{
    // Keep parent shred going
    1::minute => now;
}

fun void doFFT() 
{
   while (true) 
   {
       50::ms => now;
       fft.upchuck() @=> blob1;
    }
}

fun void doFlux() 
{
    while (true) 
    {
       110::ms => now;
       flux.upchuck() @=> blob2;
    }
}

fun void doCentroid() 
{
    while (true) 
    {
       250::ms => now;
       c.upchuck() @=> blob3;
    }
}
```

An easy way to synchronize analysis of many UAnae is to `upchuck()` an
"agglomerator" UAna. In the example below, `agglom.upchuck()` triggers analysis 
of all upstream UAnae in the network. Because `agglom` is only a member of the
`UAna` base class, it does no computation of its own. However, after
`agglom.upchuck()` all other UAnae will have up-to-date results that are 
synchronized, computed, and cached so that they are available to be accessed
via `upchuck()` on each UAna (possibly by a different shred waiting for an 
event - see [below](#using_events).

```chuck
adc => FFT fft =^ Flux flux =^ UAna agglom => blackhole;
fft =^ Centroid centroid =^ agglom;

// could add abitrarily many more UAnae that connect to 
// agglom via =^
while (true) 
{
     100::ms => now;

     // forces computation of both centroid and flux 
     // (and therefore fft, too)
     agglom.upchuck(); 
}
```

Because of the dependency and caching behavior of `upchuck()`-ing in UAna 
networks, UAna feedback loops should be used with caution. In the network below, 
each time `c` is `upchuck()`-ed, it forces `b` to compute, which forces 
`a` to compute, which then recognizes that `b` has been traversed in this 
UpChucK path but has not been able to complete its computation - thereby 
recognizing a loop in the network. `a` then uses `b`'s _last computed_
UAnaBlob to perform its computation. This may or may not be desirable,
so be careful.

```chuck
adc => UAna a =^ UAna b =^ Uana c => blackhole;
b =^ a; // creates a feedback loop

while (true) 
{
    100::ms => now;

    // involves a using b's analysis results from 100 ms ago
    c.upchuck(); 
}
```

Another handy UAna for synchronizing feature extraction is the `FeatureCollector`. 
Calling `upchuck()` on a `FeatureCollector` triggers computation of all upstream
UAnae, and it concatenates their output blob data into a feature vector
that can be used as input to a classifier, for example using 
[smirk](http://smirk.cs.princeton.edu/). 

```chuck
adc => FFT fft =^ Flux flux =^ FeatureCollector fc => blackhole;
fft =^ Centroid centroid =^ fc;
// could add abitrarily many more UAnae that connect to fc via =^

while (true)
{
    100::ms => now;
    // forces computation of both centroid and flux (and therefore fft, too)
    // an vectorBlob's fvals and cvals will be a concatenation of the feature values
    fc.upchuck() @=> UAnaBlob vectorBlob; 
}
```


<!-- 

<a id="using_events"></a>

## using events

When a UAna is `upchuck()`-ed, it triggers an event. In the example below, 
a separate shred prints the results of FFT whenever it is computed.

```chuck
adc => FFT fft => blackhole;
spork ~printer(); // spork a printing shred
while (true) 
{
    // perform FFT every 50 ms
    50::ms => now; 
    fft.upchuck();
}

fun void printer() 
{
    UAnaBlob blob;
    while (true) 
    {
        // wait until fft has been computed
        fft => now;
        fft.upchuck() @=> blob; 
        // get (cached) fft result
        for (0 => int i; i < blob.fvals().cap(); i++)
            <<< blob.fvals(i) >>>; 
    }
}
```
-->

<a id="builtin"></a>

## built-in unit analyzers

ChucK has a number of built-in UAna classes. These classes perform many basic 
transform functions (FFT, IFFT) and feature extraction methods (both spectral 
and time-domain features). A list of built-in ChucK unit analyzers can
be found [here](../program/uana.md).

## creating

(someday soon you will be able to implement your own unit analyzers!)

${LANGFOOTER}
