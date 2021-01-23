${LANGHEADER}

## ChucK : Language > Time

<div class="chuck_nav">
<center>
 <table border="0"><tr><td>
  <div class="chuck_nav_bar">	
    <a href="./ctrl.md">&lt; control structures</a>  |
    <a href="./index.md">language specification ^</a> | 
    <a href="./func.md">functions &gt;</a> 
  </div>
  </td></tr></table>
</center>
</div>

## Manipulating Time

ChucK is a __strongly-timed__ language, meaning that time is fundamentally 
embedded in the language.  ChucK allows the programmer to explicitly _reason_ 
about time from the code.  This gives extremely flexible and precise control 
over time and (therefore) sound synthesis.

In ChucK:

* time and duration are native types in the language
* keyword __`now`__ holds the current logical time
* time is _advanced_ (and can only be advanced) by explicitly manipulating `now`
* you have flexible and precise control

> [View sample codefor time & timing](../examples/index.md#time)

<a id="type"></a>

## time and duration

ime and duration are native types in ChucK.  __`time`__ represents an absolute 
point in time (from the beginning of ChucK time).  __`dur`__ represents a 
duration (with the same logical units as `time`).

```ck
// a duration of one second
1::second => dur foo;

// a point in time (duration of foo from now)
now + foo => time later;
```

Later in this section, we outline the various arithmetic operations to perform 
on time and duration.

Durations can be used to construct new durations, which then be used to 
inductively construct yet other durations. For example:

```ck
// .5 second is a quarter
.5::second => dur quarter;

// 4 quarters is whole
4::quarter => dur whole;
```

By default, ChucK provides these preset duration values:

* `samp` : duration of 1 sample in ChucK time
* `ms` : duration of 1 millisecond
* `second` : duration of 1 second
* `minute` : 1 minute
* `hour` : 1 hour
* `day` : 1 day
* `week` : 1 week

Use these to represent any duration.

```ck
// the duration of half a sample
.5::samp => dur foo;

// 20 weeks
20::week => dur waithere;

// use in combination
2::minute + 30::second => dur bar;

// same value as above
2.5::minute => dur bar;
```

<a id="oper"></a>

## operations on time and duration (arithmetic)

In ChucK, there are well-defined arithmetic operations on values of type 
`time` and `dur`.

```ck
// example 1 (time offset):
// time + dur yields time
now + 10::second => time later;

// example 2 (time subtraction):
// time - time yields dur
later - now => dur D;

// example 3 (addition):
// dur + dur yields dur
10::second + 100::samp => dur foo;

// example 4 (subtraction):
// dur - dur yields dur
10::second - 100::samp => dur bar;

// example 5 (division):
// dur / dur yields number
10::second / 20::ms => float n;

// example 6 (time mod):
// time mod dur yields dur
now % 1::second => dur remainder;

// example 7 (synchronize to period):
// synchronize to period of .5 second
.5::second => dur T;
T - (now % T) => now;

// example 8 (comparison on time):
// compare time and time
if( t1 < t2 )
    // do something...

// example 9 (comparison on duration):
// compare dur and dur
if( 900::ms < 1::second )
    <<< "yay!" >>>;
```

<a id="now"></a>

## the keyword `now`

The keyword __`now`__ is the key to reasoning about and controlling time in 
ChucK. Some properties of `now` include:

* `now` is a special variable of type __`time`__.
* `now` holds the current ChucK time (when read).
* modifying `now` has the side effects of:
    * advancing time (see below);
    * suspending the current process (called _shred_) until the desired time 
      is reached - allowing other shreds and audio synthesis to compute.
* the value of `now` only changes when it is explicitly modified.

See also next section on advancing time.

Example:

```ck
// compute value that represents "5 seconds from now"
now + 5::second => time later;

// while we are not at later yet...
while( now < later )
{
    // print out value of now
    <<< now >>>;

    // advance time by 1 second
    1::second => now;
}
```


<a id="advance"></a>

## advancing time

Advancing time allows other shreds (processes) to run and _>allows audio to 
be computed_ in a controlled manner. There are three ways of advancing time 
in ChucK:

* chucking (`=>`) a _duration_ to `now`: this will advance time by that duration.
* chucking (`=>`) a _time_ to `now`: this will advance time to that point.  
  (note that the desired time must be later than or equal to the current time).
* chucking (`=>`) an __`Event`__ to `now`: time will advance until
  the event is triggered.  (also see [event](./event.md))

### advancing time by duration

```ck
// advance time by 1 second
1::second => now;

// advance time by 100 millisecond
100::ms => now;

// advance time by 1 samp (every sample)
1::samp => now;

// advance time by less than 1 samp
.024::samp => now;
```

### advancing time by absolute time

```ck
// figure out when
now + 4::hour => time later;

// advance time to later
later => now;
```

A time chucked to now will have ChucK wait until the appointed time. ChucK 
never misses an appointment (unless it crashes)!  Again, the time chucked 
to now must be greater than or equal to now, otherwise an exception is thrown.

### advancing time by event

```ck
// wait on event
e => now;
```

See [events](./event.md)> for a more complete discussion of using events!

The advancement of time can occur at any point in your code.

```ck
// our patch: sine oscillator -> dac
SinOsc s => dac;

// infinite time loop
while( true )
{
    // randomly choose frequency from 30 to 1000
    Std.rand2f( 30, 1000 ) => s.freq;

    // advance time by 100 millisecond
    100::ms => now;
}
```

Furthermore, there are no restrictions (other than underlying floating point 
precision) on how much time is advanced.  So it is possible to advance time 
by a microsecond, a samp, 2 hours, or 10 years.  The system will behave 
accordingly and deterministically.

This mechanism allows time to be controlled at any desired rate, according to 
any programmable pattern.  With respect to sound synthesis, it is possible to 
control any unit generator at literally any rate, even sub-sample rate.

The power of the timing mechanism is extended by the ability to write parallel 
code, which is discussed in [concurrency and shreds](./spork.md).


${LANGFOOTER}