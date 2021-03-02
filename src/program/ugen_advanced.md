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

__`LiSa`__ provides basic live sampling functionality. An internal 
buffer stores samples chucked to LiSa's input. Segments of this 
buffer can be played back, with ramping and speed/direction control.

Multiple voice facility is built in, allowing for a single LiSa 
object to serve as a source for sample layering and granular textures.  
by Dan Trueman (2007)

see [LiSa Examples wiki](http://wiki.cs.princeton.edu/index.php/LiSa_examples), 
[tutorial](http://dtrueman.mycpanel.princeton.edu/LiSa/LiSa_tutorial.html)

| LiSa.functions                              | Description                                                                                                                                                                                                                                                            |
| :------------------------------------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| __`int bi(int voice, int val)`__            | For particular voice (arg 1), turn on/off bidirectional playback.                                                                                                                                                                                                      |
| __`int bi(int val)`__                       | For particular voice (arg 1), get bidirectional playback status.                                                                                                                                                                                                       |
| __`int bi()`__                              | Get birectional playback status.                                                                                                                                                                                                                                       |
| __`void clear()`__                          | Clear recording buffer.                                                                                                                                                                                                                                                |
| __`dur duration(dur val)`__                 | Set buffer size; required to allocate memory, also resets all parameter values to default.                                                                                                                                                                             |
| __`dur duration()`__                        | Get buffer size.                                                                                                                                                                                                                                                       |
| __`float feedback(float val)`__             | Set feedback amount when overdubbing (loop recording; how much to retain).                                                                                                                                                                                             |
| __`float feedback()`__                      | Get feedback amount when overdubbing (loop recording; how much to retain).                                                                                                                                                                                             |
| __`int getVoice()`__                        | Return an available voice (one that is not currently playing). Return -1 if no voice is available.                                                                                                                                                                     |
| __`int getbi(int voice)`__                  | Turn on/off bidirectional playback (voice 0).                                                                                                                                                                                                                          |
| __`int loop(int voice, int val)`__          | For particular voice (arg 1), turn on/off looping.                                                                                                                                                                                                                     |
| __`int loop(int voice)`__                   | Turn on/off looping (voice 0).                                                                                                                                                                                                                                         |
| __`int loop(int val)`__                     | For particular voice (arg 1), get looping status.                                                                                                                                                                                                                      |
| __`int loop()`__                            | Get looping status.                                                                                                                                                                                                                                                    |
| __`dur loopEnd(int voice, dur val)`__       | For particular voice (arg 1), set loop ending point for playback. only applicable when .loop(voice, 1).                                                                                                                                                                |
| __`dur loopEnd(int voice)`__                | For particular voice (arg 1), get loop ending point for playback. only applicable when .loop(voice, 1).                                                                                                                                                                |
| __`dur loopEnd(dur val)`__                  | Set loop ending point for playback (voice 0). only applicable when 1 => loop.                                                                                                                                                                                          |
| __`dur loopEnd()`__                         | Get loop ending point for playback (voice 0). only applicable when 1 => loop.                                                                                                                                                                                          |
| __`dur loopEndRec(dur val)`__               | Set end point in buffer for loop recording.                                                                                                                                                                                                                            |
| __`dur loopEndRec()`__                      | Get end point in buffer for loop recording.                                                                                                                                                                                                                            |
| __`int loopRec(int val)`__                  | Turn on/off loop recording.                                                                                                                                                                                                                                            |
| __`int loopRec()`__                         | Get loop recording status.                                                                                                                                                                                                                                             |
| __`dur loopStart(int voice, dur val)`__     | For particular voice (arg 1), set loop starting point for playback. only applicable when .loop(voice, 1).                                                                                                                                                              |
| __`dur loopStart(int voice)`__              | For particular voice (arg 1), get loop starting point for playback. only applicable when .loop(voice, 1).                                                                                                                                                              |
| __`dur loopStart(dur val)`__                | Set loop starting point for playback (voice 0). only applicable when 1 => loop.                                                                                                                                                                                        |
| __`dur loopStart()`__                       | Get loop starting point for playback (voice 0). only applicable when 1 => loop.                                                                                                                                                                                        |
| __`int maxVoices(int val)`__                | Set the maximum number of voices allowable; 10 by default (200 is the current hardwired internal limit).                                                                                                                                                               |
| __`int maxVoices()`__                       | Get the maximum number of voices allowable; 10 by default (200 is the current hardwired internal limit).                                                                                                                                                               |
| __`float pan(int voice, float val)`__       | For particular voice (arg 1), set panning value [0.0, number of channels - 1.0].                                                                                                                                                                                       |
| __`float pan(int voice)`__                  | For particular voice (arg 1), get panning value.                                                                                                                                                                                                                       |
| __`float pan(float val)`__                  | Set panning value [0.0, number of channels - 1.0].                                                                                                                                                                                                                     |
| __`float pan()`__                           | Get panning value.                                                                                                                                                                                                                                                     |
| __`int play(int voice, int toggle)`__       | For particular voice (arg 1), turn on/off sample playback                                                                                                                                                                                                              |
| __`int play(int toggle)`__                  | Turn on/off sample playback (voice 0)                                                                                                                                                                                                                                  |
| __`dur playPos(int voice, dur val)`__       | For particular voice (arg 1), set playback position.                                                                                                                                                                                                                   |
| __`dur playPos(int voice)`__                | For particular voice (arg 1), get playback position.                                                                                                                                                                                                                   |
| __`dur playPos(dur val)`__                  | Set playback position (voice 0).                                                                                                                                                                                                                                       |
| __`dur playPos()`__                         | Get playback position (voice 0).                                                                                                                                                                                                                                       |
| __`int playing(int val)`__                  | Get playing status.                                                                                                                                                                                                                                                    |
| __`void rampDown(int voice, dur val)`__     | For particular voice (arg 1), turn off sample playback, with ramp                                                                                                                                                                                                      |
| __`void rampDown(dur val)`__                | Turn off sample playback, with ramp (voice 0).                                                                                                                                                                                                                         |
| __`void rampUp(int voice, dur val)`__       | For particular voice (arg 1), turn on sample playback, with ramp.                                                                                                                                                                                                      |
| __`void rampUp(dur val)`__                  | Turn on sample playback, with ramp (voice 0).                                                                                                                                                                                                                          |
| __`float rate(int voice, float val)`__      | For particular voice (arg 1), set playback rate                                                                                                                                                                                                                        |
| __`float rate(int voice)`__                 | For particular voice (arg 1), get playback rate                                                                                                                                                                                                                        |
| __`float rate(float val)`__                 | Set playback rate (voice 0). Note that the int/float type for this method will determine whether the rate is being set (float, for voice 0) or read (int, for voice number).                                                                                           |
| __`float rate()`__                          | Get playback rate (voice 0).                                                                                                                                                                                                                                           |
| __`dur recPos(dur val)`__                   | Set record position.                                                                                                                                                                                                                                                   |
| __`dur recPos()`__                          | Get record position.                                                                                                                                                                                                                                                   |
| __`dur recRamp(dur val)`__                  | Set ramping when recording (from 0 to loopEndRec).                                                                                                                                                                                                                     |
| __`int record(int toggle)`__                | Turn recording on and off                                                                                                                                                                                                                                              |
| __`int sync(int val)`__                     | Set input mode; (0) input is recorded to internal buffer, (1) input sets playback position [0,1] (phase value between loopStart and loopEnd for all active voices), (2) input sets playback position, interpreted as a time value in samples (only works with voice 0) |
| __`int sync()`__                            | Get input mode; (0) input is recorded to internal buffer, (1) input sets playback position [0,1] (phase value between loopStart and loopEnd for all active voices), (2) input sets playback position, interpreted as a time value in samples (only works with voice 0) |
| __`int track(int val)`__                    | Identical to sync.                                                                                                                                                                                                                                                     |
| __`int track()`__                           | Identical to sync.                                                                                                                                                                                                                                                     |
| __`dur value(int voice, dur val)`__         | For particular voice (arg 1), get value from the voice.                                                                                                                                                                                                                |
| __`dur value(dur val)`__                    | Get value from voice 0.                                                                                                                                                                                                                                                |
| __`float valueAt(float val, dur index)`__   | Set value directly in record buffer.                                                                                                                                                                                                                                   |
| __`float valueAt(dur index)`__              | Get value directly from record buffer.                                                                                                                                                                                                                                 |
| __`float voiceGain(int voice, float val)`__ | For particular voice (arg 1), set gain.                                                                                                                                                                                                                                |
| __`float voiceGain(int voice)`__            | Set playback gain (voice 0).                                                                                                                                                                                                                                           |
| __`float voicePan(int voice, float val)`__  | For particular voice (arg 1), set panning value [0.0, number of channels - 1.0].                                                                                                                                                                                       |
| __`float voicePan(int voice)`__             | For particular voice (arg 1), get panning value.                                                                                                                                                                                                                       |

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
