${PROGHEADER}

<center>

## ChucK input / output

[^ programmer's guide](./index.md) | [std classes](./classes_std.md) | [basic ugen](./ugen_basic.md)

<!-- nb: extra eol spaces on some lines cause <br/> -->
[IO](#io) | [FileIO](#fileio) | [StdOut/StdError](#stdoutstderr)  
[OscIn](#oscin) | [OscOut](#oscout) | [OscMsg](#oscmsg)  
[Hid](#hid) | [HidMsg](#hidmsg) | [SerialIO](#serialio)  
[MidiIn](#midiin) | [MidiOut](#midiout) |
[MidiMsg](#midimsg) | [MidiFileIn](#midifilein)   

</center>

--------------------------------------------------------------------------------

#### IO

__`IO`__ is a subclass of [Event](classes_std.md#event) that also serves
as a base class for various means to communicate non-audio information 
with external devices and processes. Thus, methods here are generally
to be thought of a "pure virtual" and whose meaning depends on the
subclass.

| IO.constants         | Description                  |
| :------------------- | :--------------------------- |
| __`int INT16`__      | number of bytes in this type |
| __`int INT32`__      | number of bytes in this type |
| __`int INT8`__       | number of bytes in this type |
| __`int MODE_ASYNC`__ | enumeration constant         |
| __`int MODE_SYNC`__  | enumeration constant         |
| __`int READ_INT16`__ | enumeration constant         |
| __`int READ_INT32`__ | enumeration constant         |
| __`int READ_INT8`__  | enumeration constant         |


| IO.functions                                         | Description                    |
| :--------------------------------------------------- | :----------------------------- |
| __`static string newline()`__                        | n/a                            |
| __`static string nl()`__                             | n/a                            |
| __`static string newlineEx2VistaHWNDVisualFoxProA`__ | n/a                            |
| __`void close()`__                                   | close the IO dchanngel/a       |
| __`int eof()`__                                      | n/a                            |
| __`void flush()`__                                   | flush the output buffers       |
| __`int good()`__                                     | n/a                            |
| __`int mode(), mode(int flag)`__                     | Get/set the mode.              |
| __`int more()`__                                     | n/a                            |
| __`int readInt(int flags)`__                         | read and return an int         |
| __`string readLine(int flags)`__                     | read and return a line of text |
| __`void write(string val)`__                         | write a string                 |
| __`void write(int val)`__                            | write an int                   |
| __`void write(float val)`__                          | write a float                  |


#### FileIO

__`FileIO`__ is a subclass of [IO](#io) and [Event](classes_std.md#event) 
that implements basic file system reading and writing.

| FileIO.constants | Description          |
| :--------------- | :------------------- |
| __`int APPEND`__ | enumeration constant |
| __`int ASCII`__  | enumeration constant |
| __`int BINARY`__ | enumeration constant |
| __`int READ`__   | enumeration constant |
| __`int WRITE`__  | enumeration constant |

| FileIO.functions                       | Description                                                           |
| :------------------------------------- | :-------------------------------------------------------------------- |
| __`void close()`__                     | closes the open file                                                  |
| __`string[] dirList()`__               | returns the list of filenames in the opened directory                 |
| __`int eof()`__                        | returns 1 if the current file location is at the end                  |
| __`void flush()`__                     | flushes the output buffer associated with the open (and writing file) |
| __`int good()`__                       | returns 1 if the current FileIO state is valid                        |
| __`int isDir()`__                      | returns 1 is the current open file is a directory                     |
| __`int mode(), mode(int flag)`__       | Get/set the current file mode                                         |
| __`int more()`__                       | Indicates whether there is more to read in the current file.          |
| __`int open(string path)`__            | opens for reading the file or directory given by path                 |
| __`int open(string path, int flags)`__ | opens the file or directory given by path according to the mode flags |
| __`int readInt(int flags)`__           | reads and returns an int from the currently opened file               |
| __`string readLine(int flags)`__       | read and return a line of text                                        |
| __`void seek(int pos)`__               | move the current file position to the requested position              |
| __`int size()`__                       | return the size of the currently openen file                          |
| __`int tell()`__                       | return the current file position                                      |
| __`void write(string val)`             | write a string to the currently opened file                           |
| __`void write(int val)`                | write an int to the currently opened file                             |
| __`void write(int val, int flags)`     | write an int to the currently opened file                             |
| __`void write(float val)`              | write a float to the currently opened file                            |

See [write2.ck](../examples/io/write2.ck), [read-line.ck](../examples/io/read-line.ck)

#### StdOut, StdErr

__`StdOut`__ and __`StdErr`__ are subclasses of [IO](#io) and 
[Event](classes_std.md#event) that implements basic output via 
the _standard output channel_ or the _standard output error channel_ 
associated with the `chuck` _process_.

| StdOut.functions             |
| :--------------------------- |
| __`void close()`__           |
| __`int eof()`__              |
| __`void flush()`__           |
| __`int good()`__             |
| __`int mode(int flag)`__     |
| __`int mode()`__             |
| __`int more()`__             |
| __`int readInt(int flags)`__ |
| __`string readLine()`__      |
| __`void write(string val)`__ |
| __`void write(int val)`__    |
| __`void write(float val)`__  |

----------------------------------------------------------------------------

### OSC

[Open Sound Control (OSC)](https://en.wikipedia.org/wiki/Open_Sound_Control])
is a communication protocol for networking sythesizers, ChucK instances,
computers or other multimedia devices for purposes such as musical
performance or show control.

ChucK offers three related classes for OSC interoperability.

#### OscIn

__`OscIn`__ is a subclass of [IO](#io) and [Event](classes_std.md#event) 
that implements basic reading of one or more OSC I/O channels.

The mechanics of OscIn are:

1. instantiate OscIn and [OsgMsg](#oscmsg) objects
2. establish the port
3. express interest in an osc address (endpoint)
4. use [Events](../language/event.md) to wait on activity
5. receive the OscMsg when it arrives
6. interpret and act upon the OscMsg contents

| OscIn.fuctions                         | Description                                                    |
| :------------------------------------- | :------------------------------------------------------------- |
| __`void addAddress(string address)`__  | Add the IP address of a OSC broadcaster to our listening queue |
| __`void listenAll()`__                 |                                                                |
| __`int port(), port(int port)`__       | Get/set the TCP/UDP port                                       |
| __`int recv(OscMsg msg)`               | read an [OscMsg](#oscmsg) from a socket                        |
| __`void removeAddress(string address)` | Remove the IP address from the listening queue.                |
| __`void removeAllAddresses()`__        | remove all addresses from our listening queue                  |

See [OSC_recv.ck](../examples/osc/OSC_recv.ck).

#### OscOut

__`OscOut`__ is a subclass of [IO](#io) and [Event](classes_std.md#event) 
that implements basic writing to OSC I/O channels. You can choose to
broadcast to any hosts or to a specific host. 

The mechanics of OscOut are:

1. instantiate an OscOut object
2. identify a msg target and msg method via `send()` (ie: an OSC endpoint)
3. emit the fields of the msg via `add()`
4. emit `send()`.

| OscOut.fuctions                                          |
| :------------------------------------------------------- |
| __`OscOut add(int i)`__                                  |
| __`OscOut add(float f)`__                                |
| __`OscOut add(string s)`__                               |
| __`OscOut dest(string host, int port)`__                 |
| __`OscOut send()`__                                      |
| __`OscOut start(string method)`__                        |
| __`OscOut start(string method, string host, int port)`__ |

See [OSC_send.ck](../examples/osc/OSC_send.ck).

#### OscMsg

__`OscMsg`__ is produced by the OscIn `recv` methods and represents the
_payload_ of a single OSC transmission.

| OscOut.members       |
| :------------------- |
| __`string address`__ |
| __`OscArg[] args`__  |
| __`string typetag`__ |

| OscOut.methods                |
| :---------------------------- |
| __`float getFloat(int i)`__   |
| __`int getInt(int i)`__       |
| __`string getString(int i)`__ |
| __`int numArgs()`__           |

See [OSC_dump.ck](../examples/osc/OSC_dump.ck) to see OSC msg parsing in action.

----------------------------------------------------------------------------

### Human Interface Devices (HID)

Your computer connects over USB to communicate with [HIDs](https://en.wikipedia.org/wiki/Human_interface_device)
like a mouse, keyboard or joystick. ChucK can intercept these msgs from
your devices and these can trigger [Events](../language/event.ck) in 
your programs.

#### Hid

__`Hid`__ is a subclass of [Event](../language/event.md) and this makes
it easy to asynchronously await events triggered by your devices.

See [mouse.ck](../examples/hid/mouse.ck), [keyboard.ck](../examples/hid/kb)

| Hid.functions                                   | Hid.constants                 |
| :---------------------------------------------- | :---------------------------- |
| __`static dur globalTiltPollRate(dur d)`__      | __`int ACCELEROMETER`__       |
| __`static dur globalTiltPollRate()`__           | __`int AXIS_MOTION`__         |
| __`static int[] readTiltSensor()`__             | __`int BUTTON_DOWN`__         |
| __`static int startCursorTrack()`__             | __`int BUTTON_UP`__           |
| __`static int stopCursorTrack()`__              | __`int DEVICE_CONNECTED`__    |
| __`int can_wait()`__                            | __`int DEVICE_DISCONNECTED`__ |
| __`int good()`__                                | __`int FORCE_FEEDBACK`__      |
| __`string name()`__                             | __`int JOYSTICK`__            |
| __`int num()`__                                 | __`int JOYSTICK_BALL`__       |
| __`int open(int type, int num)`__               | __`int JOYSTICK_HAT`__        |
| __`int open(string name)`__                     | __`int KEYBOARD`__            |
| __`int openJoystick(int num)`__                 | __`int LED`__                 |
| __`int openKeyboard(int num)`__                 | __`int MOUSE`__               |
| __`int openMouse(int num)`__                    | __`int MOUSE_MOTION`__        |
| __`int openTiltSensor()`__                      | __`int MOUSE_WHEEL`__         |
| __`void printerr(int print_or_not)`__           | __`int TABLET`__              |
| __`int read(int type, int which, HidMsg msg)`__ | __`int TILT_SENSOR`__         |
| __`int recv(HidMsg msg)`__                      | __`int WII_REMOTE`__          |
| __`int send(HidMsg msg)`__                      |

#### HidMsg

__`HidMsg`__ is used to receive and encapsulate HID device messages.
Different devices return different data, so a certain amount of
device-targeting is inevitable in your ChucK programs. The `HidMsg`
methods can narrow down the source of an individual HID message.
This information is crucial in determining which of the `HidMsg` members
contain the data of interest.

| HidMsg.functions            |
| :-------------------------- |
| __`int isAxisMotion()`__    |
| __`int isButtonDown()`__    |
| __`int isButtonUp()`__      |
| __`int isHatMotion()`__     |
| __`int isMouseMotion()`__   |
| __`int isWheelMotion()`__   |
| __`int is_axis_motion()`__  |
| __`int is_button_down()`__  |
| __`int is_button_up()`__    |
| __`int is_hat_motion()`__   |
| __`int is_mouse_motion()`__ |

| HidMsg.members                   |
| :------------------------------- |
| __`int ascii`__                  |
| __`float axisPosition`__         |
| __`int axis_position`__          |
| __`int cursorX`__                |
| __`int cursorY`__                |
| __`int deltaX`__                 |
| __`int deltaY`__                 |
| __`int deviceNum`__              |
| __`int deviceType`__             |
| __`float fdata`__                |
| __`int hatPosition`__            |
| __`int idata`__                  |
| __`int key`__                    |
| __`float scaledCursorX`__        |
| __`float scaledCursorY`__        |
| __`float scaled_axis_position`__ |
| __`float touchSize`__            |
| __`float touchX`__               |
| __`float touchY`__               |
| __`int type`__                   |
| __`time when`__                  |
| __`int which`__                  |
| __`int x`__                      |
| __`int y`__                      |
| __`int z`__                      |

----------------------------------------------------------------------------

### SerialIO

__`SerialIO`__ is a subclass of [IO](#io) and [Event](../language/event.md).
It handles reading and writing for serial input/output devices, such as Arduino.

[byte.ck](../examples/serial/byte.ck),
[bytes.ck](../examples/serial/bytes.ck),
[ints-bin.ck](../examples/serial/ints-bin.ck),
[ints.ck](../examples/serial/ints.ck),
[lines.ck](../examples/serial/lines.ck),
[list.ck](../examples/serial/list.ck),
[write-bytes.ck](../examples/serial/write-bytes.ck),
[write.ck](../examples/serial/write.ck),


| SerialIO.constants |
| :----------------- |
| __`int ASCII`__    |
| __`int BINARY`__   |
|                    |
| __`int B230400`__  |
| __`int B115200`__  |
| __`int B76800`__   |
| __`int B57600`__   |
| __`int B38400`__   |
| __`int B28800`__   |
| __`int B19200`__   |
| __`int B14400`__   |
| __`int B9600`__    |
| __`int B7200`__    |
| __`int B4800`__    |
| __`int B2400`__    |

| SerialIO.functions                        | Description                                                               |
| :---------------------------------------- | :------------------------------------------------------------------------ |
| __`static string[] list()                 | Return list of available serial devices.                                  |
|                                           |
| __`int baudRate(), baudRate(int r)`__     | Get/set baud rate.                                                        |
| __`void close()`__                        |                                                                           |
| __`int dataAvailable()`__                 |                                                                           |
| __`void flush()`__                        | Flush the IO buffer.                                                      |
| __`int getByte()                          | Get next requested byte.                                                  |
| __`int[] getBytes()`__                    | Get next requested number of bytes.                                       |
| __`int[] getInts()`__                     | Get next requested number of integers.                                    |
| __`string getLine()`__                    | Get next requested line.                                                  |
| __`SerialIO onByte()`__                   | Wait for one byte (binary mode only).                                     |
| __`SerialIO onBytes(int num)`__           | Wait for requested number of bytes (binary mode only).                    |
| __`SerialIO onFloats(int num)`__          | Wait for requested number of floats (ASCII or binary mode).               |
| __`SerialIO onInts(int num)`__            | Wait for requested number of ints (ASCII or binary mode).                 |
| __`SerialIO onLine()`__                   | Wait for one line (ASCII mode only).                                      |
| __`int open(int i, int baud, int mode)`__ | Open serial device i with specified baud rate and mode (binary or ASCII). |
| __`string readLine()`__                   |                                                                           |
| __`void writeByte(int b)`__               | Write a single byte.                                                      |
| __`void writeBytes(int[] b)`__            | Write array of bytes.                                                     |

----------------------------------------------------------------------------
### Midi

#### MidiIn

__`MidiIn`__ is a subclass of [Event](../language/event.md) that allows
your ChucK program to be triggers by connected Midi devices.

See [gomidi.ck](../examples/midi/gomidi.ck),
[playmidi.ck](../examples/midi/playmidi.ck),
[polyphony.ck](../examples/midi/polyphony.ck),

| MidiIn.functions                   | Description                                              |
| :--------------------------------- | :------------------------------------------------------- |
| __`int can_wait()                  |                                                          |
| __`int good()                      |                                                          |
| __`string name()                   | Return the Midi device's name as string.                 |
| __`int num()                       |                                                          |
| __`int open(int port)              | Open Midi device using a port number.                    |
| __`int open(string name)           | Open Midi device using the device's name.                |
| __`void printerr(int print_or_not) | Set error printing (1 for on, 0 for off). On by default. |
| __`int recv(MidiMsg msg)           | receive a MidiMsg for action/interpretation              |


#### MidiOut

__`MidiOut`__ is a subclass of [Object](classes_std#object) and 
allows you to _generate_ Midi events for consumption by an attached
Midi device.

See [midiout.ck](../examples/midi/midiout.ck), [gomidi2.ck](../examples/midi/gomidi2.ck),

| MidiOut.functions                     | Description                                              |
| :------------------------------------ | :------------------------------------------------------- |
| __`int good()`__                      |                                                          |
| __`string name()`__                   | Return the Midi device's name as string.                 |
| __`int num()`__                       |                                                          |
| __`int open(int port)`__              | Open Midi device using a port number.                    |
| __`int open(string name)`__           | Open Midi device using the device's name.                |
| __`void printerr(int print_or_not)`__ | Set error printing (1 for on, 0 for off). On by default. |
| __`int send(MidiMsg msg)`__           | Send out a MidiMsg message.                              |

#### MidiMsg

__`MidiMsg`__ is a subclass of [Object](classes_std#object) and encapsulates
data about a single Midi message.

| MidiMsg.members | Description                                                                                |
| :-------------- | :----------------------------------------------------------------------------------------- |
| __`int data1`__ | First byte of a Midi message, usually a status byte or command byte.                       |
| __`int data2`__ | Second byte of a Midi message, usually a note value.                                       |
| __`int data3`__ | Third byte of a Midi message, usually a velocity value.                                    |
| __`dur when`__  | Relative time at which the msg occurs.  Used to synchronize multiple msgs with one aother. |

See [playmidi.ck](../examples/midi/playmidi.ck)

#### MidiFileIn

__`MidiFileIn`__ is a subclass of [Object](classes_std#object) and facilitates
the reading of a standard midi file.

| MidiFileIn.functions                   | Description |
| :------------------------------------- | :---------- |
| __`void close()`__                     | n/a         |
| __`int numTracks()`__                  | n/a         |
| __`int open(string path)`__            | n/a         |
| __`int read(MidiMsg msg)`__            | n/a         |
| __`int read(MidiMsg msg, int track)`__ | n/a         |
| __`void rewind()`__                    | n/a         |

See [playmidi.ck](../examples/midi/playmidi.ck)

${PROGFOOTER}