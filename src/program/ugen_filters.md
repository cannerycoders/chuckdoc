${PROGHEADER}

<center>

[^ programmer's guide](./index.md) | [std classes](./classes_std.md) | [basic ugen](./ugen_basic.md)

## ChucK basic filters

<!-- nb: extra eol spaces on some lines cause <br/> -->

[BPF](#bpf) | [BRF](#brf) | [LPF](#lpf) | [HPF](#hpf) | [ResonZ](#resonz)  
[BiQuad](#biquad) | [OnePole](#onepole) | [TwoPole](#twopole) |
[OneZero](#onezero) | [TwoZero](#twozero) | [PoleZero](#polezero)

</center>


### filters

--------------------------------------------------------------------------------

#### FilterBasic

__FilterBasic__ is the base class for several simple filters.

| FilterBasic.functions               | Filter base class.                                   |
| :---------------------------------- | :--------------------------------------------------- |
| _see [UGen](./ugen_basic.md#ugen)_  |                                                      |
| __`float Q(), Q(float val)`__       | Get/set filter resonance                             |
| __`float freq(), freq(float val)`__ | Get/set filter cutoff/center frequency.              |
| __`void set(float freq, float Q)`__ | Set filter frequency and resonance at the same time. |

#### BPF

__`BPF`__ is a band _pass_ filter. 2nd order Butterworth. (In the future, this class may be 
expanded so that order and type of filter can be set).

| BPF.functions                         |
| :------------------------------------ |
| _see [FilterBasic](#FilterBasic)_     |
| see [bp.ck](../examples/filter/bp.ck) |

#### BRF

__`BRF`__ is a band _reject_ filter. 2nd order Butterworth. (In the future, this class may be 
expanded so that order and type of filter can be set).

| BRF.functions                         |
| :------------------------------------ |
| _see [FilterBasic](#FilterBasic)_     |
| see [br.ck](../examples/filter/br.ck) |


#### LPF

 __`LPF`__  is a resonant _low_ pass filter. 2nd order Butterworth. (In the 
 future, this class may be expanded so that order and type of filter can 
 be set).

| LPF.functions                         |
| :------------------------------------ |
| _see [FilterBasic](#FilterBasic)_     |
| see [lp.ck](../examples/filter/lp.ck) |
| [rlp.ck](../examples/filter/rlp.ck)   |

#### HPF

 __`HPF`__  is a resonant _high_ pass filter. 2nd order Butterworth. (In the 
 future, this class may be expanded so that order and type of filter can 
 be set).

| HPF.functions                         |
| :------------------------------------ |
| _see [FilterBasic](#FilterBasic)_     |
| see [hp.ck](../examples/filter/hp.ck) |
| [rhp.ck](../examples/filter/rhp.ck)   |

#### ResonZ

 __`ResonZ`__  Resonance filter. BiQuad with equal-gain zeros. 
 Keeps gain under control independent of frequency.

| ResonZ.functions                              |
| :-------------------------------------------- |
| _see [FilterBasic](#FilterBasic)_             |
| see [resonz.ck](../examples/filter/resonz.ck) |


#### BiQuad

__`BiQuad`__  STK biquad (two-pole, two-zero) filter class. This protected 
Filter subclass implements a two-pole, two-zero digital filter.  A 
method is provided for creating a resonance in the frequency 
response while maintaining a constant filter gain.   
by Perry R. Cook and Gary P. Scavone, 1995 - 2002.

| BiQuad.functions                  | Description                                    |
| :-------------------------------- | :--------------------------------------------- |
| __`float a0(), a0(float)`__       | get/set a0 coefficient                         |
| __`float a1(), a1(float)`__       | get/set a1 coefficient                         |
| __`float a2(), a2(float)`__       | get/set a2 coefficient                         |
| __`float b0(), b0(float)`__       | get/set b0 coefficient                         |
| __`float b1(), b1(float)`__       | get/set b1 coefficient                         |
| __`float b2(), b2(float)`__       | get/set b2 coefficient                         |
| __`float pfreq(), pfreq(float)`__ | get/set resonance frequency (poles)            |
| __`float prad(), prad(float)`__   | get/set pole radius (less than 1 to be stable) |
| __`float zfreq(), zfreq(float)`__ | get/set notch frequency                        |
| __`float zrad(), zrad(float)`__   | get/set zero radius                            |
| __`float norm(), norm(float)`__   | get/set normalization                          |
| __`float eqzs(), eqzs(float)`__   | get/set equal gain zeroes                      |

#### OnePole

__`OnePole`__  This protected Filter subclass implements a 
one-pole digital filter. A method is provided for setting 
the pole position along the real axis of the z-plane while 
maintaining a constant peak filter gain.   
by Perry R. Cook and Gary P. Scavone, 1995 - 2002.

| OnePole.functions                | Description                                      |
| :------------------------------- | :----------------------------------------------- |
| __`float a1(), a1(float)`__      | get/set filter coefficient                       |
| __`float b0(), b0(float)`__       | get/set filter coefficient                       |
| __`float pole(), pole(float)`__  | get/set pole position along real axis of z-plane |


#### TwoPole

__`TwoPole`__  This protected Filter subclass implements
a two-pole digital filter.  A method is provided for 
creating a resonance in the frequency response while 
maintaining a nearly constant filter gain.    
by Perry R. Cook and Gary P. Scavone, 1995 - 2002.

| TwoPole.functions                               | Description                 |
| :---------------------------------------------- | :-------------------------- |
| __`float a1(), a1(float)`__                     | filter coefficient          |
| __`float a2(), a2(float)`__                     | filter coefficient          |
| __`float b0(), b0(float)`__                     | filter coefficient          |
| __`float freq(), freq(float)`__                  | filter resonance frequency  |
| __`float radius(), radius(float)`__             | filter resonance radius     |
| __`float norm(), norm(float)`__                 | toggle filter normalization |
|                                                 |
| see: [powerup.ck](../examples/shred/powerup.ck) |


#### OneZero

 __`OneZero`__  This protected Filter subclass implements
a one-zero digital filter.  A method is provided for setting 
the zero position along the real axis of the z-plane while
maintaining a constant filter gain.  
by Perry R. Cook and Gary P. Scavone, 1995 - 2002.

| OneZero.functions                | Description                |
| :------------------------------- | :------------------------- |
| __`float zero(), zero(float)`__  | get/set zero position      |
| __`float b0(), b0(float)`__      | get/set filter coefficient |
| __`float b1(), b1(float)`__      | get/set filter coefficient |


#### TwoZero

 __`TwoZero`__  This protected Filter subclass implements a 
 two-zero digital filter.  A method is provided for creating a 
"notch" in the frequency response while maintaining a
constant filter gain.    
by Perry R. Cook and Gary P. Scavone, 1995 - 2002.

| TwoZero.functions                   | Description            |
| :---------------------------------- | :--------------------- |
| __`float b0(), b0(float)`__         | filter coefficient     |
| __`float b1(), b1(float)`__         | filter coefficient     |
| __`float b2(), b2(float)`__         | filter coefficient     |
| __`float freq(), freq(float)`__     | filter notch frequency |
| __`float radius(), radius(float)`__ | filter notch radius    |

#### PoleZero

 __`PoleZero`__  This protected Filter subclass implements a 
 one-pole, one-zero digital filter.  A method is provided for 
 creating an allpass filter with a given coefficient. Another 
 method is provided to create a DC blocking filter.  
by Perry R. Cook and Gary P. Scavone, 1995 - 2002.

| PoleZero.functions                        | Description                                         |
| :---------------------------------------- | :-------------------------------------------------- |
| __`float a1(), a1(float)`__               | get/set filter coefficient                          |
| __`float b0(), b0(float)`__               | get/set filter coefficient                          |
| __`float b1(), b1(float)`__               | get/set filter coefficient                          |
| __`float blockZero(), blockZero(float)`__ | get/set DC blocking filter with given pole position |
| __`float allpass(), allpass(float)`__     | get/set allpass filter with given coefficient       |

