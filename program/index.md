${PROGHEADER}

<center>

# ChucK Programmer's Reference

`version ${CHUCKVERS}`

<!--
<img src="/images/on-the-fly_50dpi.jpg" style="width:90%;max-width:600px">
-->

See also [ChucK Language Reference](../language/index.md).

</center>

-----

<center>

### Intro

[ChucK](http://chuck.cs.princeton.edu) is a strongly-typed,
**strongly-timed**, concurrent audio and multimedia programming language.
It is compiled into virtual instructions, which are immediately run in the
ChucK Virtual Machine.  This guide documents the features of the Language,
Compiler, and Virtual Machine for a ChucK programmer.

### ChucK Command Line

[options](vm.md) | [on-the-fly programming](otfp.md)  

### ChucK Programming

#### standard classes and objects

[Std](classes_std.md#std) |
[Math](classes_std.md#math) |
[Machine](classes_std.md#machine) |
[Object](classes_std.md#object) |
[Array](classes_std.md#array) |
[string](classes_std.md#string) |
[Event](classes_std.md#event) |
[Shred](classes_std.md#shred) |
[RegEx](classes_std.md#regex)

#### basic unit generators

<!-- nb: extra eol spaces on some lines cause <br/> -->
[UGen](ugen_basic.md#ugen) |
[UGenStereo](ugen_basic.md#ugenstereo) |
[UGenMulti](ugen_basic.md#ugenmulti) |
[Mix2](ugen_basic.md#mix2) |
[Pan2](ugen_basic.md#pan2)  
[dac](ugen_basic.md#dac) |
[adc](ugen_basic.md#adc) |
[blackhole](ugen_basic.md#blackhole)  
[Gain](ugen_basic.md#gain) |
[Impulse](ugen_basic.md#impulse) |
[Step](ugen_basic.md#step) |
[Noise](ugen_basic.md#noise)  
[Osc](ugen_basic.md#osc) |
[Phasor](ugen_basic.md#phasor) |
[SinOsc](ugen_basic.md#sinosc) |
[TriOsc](ugen_basic.md#triosc) |
[SawOsc](ugen_basic.md#sawosc) |
[SqrOsc](ugen_basic.md#sqrosc) |
[PulseOsc](ugen_basic.md#pulseosc)  
[SndBuf](ugen_basic.md#sndbuf) |
[SndBuf2](ugen_basic.md#sndbuf2)  
[HalfRect](ugen_basic.md#halfrect) |
[FullRect](ugen_basic.md#fullrect)  
[Chubgraph](ugen_basic.md#chubgraph) |
[Chugen](ugen_basic.md#chugen)

#### filters

[FilterBasic](ugen_filters.md#filterbasic) |
[BPF](ugen_filters.md#bpf) |
[BRF](ugen_filters.md#brf) |
[LPF](ugen_filters.md#lpf) |
[HPF](ugen_filters.md#hpf) |
[ResonZ](ugen_filters.md#resonz) |
[BiQuad](ugen_filters.md#biquad)  
[OnePole](ugen_filters.md#onepole) |
[TwoPole](ugen_filters.md#twopole) |
[OneZero](ugen_filters.md#onezero) |
[TwoZero](ugen_filters.md#twozero) |
[PoleZero](ugen_filters.md#polezero)

#### advanced unit generators

[LiSa](ugen_advanced.md#lisa) |
[Dyno](ugen_advanced.md#dyno) |
[CNoise](ugen_advanced.md#cnoise)   
[GenX](ugen_advanced.md#genx) | 
[Gen5](ugen_advanced.md#gen5) |
[Gen7](ugen_advanced.md#gen7) |
[Gen9](ugen_advanced.md#gen7) |
[Gen10](ugen_advanced.md#gen10) |
[Gen17](ugen_advanced.md#gen17)  
[CurveTable](ugen_advanced.md#curvetable) |
[WarpTable](ugen_advanced.md#warptable)

#### chugins - plugin unit generators

[ABSaturator](ugen_chugins.md#absat) |
[AmbPan3](ugen_chugins.md#ambpan3) |
[Bitcrusher](ugen_chugins.md#bitcrusher) |
[MagicSine](ugen_chugins.md#magicsine) |
[KasFilter](ugen_chugins.md#kasfilter) |
[FIR](ugen_chugins.md#fir) |
[Pan4](ugen_chugins.md#pan4) |
[Pan8](ugen_chugins.md#pan8) |
[Pan16](ugen_chugins.md#pan16) |
[Perlin](ugen_chugins.md#perlin) |
[PitchTrack](ugen_chugins.md#pitchtrack) |
[GVerb](ugen_chugins.md#gverb) |
[Mesh2D](ugen_chugins.md#mesh2d) |
[Spectacle](ugen_chugins.md#spectacle) |
[Elliptic](ugen_chugins.md#elliptic) |
[WinFuncEnv](ugen_chugins.md#winfuncenv) |
[PowerADSR](ugen_chugins.md#poweradsr) |
[FoldbackSaturator](ugen_chugins.md#foldbacksaturator) |
[WPDiodeLadder](ugen_chugins.md#wpdiodeladder) |
[WPKorg35](ugen_chugins.md#wpkorg35)

#### synthesis toolkit (stk)

[ADSR](ugen_stk.md#adsr) | [Envelope](ugen_stk.md#envelope) |
[Delay](ugen_stk.md#delay) | [DelayA](ugen_stk.md#delaya) |
[DelayL](ugen_stk.md#delayl) | [Echo](ugen_stk.md#echo) |
[JCRev](ugen_stk.md#jcrev) | [NRev](ugen_stk.md#nrev) | [PRCRev](ugen_stk.md#prcrev) |
[Chorus](ugen_stk.md#chorus) | [Modulate](ugen_stk.md#modulate) |
[PitShift](ugen_stk.md#pitshift) | [SubNoise](ugen_stk.md#subnoise) |
[BLT](ugen_stk.md#blt) | [Blit](ugen_stk.md#blit) | 
[BlitSaw](ugen_stk.md#blitsaw) | [BlitSquare](ugen_stk.md#blitsquare) |
[WvIn](ugen_stk.md#wvin) | [WaveLoop](ugen_stk.md#waveloop) | 
[WvOut](ugen_stk.md#wvout) |
[StkInstrument](ugen_stk.md#stkinstrument) |
[BandedWG](ugen_stk.md#bandedwg) | [BlowBotl](ugen_stk.md#blowbotl) |
[BlowHole](ugen_stk.md#blowhole) | [Bowed](ugen_stk.md#bowed) |
[Brass](ugen_stk.md#brass) | [Clarinet](ugen_stk.md#clarinet) |
[Flute](ugen_stk.md#flute) | [Mandolin](ugen_stk.md#mandolin) |
[ModalBar](ugen_stk.md#modalbar) | [Moog](ugen_stk.md#moog) |
[Saxofony](ugen_stk.md#saxofony) | [Shakers](ugen_stk.md#shakers) |
[Sitar](ugen_stk.md#sitar) | [StifKarp](ugen_stk.md#stifkarp) |
[VoicForm](ugen_stk.md#voicform) | [FM](ugen_stk.md#fm) |
[BeeThree](ugen_stk.md#beethree) | [FMVoices](ugen_stk.md#fmvoices) |
[HevyMetl](ugen_stk.md#hevymetl) | [PercFlut](ugen_stk.md#prcflut) |
[Rhodey](ugen_stk.md#rhodey) | [TubeBell](ugen_stk.md#tubebell) |
[Wurley](ugen_stk.md#wurley)

#### input / output

[IO](io.md#io) |
[FileIO](io.md#io) |
[StdOut](io.md#stdout) |
[StdErr](io.md#stderr)   
[OscIn](io.md#oscin) |
[OscOut](io.md#oscout) |
[OscMsg](io.md#oscmsg)   
[Hid](io.md#hid) |
[HidMsg](io.md#hidmsg) |
[SerialIO](io.md#serialio)  
[MidiIn](io.md#midiin) |
[MidiOut](io.md#midiout) |
[MidiMsg](io.md#midimsg) |
[MidiFileIn](io.md#midifilein)

#### standard unit analyzers

[UAna](uana.md#uana) |
[UAnaBlob](uana.md#uanablob) |
[Windowing](uana.md#windowing) |
[FFT](uana.md#fft) |
[IFFT](uana.md#ifft) |
[DCT](uana.md#dct) |
[IDCT](uana.md#idct)  
[Centroid](uana.md#centroid) |
[Flux](uana.md#flux) |
[RMS](uana.md#rms) |
[RollOff](uana.md#rolloff) |
[ZeroX](uana.md#zerox)  
[Flip](uana.md#flip) |
[pilF](uana.md#pilf) |
[FeatureCollector](uana.md#featurecollector)

</center>

${PROGFOOTER}