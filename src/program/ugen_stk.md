${PROGHEADER}

<center>

[^ programmer's guide](./index.md) | [std libraries](./classes_std.md) | [std uana](./uana.md)

</center>


<center>

## ChucK Synthesis Toolkit (STK)

[instruments](#stkinstruments) | 
[fm synths](#stkfmsynths) |
[envelopes](#stkenvelopes)  
[delay](#stkdelay) | 
[reverbs](#stkreverbs) | 
[components](#stkcomponents)  
[file i/o](#stkfileio)

</center>

### stk - instruments

-------------------------------------------------------------------------------

#### StkInstrument

__`StkInstrument`__ Base class for STK instruments.

| StkInstrument.functions                           | Description                                                                         |
| :------------------------------------------------ | :---------------------------------------------------------------------------------- |
| __`void noteOn(float velocity)`__                 | trigger note on                                                                     |
| __`void noteOff(loat velocity)`__                 | trigger note off                                                                    |
| __`float freq(), freq(float v)`__                 | set/get frequency (Hz)                                                              |
| __`void controlChange(int number, float value)`__ | assert control change - numbers are instrument specific, value range: [0.0 - 128.0] |


#### BandedWG

__`BandedWG`__ Banded waveguide modeling class. This class uses banded 
waveguide techniques to model a variety of sounds, including bowed
bars, glasses, and bowls.  For more information, see `Essl, G. and Cook, P. "Banded
Waveguides: Towards Physical Modelling of Bar Percussion Instruments`, 
Proceedings of the 1999 International Computer Music Conference.

Control Change Numbers: 

* Bow Pressure = 2
* Bow Motion = 4
* Strike Position = 8 (not implemented)
* Vibrato Frequency = 11
* Gain = 1
* Bow Velocity = 128
* Set Striking = 64
* Instrument Presets = 16
    * Uniform Bar = 0
    * Tuned Bar = 1
    * Glass Harmonica = 2
    * Tibetan Bowl = 3

by Georg Essl, 1999 - 2002. 
Modified for Stk 4.0 by Gary Scavone. 

| BandedWG.functions                                            | Description                                                                         |
| :------------------------------------------------------------ | :---------------------------------------------------------------------------------- |
| __`float bowPressure(), bowPressure(float)`__                 | get/set bow pressure [0.0 - 1.0]                                                    |
| __`float bowMotion(), bowMotion(float)`__                     | get/set bow motion [0.0 - 1.0]                                                      |
| __`float bowRate(), bowRate(float)`__                         | get/set bow attack rate (sec)                                                       |
| __`float strikePosition(), strikePosition(float)`__           | get/set strike position [0.0 - 1.0]                                                 |
| __`float vibratoFreq(), vibratoFreq(float)`__ | get/set vibrato frequency                                     |
| __`float modesGain(), modesGain(float)`__                     | get/set amplitude for modes [0.0 - 1.0]                                             |
| __`int preset(), preset(int)`__                               | get/set instrument presets (0 - 3, see above)                                       |
| __`void pluck(float)`__                                       | set pluck instrument [0.0 - 1.0]                                                    |
| __`void startBowing(float)`__                                 | set start bowing [0.0 - 1.0]                                                        |
| __`void stopBowing(float)`__                                  | set stop bowing [0.0 - 1.0]                                                         |
| _inherited from StkInstrument_:                               |
| __`void noteOn(float velocity)`__                             | trigger note on                                                                     |
| __`void noteOff(loat velocity)`__                             | trigger note off                                                                    |
| __`float freq(), freq(float v)`__                             | set/get frequency (Hz)                                                              |
| __`void controlChange(int number, float value)`__             | assert control change - numbers are instrument specific, value range: [0.0 - 128.0] |

see [band-o-matics.ck](../examples/stk/band-o-matic.ck)
[bandedwg.ck](../examples/stk/bandedwg.ck)
[bandedwg2.ck](../examples/stk/bandedwg2.ck)

#### BlowBotl

__`BlowBotl`__  STK blown bottle instrument class. This class implements 
a helmholtz resonator (biquad filter) with a polynomial jet excitation 
(a la Cook).

Control Change Numbers: 

* Noise Gain = 4
* Vibrato Frequency = 11
* Vibrato Gain = 1
* Volume = 128

by Perry R. Cook and Gary P. Scavone, 1995 - 2002.

| BlowBotl.functions                                | Description                                                                         |
| :------------------------------------------------ | :---------------------------------------------------------------------------------- |
| __`float noiseGain(), noiseGain(float)`__         | get/set noise component gain [0.0 - 1.0]                                            |
| __`float vibratoFreq(), vibratoFreq(float)`__     | get/set vibrato frequency (Hz)                                                      |
| __`float vibratoGain(), vibratoGain(float)`__     | get/set vibrato gain [0.0 - 1.0]                                                    |
| __`float volume(), volume(float)`__               | get/set yet another volume knob [0.0 - 1.0]                                         |
| __`float rate(), rate(float)`__                   | get/set rate of attack (sec)                                                        |
| __`void startBlowing(float)`__                    | set start blowing [0.0 - 1.0]                                                       |
| __`void stopBlowing(float)`__                     | set stop blowing [0.0 - 1.0]                                                        |
| _inherited from StkInstrument_:                   |
| __`void noteOn(float velocity)`__                 | trigger note on                                                                     |
| __`void noteOff(loat velocity)`__                 | trigger note off                                                                    |
| __`float freq(), freq(float v)`__                 | set/get frequency (Hz)                                                              |
| __`void controlChange(int number, float value)`__ | assert control change - numbers are instrument specific, value range: [0.0 - 128.0] |

#### BlowHole

 __`BlowHole`__  STK blowhole physical model with one register hole and one tonehole.

This class is based on the clarinet model, with the addition 
of a two-port register hole and a three-port dynamic tonehole
implementation, as discussed by Scavone and Cook (1998).

In this implementation, the distances between the reed/register 
hole and tonehole/bell are fixed.  As a result, both the tonehole 
and register hole will have variable influence on the playing 
frequency, which is dependent on the length of the air column.  
In addition, the highest playing freqeuency is limited by these 
fixed lengths. This is a digital waveguide model, making its use 
possibly subject to patents held by Stanford University, Yamaha, 
and others.

Control Change Numbers: 

* Reed Stiffness = 2
* Noise Gain = 4
* Tonehole State = 11
* Register State = 1
* Breath Pressure = 128

by Perry R. Cook and Gary P. Scavone, 1995 - 2002.

| BlowHole.functions                                | Description                                                                         |
| :------------------------------------------------ | :---------------------------------------------------------------------------------- |
| __`float reed(), reed(float)`__                   | get/set reed stiffness [0.0 - 1.0]                                                  |
| __`float noiseGain(), noiseGain(float)`__         | get/set noise component gain  [0.0 - 1.0]                                           |
| __`float tonehole(), tonehole(float)`__           | get/set tonehole size  [0.0 - 1.0]                                                  |
| __`float vent(), vent(float)`__                   | get/set vent frequency [0.0 - 1.0]                                                  |
| __`float pressure(), pressure(float)`__           | get/set pressure  [0.0 - 1.0]                                                       |
| __`void startBlowing(float)`__                    | set start blowing  [0.0 - 1.0]                                                      |
| __`void stopBlowing(float)`__                     | set stop blowing  [0.0 - 1.0]                                                       |
| __`float rate(), rate(float)`__                   | get/set rate of attack (sec)                                                        |
| _inherited from StkInstrument_:                   |
| __`void noteOn(float velocity)`__                 | trigger note on                                                                     |
| __`void noteOff(loat velocity)`__                 | trigger note off                                                                    |
| __`float freq(), freq(float v)`__                 | set/get frequency (Hz)                                                              |
| __`void controlChange(int number, float value)`__ | assert control change - numbers are instrument specific, value range: [0.0 - 128.0] |

#### Bowed

 __`Bowed`__  STK bowed string instrument class. This class implements a 
 bowed string model, a la Smith (1986), after McIntyre, Schumacher, 
 Woodhouse (1983).

This is a digital waveguide model, making its use possibly subject 
to patents held by Stanford University, Yamaha, and others.

Control Change Numbers: 

* Bow Pressure = 2
* Bow Position = 4
* Vibrato Frequency = 11
* Vibrato Gain = 1
* Volume = 128

by Perry R. Cook and Gary P. Scavone, 1995 - 2002.

| Bowed.functions                               | Description                      |
| :-------------------------------------------- | :------------------------------- |
| __`float bowPressure(), bowPressure(float)`__ | get/set bow pressure [0.0 - 1.0] |
| __`float bowPosition(), bowPosition(float)`__ | get/set bow position [0.0 - 1.0] |
| __`float vibratoFreq(), vibratoFreq(float)`__ | get/set vibrato frequency (Hz)   |
| __`float vibratoGain(), vibratoGain(float)`__ | get/set vibrato gain [0.0 - 1.0] |
| __`float volume(), volume(float)`__           | get/set volume [0.0 - 1.0]       |
| __`void startBowing(float)`__                 | set start bowing [0.0 - 1.0]     |
| __`void stopBowing(float)`__                  | set stop bowing [0.0 - 1.0]      |
| _inherited from StkInstrument_:               |
| __`void noteOn(float velocity)`__             | trigger note on                  |
| __`void noteOff(loat velocity)`__             | trigger note off                 |
| __`float freq(), freq(float v)`__             | set/get frequency (Hz)           |

#### Brass

__`Brass`__  STK simple brass instrument class. This class implements 
a simple brass instrument waveguide model, a la Cook (TBone, HosePlayer).

This is a digital waveguide model, making its use possibly subject 
to patents held by Stanford University, Yamaha, and others.

Control Change Numbers: 

* Lip Tension = 2
* Slide Length = 4
* Vibrato Frequency = 11
* Vibrato Gain = 1
* Volume = 128

by Perry R. Cook and Gary P. Scavone, 1995 - 2002.

| Brass                                         | Description                      |
| :-------------------------------------------- | :------------------------------- |
| __`float lip(), lip(float)`__                 | get/set lip tension [0.0 - 1.0]  |
| __`float slide(), slide(float)`__             | get/set slide length [0.0 - 1.0] |
| __`float vibratoFreq(), vibratoFreq(float)`__ | get/set vibrato frequency (Hz)   |
| __`float vibratoGain(), vibratoGain(float)`__ | get/set vibrato gain [0.0 - 1.0] |
| __`float volume(), volume(float)`__           | get/set volume [0.0 - 1.0]       |
| __`void clear(float)`__                       | clear instrument                 |
| __`void startBlowing(float)`__                | start blowing [0.0 - 1.0]        |
| __`void stopBlowing(float)`__                 | stop blowing [0.0 - 1.0]         |
| __`float rate(), rate(float)`__               | get/set rate of attack (sec)     |
| _inherited from StkInstrument_:               |                                  |
| __`void noteOn(float velocity)`__             | trigger note on                  |
| __`void noteOff(loat velocity)`__             | trigger note off                 |
| __`float freq(), freq(float v)`__             | set/get frequency (Hz)           |


#### Clarinet

__`Clarinet`__  STK clarinet physical model class. This class implements 
a simple clarinet physical model, as discussed by Smith (1986), 
McIntyre, Schumacher, Woodhouse (1983), and others.

This is a digital waveguide model, making its use possibly subject to 
patents held by Stanford University, Yamaha, and others.

Control Change Numbers: 

* Reed Stiffness = 2
* Noise Gain = 4
* Vibrato Frequency = 11
* Vibrato Gain = 1
* Breath Pressure = 128

by Perry R. Cook and Gary P. Scavone, 1995 - 2002.

| Clarinet.functions                            | Description                      |
| :-------------------------------------------- | :------------------------------- |
| __`float reed(), reed(float)`__               | reed stiffness [0.0 - 1.0]       |
| __`float noiseGain(), noiseGain(float)`__     | noise component gain [0.0 - 1.0] |
| __`void clear()`__                            | clear instrument                 |
| __`float vibratoFreq(), vibratoFreq(float)`__ | vibrato frequency (Hz)           |
| __`float vibratoGain`(), vibratoGain(float)__ | vibrato gain [0.0 - 1.0]         |
| __`float pressure(), pressure(float)`__       | pressure/volume [0.0 - 1.0]      |
| __`void startBlowing(float)`__                | start blowing [0.0 - 1.0]        |
| __`void stopBlowing(float)`__                 | stop blowing [0.0 - 1.0]         |
| __`float rate(), rate(float)`__               | rate of attack (sec)             |
| _inherited from StkInstrument_:               |                                  |
| __`void noteOn(float velocity)`__             | trigger note on                  |
| __`void noteOff(loat velocity)`__             | trigger note off                 |
| __`float freq(), freq(float v)`__             | set/get frequency (Hz)           |


#### Flute

 __`Flute`__  STK flute physical model class. This class implements a 
 simple flute physical model, as discussed by Karjalainen, Smith, 
 Waryznyk, etc.  The jet model uses a polynomial, a la Cook.

This is a digital waveguide model, making its use possibly subject 
to patents held by Stanford University, Yamaha, and others.

Control Change Numbers: 

* Jet Delay = 2
* Noise Gain = 4
* Vibrato Frequency = 11
* Vibrato Gain = 1
* Breath Pressure = 128

by Perry R. Cook and Gary P. Scavone, 1995 - 2002.

| Flute.functions                                   | Description                              |
| :------------------------------------------------ | :--------------------------------------- |
| __`float jetDelay(), jetDelay(float)`__           | get/set jet delay [...]                  |
| __`float jetReflection(), jetReflection(float)`__ | get/set jet reflection [...]             |
| __`float endReflection(), endReflection(float)`__ | get/set end delay [...]                  |
| __`float noiseGain(), noiseGain(float)`__         | get/set noise component gain [0.0 - 1.0] |
| __`float vibratoFreq(), vibratoFreq(float)`__     | get/set vibrato frequency (Hz)           |
| __`float vibratoGain(), vibratoGain(float)`__     | get/set vibrato gain [0.0 - 1.0]         |
| __`float pressure`__ (float, R+W)                 | get/set pressure/volume [0.0 - 1.0]      |
| __`void clear()`__                                | clear instrument                         |
| __`float startBlowing(float)`__                   | start blowing [0.0 - 1.0]                |
| __`float stopBlowing(float)`__                    | stop blowing [0.0 - 1.0]                 |
| __`float rate(float)`__                           | rate of attack (sec)                     |
| _inherited from StkInstrument_:                   |                                          |
| __`void noteOn(float velocity)`__                 | trigger note on                          |
| __`void noteOff(loat velocity)`__                 | trigger note off                         |
| __`float freq(), freq(float v)`__                 | set/get frequency (Hz)                   |


#### Mandolin

__`Mandolin`__  STK mandolin instrument model class. This class inherits 
from PluckTwo and uses "commuted synthesis" techniques to model a 
mandolin instrument.

This is a digital waveguide model, making its use possibly subject 
to patents held by Stanford University, Yamaha, and others.
Commuted Synthesis, in particular, is covered by patents, granted, 
pending, and/or applied-for.  All are assigned to the Board of Trustees, 
Stanford University.  For information, contact the Office of Technology
Licensing, Stanford University.

Control Change Numbers: 

* Body Size = 2
* Pluck Position = 4
* String Sustain = 11
* String Detuning = 1
* Microphone Position = 128

by Perry R. Cook and Gary P. Scavone, 1995 - 2002.

| Mandolin.functions                                | Description                         |
| :------------------------------------------------ | :---------------------------------- |
| __`float bodySize(), bodySize(float)`__           | body size (percentage)              |
| __`float pluckPos(), pluckPos(float)`__           | pluck position [0.0 - 1.0]          |
| __`float stringDamping(), stringDamping(float)`__ | string damping [0.0 - 1.0]          |
| __`float stringDetune(), stringDetune(float)`__   | detuning of string pair [0.0 - 1.0] |
| __`void afterTouch(float)`__                      | aftertouch (currently unsupported)  |
| __`void pluck(float)`__                           | pluck instrument [0.0 - 1.0]        |
| _inherited from StkInstrument_:                   |                                     |
| __`void noteOn(float velocity)`__                 | trigger note on                     |
| __`void noteOff(loat velocity)`__                 | trigger note off                    |
| __`float freq(), freq(float v)`__                 | set/get frequency (Hz)              |

see [mand-o-matic.ck](../examples/stk/mand-o-matic.ck)


#### ModalBar

__`ModalBar`__  STK resonant bar instrument class. This class implements 
a number of different struck bar instruments.  It inherits from the Modal class.

Control Change Numbers:
* Stick Hardness = 2
* Stick Position = 4
* Vibrato Gain = 11
* Vibrato Frequency = 7
* Direct Stick Mix = 1
* Volume = 128
* Modal Presets = 16
    * Marimba = 0
    * Vibraphone = 1
    * Agogo = 2
    * Wood1 = 3
    * Reso = 4
    * Wood2 = 5
    * Beats = 6
    * Two Fixed = 7
    * Clump = 8

by Perry R. Cook and Gary P. Scavone, 1995 - 2002.

| ModalBar.functions                                  | Descriptions                             |
| :-------------------------------------------------- | :--------------------------------------- |
| __`float stickHardness(), stickHardness(float)`__   | get/set stick hardness [0.0 - 1.0]       |
| __`float strikePosition(), strikePosition(float)`__ | get/set strike position [0.0 - 1.0]      |
| __`float vibratoFreq(), vibratoFreq(float)`__       | get/set vibrato frequency (Hz)           |
| __`float vibratoGain(), vibratoGain(float)`__       | get/set vibrato gain [0.0 - 1.0]         |
| __`float directGain(), directGain(float)`__         | get/set direct gain [0.0 - 1.0]          |
| __`float masterGain(), masterGain(float)`__         | get/set master gain [0.0 - 1.0]          |
| __`float volume(), volume(float)`__                 | get/set volume [0.0 - 1.0]               |
| __`int preset(), preset(int)`__                     | get/set preset (see above)               |
| __`void strike(float)`__                            | strike bar [0.0 - 1.0]                   |
| __`void damp(float)`__                              | damp bar [0.0 - 1.0]                     |
| __`void clear()`__                                  | reset [none]                             |
| __`int mode(), mode(int)`__                         |
| __`float modeRatio(), modeRatio(float)`__           | get/set selected mode ratio [...]        |
| __`float modeRadius(), modeRadius(float)`__         | get/set selected mode radius [0.0 - 1.0] |
| __`float modeGain(), modeGain(float)`__             | get/set selected mode gain [0.0 - 1.0]   |
| _inherited from StkInstrument_:                     |                                          |
| __`void noteOn(float velocity)`__                   | trigger note on                          |
| __`void noteOff(loat velocity)`__                   | trigger note off                         |
| __`float freq(), freq(float v)`__                   | set/get frequency (Hz)                   |

 see [mod-o-matic.ck](../examples/stk/mode-o-matic.ck) 


#### Moog

 __`Moog`__  STK moog-like swept filter sampling synthesis class.

This instrument uses one attack wave, one looped wave, and an 
ADSR envelope (inherited from the Sampler class) and adds two 
sweepable formant (FormSwep) filters.

Control Change Numbers: 

* Filter Q = 2
* Filter Sweep Rate = 4
* Vibrato Frequency = 11
* Vibrato Gain = 1
* Gain = 128

by Perry R. Cook and Gary P. Scavone, 1995 - 2002.

| Moog.functions                                 | Description                   |
| :--------------------------------------------- | :---------------------------- |
| __`.filterQ`__ (float, R+W)                    | filter Q value [0.0 - 1.0]    |
| __`.filterSweepRate`__ (float, R+W)            | filter sweep rate [0.0 - 1.0] |
| __`.vibratoFreq`__ (float, R+W)                | vibrato frequency (Hz)        |
| __`.vibratoGain`__ (float, R+W)                | vibrato gain [0.0 - 1.0]      |
| __`.afterTouch`__ (float, WRITE only)          | aftertouch [0.0 - 1.0]        |
| _inherited from StkInstrument_:                |
| __`.noteOn`__ (float velocity)                 | trigger note on               |
| __`.noteOff`__ (float velocity)                | trigger note off              |
| __`.freq`__ (float frequency)                  | set/get frequency (Hz)        |
| __`.controlChange`__ (int number, float value) | assert control change         |
|                                                |
| see [moogie.ck](../examples/stk/moogie.ck)     |


#### Saxofony

__`Saxofony`__  STK faux conical bore reed instrument class. This class 
implements a "hybrid" digital waveguide instrument 
that can generate a variety of wind-like sounds.  It has also 
been referred to as the "blowed string" model.  The waveguide 
section is essentially that of a string, with one rigid and one 
lossy termination.  The non-linear function is a reed table.  
The string can be "blown" at any point between the terminations, 
though just as with strings, it is impossible to excite the
system at either end.  If the excitation is placed at the string 
mid-point, the sound is that of a clarinet.  At points closer to the
"bridge", the sound is closer to that of a saxophone.  
See Scavone (2002) for more details.

This is a digital waveguide model, making its use possibly subject 
to patents held by Stanford University, Yamaha, and others.

Control Change Numbers: 

* Reed Stiffness = 2
* Reed Aperture = 26
* Noise Gain = 4
* Blow Position = 11
* Vibrato Frequency = 29
* Vibrato Gain = 1
* Breath Pressure = 128

by Perry R. Cook and Gary P. Scavone, 1995 - 2002.

| Saxofony.functions                             | Description                      |
| :--------------------------------------------- | :------------------------------- |
| __`.stiffness`__ (float, R+W)                  | reed stiffness [0.0 - 1.0]       |
| __`.aperture`__ (float, R+W)                   | reed aperture [0.0 - 1.0]        |
| __`.pressure`__ (float, R+W)                   | pressure/volume [0.0 - 1.0]      |
| __`.vibratoFreq`__ (float, R+W)                | vibrato frequency (Hz)           |
| __`.vibratoGain`__ (float, R+W)                | vibrato gain [0.0 - 1.0]         |
| __`.noiseGain`__ (float, R+W)                  | noise component gain [0.0 - 1.0] |
| __`.blowPosition`__ (float, R+W)               | lip stiffness [0.0 - 1.0]        |
| __`.clear`__ ( )                               | clear instrument                 |
| __`.startBlowing`__ (float, WRITE only)        | start blowing [0.0 - 1.0]        |
| __`.stopBlowing`__ (float, WRITE only)         | stop blowing [0.0 - 1.0]         |
| __`.rate`__ (float, R+W)                       | rate of attack (sec)             |
| _inherited from StkInstrument_:                |
| __`.noteOn`__ (float velocity)                 | trigger note on                  |
| __`.noteOff`__ (float velocity)                | trigger note off                 |
| __`.freq`__ (float frequency)                  | set/get frequency (Hz)           |
| __`.controlChange`__ (int number, float value) | assert control change            |


#### Shakers

 __`Shakers`__  PhISEM and PhOLIES class. PhISEM (Physically Informed 
 Stochastic Event Modeling) is an algorithmic approach for simulating 
 collisions of multiple independent sound producing objects.  This 
 class is a meta-model that can simulate a Maraca, Sekere, Cabasa, 
 Bamboo Wind Chimes, Water Drops, Tambourine, Sleighbells, and a Guiro.

PhOLIES (Physically-Oriented Library of Imitated Environmental Sounds) 
is a similar approach for the synthesis of environmental sounds.  
This class implements simulations of breaking sticks, crunchy snow (or not), 
a wrench, sandpaper, and more.

Control Change Numbers: 

* Shake Energy = 2
* System Decay = 4
* Number Of Objects = 11
* Resonance Frequency = 1
* Shake Energy = 128
* Instrument Selection = 107
    * Maraca = 0
    * Cabasa = 1
    * Sekere = 2
    * Guiro = 3
    * Water Drops = 4
    * Bamboo Chimes = 5
    * Tambourine = 6
    * Sleigh Bells = 7
    * Sticks = 8
    * Crunch = 9
    * Wrench = 10
    * Sand Paper = 11
    * Coke Can = 12
    * Next Mug = 13
    * Penny + Mug = 14
    * Nickle + Mug = 15
    * Dime + Mug = 16
    * Quarter + Mug = 17
    * Franc + Mug = 18
    * Peso + Mug = 19
    * Big Rocks = 20
    * Little Rocks = 21
    * Tuned Bamboo Chimes = 22

by Perry R. Cook, 1996 - 1999.

| Shakers.functions                              | Description                           |
| :--------------------------------------------- | :------------------------------------ |
| __`.preset`__ (int, R+W)                       | select instrument (0 - 22; see above) |
| __`.energy`__ (float, R+W)                     | shake energy [0.0 - 1.0]              |
| __`.decay`__ (float, R+W)                      | system decay [0.0 - 1.0]              |
| __`.objects`__ (float, R+W)                    | number of objects [0.0 - 128.0]       |
| _inherited from StkInstrument_:                |
| __`.noteOn`__ (float velocity)                 | trigger note on                       |
| __`.noteOff`__ (float velocity)                | trigger note off                      |
| __`.freq`__ (float frequency)                  | set/get frequency (Hz)                |
| __`.controlChange`__ (int number, float value) | assert control change                 |

see [shake-o-matic.ck](../examples/stk/shake-o-matic.ck)


#### Sitar

 __`Sitar`__  STK sitar string model class. This class implements a 
 sitar plucked string physical model based on the Karplus-Strong algorithm.

This is a digital waveguide model, making its use possibly subject 
to patents held by Stanford University, Yamaha, and others. There 
exist at least two patents, assigned to Stanford, bearing the 
names of Karplus and/or Strong.

by Perry R. Cook and Gary P. Scavone, 1995 - 2002.

| Sitar.functions                                | Description              |
| :--------------------------------------------- | :----------------------- |
| __`.pluck`__ (float, WRITE only)               | pluck string [0.0 - 1.0] |
| __`.clear`__ ( )                               | reset                    |
| _inherited from StkInstrument_:                |
| __`.noteOn`__ (float velocity)                 | trigger note on          |
| __`.noteOff`__ (float velocity)                | trigger note off         |
| __`.freq`__ (float frequency)                  | set/get frequency (Hz)   |
| __`.controlChange`__ (int number, float value) | assert control change    |


#### StifKarp

__`StifKarp`__  STK plucked stiff string instrument. This class implements 
a simple plucked string algorithm (Karplus Strong) with enhancements 
(Jaffe-Smith, Smith, and others), including string stiffness and pluck 
position controls. The stiffness is modeled with allpass filters.

This is a digital waveguide model, making its use possibly subject 
to patents held by Stanford University, Yamaha, and others.

Control Change Numbers:
* Pickup Position = 4
* String Sustain = 11
* String Stretch = 1

by Perry R. Cook and Gary P. Scavone, 1995 - 2002.

| StifKarp                                       | Description                 |
| :--------------------------------------------- | :-------------------------- |
| __`.pickupPosition`__ (float, R+W)             | pickup position [0.0 - 1.0] |
| __`.sustain`__ (float, R+W)                    | string sustain [0.0 - 1.0]  |
| __`.stretch`__ (float, R+W)                    | string stretch [0.0 - 1.0]  |
| __`.pluck`__ (float, WRITE only)               | pluck string [0.0 - 1.0]    |
| __`.baseLoopGain`__ (float, R+W)               | ?? [0.0 - 1.0]              |
| __`.clear`__ ( )                               | reset instrument            |
| _inherited from StkInstrument_:                |
| __`.noteOn`__ (float velocity)                 | trigger note on             |
| __`.noteOff`__ (float velocity)                | trigger note off            |
| __`.freq`__ (float frequency)                  | set/get frequency (Hz)      |
| __`.controlChange`__ (int number, float value) | assert control change       |

see [stifkarp.ck](../examples/stk/stifkarp.ck)


#### VoicForm

__`VoicForm`__  Four formant synthesis instrument. This instrument contains 
an excitation singing wavetable (looping wave with random and periodic 
vibrato, smoothing on frequency, etc.), excitation noise, and four sweepable
complex resonances.

Measured formant data is included, and enough data is there to support 
either parallel or cascade synthesis.  In the floating point case cascade 
synthesis is the most natural so that's what you'll find here.

Control Change Numbers: 
* Voiced/Unvoiced Mix = 2
* Vowel/Phoneme Selection = 4
* Vibrato Frequency = 11
* Vibrato Gain = 1
* Loudness (Spectral Tilt) = 128

Phoneme Names:

"eee"  "ihh"  "ehh"  "aaa"   
"ahh"  "aww"  "ohh"  "uhh"   
"uuu"  "ooo"  "rrr"  "lll"   
"mmm"  "nnn"  "nng"  "ngg"   
"fff"  "sss"  "thh"  "shh"   
"xxx"  "hee"  "hoo"  "hah"   
"bbb"  "ddd"  "jjj"  "ggg"   
"vvv"  "zzz"  "thz"  "zhh"  

by Perry R. Cook and Gary P. Scavone, 1995 - 2002.

| VoicForm                                       | Description                                |
| :--------------------------------------------- | :----------------------------------------- |
| __`.phoneme`__ (string, R+W)                   | select phoneme (see above )                |
| __`.phonemeNum`__ (int, R+W)                   | select phoneme by number [0.0 - 128.0]     |
| __`.speak`__ (float, WRITE only)               | start singing [0.0 - 1.0]                  |
| __`.quiet`__ (float, WRITE only)               | stop singing [0.0 - 1.0]                   |
| __`.voiced`__ (float, R+W)                     | set mix for voiced component [0.0 - 1.0]   |
| __`.unVoiced`__ (float, R+W)                   | set mix for unvoiced component [0.0 - 1.0] |
| __`.pitchSweepRate`__ (float, R+W)             | pitch sweep [0.0 - 1.0]                    |
| __`.voiceMix`__ (float, R+W)                   | voiced/unvoiced mix [0.0 - 1.0]            |
| __`.vibratoFreq`__ (float, R+W)                | vibrato frequency (Hz)                     |
| __`.vibratoGain`__ (float, R+W)                | vibrato gain [0.0 - 1.0]                   |
| __`.loudness`__ (float, R+W)                   | 'loudness' of voice [0.0 - 1.0]            |
| _inherited from StkInstrument_:                |
| __`.noteOn`__ (float velocity)                 | trigger note on                            |
| __`.noteOff`__ (float velocity)                | trigger note off                           |
| __`.freq`__ (float frequency)                  | set/get frequency (Hz)                     |
| __`.controlChange`__ (int number, float value) | assert control change                      |

see [voic-o-form.ck](../examples/stk/voic-o-form.ck)
    
### stk - fm synths

-------------------------------------------------------------------------------

#### FM

 __`FM`__  STK abstract FM synthesis base class. This class controls an 
 arbitrary number of waves and envelopes, determined via a constructor argument.

Control Change Numbers: 

* Control One = 2
* Control Two = 4
* LFO Speed = 11
* LFO Depth = 1
* ADSR 2 & 4 Target = 128

The basic Chowning/Stanford FM patent expired in 1995, but there exist 
follow-on patents, mostly assigned to Yamaha.  If you are of the type 
who should worry about this (making money) worry away.

by Perry R. Cook and Gary P. Scavone, 1995 - 2002.

| FM.functions                                   | Description                       |
| :--------------------------------------------- | :-------------------------------- |
| __`.lfoSpeed`__ (float, R+W)                   | modulation Speed (Hz)             |
| __`.lfoDepth`__ (float, R+W)                   | modulation Depth [0.0 - 1.0]      |
| __`.afterTouch`__ (float, R+W)                 | aftertouch [0.0 - 1.0]            |
| __`.controlOne`__ (float, R+W)                 | control one [instrument specific] |
| __`.controlTwo`__ (float, R+W)                 | control two [instrument specific] |
| _inherited from StkInstrument_:                |
| __`.noteOn`__ (float velocity)                 | trigger note on                   |
| __`.noteOff`__ (float velocity)                | trigger note off                  |
| __`.freq`__ (float frequency)                  | set/get frequency (Hz)            |
| __`.controlChange`__ (int number, float value) | assert control change             |


#### BeeThree

__`BeeThree`__  STK Hammond-oid organ FM synthesis instrument.

This class implements a simple 4 operator topology, also referred to 
as algorithm 8 of the TX81Z.

Algorithm 8 is :

    1 --.
    2 -\|
        +-> Out
    3 -/|
    4 --

Control Change Numbers: 

* Operator 4 (feedback) 
    * Gain = 2 (.controlOne)
* Operator 3 
    * Gain = 4 (.controlTwo)
    * LFO Speed = 11
    * LFO Depth = 1
    * ADSR 2 & 4 Target = 128

The basic Chowning/Stanford FM patent expired in 1995, but there exist 
follow-on patents, mostly assigned to Yamaha.  If you are of the type 
who should worry about this (making money) worry away.

by Perry R. Cook and Gary P. Scavone, 1995 - 2002.

| BeeThree.functions                             | Description                       |
| :--------------------------------------------- | :-------------------------------- |
| _inherited from FM_:                           |
| __`.lfoSpeed`__ (float, R+W)                   | modulation Speed (Hz)             |
| __`.lfoDepth`__ (float, R+W)                   | modulation Depth [0.0 - 1.0]      |
| __`.afterTouch`__ (float, R+W)                 | aftertouch [0.0 - 1.0]            |
| __`.controlOne`__ (float, R+W)                 | control one [instrument specific] |
| __`.controlTwo`__ (float, R+W)                 | control two [instrument specific] |
| _inherited from StkInstrument_:                |
| __`.noteOn`__ (float velocity)                 | trigger note on                   |
| __`.noteOff`__ (float velocity)                | trigger note off                  |
| __`.freq`__ (float frequency)                  | set/get frequency (Hz)            |
| __`.controlChange`__ (int number, float value) | assert control change             |


#### FMVoices

 __`FMVoices`__   STK singing FM synthesis instrument.

This class implements 3 carriers and a common modulator, also 
referred to as algorithm 6 of the TX81Z.

Algorithm 6 is :

        /->1 -\
     4-|-->2 - +-> Out
        \->3 -/

Control Change Numbers: 

* Vowel = 2 (.controlOne)
* Spectral Tilt = 4 (.controlTwo)
* LFO Speed = 11
* LFO Depth = 1
* ADSR 2 & 4 Target = 128

The basic Chowning/Stanford FM patent expired in 1995, but there 
exist follow-on patents, mostly assigned to Yamaha.  If you are of the
type who should worry about this (making money) worry away.

by Perry R. Cook and Gary P. Scavone, 1995 - 2002.

| FMVoices.functions                             | Description                       |
| :--------------------------------------------- | :-------------------------------- |
| __`.vowel`__ (float, WRITE only)               | select vowel [0.0 - 1.0]          |
| __`.spectralTilt`__ (float, WRITE only)        | spectral tilt [0.0 - 1.0]         |
| __`.adsrTarget`__ (float, WRITE only)          | adsr targets [0.0 - 1.0]          |
| _inherited from FM_:                           |
| __`.lfoSpeed`__ (float, R+W)                   | modulation Speed (Hz)             |
| __`.lfoDepth`__ (float, R+W)                   | modulation Depth [0.0 - 1.0]      |
| __`.afterTouch`__ (float, R+W)                 | aftertouch [0.0 - 1.0]            |
| __`.controlOne`__ (float, R+W)                 | control one [instrument specific] |
| __`.controlTwo`__ (float, R+W)                 | control two [instrument specific] |
| _inherited from StkInstrument_:                |
| __`.noteOn`__ (float velocity)                 | trigger note on                   |
| __`.noteOff`__ (float velocity)                | trigger note off                  |
| __`.freq`__ (float frequency)                  | set/get frequency (Hz)            |
| __`.controlChange`__ (int number, float value) | assert control change             |

#### FrencHrn 

__`FrencHrn`__ STK-style French Horn FM synthesis instrument

This class implements 3 cascade operators and a 4th modulator with 
feedback modulation, also referred to as algorithm 2 of the TX81Z.

Algorithm 2 is

    4--\
    3---+-->>2-->1-->Out

Control Change Numbers:

* Total Modulator Index = 2 (.controlOne)\n\
* Modulator Crossfade = 4 (.controlTwo)\n\
* LFO Speed = 11\n\
* LFO Depth = 1\n\
* ADSR 2 & 4 Target = 128\n\

The basic Chowning/Stanford FM patent expired in 1995, but there exist 
follow-on patents, mostly assigned to Yamaha. If you are of the type 
who should worry about this (making money) worry away.

by Perry R. Cook and Gary P. Scavone, 1995 - 2002.";

#### HevyMetl

__`HevyMetl`__  STK heavy metal FM synthesis instrument.

This class implements 3 cascade operators with feedback modulation, 
also referred to as algorithm 3 of the TX81Z.

Algorithm 3 is :     

        4--\
    3-->2-- + -->1-->Out

Control Change Numbers: 

* Total Modulator Index = 2 (.controlOne)
* Modulator Crossfade = 4 (.controlTwo)
* LFO Speed = 11
* LFO Depth = 1
* ADSR 2 & 4 Target = 128

The basic Chowning/Stanford FM patent expired in 1995, but there 
exist follow-on patents, mostly assigned to Yamaha.  If you are 
of the type who should worry about this (making money) worry away.

by Perry R. Cook and Gary P. Scavone, 1995 - 2002.

| HevyMetl.functions                             | Description                       |
| :--------------------------------------------- | :-------------------------------- |
| _inherited from FM_:                           |
| __`.lfoSpeed`__ (float, R+W)                   | modulation Speed (Hz)             |
| __`.lfoDepth`__ (float, R+W)                   | modulation Depth [0.0 - 1.0]      |
| __`.afterTouch`__ (float, R+W                  |                                   | aftertouch [0.0 - 1.0] |
| __`.controlOne`__ (float, R+W)                 | control one [instrument specific] |
| __`.controlTwo`__ (float, R+W)                 | control two [instrument specific] |
| _inherited from StkInstrument_:                |
| __`.noteOn`__ (float velocity)                 | trigger note on                   |
| __`.noteOff`__ (float velocity)                | trigger note off                  |
| __`.freq`__ (float frequency)                  | set/get frequency (Hz)            |
| __`.controlChange`__ (int number, float value) | assert control change             |

#### HnkyTonk

__HnkyTonk__ is STK-style Honkey Tonk Piano FM synthesis instrument.

This class implements 4 cascade operators with feedback modulation, 
also referred to as algorithm 1 of the TX81Z.

Algorithm 1 is : 

    4-->3-->2-->1-->Out

Control Change Numbers:

* Total Modulator Index = 2 (.controlOne)\n\
* Modulator Crossfade = 4 (.controlTwo)\n\
* LFO Speed = 11\n\
* LFO Depth = 1\n\
* ADSR 2 & 4 Target = 128\n\

The basic Chowning/Stanford FM patent expired in 1995, but there exist 
follow-on patents, mostly assigned to Yamaha. If you are of the type 
who should worry about this (making money) worry away.

by Perry R. Cook and Gary P. Scavone, 1995 - 2002.


#### KrstlChr

__`KrstlChr`__ STK-style "Crystal Choir" FM synthesis instrument.

This class implements 3 parallel operators with being modulated 
(feedback modulation), also referred to as algorithm 7 of the TX81Z.

Algorithm 7 is :

    1 - \
    2 -- +-> Out
    4-->3 -/ 
    
Control Change Numbers:

* Total Modulator Index = 2 (.controlOne)\n\
* Modulator Crossfade = 4 (.controlTwo)\n\
* LFO Speed = 11\n\
* LFO Depth = 1\n\
* ADSR 2 & 4 Target = 128\n\

The basic Chowning/Stanford FM patent expired in 1995, but there 
exist follow-on patents, mostly assigned to Yamaha. If you are of 
the type who should worry about this (making money) worry away.

by Perry R. Cook and Gary P. Scavone, 1995 - 2002.";

#### PercFlut

__`PercFlut`__  STK percussive flute FM synthesis instrument.

This class implements algorithm 4 of the TX81Z.

Algorithm 4 is

    4->3--\
       2-- + -->1-->Out

Control Change Numbers: 

* Total Modulator Index = 2 (.controlOne)
* Modulator Crossfade = 4 (.controlTwo)
* LFO Speed = 11
* LFO Depth = 1
* ADSR 2 & 4 Target = 128

The basic Chowning/Stanford FM patent expired in 1995, but there 
exist follow-on patents, mostly assigned to Yamaha.  If you are 
of the type who should worry about this (making money) worry away.

by Perry R. Cook and Gary P. Scavone, 1995 - 2002.

| PercFlut                                       | Description                       |
| :--------------------------------------------- |
| _inherited from FM_:                           |
| __`.lfoSpeed`__ (float, R+W)                   | modulation Speed (Hz)             |
| __`.lfoDepth`__ (float, R+W)                   | modulation Depth [0.0 - 1.0]      |
| __`.afterTouch`__ (float, R+W)                 | aftertouch [0.0 - 1.0]            |
| __`.controlOne`__ (float, R+W)                 | control one [instrument specific] |
| __`.controlTwo`__ (float, R+W)                 | control two [instrument specific] |
| _inherited from StkInstrument_:                |
| __`.noteOn`__ (float velocity)                 | trigger note on                   |
| __`.noteOff`__ (float velocity)                | trigger note off                  |
| __`.freq`__ (float frequency)                  | set/get frequency (Hz)            |
| __`.controlChange`__ (int number, float value) | assert control change             |


#### Rhodey

__`Rhodey`__  STK Fender Rhodes-like electric piano FM

This class implements two simple FM Pairs summed together, 
also referred to as algorithm 5 of the TX81Z.

Algorithm 5 is :     

    4->3--\
           + --> Out
    2->1--/

Control Change Numbers: 

* Modulator Index One = 2 (.controlOne)
* Crossfade of Outputs = 4 (.controlTwo)
* LFO Speed = 11
* LFO Depth = 1
* ADSR 2 & 4 Target = 128

The basic Chowning/Stanford FM patent expired in 1995, but there 
exist follow-on patents, mostly assigned to Yamaha.  If you are 
of the type who should worry about this (making money) worry away.

by Perry R. Cook and Gary P. Scavone, 1995 - 2002.

| Rhodey                                         | Description                       |
| :--------------------------------------------- |
| _inherited from FM_:                           |
| __`.lfoSpeed`__ (float, R+W)                   | modulation Speed (Hz)             |
| __`.lfoDepth`__ (float, R+W)                   | modulation Depth [0.0 - 1.0]      |
| __`.afterTouch`__ (float, R+W)                 | aftertouch [0.0 - 1.0]            |
| __`.controlOne`__ (float, R+W)                 | control one [instrument specific] |
| __`.controlTwo`__ (float, R+W)                 | control two [instrument specific] |
| _inherited from StkInstrument_:                |
| __`.noteOn`__ (float velocity)                 | trigger note on                   |
| __`.noteOff`__ (float velocity)                | trigger note off                  |
| __`.freq`__ (float frequency)                  | set/get frequency (Hz)            |
| __`.controlChange`__ (int number, float value) | assert control change             |

see [rhodey.ck](../examples/stk/rhodey.ck)


#### TubeBell

__`TubeBell`__  STK tubular bell (orchestral chime) FM.

| TubeBell.functions                             | Description                       |
| :--------------------------------------------- | :-------------------------------- |
| _inherited from FM_:                           |                                   |
| __`.lfoSpeed`__ (float, R+W)                   | modulation Speed (Hz)             |
| __`.lfoDepth`__ (float, R+W)                   | modulation Depth [0.0 - 1.0]      |
| __`.afterTouch`__ (float, R+W)                 | aftertouch [0.0 - 1.0]            |
| __`.controlOne`__ (float, R+W)                 | control one [instrument specific] |
| __`.controlTwo`__ (float, R+W)                 | control two [instrument specific] |
| _inherited from StkInstrument_:                |                                   |
| __`.noteOn`__ (float velocity)                 | trigger note on                   |
| __`.noteOff`__ (float velocity)                | trigger note off                  |
| __`.freq`__ (float frequency)                  | set/get frequency (Hz)            |
| __`.controlChange`__ (int number, float value) | assert control change             |

This class implements two simple FM Pairs summed together, also referred to 
as algorithm 5 of the TX81Z.

Algorithm 5 is :  

    4->3--\
           + --> Out
    2->1--/

Control Change Numbers: 

* Modulator Index One = 2 (.controlOne)
* Crossfade of Outputs = 4 (.controlTwo)
* LFO Speed = 11
* LFO Depth = 1
* ADSR 2 & 4 Target = 128

The basic Chowning/Stanford FM patent expired in 1995, but there 
exist follow-on patents, mostly assigned to Yamaha.  If you are 
of the type who should worry about this (making money) worry away.

by Perry R. Cook and Gary P. Scavone, 1995 - 2002.

#### Wurley

__`Wurley`__  STK Wurlitzer electric piano FM.

This class implements two simple FM Pairs summed together, 
also referred to as algorithm 5 of the TX81Z.

Algorithm 5 is

    4->3--\
           + --> Out
    2->1--/

Control Change Numbers: 

* Modulator Index One = 2 (.controlOne)
* Crossfade of Outputs = 4 (.controlTwo)
* LFO Speed = 11
* LFO Depth = 1
* ADSR 2 & 4 Target = 128

The basic Chowning/Stanford FM patent expired in 1995, but there 
exist follow-on patents, mostly assigned to Yamaha.  If you are 
of the type who should worry about this (making money) worry away.

by Perry R. Cook and Gary P. Scavone, 1995 - 2002.

| Wurley.functions                               | Description                       |
| :--------------------------------------------- | :-------------------------------- |
| _inherited from FM_:                           |
| __`.lfoSpeed`__ (float, R+W)                   | modulation Speed (Hz)             |
| __`.lfoDepth`__ (float, R+W)                   | modulation Depth [0.0 - 1.0]      |
| __`.afterTouch`__ (float, R+W)                 | aftertouch [0.0 - 1.0]            |
| __`.controlOne`__ (float, R+W)                 | control one [instrument specific] |
| __`.controlTwo`__ (float, R+W)                 | control two [instrument specific] |
| _inherited from StkInstrument_:                |                                   |
| __`.noteOn`__ (float velocity)                 | trigger note on                   |
| __`.noteOff`__ (float velocity)                | trigger note off                  |
| __`.freq`__ (float frequency)                  | set/get frequency (Hz)            |
| __`.controlChange`__ (int number, float value) | assert control change             |

 see [wurley.ck](../examples/stk/wurley.ck)


### stk - delay

-------------------------------------------------------------------------------

#### Delay

 __`Delay`__ STK non-interpolating delay line class.

This protected Filter subclass implements a non-interpolating 
digital delay-line. A fixed maximum length of 4095 and a delay
of zero is set using the default constructor. Alternatively, 
the delay and maximum length can be set during instantiation 
with an overloaded constructor.

A non-interpolating delay line is typically used in fixed 
delay-length applications, such as for reverberation.

by Perry R. Cook and Gary P. Scavone, 1995 - 2002.


| Delay.functions         | Description             |
| :---------------------- | :---------------------- |
| __`.delay`__ (dur, R+W) | length of delay         |
| __`.max`__ (dur, R+W)   | max delay (buffer size) |

 see [comb.ck](../examples/basic/comb.ck)


#### DelayA

 __`DelayA`__ STK allpass interpolating delay line class.

This Delay subclass implements a fractional- length digital 
delay-line using a first-order allpass filter.  A fixed 
maximum length of 4095 and a delay of 0.5 is set using the
default constructor.  Alternatively, the delay and maximum 
length can be set during instantiation with an overloaded 
constructor.

An allpass filter has unity magnitude gain but variable 
phase delay properties, making it useful in achieving 
fractional delays without affecting a signal's frequency 
magnitude response.  In order to achieve a maximally 
flat phase delay response, the minimum delay possible 
in this implementation is limited to a value of 0.5.

by Perry R. Cook and Gary P. Scavone, 1995 - 2002.

| DelayA.functions        | Description               |
| :---------------------- | :------------------------ |
| __`.delay`__ (dur, R+W) | length of delay           |
| __`.max`__ (dur, R+W)   | max delay ( buffer size ) |

#### DelayL

__`DelayL`__ STK linear interpolating delay line class.

This Delay subclass implements a fractional- length digital 
delay-line using first-order linear interpolation.  A 
fixed maximum length of 4095 and a delay of zero is set 
using the default constructor.  Alternatively, the delay 
and maximum length can be set during instantiation with 
an overloaded constructor.

Linear interpolation is an efficient technique for achieving 
fractional delay lengths, though it does introduce 
high-frequency signal attenuation to varying degrees 
depending on the fractional delay setting.  The use of 
higher order Lagrange interpolators can typically improve 
(minimize) this attenuation characteristic.

by Perry R. Cook and Gary P. Scavone, 1995 - 2002.

| DelayL.functions        | Description               |
| :---------------------- | :------------------------ |
| __`.delay`__ (dur, R+W) | length of delay           |
| __`.max`__ (dur, R+W)   | max delay ( buffer size ) |

 see [i-robot.ck](../examples/basic/i-robot.ck)

#### Echo

__`Echo`__ STK echo effect class.

| Echo.functions          | Description         |
| :---------------------- | :------------------ |
| __`.delay`__ (dur, R+W) | length of echo      |
| __`.max`__ (dur, R+W)   | max delay           |
| __`.mix`__ (float, R+W) | mix level (wet/dry) |

### stk - envelopes

-------------------------------------------------------------------------------

#### Envelope

__`Envelope`__ STK envelope base class.

This class implements a simple envelope generator which is capable of 
ramping to a target value by a specified `rate`. It also responds to 
simple `keyOn` and `keyOff` messages, ramping to 1.0 on keyOn and 
to 0.0 on keyOff.

by Perry R. Cook and Gary P. Scavone, 1995 - 2002.

| Envelope.functions              | Description                       |
| :------------------------------ | :-------------------------------- |
| __`.keyOn`__ (int, WRITE only)  | ramp to 1.0                       |
| __`.keyOff`__ (int, WRITE only) | ramp to 0.0                       |
| __`.target`__ (float, R+W)      | ramp to arbitrary value.          |
| __`.time`__ (float, R+W)        | time to reach target (in seconds) |
| __`.duration`__ (dur, R+W)      | duration to reach target          |
| __`.rate`__ (float, R+W)        | rate of change                    |
| __`.value`__ (float, R+W)       | set immediate value               |

 see [envelop.ck](../examples/basic/envelope.ck)

#### ADSR

 __`ADSR`__ STK ADSR envelope base class.

This Envelope subclass implements a traditional ADSR (Attack, Decay, 
Sustain, Release) envelope.  It responds to simple keyOn and keyOff 
messages, keeping track of its state. The state == `ADSR::DONE`
after the envelope value reaches 0.0 in the `ADSR::RELEASE` state.

by Perry R. Cook and Gary P. Scavone, 1995 - 2002.

| ADSR.functions                    | Description                                      |
| :-------------------------------- | :----------------------------------------------- |
| __`.keyOn`__ (int, WRITE only)    | start the attack for non-zero values             |
| __`.keyOff`__ (int, WRITE only)   | start release for non-zero values                |
| __`.attackTime`__ (dur, R+W)      | attack time                                      |
| __`.attackRate`__ (float, R+W)    | attack rate                                      |
| __`.decayTime`__ (dur, R+W)       | decay time                                       |
| __`.decayRate`__ (float, R+W)     | decay rate                                       |
| __`.sustainLevel`__ (float, R+W)  | sustain level                                    |
| __`.releaseTime`__ (dur, R+W)     | release time                                     |
| __`.releaseRate`__ (float, R+W)   | release rate                                     |
| __`.state`__ (int, READ only)     | attack=0, decay=1 , sustain=2, release=3, done=4 |
| __`.set`__ (dur, dur, float, dur) | set A, D, S, and R all at once                   |

see [adsr.ck](../examples/basic/adsr.ck)


### stk - reverbs

-------------------------------------------------------------------------------

#### JCRev

 __`JCRev`__ John Chowning's reverberator class.

This class is derived from the CLM JCRev function, which is based 
on the use of networks of simple allpass and comb delay filters.  
This class implements three series allpass units, followed by 
four parallel comb filters, and two decorrelation delay lines in
parallel at the output.

by Perry R. Cook and Gary P. Scavone, 1995 - 2002.

| JCRev.functions         | Description |
| :---------------------- | :---------- |
| __`.mix`__ (float, R+W) | mix level   |


#### NRev

__`NRev`__ CCRMA's NRev reverberator class.

This class is derived from the CLM NRev function, 
which is based on the use of networks of simple 
allpass and comb delay filters.  This particular 
arrangement consists of 6 comb filters in parallel, 
followed by 3 allpass filters, a lowpass filter, 
and another allpass in series, followed by two 
allpass filters in parallel with corresponding right
and left outputs.

by Perry R. Cook and Gary P. Scavone, 1995 - 2002.

| NRev.functions          | Description |
| :---------------------- | :---------- |
| __`.mix`__ (float, R+W) |             |


#### PRCRev

__`PRCRev`__ Perry's simple reverberator class.

This class is based on some of the famous Stanford/CCRMA 
reverbs (NRev, KipRev), which were based on the 
Chowning/Moorer/Schroeder reverberators using networks 
of simple allpass and comb delay filters.  This class 
implements two series allpass units and two parallel comb
filters.

by Perry R. Cook and Gary P. Scavone, 1995 - 2002.

| PRCRev.functions        | Description |
| :---------------------- | :---------- |
| __`.mix`__ (float, R+W) | mix level   |


### stk - components

-------------------------------------------------------------------------------

#### Chorus

__`Chorus`__ STK chorus effect class.

| Chorus                       | Description          |
| :--------------------------- | :------------------- |
| __`.modFreq`__ (float, R+W)  | modulation frequency |
| __`.modDepth`__ (float, R+W) | modulation depth     |
| __`.mix`__ (float, R+W)      | effect mix           |

#### Modulate

__`Modulate`__ STK periodic/random modulator. This class combines random 
and periodic modulations to give a nice, natural human modulation function.

| Modulate.functions              | Description                  |
| :------------------------------ | :--------------------------- |
| __`.vibratoRate`__ (float, R+W) | set rate of vibrato          |
| __`.vibratoGain`__ (float, R+W) | gain for vibrato             |
| __`.randomGain`__ (float, R+W)  | gain for random contribution |

#### PitShift

__`PitShift`__ STK simple pitch shifter effect class. Implemented using 
delay lines.

| PitShift.functions        | Description              |
| :------------------------ | ------------------------ |
| __`.mix`__ (float, R+W)   | effect dry/web mix level |
| __`.shift`__ (float, R+W) | degree of pitch shifting |

#### SubNoise

__`SubNoise`__ STK sub-sampled noise generator. Generates a new random 
number every "rate" ticks using the C rand() function.  The quality of the 
rand() function varies from one OS to another.

| SubNoise.functions     | Description      |
| :--------------------- | :--------------- |
| __`.rate`__ (int, R+W) | subsampling rate |

#### Blit

__`Blit`__ STK band-limited impulse train.

This class generates a band-limited impulse train using a
closed-form algorithm reported by Stilson and Smith in
"Alias-Free Digital Synthesis of Classic Analog Waveforms", 1996.
The user can specify both the fundamental frequency
of the impulse train and the number of harmonics contained
in the resulting signal.

The signal is normalized so that the peak value is +/-1.0.

If nHarmonics is 0, then the signal will contain all
harmonics up to half the sample rate. Note, however,
that this setting may produce aliasing in the signal
when the frequency is changing (no automatic modification
of the number of harmonics is performed by the `setFrequency()` 
function).

Original code by Robin Davies, 2005.
Revisions by Gary Scavone for STK, 2005.

| Blit.functions              | Description                      |
| :-------------------------- | :------------------------------- |
| __`.freq`__ (float, R+W)    | base frequency (hz)              |
| __`.harmonics`__ (int, R+W) | number of harmonics in pass band |
| __`.phase`__ (float, R+W)   | phase of the the signal          |


#### BlitSaw

__`BlitSaw`__ STK band-limited sawtooth wave.

This class generates a band-limited sawtooth waveform
using a closed-form algorithm reported by Stilson and
Smith in "Alias-Free Digital Synthesis of Classic Analog
Waveforms", 1996. The user can specify both the 
fundamental frequency of the sawtooth and the number 
of harmonics contained in the resulting signal.

If nHarmonics is 0, then the signal will contain all 
harmonics up to half the sample rate. Note, however,
that this setting may produce aliasing in the signal
when the frequency is changing (no automatic modification
of the number of harmonics is performed by the setFrequency()
function).

Based on initial code of Robin Davies, 2005.
Modified algorithm code by Gary Scavone, 2005.

| BlitSaw.functions           | Description                      |
| :-------------------------- | :------------------------------- |
| __`.freq`__ (float, R+W)    | base frequency (hz)              |
| __`.harmonics`__ (int, R+W) | number of harmonics in pass band |
| __`.phase`__ (float, R+W)   | phase of the the signal          |


#### BlitSquare

__`BlitSquare`__ STK band-limited square wave.

This class generates a band-limited square wave signal.
It is derived in part from the approach reported by 
Stilson and Smith in "Alias-Free Digital Synthesis of
Classic Analog Waveforms", 1996. The algorithm implemented
in this class uses a SincM function with an even M value to
achieve a bipolar bandlimited impulse train. This 
signal is then integrated to achieve a square waveform.
The integration process has an associated DC offset but that
is subtracted off the output signal.

The user can specify both the fundamental frequency of the
waveform and the number of harmonics contained in the 
resulting signal.

If nHarmonics is 0, then the signal will contain all 
harmonics up to half the sample rate. Note, however, that
this setting may produce aliasing in the signal when the
frequency is changing (no automatic modification of the
number of harmonics is performed by the setFrequency() function).

Based on initial code of Robin Davies, 2005.
Modified algorithm code by Gary Scavone, 2005.

| BlitSquare.functions        | Description                      |
| :-------------------------- | :------------------------------- |
| __`.freq`__ (float, R+W)    | base frequency (hz)              |
| __`.harmonics`__ (int, R+W) | number of harmonics in pass band |
| __`.phase`__ (float, R+W)   | phase of the the signal          |


### stk - file i/o

-------------------------------------------------------------------------------

#### WvIn

__`WvIn`__ STK audio data input base class.

This class provides input support for various audio file formats.  
It also serves as a base class for "realtime" streaming subclasses.

WvIn loads the contents of an audio file for subsequent output.  
Linear interpolation is used for fractional "read rates".

WvIn supports multi-channel data in interleaved format.  It is 
important to distinguish the tick() methods, which return samples 
produced by averaging across sample frames, from the tickFrame() 
methods, which return pointers to multi-channel sample frames.  
For single-channel data, these methods return equivalent values.

Small files are completely read into local memory during instantiation.
Large files are read incrementally from disk.  The file size threshold 
and the increment size values are defined in WvIn.h.

WvIn currently supports WAV, AIFF, SND (AU), MAT-file (Matlab), and STK 
RAW file formats. Signed integer (8-, 16-, and 32-bit) and floating-point
(32 and 64-bit) data types are supported. Uncompressed data types are
not supported.  If using MAT-files, data should be saved in an array 
with each data channel filling a matrix row.

by Perry R. Cook and Gary P. Scavone, 1995 - 2002.

| WvIn.functions            | Description                 |
| :------------------------ | :-------------------------- |
| __`.rate`__ (float, R+W)  | playback rate               |
| __`.path`__ (string, R+W) | specifies file to be played |


#### WaveLoop

__`WaveLoop`__ STK waveform oscillator class.

This class inherits from WvIn and provides audio file looping functionality.

WaveLoop supports multi-channel data in interleaved format.  It is 
important to distinguish the tick() methods, which return samples 
produced by averaging across sample frames, from the tickFrame() 
methods, which return pointers to multi-channel sample frames. 
For single-channel data, these methods return equivalent values.

by Perry R. Cook and Gary P. Scavone, 1995 - 2002.

| WaveLoop.functions                 | Description                                  |
| :--------------------------------- | :------------------------------------------- |
| __`.freq`__ (float, R+W)           | set frequency of playback ( loops / second ) |
| __`.addPhase`__ (float, R+W)       | offset by phase                              |
| __`.addPhaseOffset`__ (float, R+W) | set phase offset                             |
| _inherited from WavIn_             |
| __`.rate`__ (float, R+W)           | playback rate                                |
| __`.path`__ (string, R+W)          | specifies file to be played                  |


<a id="wvout2"></a>

#### WvOut

 __`WvOut`__  and __`WvOut2`__ STK audio data output classes.

These classes provide output support for various audio file formats.  
They also serves as a base class for "realtime" streaming subclasses.

WvOut writes single-channel samples to an audio file.  WvOut2 supports 
multi-channel data in interleaved format.  It is important to distinguish 
the tick() methods, which output single samples to all channels in a sample 
frame, from the tickFrame() method, which takes a pointer to multi-channel 
sample frame data.

WvOut currently supports WAV, AIFF, AIFC, SND (AU), MAT-file (Matlab), 
and STK RAW file formats.  Signed integer (8-, 16-, and 32-bit) 
and floating-point (32- and 64-bit) data types are supported.  STK 
RAW files use 16-bit integers by definition.  MAT-files will always
be written as 64-bit floats.  If a data type specification does 
not match the specified file type, the data type will automatically 
be modified.  Uncompressed data types are not supported.

Currently, WvOut is non-interpolating and the output rate
is always Stk::sampleRate().

WvOut supports automatic filename generation by setting the filename
to __"special:auto"__. Now, the __autoPrefix__ parameter, if provided, 
will be _prepended_ to the filename. Do this if you want the 
automatically named file to appear in a directory other than 
chuck's working directory.  When auto-naming is enabled, the output 
file name will include a timestamp.

by Perry R. Cook and Gary P. Scavone, 1995 - 2002.

| WvOut.functions                         | Description                  |
| :-------------------------------------- | :--------------------------- |
| __`.matFilename`__ (string, WRITE only) | open matlab file for writing |
| __`.sndFilename`__ (string, WRITE only) | open snd file for writing    |
| __`.wavFilename`__ (string, WRITE only) | open WAVE file for writing   |
| __`.rawFilename`__ (string, WRITE only) | open raw file for writing    |
| __`.aifFilename`__ (string, WRITE only) | open AIFF file for writing   |
| __`.autoPrefix`__ (string, R+W)         | get/set the prefix |
| __`.record`__ (int, R+W)                | start/stop output. |
| __`.closeFile`__ (string, WRITE only)   | close file properly          |

${PROGFOOTER}
