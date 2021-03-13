${PROGHEADER}

<center>

[^ programmer's guide](./index.md) | [std classes](./classes_std.md) | [std uana](./uana.md)

## ChucK basic unit generators

<!-- nb: extra eol spaces on some lines cause <br/> -->
[UGen](#ugen) |
[UGenStereo](#ugenstereo) |
[UGenMulti](#ugenmulti) |
[Mix2](#mix2) |
[Pan2](#pan2)  
[dac](#dac) |
[adc](#adc) |
[blackhole](#blackhole)  
[Gain](#gain) |
[Impulse](#impulse) |
[Step](#step) |
[Noise](#noise)  
[Osc](#osc) |
[Phasor](#phasor) |
[SinOsc](#sinosc) |
[TriOsc](#triosc) |
[SawOsc](#sawosc) |
[SqrOsc](#sqrosc) |
[PulseOsc](pulseosc)  
[SndBuf](#sndbuf) |
[SndBuf2](#sndbuf2)  
[HalfRect](#halfrect) |
[FullRect](#fullrect)  
[Chugraph](#chugraph) |
[Chugen](#chugen)

</center>

--------------------------------------------------------------------------------

### foundation


#### UGen

__UGen__ is the base class for all unit generator types in ChucK. There is no 
value in instantiating a member of this class.

| UGen.functions                      | Description                                                                                                                                                                                                                                                                      |
| :---------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| __`UGen chan(int num)`__            | Return channel at specified index.                                                                                                                                                                                                                                               |
| __`int channels(int num)`__         | Set number of channels. (Not currently supported.)                                                                                                                                                                                                                               |
| __`int channels()`__                | Return number of channels.                                                                                                                                                                                                                                                       |
| __`float gain(float val)`__         | Set the gain of the ugen.                                                                                                                                                                                                                                                        |
| __`float gain()`__                  | Return the gain of the ugen.                                                                                                                                                                                                                                                     |
| __`int isConnectedTo(UGen right)`__ | Return true if this ugen's output is connected to the input of the argument. Return false otherwise.                                                                                                                                                                             |
| __`float last()`__                  | Return the last sample value of the unit generator.                                                                                                                                                                                                                              |
| __`int op(int val)`__               | Set the ugen's operation mode. Accepted values are: 1 (sum inputs), 2 (take difference between first input and subsequent inputs), 3 (multiply inputs), 4 (divide first input by subsequent inputs), 0 (do not synthesize audio, output 0) or -1 (passthrough inputs to output). |
| __`int op()`__                      | Return the ugen's operation mode.                                                                                                                                                                                                                                                |


#### UGenMulti

__UGenMulti__ is a subclass of [UGen](#ugen) and the base class for 
multi-channel unit generators.

| UGenMulti.functions        | Description                                                                                             |
| :------------------------- | :------------------------------------------------------------------------------------------------------ |
| _see [UGen](#ugen)_        |                                                                                                         |
| __`UGen chan(int which)`__ | Returns the ugen representing a specific channel of this ugen, or null if no such channel is available. |


#### UGenStereo

__UGenStereo__ is subclass of [UGenMulti](#ugenmulti) and the baseclass for stereo unit generators.

| UGenStereo.functions              | Description                                                                                                            |
| :-------------------------------- | :--------------------------------------------------------------------------------------------------------------------- |
| _see [UGenMulti](#ugenmulti)_     |                                                                                                                        |
| __`UGen left()`__                 | Left channel (same as `chan(0)`).                                                                                      |
| __`UGen right()`__                | Right channel (same as `chan(1)`).                                                                                     |
| __`float pan(), pan(float val)`__ | Get/set panning between left and right channels, in range [-1,1], with -1 being far-left, 1 far-right, and 0 centered. |


#### Pan2

__Pan2__ is a subclass of [UGenStereo](#ugenstereo) and is used
to spread a mono signal to stereo.

| Pan2.functions                            |
| :---------------------------------------- |
| _see [UGenStereo](#ugenstereo)_           |
| see [moe2.ck](../examples/stereo/moe2.ck) |

#### Mix2

__Mix2__ is a subclass of [UGenStereo](#ugenstereo) and is used
to mix stereo input down to mono channel.

| Mix2.functions                  |
| :------------------------------ |
| _see [UGenStereo](#ugenstereo)_ |

#### dac

__`dac`__ is a subclass of [UGen](#ugen) and represents the
digital-to-analog converter - abstraction for underlying audio 
__output__ device.

| dac.functions          | Description                              |
| :--------------------- | :--------------------------------------- |
| _see [UGen](#ugen)_    |                                          |
| __`UGen left()`__      | input to left channel                    |
| __`UGen right()`__     | input to right channel                   |
| __`UGen chan(int n)`__ | returns nth channel (from [UGen](#ugen)) |

#### adc

__`adc`__  analog-to-digital converter - abstraction for underlying 
audio __input__ device

| adc.functions          | Description                              |
| :--------------------- | :--------------------------------------- |
| _see of [UGen](#ugen)_ |                                          |
| __`UGen left()`__      | output of left channel                   |
| __`UGen right()`__     | output to right channel                  |
| __`UGen chan(int n)`__ | returns nth channel (from [UGen](#ugen)) |

#### blackhole

__`blackhole`__  sample rate sample sucker (like dac, ticks ugens, 
but no more).

| blackhole.functions                  |
| :----------------------------------- |
| _see of [UGen](#ugen)_               |
| see [fm.ck](../examples/basic/fm.ck) |

#### Gain

 __`Gain`__  gain control to add N outputs together and scale them. 
 NOTE - all unit generators can themselves change their own gain.

| Gain.functions                                 | Description                  |
| :--------------------------------------------- | :--------------------------- |
| _see [UGen](#ugen)_                            |                              | 0 |
| __`float gain(float val)`__                    | Set the gain of the ugen.    |
| __`float gain()`__                             | Return the gain of the ugen. |
|                                                |
| see [i-robot.ck](../examples/basic/i-robot.ck) |

```chuck
Noise n => Gain g => dac;
SinOsc s => g;
.3 => g.gain;
while( true ) { 100::ms => now; }
```

-------------------------------------------------------------------------------

### wave forms

#### Impulse

__`Impulse`__  pulse generator - can set the value of the current sample. 
The default for each sample is 0 if not set.

| Impulse.functions          | Description                                                                                                                                                                                                                                                                                                                           |
| :------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| _see [Ugen](#ugen)_        |                                                                                                                                                                                                                                                                                                                                       |
| __`float next(float next)` | Value of next sample to be generated. (Note: if you are using the UGen.last method to read the output of the impulse, the value set by Impulse.next does not appear as the output until after the next sample boundary. In this case, there is a consistent 1::samp offset between setting .next and reading that value using .last.) |
| __`float next()`           | Value of next sample to be generated.                                                                                                                                                                                                                                                                                                 |

```chuck
Impulse i => dac;
while( true ) {
    1.0 => i.next;
    100::ms => now;
}
```

#### Step

 __`Step`__  step generator - like Impulse, but once a value is set, it is 
 held for all following samples, until value is set again .

| Step.functions                             | Description              |
| :----------------------------------------- | ------------------------ |
| _subclass of [Ugen](#ugen)_                |                          |
| __`float next(float s), float next()`__    | Set/read the step value. |
|                                            |                          |
| see : [step.ck](../examples/basic/step.ck) |                          |

```chuck
 -1.0 => float amp;
 // square wave using Step
 while( true ) {
     -amp => amp => s.next;
     800::samp => now;
 }
```

#### Noise

 __`Noise`__  white noise generator                                                     |

| Noise.functions                                                                      |
| :----------------------------------------------------------------------------------- |
| _see [Ugen](#ugen)_                                                                  |  |
|                                                                                      |
| see [wind.ck](../examples/basic/wind.ck), [powerup.ck](../examples/shred/powerup.ck) |

### oscillators

----------------------------------------------------------------------------

#### Osc

__`Osc`__ base class for simple oscillator ugens.

| Osc.functions                           | Description                                                                                                                              |
| :-------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------- |
| __`float freq(), freq(float hz)`__      | Get/set frequency of oscillator in Hertz (cycles per second).                                                                            |
| __`dur period(), period(dur value)`__   | Get/set period of oscillator (inverse of frequency).                                                                                     |
| __`float phase(), phase(float phase)`__ | Get/set oscillator phase, in range [0,1).                                                                                                |
| __`float sfreq(float hz)`__             |                                                                                                                                          |
| __`int sync(), sync(int type)`__        | Get/set ode for input (if any). 0: sync frequency to input, 1: sync phase to input, 2: frequency modulation (add input to set frequency) |

#### Phasor

 __`Phasor`__ simple ramp generator (0 to 1). Can be used for phase control.               |

| Phasor.functions                    | Description                                           |
| :---------------------------------- | :---------------------------------------------------- |
| _see [Osc](#osc)_                   |                                                       |
| __`float width(), width(float w)`__ | Set duration of the ramp in each cycle. (default 1.0) |

#### SinOsc

 __`SinOsc`__  sine oscillator.

| SinOsc.functions                            |
| :------------------------------------------ |
| _ see [Osc](#osc)_                          |
|                                             |
| see: [whirl.ck](../examples/basic/whirl.ck) |

#### TriOsc

 __`TriOsc`__  a triangle wave oscillator.                                                       

| TriOsc.functions                  | Description                                                           |
| :-------------------------------- | --------------------------------------------------------------------- |
| _see [Osc](#osc)_                 |                                                                       |
| __`float width(), width(float)`__ | Get/set width of the triangle wave (ratio of rise time to fall time). |

#### SawOsc

 __`SawOsc`__  a sawtooth wave oscillator.

| SawOsc.functions                  | Description                                                            |
| :-------------------------------- | ---------------------------------------------------------------------- |
| _see [Osc](#osc)_                 |                                                                        |
| __`float width(), width(float)`__ | Get/set whether falling sawtooth wave (0) or rising sawtooth wave (1). |

#### SqrOsc

 __`SqrOsc`__  a square wave oscillator (pulse with fixed width of .5).

| SqrOsc.functions    | Description |
| :------------------ | ----------- |
| _see [Osc](#osc)_   |             |
| __`float width()`__ | returns .5  |

#### PulseOsc

 __`PulseOsc`__  a pulse wave oscillator with variable width.           

| PulseOsc.functions                  | Description                        |
| :---------------------------------- | ---------------------------------- |
| _subclass of [Osc](#osc)_           |                                    |
| __`float width(), width(float w)`__ | Get/set length of duty cycle (0-1) |

----------------------------------------------------------------------------

### sound files

#### SndBuf

 __`SndBuf`__  Interpolating sound buffer with single-channel output. 
 Reads from a variety of uncompressed formats.

| SndBuf.functions                              | Description                                                                                                                     |
| :-------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| _see [Ugen](#ugen)_                           |
| __`int channel(), channel(int channel)`__     | Get/set channel if the sound file contains more than one channel of audio, select which channel to play.                        |
| __`int channels()`__                          | Number of channels available in the sound file.                                                                                 |
| __`int chunks(), chunks(int frames)`__        | Get/set chunk size, in frames, for loading the file from disk. Set to 0 to disable chunking.                                    |
| __`float freq(), freq(float freq)`__          | Get/set loop rate (in file loops per second).                                                                                   |
| __`int interp(int interp)`__                  | Get/set interpolation mode. 0: drop sample, 1: linear interpolation, 2: sinc interpolation                                      |
| __`dur length()`__                            | Get total length of the file.                                                                                                   |
| __`int loop(), loop(int loop)`__              | Get/set toggle for looping file playback.                                                                                       |
| __`float phase(), phase(float phase)`__       | Get/set phase position, normalized to [0,1).                                                                                    |
| __`float phaseOffset(float value)`__          | Advance the playhead by the specified phase offset in [0,1), where 0 is no advance and 1 advance the entire length of the file. |
| __`float play(), play(float play)`__          | Same as `rate()`.                                                                                                               |
| __`int pos(), pos(int pos)`__                 | Get/set position (between 0 and number of samples).                                                                             |
| __`float rate(), rate(float rate)`__          | Get/set playback rate (relative to file's natural speed). For example, 0.5 is half speed and 2 is twice as fast.                |
| __`string read(string read)`__                | Load file for reading.                                                                                                          |
| __`int samples()`__                           | Total number of sample frames in the file.                                                                                      |
| __`float valueAt(int pos)`__                  | Sample value at given position (in samples).                                                                                    |
| __`string write(string read)`__               | Set file for writing (currently unsupported).                                                                                   |
|                                               |
| see: [sndbuf.ck](../examples/basic/sndbuf.ck) |                                                                                                                                 |

#### SndBuf2

__`SndBuf2`__  Interpolating sound buffer with two-channel output. Reads 
from a variety of uncompressed formats.

| SndBuf2.functions               |
| :------------------------------ |
| _subclass of [SndBuf](#sndbuf)_ |

-------------------------------------------------------------------------------

### basic signal processing

#### HalfRect

__`HalfRect`__  half wave rectifier.

| HalfRect.functions  |
| :------------------ |
| _see [UGen](#ugen)_ |

#### FullRect

__`FullRect`__  full wave rectifier.

| FullRect.functions  |
| :------------------ |
| _see [UGen](#ugen)_ |

#### ZeroX

 __`ZeroX`__  zero crossing detector. Emits a single pulse at the the zero 
 crossing in the direction of the zero crossing. NB: there is also a
 [ZeroX UAna](uana.md#zerox).

| ZeroX.functions                            |
| :----------------------------------------- |
| _see [UGen](#ugen)_                        |
|                                            |
| see [zerox.ck](../examples/basic/zerox.ck) |


-------------------------------------------------------------------------------

### extending

#### Chugraph

 __`Chugraph`__  Base class for chugraph-based user unit generators.

| Chugraph.functions                               | Description                                  |
| :------------------------------------------------ | -------------------------------------------- |
| _see [UGen](#ugen)_                               |                                              |
| __UGen inlet(), inlet(UGen)__                     | Terminal for sources chucked into this ugen. |
| __UGen outlet(), outlet(UGen)__                   | Terminal for the output of this ugen.        |
|                                                   |                                              |
| see [chugraph.ck](../examples/extend/chugraph.ck) |                                              |

#### Chugen

 __`Chugen`__ Base class for chugen-based user unit generators. 

| Chugen.functions                              |
| :-------------------------------------------- |
| _see [UGen](#ugen)_                           |
|                                               |
| see [chugen.ck](../examples/extend/chugen.ck) |
