${PROGHEADER}

<center>

## Live Coding with ChucK

[^ programmer's guide](./index.md)

</center>

## On-the-fly Programming Commands

These command-line options are used for on-the-fly programming 
(see [on-the-fly](href="http://on-the-fly.cs.princeton.edu/)).
By default, this requires that a ChucK virtual machine be already running 
on the localhost.  These commands communicate via sockets to add/remove/replace 
shreds in the VM, and to query VM state.  The simplest way to set up a 
ChucK virtual machine to accept these commands is by starting an empty VM 
with `--loop`:

```bash
% chuck --loop
```

This will start a VM session, looping (and advancing time), waiting for incoming 
commands.  Successive invocations of `chuck` with the appropriate commands will 
communicate with this listener VM. (For controlling a _remote_ session see 
[below](#remote)).

__`--add`__ | __`+`__
> adds new shreds from source files to the listener VM.  This process then 
> exits. For example:
```bash
% chuck --add foo.ck bar.ck
```
> integrates foo.ck and bar.ck into the listener VM.  the shreds are 
> internally responsible for finding about the timing and other 
> shreds via the timing mechanism and vm interface.

__`--remove`__ | __`-`__
> removes existing shreds from the VM by ID.  How to find out 
> about the id?  See --status below.  For example:
```bash
% chuck --remove 2 3 8
```
> removes shred 2, 3, 8.

__`--replace`__ | __`=`__
> replace existing shred with a new shred.  for example:
```bash
% chuck --replace 2 foo.ck
```
> replaces shred 2 with foo.ck

__`--status`__ | __`^`__
> queries the status of the VM - output on the listener VM.  For example,
> this prints the internal shred started on the listener VM:
```bash
% chuck --status

[chuck](VM): status (now == 0h:2m:34s) ...
[shred id]: 1  [source]: foo.ck  [sporked]: 21.43s ago 
[shred id]: 2  [source]: bar.ck  [sporked]: 28.37s ago
```

__`--time`__
> prints out the value of now on the listener VM. For example:
```bash
% chuck --time

[chuck](VM): the value of now:
    now = 403457 (samp)
        = 9.148685 (second)
        = 0.152478 (minute)
        = 0.002541 (hour)
        = 0.000106 (day)
        = 0.000015 (week)
```

__`--kill`__
> semi-gracefully kills the listener VM - removes all shreds first.

<a id="remote"></a>

__`--remote<hostname>`__ | __`@<hostname>`__
> specifies where to send the on-the-fly command. Must appear in the command 
> line before any on-the-fly commands. For example:
```bash
% chuck @192.168.1.1 + foo.ck bar.ck
# (or)
% chuck @foo.bar.com -p8888 + foo.ck bar.ck
```
> sends foo.ck and bar.ck to VM at 192.168.1.1 or foo.bar.com:8888

${PROGFOOTER}
