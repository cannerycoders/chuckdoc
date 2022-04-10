${PROGHEADER}

<center>

[^ programmer's guide](./index.md) | [std libraries](./classes_std.md) | [std uana](./uana.md)

## ChucK Advanced Unit Generators

<!-- nb: extra eol spaces on some lines cause <br/> -->

[LiSa](#lisa) |
[Dyno](#dyno) |
[CNoise](#cnoise)   
[GenX](#genx) |
[Gen5](#gen5) |
[Gen7](#gen7) |
[Gen9](#gen7) |
[Gen10](#gen10) |
[Gen17](#gen17)  
[CurveTable](#curvetable) |
[WarpTable](#warptable)

</center>


#### LiSa

__`LiSa`__ provides basic live sampling functionality. An internal buffer 
stores samples chucked to LiSa's input. Segments of this buffer can be 
played back, with ramping and speed/direction control.  by Dan Trueman (2007)

Multiple voice facility is built in, allowing for a single LiSa 
object to serve as a source for sample layering and granular textures.
Multi-channel LiSas can be instantiated using the following UGens.
The outputs of these LiSas can be sent to a multichannel dac, or
simply to other ugens, if it is desirable to process the channels
in different ways. These multiple channels are available
regardless of whether the dac is running > 2 chans. LiSaX's
multi-channel output can be manually connected through .chan(n).

| UGen     | Channels                             |
| :------- | :----------------------------------- |
| `LiSa`   | mono                                 |
| `LiSa2`  | stereo                               |
| `LiSa4`  | quad                                 |
| `LiSa6`  | 6-channel, laptop orchestra edition  |
| `LiSa8`  | 8-channel                            |
| `LiSa10` | 10-channel, for compatibility        |
| `LiSa16` | 16-channel                           |

See also: [LiSa Examples](../examples/index.md#livesamplingandgranularsynthesisusinglisa)

| LiSa.methods                    | Description                                                                        |
| :------------------------------ | :--------------------------------------------------------------------------------- |
| `duration(dur)`                 | required -- sets max length of buffer                                              |
| `duration()`                    | returns max length of buffer                                                       |
| `record(1/0)`                   | turn on/off recording into buffer                                                  |
| `getVoice() => voice (int)`     | returns first free voice number                                                    |
| `maxVoices(int)`                | sets maximum # of allowable voices                                                 |
| `play(voice, 1/0)`              | turn on/off play for particular voice                                              |
| `rampUp(voice, dur)`            | turn on play for voice with ramp                                                   |
| `rampDown(voice, dur)`          | ramp down voice and then turn off play                                             |
| `rate(voice, float)`            | sets play rate for "voice"                                                         |
| `playPos(voice, dur)`           | sets playback position for "voice" within buffer                                   |
| `playPos(voice)`                | returns playback position for "voice"                                              |
| `recordPos(dur)`                | sets record position                                                               |
| `recordPos()`                   | gets record position                                                               |
| `recRamp(dur)`                  | sets ramping for the edges of the record buffer                                    |
| `loopStart(dur, voice)`         | sets loopstart point for "voice"                                                   |
| `loopStart(voice)`              | get loopstart                                                                      |
| `loopEnd(voice, dur)`           | sets loopend point for "voice"                                                     |
| `loopEnd(voice)`                | gets loopend                                                                       |
| `loop(voice, 1/0)`              | turn on/off looping for "voice"                                                    |
| `loop(voice)`                   | get looping state                                                                  |
| `bi(voice, 1/0)`                | turn on/off bidirectional looping for "voice"                                      |
| `bi(voice)`                     | get bi state                                                                       |
| `voiceGain(voice, float)`       | sets gain "voice"                                                                  |
| `voiceGain(voice)`              | gets gain for "voice"                                                              |
| `loopEndRec(dur)`               | set looping end point for recording                                                |
| `loopEndRec()`                  | get ...                                                                            |
| `feedback(float)`               | set feedback amount [0,1] for recording. 0 means no overdub.                       |
| `feedback()`                    | get...                                                                             |
| `clear()`                       | clear recording buffer                                                             |
| `pan()`                         | returns pan value of voice 0                                                       |
| `pan(float where)`              | pans voice 0 where can be [0., 7.], to place voice across LiSa's 8 outputs         |
| `pan(int voice)`                | returns pan value of voice                                                         |
| `pan(int voice, float where)`   | pans specified voice where can be [0., 7.], to place voice across LiSa's 8 outputs |
| `valueAt(float val, dur where)` | used to populate LiSa from a sndbuf.                                               |
| `valueAt(dur where) => float`   | used to retrieve samples from LiSa's internal buffer.                              |
| `track(int mode)`               | sets the track/sync mode.  |

Track modes 

0. playback position is controlled internally.
1. input is used to control playback position. Values in the range [0,1] control playback position within loop.
    Negative inputs are negated so it is possible to use audio signals [-1, 1] to control playback position, as 
    in waveshaping.
2. input is used to control playback position. Input values are interpretty as a time value.

#### CNoise

__CNoise__ is a noise generator with multiple noise synthesis modes.

| CNoise.functions               | Description                                                                   |
| :----------------------------- | :---------------------------------------------------------------------------- |
| __`float fprob(float fprob)`__ | Probability [0-1] used for calculating XOR noise.                             |
| __`string mode(string mode)`__ | Noise synthesis mode. Supported modes are "white", "pink", "flip", and "xor". |

#### Dyno

__`Dyno`__ dynamics processor includes limiter, compressor, expander, 
noise gate, and ducker (presets).

see [Dyno-compress.ck](../examples/special/Dyno-compress.ck), 
[Dyno-duck.ck](../examples/special/Dyno-duck.ck), 
[Dyno-limit.ck](../examples/special/Dyno-limit.ck)

| Dyno.functions                                        | Description                                                                                                                                                                                                                                                                                                                                                |
| :---------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| __`void compress()`__                                 | set parameters to default compressor values                                                                                                                                                                                                                                                                                                                |
| __`void duck()`__                                     | set parameters to default ducker values                                                                                                                                                                                                                                                                                                                    |
| __`void expand()`__                                   | set parameters to default expander values                                                                                                                                                                                                                                                                                                                  |
| __`void gate()`__                                     | set parameters to default noise gate values                                                                                                                                                                                                                                                                                                                |
| __`void limit()`__                                    | set parameters to default limiter values                                                                                                                                                                                                                                                                                                                   |
| __`dur attackTime(), attackTime(dur)`__               | get/set duration for the envelope to move linearly from current value to the absolute value of the signal's amplitude                                                                                                                                                                                                                                      |
| __`int externalSideInput(), externalSideInput(int)`__ | get/set to true to cue the amplitude envelope off of sideInput instead of the input signal. note that this means you will need to manually set sideInput every so often. if false, the amplitude envelope represents the amplitude of the input signal whose dynamics are being processed. see dynoduck.ck for an example of using an external side chain. |
| __`float ratio(), ratio(float)`__                     | alternate way of setting slopeAbove and slopeBelow; sets slopeBelow to 1.0 and slopeAbove to 1.0 / ratio                                                                                                                                                                                                                                                   |
| __`dur releaseTime(), releaseTime(dur)`__             | get/set duration for the envelope to decay down to around 1/10 of its current amplitude, if not brought back up by the signal                                                                                                                                                                                                                              |
| __`float sideInput(), sideInput(float)`__             | get/set, if externalSideInput is set to true, replaces the signal being processed as the input to the amplitude envelope. see dynoduck.ck for an example of using an external side chain.                                                                                                                                                                  |
| __`float slopeAbove(), slopeAbove(float)`__           | get/set, determines the slope of the output gain vs the input envelope's level when the envelope is above thresh.                                                                                                                                                                                                                                          |
| __`float slopeBelow(), slopeBelow(float)`__           | get/set, determines the slope of the output gain vs the input envelope's level when the envelope is below thresh.                                                                                                                                                                                                                                          |
| __`float thresh(), thresh(float)`__                   | the point above which to stop using slopeBelow and start using slopeAbove to determine output gain vs input gain                                                                                                                                                                                                                                           |

```desc
default limiter values:
    slopeAbove = 0.1
    slopeBelow = 1.0
    thresh = 0.5
    attackTime = 5 ms
    releaseTime = 300 ms
    externalSideInput = 0 (false)

default compressor values:
    slopeAbove = 0.5
    slopeBelow = 1.0
    thresh = 0.5
    attackTime = 5 ms
    releaseTime = 300 ms
    externalSideInput = 0 (false)

default expander values:
    slopeAbove = 2.0
    slopeBelow = 1.0
    thresh = 0.5
    attackTime = 20 ms
    releaseTime = 400 ms
    externalSideInput = 0 (false)

default noise gate values:
    slopeAbove = 1.0
    slopeBelow = 10000000
    thresh = 0.1
    attackTime = 11 ms
    releaseTime = 100 ms
    externalSideInput = 0 (false)

default ducker values:
    slopeAbove = 0.5
    slopeBelow = 1.0
    thresh = 0.1
    attackTime = 100 ms
    releaseTime = 1000 ms
    externalSideInput = 1 (true)
    Note that the input to sideInput determines the level of 
    gain, not the direct signal input to Dyno.
```

#### CurveTable

 __`CurveTable`__  flexible curve/line segment table generator. Constructs 
 a wavetable composed of segments of variable times, values, and curvatures. 
 Coefficients are specified as a single linear array of triplets of 
 `[ time, value, curvature ]` followed by a final duple of `[ time, value ]` 
 to specify the final value of the table. Time values are expressed in 
 unitless, ascending values.  For curvature equal to 0, the segment is 
 a line; for curvature less than 0, the segment is a convex curve; 
 for curvature greater than 0, the segment is a concave curve.

| CurveTable.functions           | Description                        |
| :----------------------------- | :--------------------------------- |
| __`float[] coefs(float[] v)`__ | Get/Set lookup table coefficients. |
| _see [GenX](#GenX)_            |

see [GenX-CurveTable-test.ck](../examples/special/GenX-CurveTable-test.ck)

#### WarpTable

__`WarpTable`__ is mostly useful for conditioning control signals.
It is end-constrained in that an input of 0 always yields 0 and an output 
of 1 always yields 1.

```chuck
WarpTable.value(0) => 0 always
WarpTable.value(1) => 1 always
```

WarpTable expects input [0,1] and generates output [0,1]. It is useful 
for mapping sensors and focusing attention on:

* either extreme (asymmetrical warping)
* both extremes (symmetrical warping)
* central values (also symmetrical warping)

| WarpTable.functions            | Description                        |
| :----------------------------- | :--------------------------------- |
| __`float[] coefs(float[] v)`__ | Get/Set lookup table coefficients. |
| _see [GenX](#GenX)_            |

see [GenX-WarpTable-test.ck](../examples/special/GenX-WarpTable-test.ck)

#### GenX

__`GenX`__  base class for classic MusicN lookup table unit generators. 
Ported from rtcmix. 

See [makegens](http://www.music.columbia.edu/cmix/makegens.html) for more 
information on the GenX family of UGens. Currently coefficients past the 
100th are ignored. Lookup can either be done using the lookup() function, 
or by driving the table with an input UGen, typically a Phasor.  For an 
input signal between [&nbsp;-1,&nbsp;1&nbsp;], using the absolute value 
for [`-1,0)`, GenX will output the table value indexed by the current input.

| GenX.functions                 | Description                                                                                    |
| :----------------------------- | :--------------------------------------------------------------------------------------------- |
| __`float lookup(float i)`__    | returns lookup table value at index i [ -1, 1 ]; absolute value is used in the range [ -1, 0 ) |
| __`float[] coefs(float[] v)`__ | Get/Set lookup table coefficients.                                                             |

see [readme-GenX.ck](../examples/special/readme-GenX.ck) 

#### Gen5

__`Gen5`__  exponential line segment lookup table table generator. 
Constructs a lookup table composed of sequential exponential curves.  
For a table with N curves, starting value of y', and value 
y<sub>n</sub> for lookup index x<sub>n</sub>, set the coefficients 
to [y', y<sub>0</sub>, x<sub>0</sub>, ..., y<sub>N-1</sub>, x<sub>N-1</sub>].  
Note that there must be an odd number of coefficients.  If an even number of 
coefficients is specified, behavior is undefined.  The sum of x<sub>n</sub> 
for 0 <= n < N must be 1.  y<sub>n</sub> = 0 is approximated as 0.000001 
to avoid strange results arising from the nature of exponential curves.

| Gen5.functions                 | Description                        |
| :----------------------------- | :--------------------------------- |
| __`float[] coefs(float[] v)`__ | Get/Set lookup table coefficients. |
| _extends_ [GenX](#GenX)        |

see [Gen5-test.ck](../examples/special/Gen5-test.ck)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |

#### Gen7

__`Gen7`__  line segment lookup table table generator. 
Constructs a lookup table composed of sequential line segments.  
For a table with N lines, starting value of y', and value y<sub>n</sub> 
for lookup index x<sub>n</sub>, set the coefficients to 
[ y', y<sub>0</sub>, x<sub>0</sub>, ..., y<sub>N-1</sub>, x<sub>N-1</sub> ]. 
Note that there must be an odd number of coefficients.  If an even number of 
coefficients is specified, behavior is undefined.  The sum of x<sub>n</sub> 
for 0 < n < N must be 1.

| Gen7.functions                 | Description                        |
| :----------------------------- | :--------------------------------- |
| __`float[] coefs(float[] v)`__ | Get/Set lookup table coefficients. |
| _extends_ [GenX](#GenX)        |

see [Gen7-test.ck](../examples/special/Gen7-test.ck)                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |

#### Gen9

__`Gen9`__  sinusoidal lookup table with harmonic ratio, amplitude, 
and phase control. Constructs a lookup table of partials with specified 
amplitudes, phases, and harmonic ratios to the fundamental.  Coefficients 
are specified in triplets of [ ratio, amplitude, phase ] arranged in a 
single linear array. 

| Gen9.functions                 | Description                        |
| :----------------------------- | :--------------------------------- |
| __`float[] coefs(float[] v)`__ | Get/Set lookup table coefficients. |
| _extends_ [GenX](#GenX)        |                                    |

see [Gen9-test.ck](../examples/special/Gen9-test.ck)                                                                                                                                                                                                                                                              |

#### Gen10

__`Gen10`__  sinusoidal lookup table with partial amplitude control. 
Constructs a lookup table of harmonic partials with specified amplitudes.  
The amplitude of partial n is specified by the n<sup>th</sup> element of 
the coefficients. For example, setting coefs to `[1]` will produce a sine wave.

| Gen10.functions                | Description                        |
| :----------------------------- | :--------------------------------- |
| __`float[] coefs(float[] v)`__ | Get/Set lookup table coefficients. |
| _extends_ [GenX](#GenX)        |

see [Gen10-test.ck](../examples/special/Gen10-test.ck)                                                                                                                                                                                                                                                   |

#### Gen17

__`Gen17`__  chebyshev polynomial lookup table. Constructs a Chebyshev 
polynomial wavetable with harmonic partials of specified weights.  
The weight of partial n is specified by the n<sup>th</sup> element 
of the coefficients. Primarily used for waveshaping, driven by a 
SinOsc instead of a Phasor.  See 
[here](http://crca.ucsd.edu/~msp/techniques/v0.08/book-html/node74.html) 
and [Distortion Synthesis](http://en.wikipedia.org/wiki/Distortion_synthesis) 
for more information.

| Gen17.functions                                   | Description                        |
| :------------------------------------------------ |
| __`float[] coefs(float[] v)`__                    | Get/Set lookup table coefficients. |
| _extends_ [GenX](#GenX) (see GenX for parameters) |

see [Gen17-test.ck](../examples/special/Gen17-test.ck)                                                                                                                                                                                                                                                                                                                                                                                                                                      |

${PROGFOOTER}
