${PROGHEADER}

<center>

## Chuck VM options
[^ programmer's guide](./index.md)

</center>


## The ChucK Compiler + Virtual Machine
Let's start with the compiler/virtual machine, both of which run in the 
same process.  By now, you should have built/installed ChucK 
[guide](../build/index.md), and perhaps followed the [tutorial](../tutorial.md).  
This guide is intended to be more complete and referential than the tutorial.  
Additionally, see the [language specification](../language/index.md).

<a id="options"></a>

## `SYNOPSIS` (a man-esque page)

`usage`:

```bash
chuck --[options|commands] [+-=^] file1 file2 file3 ...

[options] = halt|loop|audio|silent|dump|nodump|server|about|probe|
            channels:<N>|out:<N>|in:<N>|dac:<N>|adc:<N>|
            srate:<N>|bufsize:<N>|bufnum:<N>|shell|empty|
            remote:<hostname>|port:<N>|verbose:<N>|level:<N>|
            blocking|callback|deprecate:{stop|warn|ignore}|
            chugin-load:{auto|off}|chugin-path:<path>|chugin:<name>
[commands] = add|remove|replace|remove.all|status|time|kill
[+-=^] = shortcuts for add, remove, replace, status
```

(run __`chuck --about`__ to print the above information)

## DESCRIPTION

ChucK can run 1 or more processes in parallel and interactively.  The 
programmer only needs to specify them all on the command line, and they 
will be compiled and run in the VM.  Each input source file (.ck suffix by 
convention) will be run as a separate _shred_ (user-level ChucK threads) 
in the VM.  They can _spork_ additional shreds and interact with 
existing shreds.  Thanks to the ChucK timing mechanism, shreds don't 
necessarily need to know about each other in order to be precisely 
_shreduled_ in time - they only need to keep track of they own time, so 
to speak. 

Addtionally, more shreds can be added/removed/replaced manually at 
run-time, using on-the-fly programming (aka _live coding_). 
See: [Wang and Cook 2004](../publications.md) and 
[on-the-fly](http://on-the-fly.cs.princeton.edu/).

### [options]:

__`--halt`__ / `-h`
> (on by default) - tells the vm to halt and exit if there are no more 
> shreds in the VM.

__`--loop`__ / `-l`
> tells the ChucK VM to continue executing even if there no shreds 
> currently in the VM.  This is useful because shreds can be added 
> later on-the-fly.  Furthermore, it is legal to specify this 
> option without any input files.  For example: <br /><br />

```bash
% chuck --loop
```
> the above will 'infinite time-loop' the VM, waiting for incoming shreds. 

__`--audio`__ / `-a`
> (on by default) - enable real-time audio output

__`--silent`__ / `-s`
> disable real-time audio output - computations in the VM is not 
> changed, except that the actual timing is no longer clocked by 
> the real-time audio engine.  Timing manipulations (such as 
> operations on 'now') still function fully.  This is useful for 
> synthesizing audio to disk or network.  Also, it is handy for 
> running a non-audio program.

__`--dump`__ / `+d`
> dump the virtual instructions emitted to stderr, for all the 
> files after this flag on the command line, until a 'nodump' is 
> encountered (see below).  For example: <br /><br />
```bash
% chuck foo.ck +d bar.ck
```
> will dump the virtual ChucK instructions for bar.ck (only), with 
> argument values, to stderr.  --dump can be used in conjunction 
> with --nodump to selectively dump files. <br /><br />

__`--nodump`__ / `-d`
> (default state) cease the dumping of virtual instructions for 
> files that comes after this flag on the command line, until a 
> 'dump' is encountered (see above).  For example:
```bash
% chuck +d foo.ck -d bar.ck +d doo.ck
```
> will dump foo.ck, then doo.ck - but not bar.ck.
> These are useful for debug ChucK itself, and for other 
> entertainment purposes. 

__`--srate(N)`__
> set the internal sample rate to (N) Hz.  by default,
> ChucK runs at 44100Hz on OS X and Windows, and 48000Hz on 
> linux/ALSA.  even if the VM is running in --silent mode, the 
> sample rate is still used by some unit generaters to compute  
> audio, this is important for computing samples and writing to 
> file.  Not all sample rates are supported by all devices!

__`--bufsize(N)`__
> set the internal audio buffer size to (N) sample frames.  larger 
> buffer size often reduce audio artifacts due to system/program 
> timing.  smaller buffers reduce audio latency.  The default is 
> 512.  If (N) is not a power of 2, the next power of 2 larger than 
> (N) is used.  For example:
```bash
% chuck --bufsize950
```
> sets the buffer size to 1024.

__`--dac(N)`__
> opens audio output device #(N) for real-time audio.  by default, (N) is 0.

__`--adc(N)`__
> opens audio input device #(N) for real-time audio input.  by default, (N) is 0.

__`--chan(N)`__ / `-c(N)`
> opens (N) number of input and output channels on the audio device. by default, (N) is 2. 

__`-in(N)`__  / `-i(N)`
> opens (N) number of input channels on the audio device. by default (N) is 2. 

__`--out(N)`__ / `-o(N)`
> opens (N) number of output channels on the audio device. by default (N) is 2. 

__`--hostname(host)`__ / `-h(host)`
> sets the hostname to connect to if accompanied by the on-the-fly programming commands.
> (host) can be name or ip of the host.  default is 127.0.0.1 (localhost).

__`--port(N)`__ / `-p(N)`
> sets the port to listen on if not used with on-the-fly programming commands.
> sets the port to connect to if used with on-the-fly programming commands.

__`--verbose(N)`__ / `-v(N)`
> sets the report level to (N). 0 is none, 10 is all, default is 1.

__`--probe`__
> probes the system for all audio devices and MIDI devices, and prints them.

__`--about`__ / `--help`
> prints the usage message, with the ChucK URL

__`--callback`__
> Utilizes a callback for buffering (default). 

__`--blocking`__
> Utilizes blocking for buffering.

${PROGFOOTER}
