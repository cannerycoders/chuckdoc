${PROGHEADER}

<center>

## ChucK Chugins (UGen plugins)

[^ programmer's guide](./index.md) | [std classes](./classes_std.md) | [basic ugen](./ugen_basic.md)

<!-- nb: extra eol spaces on some lines cause <br/> -->

[ABSaturator](#absaturator) |
[AmbPan3](#ambpan3) |
[Bitcrusher](#bitcrusher) |
[Elliptic](#elliptic) |
[ExpDelay](#expdelay) |
[ExpEnv](#expenv) |
Faust |
[FIR](#elliptic) |
[FluidSynth](#fluidsynth) |
[FoldbackSaturator](#foldbacksaturator) |
[GVerb](#gverb) |
[KasFilter](#kasfilter) |
Ladspa |
[MagicSine](#magicsine) |
[Mesh2D](#mesh2d) |
[Multicomb](#multicomb) |
MIAP |
[NHHall](#nhhall) |
[Overdrive](#overdrive) |
[PanN](#pann) |
[Perlin](#perlin) |
[PitchTrack](#pitchtrack) |
[PowerADSR](#poweradsr) |
[Random](#random) |
[Sigmund](#sigmund) |
[Spectacle](#spectacle) |
[Wavetable](#wavetable) |
[WinFuncEnv](#winfuncenv) |
[WPDiodeLadder](#wpdiodeladder) |
[WPKorg35](#wpkorg35)

</center>

--------------------------------------------------------------------------------

#### ABSaturator

__`ABSaturator`__ implements soft clip saturating distortion, based on examples 
from Abel/Berners' Music 424 course at Stanford. 

| ABSaturator.functions                       | Description                                                                                                                                                                           |
| :------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| __`float dcOffset(), dcOffset(float arg)`__ | Get/set constant linear offset applied to the signal. A small offset will introduce odd harmonics into the distoration spectrum, whereas a zero offset will have only even harmonics. |
| __`float drive(), drive(float arg)`__       | Get/set nput gain into the distortion section, in decibels. Controls overall amount of distortion.                                                                                    |

see [test.ck](../examples.chugins/ABSaturator/test.ck)

--------------------------------------------------------------------------------
#### AmbPan3

__`AmbPan3`__ implements a 3d spatialization that characterizes
source location by its `elevation` and `azimuth` angles.

| AmbPan3.functions                             | Description                                       |
| :-------------------------------------------- | :------------------------------------------------ |
| __`float azimuth(), azimuth(float arg)`__     | The left/right turn angle                         |
| __`float elevation(), elevation(float arg)`__ | The up/town tilt angle                            |
| __`void channelMap(int[] arg)`__              | a map of the auditory sphere onto channel numbers |

see [test.ck](../examples.chugins/AmbPan/test.ck),
[test.ck](../examples.chugins/AmbPan/ccrma.ck),

--------------------------------------------------------------------------------
#### Bitcrusher

| Bitcrusher.functions                                    | Description                  |
| :------------------------------------------------------ | :--------------------------- |
| __`int bits(), bits(int arg)`__                         | get/set the bits to crush to |
| __`int downsampleFactor(), downsampleFactor(int arg)`__ | get/set                      |

see [test.ck](../examples.chugins/Bitcrusher/test.ck)

--------------------------------------------------------------------------------
#### Elliptic

Elliptic implements cascaded IIR filters and a built-in elliptical filter 
design. It is capable of low-pass, high-pass, or bandpass filtering with 
very steep slopes. The atten determines how much of the signal is attenuated 
outside the passband.

Elliptic filters come with a trade-off for their steep slopes: they have 
a certain amount of ripple outside the passbands. A very small 
ripple (0.1 or 0.2 dB) produces very little ringing, whereas a large 
ripple (eg. 20 dB) produces a very strong harmonic ring.
                                                       
The filter design algorithm sometimes can't fulfill the design criteria 
-- a particular combination of cutoff frequencies, ripple, and attenuation. 
If that happens, the user is warned that the filter is not initialized,
and the filter is bypassed. This may happen, for instance, if you ask 
for a very steep attenuation with very low ripple.

Before using the filter, you must initialize it as a low-pass (lpf), 
high-pass (hpf), or band-pass filter and designate the passband and 
stopband frequencies.

| Elliptic.functions                              | Description                                                                |
| :---------------------------------------------- | :------------------------------------------------------------------------- |
| void lpf(float pass, float stop)                | init as a lowpass filter                                                   |
| void hpf(float stop, float pass)                | init as a highpass filter                                                  |
| void bpf(float lower, float upper, float stop ) | init as a bandpass filter (usually these parameters are ascending values.) |
| float atten(), atten(float):                    | get/set filter attenuation in dB. Default 90.0                             |
| float ripple(), ripple(float):                  | get/set filter ripple in dB. Default 0.2                                   |
| int bypass(), bypass(int)                       | get/set bypass switch: on or off. Default 0                                |

see [test.ck](../examples.chugins/Elliptic/test.ck)

--------------------------------------------------------------------------------
#### ExpDelay

__`ExpDelay`__ - Feedback delay at exponentially changing delay times.

by Joel Matthys 2014, GPL 2.0

| ExpDelay.functions                      | Description                                                                                                          |
| :-------------------------------------- | :------------------------------------------------------------------------------------------------------------------- |
| __`float mix(), mix(float)`__           | get/set dry/wet mix [0-1]                                                                                            |
| __`dur max(), max(dur)`__               | maximum possible delay duration                                                                                      |
| __`dur delay(), delay(dur)`__           | duration of delay                                                                                                    |
| __`int reps(), reps(int)`__             | number of repetitions                                                                                                |
| __`float durcurve(), durcurve(float)`__ | set steepness of delay curve,  1 = steady       <1 = starts fast and slows down       >1 = starts slow and speeds up |
| __`float ampcurve(), ampcurve(float)`__ | set steepness of amplitude decay                                                                                     |

see [test.ck](../examples.chugins/ExpDelay/test.ck)

--------------------------------------------------------------------------------
#### ExpEnv

__`ExpEnv`__ -  Simple Decaying Exponential Envelope Unit Generator.

Simple single time constant exponential decay, applied to any
signal passed through it.  Obeys:  value, T60, radius, and keyOn
Especially useful for Modal synthesis.  One of these for each mode:
`SinOsc s => ExpEnv e => dac;`

Also useful for noise excitation pulse, using it like:
Noise n => ExpEnv e => dac;

Copyright (c) 2015 Perry R. Cook. GPL 2.0

| ExpEnv.functions                    | Description                    |
| :---------------------------------- | :----------------------------- |
| __`float radius(), radius(float)`__ | get/set radius [0, 1] directly |
| __`dur T60(), T60(dur)`__           | get/set T60 radius indirectly  |
| __`void keyOn(int)`__               | trigger                        |

see [test.ck](../examples.chugins/ExpEnv/test.ck)

--------------------------------------------------------------------------------
#### FIR

__`FIR`__ Finite Impulse Reponse Filter plugin

by Perry R. Cook  
Version 1.0  
October 2012  

| FIR.functions                             | Description                        |
| :---------------------------------------- | :--------------------------------- |
| __`int bpHetero(), bpHetero(float arg)`__ | set bandpass                       |
| __`float coeff(int arg, float arg2)`__    | set filter coefficients directly   |
| __`float coeff(int arg)`__                |
| __`int gaussian(float arg)`__             | set filter coefficients indirectly |
| __`int order(), order(int arg)`__         | get/set order                      |
| __`int sinc(float arg)`__                 | set filter coefficients indirectly |

see [FIRConvolve.ck](../examples.chugins/FIR/FIRConvolve.ck),
[FIRConvolveHomer.ck](../examples.chugins/FIR/FIRConvolveHomer.ck),
[FIRConvolve.ck](../examples.chugins/FIR/FIRConvolve.ck),
[FIRFOFTest.ck](../examples.chugins/FIR/FIRFOFTest.ck),
[FIRGaussImpulseTests.ck](../examples.chugins/FIR/FIRGaussImpulseTests.ck),
[FIRSincBPSweepTest.ck](../examples.chugins/FIR/FIRSincBPSweepTest.ck),
[FIRSincExplicit.ck](../examples.chugins/FIR/FIRSincSincExplicit.ck),
[FIRSincImplicit.ck](../examples.chugins/FIR/FIRSincSincImplicit.ck),
[FIRSincTests.ck](../examples.chugins/FIR/FIRSincSincTests.ck),
[GreyholeDownUpDecimateDemo.ck](../examples.chugins/FIR/GreyholeDownUpDecimateDemo.ck),


--------------------------------------------------------------------------------
#### FluidSynth

__`FluidSynth`__ chugin bridge to the open-source [FluidSynth](https://github.com/FluidSynth/fluidsynth) 
synthesizer that implements [_sound font_](https://github.com/FluidSynth/fluidsynth/wiki/SoundFont) 
support.  This chugin will only work if you've got fluidsynth installed.

| FluidSynth.functions                                                        | Description                                                                                      |
| :-------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------- |
| __`void open(string)`__                                                     | opens a sound font 2 file                                                                        |
| __`void noteOn(int midiNote, int midiVelocity)`__                           | play a note on the current program                                                               |
| __`void noteOff(int midiNote)`__                                            | release a note                                                                                   |
| __`void noteOnChannel(int midiNote, int midiVelocity)`__                    | play a note on the current program                                                               |
| __`void noteOffChannel(int midiNote)`__                                     | release a note                                                                                   |
| __`void progChange(int p), progChange(int p, int ch)`__                     | select a _program_ from the current sf2 and associated with a midi channel indexed starting at 0 |
| __`void setBank(int bank), setBank(int bank, int ch)`__                     | select a synth bank                                                                              |
| __`void setPitchBend(int bend), setPitchBend(int, int ch)`__                | set the current pitch bend                                                                       |
| __`int getPitchBend(), getPitchBend(int ch)`__                              | get the current pitch bend                                                                       |
| __`void resetPitchBend(), resetPitchBend(int ch)`__                         |                                                                                                  |
| __`void setTuning(float []), setTuning(float [], int ch`__                  | activate key tuning                                                                              |
| __`void setOctaveTuning(float []), setOctaveTuning(float [], int ch`__      | activate key tuning                                                                              |
| __`void resetTuning(), resetTuning(int ch)`__                               |
| __`void tuneNote(int noteNum, float pitch), tuneNote(int, float, int ch)`__ |
| __`void tuneNotes(int noteNums[], float pitches[], int ch)`__               |
| _inherited from UGen_                                                       |
| __`float gain(), gain(float)`__                                             | get/set current gain                                                                             |


see [test.ck](../examples.chugins/fluidsynth/test.ck),
[pitchbend.ck](../examples.chugins/fluidsynth/pitchbend.ck),
[play.ck](../examples.chugins/fluidsynth/play.ck),
[tuning.ck](../examples.chugins/fluidsynth/tuning.ck)

--------------------------------------------------------------------------------
#### FoldbackSaturator

__`FoldbackSaturator`__ is a distortion which "folds back" a signal as it passes 
a (positive and negative) threshold. This implementation also includes an 
index, which the signal is multiplied by as it passes the threshold, for a 
more intense effect.

| FoldbackSaturator.functions                   | Description                                                                                                                                   |
| :-------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------- |
| __`float makeupGain(), makeupGain(float g)`__ | Get/set the amount of makeup gain applied to the signal after processing, multiplied against the reciprocal of the threshold. Defaults to 1.0 |
| __`float threshold(), threshold(float t)`__   | Get/set The threshold (positive and negative) that the signal is inverted against as it is passed. Defaults to 0.6                            |
| __`float index(), index(float t)`__           | Get/set The index that the signal is multiplied by after it is inverted against the threshold. Defaults to 2.0                                |

see [test-index.ck](../examples.chugins/FoldbackSaturator/test-index.ck),
[test-threshold.ck](../examples.chugins/FoldbackSaturator/test-threshold.ck),

--------------------------------------------------------------------------------
#### GVerb

__`GVerb`__ is s a very smooth reverberator with the ability to produce very 
long reverb times.

GVERB is based on the original "gverb/gigaverb" by Juhana Sadeharju
(kouhia at nic.funet.fi). The code for this version was adapted from
RTcmix (http://rtcmix.org), which in turn adapted it from the Max/MSP
version by Olaf Mtthes (olaf.matthes at gmx.de).

| GVerb.functions                                     | Description                                     |
| :-------------------------------------------------- | :---------------------------------------------- |
| __`float roomsize(), roomsize(float)`__             | get/set room size [1.0 - 300.0], default 30.0   |
| __`dur revtime(), revtime(dur)`__                   | get/set revert time dur, default .5:second      |
| __`float damping(), damping(float)`__               | get/set damping [0.0 - 1.0], default 0.0        |
| __`float spread(), spread(float)`__                 | get/set spread default 15.0                     |
| __`float inputbandwidth(), inputbandwidth(float)`__ | get/set inputbandwidth [0.0 - 1.0], default 0.5 |
| __`float dry(), dry(float)`__                       | get/set dry [0.0 - 1.0], default 0.6            |
| __`float early() early(float)`__                    | get/set early [0.0 - 1.0], default 0.4          |
| __`float tail() tail(float)`__                      | get/set early [0.0 - 1.0], default 0.5          |

see [test.ck](../examples.chugins/GVerb/test.ck)

--------------------------------------------------------------------------------
#### KasFilter

__`KasFilter`__  implements an under-sampling-based resonant lowpass filter.

by Kassen

| KasFilter.functions                       | Description                                                                                                                                                                |
| :---------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| __`float freq(), freq(float)`__           | get/set the cutoff frequency. This sets both the frequency at which the 2 sample&holds sample the input signal and the frequency of the sine that crossfades between them. |
| __`float resonance(), resonance(float)`__ | get/set the resonance, which is implemented as negative feedback. accepts values between 0 and 0.95                                                                        |
| __` float accent(), accent(float)         | get/set the amount of waveshaping on the crossfading sine. Ranges from 0 to 1, where 1 is close to regular under-sampling (if no resonance is used).                       |

see [test.ck](../examples.chugins/KasFilter/test.ck),
    [readme.ck](../examples.chugins/KasFilter/readme.ck)

--------------------------------------------------------------------------------
#### MagicSine

__`MagicSine`__ implements efficient sine oscillator using the iterative 
"magic circle" algorithm, at the expense of not being able to set the phase 
(for now at least). Uses 4 multiplies + 2 adds per sample. 
 
MagicSine is about 25% faster when running a fixed freq sine wave, so its 
main use is when you need a lot of sine waves and are hitting a performance
bottleneck. 

By Spencer Salazar (GPL 2)

| MagicSine.functions             | Description                      |
| :------------------------------ | :------------------------------- |
| __`float freq(), freq(float)`__ | set the oscillartor frequency */ |

see [test.ck](../examples.chugins/MagicSine/test.ck)

--------------------------------------------------------------------------------
#### Mesh2D

__`Mesh2d`__  is a two-dimensional rectilinear waveguide mesh class. 

Part of the [Synthesis Toolkit in C++](https://ccrma.stanford.edu/software/stk/),
this chugin implements a rectilinear, two-dimensional digital waveguide
mesh structure. For details, see Van Duyne and Smith, "Physical Modeling 
with the 2-D Digital Waveguide Mesh", Proceedings of the 1993 International Computer Music Conference.
This is a digital waveguide model, making its use possibly subject to patents held 
by Stanford University, Yamaha, and others.   

| Mesh2D.functions                  | Description                                                |
| :-------------------------------- | :--------------------------------------------------------- |
| __`int x(), x(int)`__             | get/set X dimension size in samples. int [2-12], default 5 |
| __`int y(), y(int)`__             | get/set Y dimension size in samples. int [2-12], default 4 |
| __`float xpos(), xpos(float)`__   | get/set x strike position. float [0-1], default 0.5        |
| __`float ypos(), ypos(float)`__   | get/set y strike position. float [0-1], default 0.5        |
| __`float decay(), decay(float)`__ | get/set decay factor. float [0-1], default 0.999           |

see [help.ck](../examples.chugins/Mesh2D/help.ck)

--------------------------------------------------------------------------------
#### Multicomb

__`Multicomb`__ Multiple simultaneous comb filters randomly chosen within a 
specified frequency range and spread across the stereo field.

| Multicomb.functions             | Description                                 |
| :------------------------------ | :------------------------------------------ |
| int num(), num(int)             | get/set number of comb filters (default 5)  |
| float minfreq(), minfreq(float) | get/set low frequency                       |
| float maxfreq(), maxfreq(float) | get/set high frequency                      |
| float set(float, float)         | set both low and high freqs                 |
| dur revtime(), revtime(dur)     | get/set total ring time (default 1::second) |

see [help.ck](../examples.chugins/Multicomb/help.ck)

--------------------------------------------------------------------------------
#### NHHall

__`NHHall`__ is an open source algorithmic reverb unit, developed by Nathan Ho 
in 2018 for SuperCollider, ChucK, and Auraglyph. 

Features:

- Allpass loop topology with delay line modulaton for a lush 90's IDM sound
- True stereo signal path with controllable spread
- Infinite hold support
- Respectable CPU use
- Sample-rate independence
- Permissive MIT license

| NHHall.functions                                    | Description              |
| :-------------------------------------------------- | :----------------------- |
| __`float rt60(), rt60float)`__                      | default 1::second        |
| __`float stereo(), stereo(float)`__                 | [0.0 - 1.0], default 0.5 |
| __`float lowFreq(), lowFreq(float)`__               | default 200              |
| __`float lowRatio(), lowRatio(float)`__             | default 0.5              |
| __`float hiFreq(), hiFreq(float)`__                 | default 4000             |
| __`float hiRatio(), hiRatio(float)`__               | default 0.5              |
| __`float earlyDiffusion(), earlyDiffusion(float)`__ | [0.0 - 1.0], default 0.5 |
| __`float lateDiffusion(), lateDiffusion(float)`__   | [0.0 - 1.0], default 0.5 |
| __`float modRate(), modRate(float)`__               | [0.0 - 1.0], default 0.2 |
| __`float modDepth(), modDepth(float)`__             | [0.0 - 1.0], default 0.3 |

see [help.ck](../examples.chugins/NHHall/help.ck)

--------------------------------------------------------------------------------
#### Overdrive

__`Overdrive`__ Simple overdrive distortion created by applying a non-linear 
transfer function to the input signal. Adapted from cyclone/overdrive~ from Pd.

| Overdrive.functions               | Description                                                                                              |
| :-------------------------------- | :------------------------------------------------------------------------------------------------------- |
| __`float drive(), drive(float)`__ | get/set the distortion amount. 1 is no distortion. > 1 simulates overdrive, 0-1 simulates underdrive (?) |

see [help.ck](../examples.chugins/Overdrive/help.ck)

--------------------------------------------------------------------------------
#### PanN

The __`PanN`__ family of chugins supports 4, 8, and 16 channel equal-power
panning. The default channel maps for each class alternate left then right,
front to back

| Pan4,Pan8,Pan16.functions   | Description                                                                          |
| :-------------------------- | :----------------------------------------------------------------------------------- |
| __`float pan(), pan(float)` | get/set pan, pan is modulo nchannels, ie: Pan4 `[0-4]`, Pan8 `[0-8]`, Pan16 `[0-16]` |
|                             |
| Pan4 channels`[0-3]`        | `[0, 1, 3, 2]`                                                                       |
| Pan8 channels`[0-7]`        | `[0, 1, 3, 5, 7, 6, 4, 2]`                                                           |
| Pan16 channels`[0-15]`      | `[0, 1, 3, 5, 7, 9, 11, 13, 15, 14, 12, 10, 8, 6, 4, 2]`                             |


see [Pan4-test.ck](../examples.chugins/PanN/Pan4-test.ck)
[Pan8-test.ck](../examples.chugins/PanN/Pan8-test.ck)

--------------------------------------------------------------------------------
#### Perlin

__`Perlin`__ produces a form of bandlimited noise, known as gradient noise and
has been used extensively in the field of Computer Graphics Imagery (CGI).
There it is often used to produce fractals though the summation of multiple
octaves of perlin noise.

| Perlin.functions                | Description                             |
| :------------------------------ | :-------------------------------------- |
| __`float freq(), freq(float)`__ | get/set the bandlimited noise frequency |

see [test.ck](../examples.chugins/Perlin/test.ck),
[wikipedia](https://en.wikipedia.org/wiki/Perlin_noise)

--------------------------------------------------------------------------------
#### PitchTrack

__`PitchTrack`__  is a monophonic autocorrelation pitch tracker with
a fast response and extremely high accuracy, even at low frequencies. It 
is adapted from [helmholtz~](http://www.katjaas.nl/helmholtz/helmholtz.html)
for `Pd` by Katja.

| PitchTrack.functions                       | Description                                                                                                                                                                                                                                                                                                                                                     |
| :----------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| __`float get()`__                          | get calculated frequency                                                                                                                                                                                                                                                                                                                                        |
| __`float fidelity(), fidelity(float)`__    | get/set fidelity[0-1], default 0.95. This is a threshold for certainty about the result. A highly periodic signal (ie one that has a strong pitch center) should produce a result with a high fidelity, which a non-periodic signal (eg noise) will have a very low fidelity. Setting this parameter close to 1 should reduce the number of inaccurate reports. |
| __`float sensitivity(), sensitivity(float) | get/set sensitivity [0-1], default 0.003. This is the minimum RMS value to trigger a pitch calculation. Setting this parameter low forces PitchTrack to attempt to find the pitch of even very quiet sounds. Higher values will cause it to trigger only on louder notes.                                                                                       |
| __`int overlap(), overlap(int)             | get/set overlap [1-?], default 2. How much to overlap successive analysis frames. Higher values should produce smoother values, at the cost of an increase of CPU load.                                                                                                                                                                                         |
| __`int frame(), frame(int)                 | get/set frame [128-?], default 2048. Size of FFT frame for analysis. Smaller values result in lower latency and high responsiveness but less accuracy. Higher values result in considerably greater CPU load. Values that aren't powers of 2 get rounded up to the next power of 2. Recommend 512, 1024, or 2048                                                |
| __`float bias(), biast(float)              | get/set bias [0-1], default 0.2. Katja's pitch tracker introduces a small bias to help with the tracking. (See the link above.) I don't know how this parameter affects the output.                                                                                                                                                                             |

see [pitchtrack-help.ck](../examples.chugins/PitchTrack/pitchtrack-help.ck),

--------------------------------------------------------------------------------
#### PowerADSR

__`PowerADSR`__ is a power based ADSR envelope that allows separate power 
curves for each envelope phase. In general, curves under 1.0 are sharp, 
while curves over 1.0 are soft. You can think of it as approximately:
`pow(linearEnvelope, curveValue)`.

| PowerADSR.functions                                | Description                                                                                          |
| :------------------------------------------------- | :--------------------------------------------------------------------------------------------------- |
| __`void set(dur a, dur d, float suslev, dur r)`__, | sets duration for attack, decay, and release phase; sets sustain level, default (0.0, 0.0, 1.0, 0.0) |
| __`dur attachTime(), attackTime(dur)`__            | get/set attackTime, duration of the attack phase (can be shortened to `attack()`).                   |
| __`dur decayTime(), decayTime(dur)`__              | get/set decayTime, duration of the decay phase (can be shortened to `decay()`).                      |
| __`float sustainLevel(), sustainLevel(float s)`__  | get/set level for the sustain phase. default 0.5                                                     |
| __`void setCurves(float ac, float dc, float rc)`__ | sets power curve for attack, decay, and release phase. default (1.0, 1.0, 1.0) (all linear)          |
| __`float attackCurve(), attackCurve(float ac)`__   | get/set power curve for the attack phase. default 1.0 (linear)                                       |
| __`float decayCurve(), decayCurve(float ac)`__     | get/set power curve for the decay phase. default 1.0 (linear)                                        |
| __`float releaseCurve(), releaseCurve(float ac)`__ | get/set power curve for the release phase. default 1.0 (linear)                                      |
| __`float value()`__                                | returns the current envelope value                                                                   |
| __`int state()`__                                  | returns the current envelop state. 0: inactive, 1: attach, 2: decay, 3: sustain, 4: release          |


see [poweradsr-help.ck](../examples.chugins/PowerADSR/poweradsr-help.ck),
[poweradsr-test.ck](../examples.chugins/PowerADSR/poweradsr-test.ck)

--------------------------------------------------------------------------------
#### Random

__`Random`__ produces random numbers that obey the gaussian (or normal) 
distribution.

| Random.functions                            | Description                                                         |
| :------------------------------------------ | :------------------------------------------------------------------ |
| __`void seed(int)`__                        | seed the random number generator                                    |
| __`float gaussian(float mean, float dev)`__ | request a new random number distributed with mean and std deviation |

see [test.ck](../examples.chugins/Random/test.ck),
[wikipedia](https://en.wikipedia.org/wiki/Normal_distribution)

--------------------------------------------------------------------------------
#### Sigmund

__`Sigmund`__ sinusoidal analysis and pitch tracking. By Miller Puckette, Ron Mayer, ...

| Sigmund.functions                       | Description                                                                                                                                                                                                                 |
| :-------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| __`int npts(), npts(int)`__             | get/set number of points used in analysis. Must be a power of 2, at least 128. The minimum frequency that can be tracked is about `2 * samplerate / npts`. default: 1024                                                    |
| __`int npeak(), npeak(int)`__           | get/set maximum number of sinusoidal peaks to look for. The computation time is quadratic in the number of peaks actually found (this number only sets an upper limit). Use it to balance CPU time with quality of results. |
| __`float maxfreq(), maxfreq(float)`__   | get/set maximum frequency of sinusoidal peaks to look for. This can be useful in situations where background nose creates high-frequency, spurious peaks...                                                                 |
| __`float minpower(), minpower(float)`__ | get/set minimum dB level to report a pitch. Signals quieter than this will be assumed to be crosstalk and ignored. default: 50                                                                                              |
| __`float freq()`__                      | get reported frequency of input signal                                                                                                                                                                                      |
| __`float env()`__                       | get reported RMS value (in dB) of input signal                                                                                                                                                                              |
| __`int peak(), peak(int)`__             | get/set report freq of nth sinusoundal peak sorting depends on parameter "dotracks"                                                                                                                                         |
| __`int amp(), amp((int)`__              | report amplitude of nth sinusoundal peak sorting depends on parameter "dotracks"                                                                                                                                            |
| __`int tracks(), tracks(int)            | toggle (0 or 1) whether peak and amp are sorted in order of amplitude or organized into tracks                                                                                                                              |
| __`void clear()`__                      | clear buffers and reset                                                                                                                                                                                                     |
| __`float param1(), param1(float)`__     | mysterious settings #1                                                                                                                                                                                                      |
| __`float param2(), param2(float)`__     | mysterious settings #2                                                                                                                                                                                                      |
| __`float param3(), param3(float)`__     | mysterious settings #3                                                                                                                                                                                                      |

see [sigmund-help.ck](../examples.chugins/Sigmund/sigmund-help.ck),
[sigmund-tracks-test.ck](../examples.chugins/Sigmund/sigmund-tracks-test.ck)

--------------------------------------------------------------------------------
#### Spectacle

SPECTACLE is an FFT-based delay instrument by John Gibson and inspired by the 
totally awesome Spektral Delay plug-in by Native Instruments. This version is 
adapted from RTcmix (rtcmix.org) by Joel Matthys (GPL 2).

| Spectacle.functions                     | Description                                                                                                        |
| :-------------------------------------- | :----------------------------------------------------------------------------------------------------------------- |
| __`float mix(), mix(float)`__           | get/set mix (0-1) of processed and unprocessed signal. default 1.0                                                 |
| __`void clear()`__                      | reset Spectacle                                                                                                    |
| __`int fftlen(), fftlen(int)`__         | get/set FFT frame size (power of 2)                                                                                |
| __`int overlap(), overlap(int)`__       | get/set frame overlap; best between 2 and 6                                                                        |
| __`dur delayMax(), delayMax(dur)`__     | get/set maximum delay time                                                                                         |
| __`dur delayMin(), delayMin(dur)`__     | get/set minimum delay time                                                                                         |
| __`float freqMax(), freqMax(float)`__   | get/set maximum frequency processed by Spectacle                                                                   |
| __`float freqMin(), freqMin(float)`__   | get/set minimum frequency processed by Spectacle                                                                   |
| __`void range (float, float) `__        | set both min and min freqs in one command                                                                          |
| __`int bands(), bands(int)`__           | get/set number of frequency bands, 1-512, default 64                                                               |
| __`dur delay(), delay(dur)`__           | get/set the same duration for all bands                                                                            |
| __`float eq(), eq(float)`__             | get/set the same EQ value for all bands (value is +/- dB)                                                          |
| __`float feedback(), feedback(float)`__ | get/set the same feedback value for all bands (-1.0 - 1.0)                                                         |
| __`void table(string, string)`__        | set delay, eq, or feedback tables to "random", "ascending", or "descending". example: `table ("delay", "random");` |

see [spectacle-help.ck](../examples.chugins/Spectacle/spectacle-help.ck),

--------------------------------------------------------------------------------
#### Wavetable

__`Wavetable`__ User-definable Wavetable with various interpolation algorithms.  By Joel Matthys, (c) 2016, GPL 2.0   

| Wavetable.functions                       | Description                                                                         |
| :---------------------------------------- | :---------------------------------------------------------------------------------- |
| __`float freq(), freq(float)`__           | get/set frequency                                                                   |
| __`int interpolate(), interpolate(int)`__ | get/set interpolation: 0: no interpolation, 1: linear, 2: cubic, 3 = Hermite        |
| __`void setTable(float[])`__              | associate a ChucK array with the Wavetable instrument                               |
| __`int sync(), sync(int)`__               | get/set sync: 0:input controls frequency, 1: input (usually Phasor) controls phase. |

By default the Wavetable instrument uses a 2048-point non-interpolating sine table. 

see [wavetable-help.ck](../examples.chugins/Wavetable/wavetable-help.ck),
[input-test.ck](../examples.chugins/Wavetable/input-test.ck),
[interpolation-test.ck](../examples.chugins/Wavetable/interpolation-test.ck)

--------------------------------------------------------------------------------
#### WinFuncEnv

__`WinFuncEnv`__ is an Attack/Release envelope built around window functions!

| WinFuncEnv.functions     | Description                                                   |
| :----------------------- | :------------------------------------------------------------ |
| __`.set (dur, dur)`__    | set duration for attack and release phase. default (0.0, 0.0) |
| __`.attackTime(dur)`__   | sets length for the attack phase. default 0.0                 |
| __`.releaseTime (dur)`__ | sets length for the release phase.  default 0.0               |

Window functions available for use as envelopes:

<!-- end-of-line spaces are intentional -->
   __`setBlackman(), setBlackman(float a)`__  
   __`setBlackmanHarris()`__.                                            
   __`setBlackmanDerivative (float a0, float a1, float a2, float a3)`__  
   __`setBlackmanNutall()`__  
   __`setExponential(), setExponential(float a)`__  
   __`setHann()`__  
   __`setHannPoisson(), setHannPoisson(float a)`__  
   __`setNutall()`__  
   __`setParzen()`__  
   __`setPoisson(), setPoisson(float a)`__  
   __`setTukey(), setTukey(float a)`__  
   __`setWelch()`__  

see [winfuncenv-help.ck](../examples.chugins/WinFuncEnv/winfuncenv-help.ck)

--------------------------------------------------------------------------------
#### WPDiodeLadder

__`WPDiodeLadder`__ is a virtual analog model of the Diode Ladder filter.
The VADiodeLadderFilter and VAOnePoleFilter are taken directly from 
Will Pirkle's applications notes, and can be found [here](http://www.willpirkle.com/Downloads/AN-6DiodeLadderFilter.pdf).
Ported by Owen Vallis 2015

From Pirkle's app note:

> The Diode Ladder Filter first appeared in the EMS VCS3 Monophonic Synth 
> designed by David Cockerell in 1969. It is (more famously) incorporated in the 
> Roland TB-303 BassLine monophonic bass synth from 1982. It is based on the 
> Moog Ladder Filter (see App Note 4) but incorporates multiple feedback paths
> between sections. The effect of the feedback paths on the signal is two-fold: 
> like the Moog Ladder, it reduces overall filter gain as the resonance increases 
> but the reduction is more extreme (by about 12dB) and secondly, as the 
> resonance increases, the resonant frequency migrates upwards, but never makes 
> it to the cutoff frequency (which does not occur in the Moog Ladder). Like the 
> Moog Ladder it also self oscillates. At the point of self-oscillation, the 
> poles (and therefore the resonant peak) will have drifted up to fc/sqrt(2).

| WPDiodeLadder.functions                     | Description                                                                                  |
| :------------------------------------------ | :------------------------------------------------------------------------------------------- |
| __`float resonance(), resonance()`__        | get/set the resonance [0-17]                                                                 |
| __`float cutoff(), cuttoff(float)`__        | get/set cutoff (Hz) [0-Nyquist]                                                              |
| __`float saturation(), saturation(float)`__ | get/set saturation. Saturation is a scalar gain, and can be used to drive the non-linearity. |
| __`int nonlinear(), nonlinear(int)`__       | get/set nonlinear [0,1] 1 enables thel inear saturator.                                      |
| __`int nlp_type(), nlp_type(int)`__         | get/set nlp_type [0,1] 1 normalizes non-linear output.                                       |

see [WPDiodeLadder-test.ck](../examples.chugins/WPDiodeLadder/WPDiodeLadder-test.ck)

--------------------------------------------------------------------------------
#### WPKorg35

__`WPKorg35`__ is a virtual analog model of the Korg 35 LP filter.
The KorgThreeFiveLPF and VAOnePoleFilter are taken directly from Will 
Pirkle's applications notes, and can be found 
[here](http://www.willpirkle.com/Downloads/AN-5Korg35_V3.pdf). Ported by Owen Vallis 2015

From Pirkle's app note:

> The Korg35 lowpass filter is found in the Korg MS-10 and early MS-20 
> synthesizers. It is currently incorporated in the new Korg Monotron 
> synth. Variations are also found in other Korg products. The Monotron 
> version differs slightly in components but is otherwise faithful to 
> the originalʼs functionality. The Korg35 lowpass filter is a 2nd order 
> resonant lowpass type. Unlike its contemporaries of the time (the Moog 
> Ladder and Diode Ladder filters) it does not reduce overall gain as 
> the resonance is increased. Because of this it is often overlooked. 
> However the skyrocketing popularity of the MS-20 (and new MS-20 Mini) 
> as well as the Monotron make it worth investigating. Indeed there is 
> more than meets the eye with this filter. It can not be implemented 
> using the standard BZT -> Biquad design. The reason is that the Korg35 
> is capable of self-oscillation - this is what makes it attractive as 
> a synth filter as well as for study.

| WPKorg35.functions                          | Description                                                                                  |
| :------------------------------------------ | :------------------------------------------------------------------------------------------- |
| __`float resonance(), resonance()`__        | get/set the resonance [0-2]                                                                  |
| __`float cutoff(), cuttoff(float)`__        | get/set cutoff (Hz) [0-Nyquist]                                                              |
| __`float saturation(), saturation(float)`__ | get/set saturation. Saturation is a scalar gain, and can be used to drive the non-linearity. |
| __`int nonlinear(), nonlinear(int)`__       | get/set nonlinear [0,1] 1 enables thel inear saturator.                                      |

see [WPKorg35-test.ck](../examples.chugins/WPKorg35/WPKorg35-test.ck)

${PROGFOOTER}