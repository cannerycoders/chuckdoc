${PAGEHEADER}

## ChucK : Examples 

The following are sample files which demonstrate basic language features, 
in addition to the new functionality introduced in chuck-v2. All of these 
samples files can be found in the distribution (download page) under the 
folder examples - in either the source download or the executable download.

Examples listed together are variations on a theme, or are intended to be 
run in parallel, like this:

```shell
% chuck moe.ck larry.ck curly.ck
```

or perhaps:
```shell
% chuck otf*.ck
```

--------------------------------------------------------------------------------
### Basic Demonstrations

| Basic Demonstrations                      |                                                                                                          |
| :---------------------------------------- | :------------------------------------------------------------------------------------------------------- |
| time and duration                         | [demo0.ck](basic/demo0.ck)                                                                               |
| variable assignment and use               | [demo1.ck](basic/demo1.ck)                                                                               |
| chucking & unchucking ugens               | [demo2.ck](basic/demo2.ck)                                                                               |
| modulating ugen parameters                | [demo3.ck](basic/demo3.ck)                                                                               |
| using command line arguments              | [args.ck](basic/args.ck)                                                                                 |
| mic input                                 | [adc.ck](basic/adc.ck)                                                                                   |
| ADSR method                               | [adsr.ck](basic/adsr.ck)                                                                                 |
| a chuckian alarm clock (no warranties!)   | [alarm.ck](basic/alarm.ck)                                                                               |
| digital delay                             | [delay.ck](basic/delay.ck)                                                                               |
| simple comb filter using Delay            | [comb.ck](basic/comb.ck)                                                                                 |
| echo effect                               | [echo.ck](basic/echo.ck)                                                                                 |
| using Envelope                            | [envelope.ck](basic/envelope.ck)                                                                         |
| knuckleheads (time shifted phase locking) | [larry.ck](basic/larry.ck), [curly.ck](basic/curly.ck), [moe.ck](basic/moe.ck)                           |
| knuckleheads++ (with glottal voicing)     | [larry++.ck](basic/larry++.ck), [curly++.ck](basic/curly++.ck), [moe++.ck](basic/moe++.ck)               |
| function demo                             | [func.ck](basic/func.ck)                                                                                 |
| po-tweet!                                 | [chirp.ck](basic/chirp.ck), [chirp2.ck](basic/chirp2.ck)                                                 |
| the uh, whole tone scale                  | [whole.ck](basic/whole.ck)                                                                               |
| sinosc + blit (bandlimited oscillators)   | [foo.ck](basic/foo.ck), [foo2.ck](basic/foo2.ck), [blit.ck](basic/blit.ck), [blit2.ck](basic/blit2.ck)   |
| FM synthesis "by hand"                    | [fm.ck](basic/fm.ck)                                                                                     |
| FM synthesis with two sinosc              | [fm2.ck](basic/fm2.ck)                                                                                   |
| FM (actual frequency modulation)          | [fm3.ck](basic/fm3.ck)                                                                                   |
| oscillators                               | [osillatronx](basic/oscillatronx.ck)                                                                     |
| mic input and simple comb filter          | [i-robot.ck](basic/i-robot.ck)                                                                           |
| impulse generator                         | [imp.ck](basic/imp.ck)                                                                                   |
| low-frequency oscillator                  | [lfo](basic/lfo.ck)                                                                                      |
| recording (via WvOut)                     | [rec.ck](basic/rec.ck), [rec-auto.ck](basic/rec-auto.ck), [rec-auto-stereo.ck](basic/rec-auto-stereo.ck) |
| clocks (useful when recording and other)  | [tick.ck](basic/tick.ck), [tick2.ck](basic/tick2.ck)                                                     |
| basic ring-mod (demonstrate ugen input)   | [ring.ck](basic/ring.ck)                                                                                 |
| sndbuf (file read/write/playback)         | [sndbuf.ck](basic/sndbuf.ck)                                                                             |
| sndbuf.valueat() - random access samples  | [valueat.ck](basic/valueat.ck)                                                                           |
| step ugen                                 | [step.ck](basic/step.ck)                                                                                 |
| unchuck                                   | [unchuck.ck](basic/unchuck.ck)                                                                           |
| whirl                                     | [whirl.ck](basic/whirl.ck)                                                                               |
| noise & filters                           | [wind.ck](basic/wind.ck), [wind2.ck](basic/wind2.ck)                                                     |
| function test                             | [zerox.ck](basic/zerox.ck)                                                                               |
| math.isinf() also math.isnan()            | [infnan.ck](basic/infnan.ck)                                                                             |
| help - built-in help                      | [help.ck](help.ck)                                                                                       |


--------------------------------------------------------------------------------
### Deep Stuff

| Deep Stuff                                   |                                 |
| :------------------------------------------- | :------------------------------ |
| formant-based singing synthesis              | [chant.ck](deep/chant.ck)       |
| audio dithering "by hand"                    | [dither.ck](deep/dither.ck)     |
| how phones dial                              | [dtmf.ck](deep/dtmf.ck)         |
| one pole envelope follower                   | [follower.ck](deep/follower.ck) |
| karplus strong plucked string                | [plu.ck](deep/plu.ck)           |
| plucked string with mandolin body excitation | [plu2.ck](deep/plu2.ck)         |
| tuned plucked string (a la jaffe/smith)      | [plu3.ck](deep/plu3.ck)         |
| say "ChucK" through synthesis                | [say-chu.ck](deep/say-chu.ck)   |
| Continuous shepard-risset tone generator     | [shepard.ck](deep/shepard.ck)   |
| THX Deep Note emulator                       | [thx.ck](deep/thx.ck)           |
| Reich's Clapping Music using glottal pulses  | [unclap.ck](deep/unclap.ck)     |

--------------------------------------------------------------------------------
### More Fun Experiments

| More Fun Experiments <a name="other"></a>  |                                                                                                                                                                        |
| :----------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| variations on towers of hanoi sonification | [hanoi.ck](hanoi.ck), [hanoi++.ck](hanoi++.ck), [hanoi2.ck](hanoi2.ck), [hanoi3.ck](hanoi3.ck)                                                                         |
| on-the-fly synchronization (concurrent)    | [otf_01.ck](otf_01.ck), [otf_02.ck](otf_02.ck), [otf_03.ck](otf_03.ck), [otf_04.ck](otf_04.ck), [otf_05.ck](otf_05.ck), [otf_06.ck](otf_06.ck), [otf_07.ck](otf_07.ck) |


--------------------------------------------------------------------------------
### Special

| Special    |                                                                                                                                                                                                                                                                                                                                                                        |
| :--------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Dynamics   | [Dyno-compress.sk](special/Dyno-compress.ck), [Dyno-duck.ck](special/Dyno-duck.ck), [Dyno-limit.ck](special/Dyno-limit.ck)                                                                                                                                                                                                                                             |
| GenX       | [readme-GenX.ck](special/readme-GenX.ck), [Gen10-test.sk](special/Gen10-test.ck), [Gen17-test.sk](special/Gen17-test.ck), [Gen5-test.sk](special/Gen5-test.ck), [Gen7-test.sk](special/Gen7-test.ck), [Gen9-test.sk](special/Gen9-test.ck)                                                                                                                             |
| CurveTable | [GenX-CurveTable-test.ck](special/GenX-CurveTable-test.ck)                                                                                                                                                                                                                                                                                                             |
| WarpTable  | [GenX-WarpTable-test.ck](special/GenX-WarpTable-test.ck)                                                                                                                                                                                                                                                                                                               |
 
--------------------------------------------------------------------------------
## Language Features

These files demonstrate and/or test the features described in each section 
of the [ChucK Language Specification](/language/index.md).


| Types <a name="type"></a>            |                                                      |
| :----------------------------------- | :--------------------------------------------------- |
| survey of chuck's primitive types    | [type_primitives.ck](type/type_primitives.ck)        |
| Object type                          | [type_object.ck](type/type_object.ck)                |
| Analysis types (polar, complex)      | [type_analysis.ck](type/type_analysis.ck)            |
| Vectors 3D + 4D                      | [vec3.ck](vector/vec3.ck), [vec4.ck](vector/vec4.ck) |
| Using vec3 as a slewing interpolator | [interpolate.ck](vector/interpolate.ck)              |

| Arrays <a name="array"></a>           |                                                  |
| :------------------------------------ | :----------------------------------------------- |
| store and retrieve values             | [array_storage.ck](array/array_storage.ck)       |
| array @=> assignment                  | [array_assign.ck](array/array_assign.ck)         |
| instantiating multidimensional arrays | [array_mdim.ck](array/array_mdim.ck)             |
| reassigning sub-arrays                | [array_sub_assign.ck](array/array_sub_assign.ck) |
| array as function argument            | [array_argument.ck](array/array_argument.ck)     |
| mixed associative and linear array    | [array_mmixed.ck](array/array_mmixed.ck)         |
| array resizing                        | [array_resize.ck](array/array_resize.ck)         |
| dynamically sized array               | [array_dynamic.ck](array/array_dynamic.ck)       |

| Operators                |                                                                                    |
| :----------------------- | :--------------------------------------------------------------------------------- |
| operators for assignment | [oper_assign.ck](oper/oper_assign.ck)                                              |
| logical operators        | [oper_logic.ck](oper/oper_logic.ck)                                                |
| pre/post increment       | [oper_pre_inc.ck](oper/oper_pre_inc.ck), [oper_post_inc.ck](oper/oper_post_inc.ck) |
| arithmetic operators     | [oper_arith_chuck.ck](oper/oper_arith_chuck.ck)                                    |

| Time & Timing <a name="time"></a> |                                               |
| :-------------------------------- | :-------------------------------------------- |
| time and duration                 | [time_types.ck](time/time_tyeps.ck)           |
| reasoning about time              | [time_operations.ck](time/time_operations.ck) |

| Control Structures <a name="ctrl"></a> |                                                   |
| :------------------------------------- | :------------------------------------------------ |
| for loop                               | [ctrl_for_loop.ck](ctrl/ctlr_for_loop.ck)         |
| until                                  | [ctrl_until.ck](ctrl/ctrl_until.ck)               |
| do-until                               | [ctrl_do_until.ck](ctrl/ctrl_do_until.ck)         |
| break                                  | [ctrl_break.ck](ctrl/ctrl_break.ck)               |
| break w/ nesting                       | [ctrl_break_nested.ck](ctrl/ctrl_break_nested.ck) |
| continue w/ nested blocks              | [ctrl_continue.ck](ctrl/ctrl_continue.ck)         |
| Philip's sequencer                     | [ctrl_sequencer.ck](ctrl/ctrl_sequencer.ck)       |

| Functions <a name="func"></a> |                                                                                                                                                                                                  |
| :---------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| function overloading          | [func_overload.ck](func/func_overload.ck), [func_overload_member.ck](func/func_overload_member.ck), [func_overload_multi.ck](func/func_overload_multi.ck), [func_doozey.ck](func/func_doozey.ck) |
| recursive functions           | [func_recursion.ck](func/func_recursion.ck)                                                                                                                                                      |
| objects as function arguments | [func_obj_arg.ck](func/func_obj_arg.ck)                                                                                                                                                          |
| chucking to void function     | [func_void.ck](func/func_void.ck)                                                                                                                                                                |

| Shreds & Concurrency <a name="spork"></a> |                                                           |
| :---------------------------------------- | :-------------------------------------------------------- |
| sporking shreds                           | [spork.ck](shred/spork.ck),  [spork2.ck](shred/spork2.ck) |
| sporking many shreds                      | [powerup.ck](shred/powerup.ck)                            |
| machine.add() .remove() .replace()        | [machine.ck](shred/machine.ck)                            |
| machine.dir()                             | [dir.ck](shred/dir.ck)                                    |

## Tools and Techniques

These examples demonstrate pratical tools ranging from unit generators, 
events, mouse / keyboard / joystick input, file I/O, MIDI, Open Sound 
Control, how to extend ChucK unit generators, and more.


### Classes and Objects

| Classes & Objects <a name='class' />  |                             |
| :------------------------------------ | :-------------------------- |
| Dinky instrument implemented as class | [dinky.ck](class/.dinky.ck) |
| a file that uses the class Dinky      | [try.ck](class/try.ck)      |

### Extending ChucK Unit Generators

| Extend                        |                                       |
| :---------------------------- | :------------------------------------ |
| chugraph                      | [chugraph.ck](extend/chugraph.ck)     |
| chugraph2                     | [chugraph2.ck](extend/chugraph2.ck)   |
| chugraph2a                    | [chugraph2a.ck](extend/chugraph2a.ck) |
| chugen (rhymes with 'ugen')   | [chugen.ck](extend/chugen.ck)         |
| chugin (rhymes with 'plugin') |                                       |


### Events

| Events                                    |                                                                                  |
| :---------------------------------------- | :------------------------------------------------------------------------------- |
| event broadcast method                    | [broadcast.ck](event/broadcast.ck)                                               |
| event signal method                       | [signal.ck](event/signal.ck), [signal4.ck](event/signal4.ck)                     |
| extending events (creating custom events) | [event_extend.ck](event/event_extend.ck)                                         |
| typing-based instrument                   | [clix.ck](event/clix.ck), [clix2.ck](event/clix2.ck), [clix3.ck](event/clix3.ck) |
| more keyboard events                      | [kb.ck](event/kb.ck), [kb2.ck](event/kb2.ck)                                     |

### Input/Output

| I/O examples   |                                 |
| :------------- | :------------------------------ |
| stdout (chout) | [chout.ck](io/chout.ck)         |
| read-int       | [read-int.ck](io/read-int.ck)   |
| read-line      | [read-line.ck](io/read-line.ck) |
| read-str       | [read-str.ck](io/read-str.ck)   |
| write          | [write.ck](io/write.ck)         |
| write2         | [write.ck](io/write2.ck)        |


### HID Input (Joystick, Mouse, Keyboard)

| Events/HID (Human Interface Devices) |                                                                                                                      |
| :----------------------------------- | :------------------------------------------------------------------------------------------------------------------- |
| Joystick demo                        | [joy.ck](hid/joy.ck), [joy-fm.ck](hid/joy-fm.ck), [joy-noise.ck](hid/joy-noise.ck), [joy-shake.ck](hid/joy-shake.ck) |
| Mouse demo                           | [mouse-fm.ck](hid/mouse-fm.ck)                                                                                       |
| Keyboard demo                        | [kb.ck](hid/kb.ck), [keyboard-organ.ck](hid/kb-organ.ck), [kb2.ck](hid/kb2-ck)                                       |
| Tilt demo                            | [tilt.ck](hid/tilt.ck)                                                                                               |


### MIDI

| Events/MIDI     |                                                                    |
| :-------------- | :----------------------------------------------------------------- |
| MIDI event demo | [gomidi.ck](midi/gomidi.ck), [gomidi2.ck](midi/gomidi2.ck)         |
| MIDI polyphony  | [polyfony.ck](midi/polyfony.ck), [polyfony2.ck](midi/polyfony2.ck) |
| MIDI file demo  | [midifile-play.ck](midi/midifile-play.ck)                          |
| MIDI out        | [midiout.ck](midi/midiout.ck)                                      |


### Open Sound Control (OSC)

| Events/OSC (Open Sound Control)          |                                                        |
| :--------------------------------------- | :----------------------------------------------------- |
| OSC message event demo (run in parallel) | [s.ck (sender)](osc/s.ck), [r.ck (receiver)](osc/r.ck) |
| OSC dump                                 | [osc-dump.ck](osc/osc-dump.ck)                         |


### Serial I/O

| Serial examples        |                                                                                                     |
| :--------------------- | :-------------------------------------------------------------------------------------------------- |
| reading bytes          | [byte.ck](serial/byte.ck), [bytes.ck](serial/bytes.ck)                                              |
| reading ascii/binary   | [ints.ck](serial/ints.ck), [ints-ascii.ck](serial/ints-ascii.ck), [ints-bin.ck](serial/ints-bin.ck) |
| lines                  | [lines.ck](serial/lines.ck)                                                                         |
| writing                | [write.ck](serial/write.ck), [write-bytes.ck](serial/write-bytes.ck)                                |
| listing serial devices | [list.ck](serial/list.ck)                                                                           |
| arduino                | [ckserial.ino](serial/arduino/ckserial.ino)                                                         |


### Stereo / Multi-channel

| Stereo examples                |                                                                                         |
| :----------------------------- | :-------------------------------------------------------------------------------------- |
| Stereo noise (using Pan2)      | [stereo-noise.ck](stereo/stereo-noise.ck)                                               |
| Stereo powerup                 | [powerup2.ck](stereo/powerup2.ck)                                                       |
| Stereo => arrays of mono UGens | [ugen-array.ck](stereo/ugen-array.ck)                                                   |
| Stereo Stooges                 | [curly2.ck](stereo/curly2.ck), [larry2.ck](stereo/larry2.ck), [moe2.ck](stereo/moe2.ck) |
| Multi-channel demos            | [n-chan(i)](multi/i.ck), [n-chan(n)](multi/n.ck), [we-robot.ck](multi/we-robot.ck)      |


### Live Sampling and Granular Synthesis Using LiSa

| LiSA                                             |                                                                                                                                                                                                   |
| :----------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Basics of live sampling using LiSA               | [readme-Lisa1.ck](special/readme-LiSa1.ck), [readme-Lisa2.ck](special/readme-LiSa2.ck)                                                                                                            |
| Live sampling simple looping                     | [Lisa-simplelooping.ck](special/LiSa-simplelooping.ck)                                                                                                                                            |
| Granular sampling examples                       | [LiSa-munger1.ck](special/LiSa-munger1.ck), [LiSa-munger1.ck](special/LiSa-munger1.ck), [LiSa-munger1.ck](special/LiSa-munger1.ck)                                                                |
| Granular synthesis examples from Twilight (2013) | [twilight-granular-kb.ck](special/twilight/twilight-granular-kb.ck), [twilight-granular-kb-interp.ck](special/twilight/twilight-granular-kb-interp.ck)                                            |
| Loading an audio file into a LiSa                | [Lisa-load.ck](special/LiSa-load.ck)                                                                                                                                                              |
| LiSa tracking mode examples                      | [LiSa-track1](special/LiSa-track1.ck), [LiSa-track2](special/LiSa-track2.ck), [LiSa-track3](special/LiSa-track3.ck), [LiSa-track4](special/LiSa-track4.ck), [LiSa-track5](special/LiSa-track5.ck) |
| Input-driven LiSa trigger                        | [LiSa-trigger.ck](special/LiSa-trigger.ck)                                                                                                                                                        |


### String Utilities

| String Utilities                            |                                                                |
| :------------------------------------------ | :------------------------------------------------------------- |
| String operations                           | [strops.ck](string/strops.ck), [strops2.ck](string/strops2.ck) |
| String escape sequences                     | [escape.ck](string/escape.ck)                                  |
| String input + tokenize (hacked; temporary) | [readline.ck](string/readline.ck), [token.ck](string/token.ck) |

--------------------------------------------------------------------------------
### Unit Generators

| STK (Synthesis ToolKit) demos |                                                                                                                                                                   |
| :---------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| BandedWG (Banded Waveguide)   | [bandedwg.ck](stk/bandedwg.ck), [band-o-matic.ck](stk/bandedwg2.ck])                                                                                              |
| BlowBotl                      | [blowbotl.ck](stk/blowbotl.ck), [blowbotl2.ck](stk/blowbotl2.ck)                                                                                                  |
| BlowHole                      | [blowhole.ck](stk/blowhole.ck)                                                                                                                                    |
| Bowed                         | [bowed.ck](stk/bowed.ck)                                                                                                                                          |
| Brass                         | [brass.ck](stk/bowed.ck)                                                                                                                                          |
| Clarinet                      | [clarinet.ck](stk/clarinet.ck)                                                                                                                                    |
| Flute                         | [flute.ck](stk/flute.ck)                                                                                                                                          |
| French Horn                   | [frenchhrn-algo2.ck](stk/frenchrn-algo2.ck)                                                                                                                       |
| HevyMetl                      | [hevymetl-acoustic-algo3](stk/hevymetl-acoustic-algo3.ck), [hevymetl-algo3.ck](stk/hevymetl-algo3.ck), [hevymetl-trumpet-algo3.ck](stk/hevymetl-trumpet-algo3.ck), [hevymetl-dance-now](stk/hevymetl-dance-now.ck)|
| HonkeyTonk                    | [honkeytonk-algo1.ck](stk/honkeytonk-algo1.ck)                                                                                                                    |
| Krystal Choir                 | [krstlchr-algo7.ck](stk/krstlchr-algo7.ck)                                                                                                                        |
| ModalBar                      | [modalbar.ck](stk/modalbar.ck), [mode-o-test.ck](stk/mode-o-test.ck), [mode-o-matic.ck](stk/mode-o-matic.ck)                                                      |
| Moog (r.i.p. bob)             | [moog.ck](stk/moog.ck), [moogie.ck](stk/moogie.ck)                                                                                                                |
| Rhodey (Rhodes synth)         | [rhodey.ck](stk/rhodey.ck)                                                                                                                                        |
| Saxofony                      | [saxofony.ck](stk/saxofony.ck)                                                                                                                                    |
| Shakers                       | [shake-o-matic.ck](stk/shake-o-matic.ck)                                                                                                                          |
| Sitar                         | [sitar.ck](stk/sitar.ck)                                                                                                                                          |
| StifKarp                      | [stifkarp.ck](stk/stifkarp.ck), [stif-o-karp.ck](stk/stif-o-karp.ck)                                                                                              |
| VoicForm                      | [voic-o-form.ck](stk/voic-o-form.ck)                                                                                                                              |
| Wurley (Wurlitzer model)      | [wurley.ck](stk/wurley.ck), [wurley2.ck](stk/wurley2.ck), [wurley3.ck](stk/wurley3.ck)                                                                            |

--------------------------------------------------------------------------------

<a name="uana"></a>

### Unit Analyzers 

| Transformations                       |                                                                                           |
| :------------------------------------ | :---------------------------------------------------------------------------------------- |
| Finding the pitch of a note           | [autocorr.ck](analysis/autocorr.ck)                                                       |
| Silliness with FeatureCollector       | [concat.ck](analysis/concat.ck)                                                           |
| FFT                                   | [fft.ck](analysis/fft.ck), [fft2.ck](analysis/fft2.ck), [fft3.ck](analysis/fft2.ck)       |
| IFFT                                  | [ifft.ck](analysis/ifft.ck), [ifft2.ck](analysis/ifft2.ck), [ifft3.ck](analysis/ifft3.ck) |
| DCT                                   | [dct.ck](analysis/dct.ck)                                                                 |
| Windowing                             | [win.ck](analysis/win.ck)                                                                 |
| (really bad) spectral cross-synthesis | [xsynth.ck](analysis/xsynth.ck)                                                           |
| calculate signal delay                | [xcorr.ck](analysis/xcorr.ck)                                                             |

| Feature Extractors |                                                                                          |
| :----------------- | :--------------------------------------------------------------------------------------- |
| Centroid           | [centroid.ck](analysis/features/centroid.ck)                                             |
| Flux               | [flux.ck](analysis/features/flux.ck), [flux0.ck](analysis/features/flux0.ck)             |
| RMS                | [rms.ck](analysis/features/rms.ck)                                                       |
| RollOff            | [rolloff.ck](analysis/features/rolloff.ck), [rolloff2.ck](analysis/features/rolloff2.ck) |
| Zero Crossing      | [zerox.ck](analysis/features/zerox.ck)                                                   |

| Tracking                                |                                                      |
| :-------------------------------------- | :--------------------------------------------------- |
| harmonize (with Tracking and Smacking)  | [harm.ck](analysis/tracking/harm.ck)                 |
| rough pitch tracking                    | [pitch-track.ck](analysis/tracking/pitch-track.ck)   |
| rough pitch tracking + major third      | [pitch-third.ck](analysis/tracking/pitch-third.ck)   |
| rough pitch tracking + perfect fifth    | [pitch-fifth.ck](analysis/tracking/pitch-fifth.ck)   |
| rough pitch tracking + dominant seventh | [pitch-fifth.ck](analysis/tracking/pitch-seventh.ck) |
| Smacking - track 'smack' events         | [Smacking.ck](analysis/tracking/Smacking.ck)         |
| Tracking - track peak amplitude via FFT | [Tracking.ck](analysis/tracking/Tracking.ck)         |

--------------------------------------------------------------------------------
## [Programming for Musicians and Digital Artists: Creating music with ChucK](https://www.manning.com/books/programming-for-musicians-and-digital-artists)

### chapter1
| chapter1                                                                       |
| :----------------------------------------------------------------------------- |
| [Listing1.1.ck](book/digital-artists/chapter1/Listing1.1.ck)                   |
| [Listing1.2.ck](book/digital-artists/chapter1/Listing1.2.ck)                   |
| [Listing1.3.ck](book/digital-artists/chapter1/Listing1.3.ck)                   |
| [Listing1.4.ck](book/digital-artists/chapter1/Listing1.4.ck)                   |
| [Listing1.5.ck](book/digital-artists/chapter1/Listing1.5.ck)                   |
| [Listing1.6.ck](book/digital-artists/chapter1/Listing1.6.ck)                   |
| [Listing1.7.ck](book/digital-artists/chapter1/Listing1.7.ck)                   |
| [Listing1.8.ck](book/digital-artists/chapter1/Listing1.8.ck)                   |
| [Listing1.9.ck](book/digital-artists/chapter1/Listing1.9.ck)                   |
| [Listing1.10.ck](book/digital-artists/chapter1/Listing1.10.ck)                 |
| [Listing1.11.ck](book/digital-artists/chapter1/Listing1.11.ck)                 |
| [Listing1.12.ck](book/digital-artists/chapter1/Listing1.12.ck)                 |
| [Listing1.13.ck](book/digital-artists/chapter1/Listing1.13.ck)                 |
| [Listing1.14.ck](book/digital-artists/chapter1/Listing1.14.ck)                 |
| [Listing1.15.ck](book/digital-artists/chapter1/Listing1.15.ck)                 |
| [Listing1.16.ck](book/digital-artists/chapter1/Listing1.16.ck)                 |
| [Listing1.17.ck](book/digital-artists/chapter1/Listing1.17.ck)                 |
| [Listing1.18.ck](book/digital-artists/chapter1/Listing1.18.ck)                 |
| [Listing1.19.ck](book/digital-artists/chapter1/Listing1.19.ck)                 |
| [Listing1.20.ck](book/digital-artists/chapter1/Listing1.20.ck)                 |
| [Listing1.7Shorthand.ck](book/digital-artists/chapter1/Listing1.7Shorthand.ck) |
| [WowExample.ck](book/digital-artists/chapter1/WowExample.ck)                   |
### chapter2
| chapter2                                                     |
| :----------------------------------------------------------- |
| [Listing2.1.ck](book/digital-artists/chapter2/Listing2.1.ck) |
| [Listing2.2.ck](book/digital-artists/chapter2/Listing2.2.ck) |
| [Listing2.3.ck](book/digital-artists/chapter2/Listing2.3.ck) |
| [Listing2.4.ck](book/digital-artists/chapter2/Listing2.4.ck) |
| [Listing2.5.ck](book/digital-artists/chapter2/Listing2.5.ck) |
| [Listing2.6.ck](book/digital-artists/chapter2/Listing2.6.ck) |
| [Listing2.7.ck](book/digital-artists/chapter2/Listing2.7.ck) |
| [Listing2.8.ck](book/digital-artists/chapter2/Listing2.8.ck) |
### chapter3
| chapter3                                                     |
| :----------------------------------------------------------- |
| [Listing3.1.ck](book/digital-artists/chapter3/Listing3.1.ck) |
| [Listing3.2.ck](book/digital-artists/chapter3/Listing3.2.ck) |
| [Listing3.3.ck](book/digital-artists/chapter3/Listing3.3.ck) |
| [Listing3.4.ck](book/digital-artists/chapter3/Listing3.4.ck) |
| [Listing3.5.ck](book/digital-artists/chapter3/Listing3.5.ck) |
| [Listing3.6.ck](book/digital-artists/chapter3/Listing3.6.ck) |
| [Listing3.7.ck](book/digital-artists/chapter3/Listing3.7.ck) |
| [Listing3.8.ck](book/digital-artists/chapter3/Listing3.8.ck) |
### chapter4
| chapter4                                                       |
| :------------------------------------------------------------- |
| [Listing4.1.ck](book/digital-artists/chapter4/Listing4.1.ck)   |
| [Listing4.2.ck](book/digital-artists/chapter4/Listing4.2.ck)   |
| [Listing4.3.ck](book/digital-artists/chapter4/Listing4.3.ck)   |
| [Listing4.4.ck](book/digital-artists/chapter4/Listing4.4.ck)   |
| [Listing4.5.ck](book/digital-artists/chapter4/Listing4.5.ck)   |
| [Listing4.6.ck](book/digital-artists/chapter4/Listing4.6.ck)   |
| [Listing4.7.ck](book/digital-artists/chapter4/Listing4.7.ck)   |
| [Listing4.8.ck](book/digital-artists/chapter4/Listing4.8.ck)   |
| [Listing4.9.ck](book/digital-artists/chapter4/Listing4.9.ck)   |
| [Listing4.10.ck](book/digital-artists/chapter4/Listing4.10.ck) |
| [Listing4.11.ck](book/digital-artists/chapter4/Listing4.11.ck) |
| [Listing4.12.ck](book/digital-artists/chapter4/Listing4.12.ck) |
### chapter5
| chapter5                                                       |
| :------------------------------------------------------------- |
| [Listing5.1.ck](book/digital-artists/chapter5/Listing5.1.ck)   |
| [Listing5.2.ck](book/digital-artists/chapter5/Listing5.2.ck)   |
| [Listing5.3.ck](book/digital-artists/chapter5/Listing5.3.ck)   |
| [Listing5.4.ck](book/digital-artists/chapter5/Listing5.4.ck)   |
| [Listing5.5.ck](book/digital-artists/chapter5/Listing5.5.ck)   |
| [Listing5.6.ck](book/digital-artists/chapter5/Listing5.6.ck)   |
| [Listing5.7.ck](book/digital-artists/chapter5/Listing5.7.ck)   |
| [Listing5.8.ck](book/digital-artists/chapter5/Listing5.8.ck)   |
| [Listing5.9.ck](book/digital-artists/chapter5/Listing5.9.ck)   |
| [Listing5.10.ck](book/digital-artists/chapter5/Listing5.10.ck) |
| [Listing5.11.ck](book/digital-artists/chapter5/Listing5.11.ck) |
| [Listing5.12.ck](book/digital-artists/chapter5/Listing5.12.ck) |
| [Listing5.13.ck](book/digital-artists/chapter5/Listing5.13.ck) |
| [Listing5.14.ck](book/digital-artists/chapter5/Listing5.14.ck) |
| [Listing5.15.ck](book/digital-artists/chapter5/Listing5.15.ck) |
| [Listing5.16.ck](book/digital-artists/chapter5/Listing5.16.ck) |
| [Listing5.17.ck](book/digital-artists/chapter5/Listing5.17.ck) |
| [Listing5.18.ck](book/digital-artists/chapter5/Listing5.18.ck) |
| [Listing5.19.ck](book/digital-artists/chapter5/Listing5.19.ck) |
| [Listing5.20.ck](book/digital-artists/chapter5/Listing5.20.ck) |
### chapter6
| chapter6                                                       |
| :------------------------------------------------------------- |
| [Listing6.1.ck](book/digital-artists/chapter6/Listing6.1.ck)   |
| [Listing6.2.ck](book/digital-artists/chapter6/Listing6.2.ck)   |
| [Listing6.3.ck](book/digital-artists/chapter6/Listing6.3.ck)   |
| [Listing6.4.ck](book/digital-artists/chapter6/Listing6.4.ck)   |
| [Listing6.5.ck](book/digital-artists/chapter6/Listing6.5.ck)   |
| [Listing6.6.ck](book/digital-artists/chapter6/Listing6.6.ck)   |
| [Listing6.7.ck](book/digital-artists/chapter6/Listing6.7.ck)   |
| [Listing6.8.ck](book/digital-artists/chapter6/Listing6.8.ck)   |
| [Listing6.9.ck](book/digital-artists/chapter6/Listing6.9.ck)   |
| [Listing6.10.ck](book/digital-artists/chapter6/Listing6.10.ck) |
| [Listing6.11.ck](book/digital-artists/chapter6/Listing6.11.ck) |
| [Listing6.12.ck](book/digital-artists/chapter6/Listing6.12.ck) |
| [Listing6.13.ck](book/digital-artists/chapter6/Listing6.13.ck) |
| [Listing6.14.ck](book/digital-artists/chapter6/Listing6.14.ck) |
| [Listing6.15.ck](book/digital-artists/chapter6/Listing6.15.ck) |
### chapter7
| chapter7                                                       |
| :------------------------------------------------------------- |
| [Listing7.1.ck](book/digital-artists/chapter7/Listing7.1.ck)   |
| [Listing7.2.ck](book/digital-artists/chapter7/Listing7.2.ck)   |
| [Listing7.3.ck](book/digital-artists/chapter7/Listing7.3.ck)   |
| [Listing7.4.ck](book/digital-artists/chapter7/Listing7.4.ck)   |
| [Listing7.5.ck](book/digital-artists/chapter7/Listing7.5.ck)   |
| [Listing7.6.ck](book/digital-artists/chapter7/Listing7.6.ck)   |
| [Listing7.7.ck](book/digital-artists/chapter7/Listing7.7.ck)   |
| [Listing7.8.ck](book/digital-artists/chapter7/Listing7.8.ck)   |
| [Listing7.9.ck](book/digital-artists/chapter7/Listing7.9.ck)   |
| [Listing7.10.ck](book/digital-artists/chapter7/Listing7.10.ck) |
| [Listing7.11.ck](book/digital-artists/chapter7/Listing7.11.ck) |
| [Listing7.12.ck](book/digital-artists/chapter7/Listing7.12.ck) |
| [Listing7.13.ck](book/digital-artists/chapter7/Listing7.13.ck) |
| [Listing7.14.ck](book/digital-artists/chapter7/Listing7.14.ck) |
| [Listing7.15.ck](book/digital-artists/chapter7/Listing7.15.ck) |
| [Listing7.16.ck](book/digital-artists/chapter7/Listing7.16.ck) |
| [Listing7.17.ck](book/digital-artists/chapter7/Listing7.17.ck) |
| [Listing7.18.ck](book/digital-artists/chapter7/Listing7.18.ck) |
| [TryThis.ck](book/digital-artists/chapter7/TryThis.ck)         |
### chapter8
| chapter8                                                       |
| :------------------------------------------------------------- |
| [Listing8.1.ck](book/digital-artists/chapter8/Listing8.1.ck)   |
| [Listing8.2.ck](book/digital-artists/chapter8/Listing8.2.ck)   |
| [Listing8.3.ck](book/digital-artists/chapter8/Listing8.3.ck)   |
| [Listing8.4.ck](book/digital-artists/chapter8/Listing8.4.ck)   |
| [Listing8.5.ck](book/digital-artists/chapter8/Listing8.5.ck)   |
| [Listing8.6.ck](book/digital-artists/chapter8/Listing8.6.ck)   |
| [Listing8.7.ck](book/digital-artists/chapter8/Listing8.7.ck)   |
| [Listing8.8.ck](book/digital-artists/chapter8/Listing8.8.ck)   |
| [Listing8.9.ck](book/digital-artists/chapter8/Listing8.9.ck)   |
| [Listing8.10.ck](book/digital-artists/chapter8/Listing8.10.ck) |
| [bass.ck](book/digital-artists/chapter8/bass.ck)               |
| [drums.ck](book/digital-artists/chapter8/drums.ck)             |
| [flute.ck](book/digital-artists/chapter8/flute.ck)             |
| [initialize.ck](book/digital-artists/chapter8/initialize.ck)   |
| [piano.ck](book/digital-artists/chapter8/piano.ck)             |
| [score.ck](book/digital-artists/chapter8/score.ck)             |
### chapter9
| chapter9                                                       |
| :------------------------------------------------------------- |
| [BPM.ck](book/digital-artists/chapter9/BPM.ck)                 |
| [Listing9.1.ck](book/digital-artists/chapter9/Listing9.1.ck)   |
| [Listing9.2.ck](book/digital-artists/chapter9/Listing9.2.ck)   |
| [Listing9.3.ck](book/digital-artists/chapter9/Listing9.3.ck)   |
| [Listing9.4.ck](book/digital-artists/chapter9/Listing9.4.ck)   |
| [Listing9.5.ck](book/digital-artists/chapter9/Listing9.5.ck)   |
| [Listing9.6.ck](book/digital-artists/chapter9/Listing9.6.ck)   |
| [Listing9.7.ck](book/digital-artists/chapter9/Listing9.7.ck)   |
| [Listing9.8.ck](book/digital-artists/chapter9/Listing9.8.ck)   |
| [Listing9.9.ck](book/digital-artists/chapter9/Listing9.9.ck)   |
| [Listing9.10.ck](book/digital-artists/chapter9/Listing9.10.ck) |
| [Listing9.18.ck](book/digital-artists/chapter9/Listing9.18.ck) |
| [Listing9.19.ck](book/digital-artists/chapter9/Listing9.19.ck) |
| [MyScore.ck](book/digital-artists/chapter9/MyScore.ck)         |
| [UseBPM.ck](book/digital-artists/chapter9/UseBPM.ck)           |
| [UseBPM2.ck](book/digital-artists/chapter9/UseBPM2.ck)         |
| [UseBPM3.ck](book/digital-artists/chapter9/UseBPM3.ck)         |
| [initialize.ck](book/digital-artists/chapter9/initialize.ck)   |
#### Drum Machine
| Drum Machine                                                               |
| :------------------------------------------------------------------------- |
| [BPM.ck](book/digital-artists/chapter9/DrumMachine/BPM.ck)                 |
| [Listing9.11.ck](book/digital-artists/chapter9/DrumMachine/Listing9.11.ck) |
| [Listing9.12.ck](book/digital-artists/chapter9/DrumMachine/Listing9.12.ck) |
| [Listing9.13.ck](book/digital-artists/chapter9/DrumMachine/Listing9.13.ck) |
| [Listing9.14.ck](book/digital-artists/chapter9/DrumMachine/Listing9.14.ck) |
| [Listing9.15.ck](book/digital-artists/chapter9/DrumMachine/Listing9.15.ck) |
| [Listing9.16.ck](book/digital-artists/chapter9/DrumMachine/Listing9.16.ck) |
| [Listing9.17.ck](book/digital-artists/chapter9/DrumMachine/Listing9.17.ck) |
| [clap.ck](book/digital-artists/chapter9/DrumMachine/clap.ck)               |
| [cowbell.ck](book/digital-artists/chapter9/DrumMachine/cowbell.ck)         |
| [hihat.ck](book/digital-artists/chapter9/DrumMachine/hihat.ck)             |
| [initialize.ck](book/digital-artists/chapter9/DrumMachine/initialize.ck)   |
| [kick.ck](book/digital-artists/chapter9/DrumMachine/kick.ck)               |
| [score.ck](book/digital-artists/chapter9/DrumMachine/score.ck)             |
| [snare.ck](book/digital-artists/chapter9/DrumMachine/snare.ck)             |

#### Smart Mandolin 
| Smart Mandolin                                                               |
| :--------------------------------------------------------------------------- |
| [Listing9.20.ck](book/digital-artists/chapter9/SmartMandolin/Listing9.20.ck) |
| [Listing9.21.ck](book/digital-artists/chapter9/SmartMandolin/Listing9.21.ck) |
| [Listing9.22.ck](book/digital-artists/chapter9/SmartMandolin/Listing9.22.ck) |
| [MandoPlayer.ck](book/digital-artists/chapter9/SmartMandolin/MandoPlayer.ck) |
| [MandoScore.ck](book/digital-artists/chapter9/SmartMandolin/MandoScore.ck)   |
| [initialize.ck](book/digital-artists/chapter9/SmartMandolin/initialize.ck)   |
### chapter10
| chapter10                                                         |
| :---------------------------------------------------------------- |
| [Listing10.1.ck](book/digital-artists/chapter10/Listing10.1.ck)   |
| [Listing10.2.ck](book/digital-artists/chapter10/Listing10.2.ck)   |
| [Listing10.3.ck](book/digital-artists/chapter10/Listing10.3.ck)   |
| [Listing10.4.ck](book/digital-artists/chapter10/Listing10.4.ck)   |
| [Listing10.4b.ck](book/digital-artists/chapter10/Listing10.4b.ck) |
| [Listing10.4c.ck](book/digital-artists/chapter10/Listing10.4c.ck) |
| [Listing10.5.ck](book/digital-artists/chapter10/Listing10.5.ck)   |
### chapter11
| chapter11                                                                     |
| :---------------------------------------------------------------------------- |
| [Listing11.1.ck](book/digital-artists/chapter11/Listing11.1.ck)               |
| [Listing11.1Twinkle.ck](book/digital-artists/chapter11/Listing11.1Twinkle.ck) |
| [Listing11.2.ck](book/digital-artists/chapter11/Listing11.2.ck)               |
| [Listing11.3.ck](book/digital-artists/chapter11/Listing11.3.ck)               |
| [Listing11.4.ck](book/digital-artists/chapter11/Listing11.4.ck)               |
| [Listing11.5.ck](book/digital-artists/chapter11/Listing11.5.ck)               |


${BACKHOME}
