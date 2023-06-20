${PROGHEADER}

<center>

[^ programmer's guide](./index.md) | [basic ugen](./ugen_basic.md) | [std uana](./uana.md)

## Chuck Standard Classes and Objects

The Standard Classes and Objects are built-in to ChucK. You can create your
own classes via the ChucK [language](../language/class.md).  Advanced 
developers can extend ChucK via C++ plugins. The Standard Classes and Objects
by class name in ChucK.  They are as follows:


[__`Object`__](#object) | [__`Array`__](#array) | [__`String`__](#string)  
[__`Std`__](#std) | [__`Math`__](#math) | [__`Machine`__](#machine)  
[__`Event`__](#event) | [__`Shred`__](#shred) | [__`RegEx`__](#regex)

</center>

-------------------------------------------------------------------------------

## Object

The Object class is the base class for all class types in ChucK.

| Object.functions        | Description                                   |
| :---------------------- | :-------------------------------------------- |
| __`string toString()`__ | Returns a textual description of this object. |

## Array 

The array class a subclass of [Object](#object) and is used to store linear 
sequences of data, also providing capabilities for stack and map data structures. 

| Array.functions             | Description                                                                                                                                                                                                    |
| :-------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| __`int cap()`__             | Return current capacity of the array (number of elements that can be held without reallocating internal buffer).                                                                                               |
| __`void clear()`__          | Clear the contents of the array.                                                                                                                                                                               |
| __`int erase(string key)`__ | Erase all elements with the specified key.                                                                                                                                                                     |
| __`int find(string key)`__  | Return number of elements with the specified key.                                                                                                                                                              |
| __`<<`__                    | Append the array with the value to the right of this operator.                                                                                                                                                 |
| __`void popBack()`__        | Remove the last item of the array                                                                                                                                                                              |
| __`void reset()`__          | Reset array to original state; clears the array and sets capacity to 8.                                                                                                                                        |
| __`int size()`__            | Return the number of elements in the array.                                                                                                                                                                    |
| __`int size(int newSize)`__ | Set the size of the array. If the new size is less than the current size, elements will be deleted from the end; if the new size is larger than the current size, 0 or null elements will be added to the end. |
| __`void getKeys(string keys[])`__ | Fills keys with all of the keys in the array. | 
| __`void zero()`__           | Zeros out the array while keeping the size unchanged. | 
|                             |

see: [array_argument.ck](../examples/array/array_argument.ck),
[array_assign.ck](../examples/array/array_assign.ck),
[array_dynamic.ck](../examples/array/array_dynamic.ck),
[array_mdim.ck](../examples/array/array_mdim.ck),
[array_mmixed.ck](../examples/array/array_mmixed.ck),
[array_resize.ck](../examples/array/array_resize.ck),
[array_storage.ck](../examples/array/array_storage.ck),
[array_sub_assign.ck](../examples/array/array_sub_assign.ck)
[array_associative.ck](../examples/array/array_associative.ck)
[array_zero.ck](../examples/array/array_zero.ck)

## String

The string class is a subclass of Object and holds textual data as a sequence 
of characters, and provides a number of functions for manipulating text.

| string.functions                                         | Description                                                                                                       |
| :------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| __`int charAt(int index)`__                              | Return a character at the specified index.                                                                        |
| __`void erase(int start, int length)`__                  | Erase length characters of the string from start position.                                                        |
| __`int find(int theChar)`__                              | Return the index of the first occurence of theChar, or -1 if theChar is not found.                                |
| __`int find(int theChar, int start)`__                   | Return the index of the first occurence of theChar at or after the start position, or -1 if theChar is not found. |
| __`int find(string str)`__                               | Return the index of the first occurence of str, or -1 if str is not found.                                        |
| __`int find(string str, int start)`__                    | Return the index of the first occurence of str at or after the start position, or -1 if str is not found.         |
| __`void insert(int position, string str)`__              | Insert str at the specified position.                                                                             |
| __`int length()`__                                       | Return the number of characters of the string.                                                                    |
| __`string lower()`__                                     | Return a new string in which the uppercase characters of the original string have been converted to lowercase.    |
| __`string ltrim()`__                                     | Return a new string in which leading whitespace has been removed.                                                 |
| __`void replace(int position, string str)`__             | Replace characters from the start position to the end of the string with str.                                     |
| __`void replace(int position, int length, string str)`__ | Replace length characters from the start position with str.                                                       |
| __`int rfind(int theChar)`__                             | Return the index of the last occurence of theChar, or -1 if theChar is not found.                                 |
| __`int rfind(int theChar, int start)`__                  | Return the index of the last occurence of theChar at or before the start position, or -1 if theChar is not found. |
| __`int rfind(string str)`__                              | Return the index of the last occurence of str, or -1 if str is not found.                                         |
| __`int rfind(string str, int start)`__                   | Return the index of the last occurence of str at or before the start position, or -1 if str is not found.         |
| __`string rtrim()`__                                     | Return a new string in which trailing whitespace has been removed.                                                |
| __`int setCharAt(int index, int theChar)`__              | Set the character at the specified index.                                                                         |
| __`string substring(int start)`__                        | Return a new string containing the substring from the start index to the end of the string.                       |
| __`string substring(int start, int length)`__            | Return a new string containing the substring from the start index of the specified length.                        |
| __`float toFloat()`__                                    | Attempt to convert the contents of the string to an float and return the result, or 0 if conversion failed.       |
| __`int toInt()`__                                        | Attempt to convert the contents of the string to an integer and return the result, or 0 if conversion failed.     |
| __`string toString()`__                                  | (inherited from Object)                                                                                           |
| __`string trim()`__                                      | Return a new string in which leading and trailing whitespace has been removed.                                    |
| __`string upper()`__                                     | Return a new string in which the lowercase characters of the original string have been converted to uppercase.    |

## Std 

The Std class is a subclass of [Object](#object) and is comprised of several
_static_ utility functions, legacy random number generation, unit conversions, 
and absolute value.

```chuck
// infinite time-loop
while( true )
{
  // generate random float (and print)
  <<< Std.rand2f( 100.0, 1000.0 ) >>>;
  // wait a bit
  50::ms => now;
}
```

| Std.functions                                                                       | Description                                                                                                                                                                                                                                 |
| :---------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| __`int abs(int value)`__                                                            | returns absolute value of integer                                                                                                                                                                                                           |
| __`float atof(string value)`__                                                      | converts ascii (string) to floating point value (float)                                                                                                                                                                                     |
| __`int atoi(string value)`__                                                        | converts ascii (string) to integer (int)                                                                                                                                                                                                    |
| __`int clamp(int v, int min, int max)`__                                            | clamp integer between range [min, max0                                                                                                                                                                                                      |
| __`int clampf(float v, float min, float max)`__                                     | clamp float between range [min, max0                                                                                                                                                                                                        |
| __`float dbtolin(float value)`__                                                    | converts decibels (dB) to linear amplitude                                                                                                                                                                                                  |
| __`float dbtopow(float value)`__                                                    | converts decibels (dB) to signal power ratio                                                                                                                                                                                                |
| __`float dbtorms(float value)`__                                                    | converts decibles (dB) to rms                                                                                                                                                                                                               |
| __`float fabs(float)`__                                                             | returns absolute value of float                                                                                                                                                                                                             |
| __`string ftoa(float f, int precision)`__                                           | converts floating point value to ascii (string) with specified percision (number of decimal digits).                                                                                                                                        |
| __`int ftoi(float f)`__                                                             | converts float to int                                                                                                                                                                                                                       |
| __`int ftom(float f)`__                                                             | converts frequency (Hz) to MIDI note number space.                                                                                                                                                                                          |
| __`string getenv(string key)`__                                                     | returns the value of an environment variable, such as of "PATH"                                                                                                                                                                             |
| __`string itoa(int f)`__                                                            | converts integer value to ascii (string)                                                                                                                                                                                                    |
| __`float lintodb(float value)`__                                                    | Convert linear amplitude to decibels (dB).                                                                                                                                                                                                  |
| __`float mtof(float value)`__                                                       | converts a MIDI note number to frequency (Hz) note the input value is of type 'float' (supports fractional note number)                                                                                                                     |
| __`float powtodb(float value)`__                                                    | converts signal power ratio to decibels (dB)                                                                                                                                                                                                |
| __`int rand2(int min, int max)`__                                                   | generates random integer between [min, max],                                                                                                                                                                        |
| __`float rand2f(float min, float max)`__                                            | generates random floating point number in the range [min, max]                                                                                                                                                     |
| __`int rand()`__                                                                    | generates random integer,                                                                                                                                                                                          |
| __`float randf()`__                                                                 | generates random floating point number in the range [-1, 1]                                                                                                                                                         |
| __`float rmstodb(float value)`__                                                    | converts linear amplitude to decibels (dB)                                                                                                                                                                                                  |
| __`float scalef(float v, float srcmin, float srcmax, float dstmin, float dstmax)`__ | Scale a float from source range to destination range                                                                                                                                                                                        |
| __`int setenv(string key, string value)`__                                          | sets environment variable named 'key' to 'value'                                                                                                                                                                                            |
| __`float sgn(float value)`__                                                        | computes the sign of the input as -1.0 (negative), 0 (zero), or 1.0 (positive)                                                                                                                                                              |
| __`float srand(int seed)`__                                                         | Provide a seed to the random function. Different seeds will generate very different sequences of random numbers even if the seeds are close together. Alternatively, a sequence of random numbers can be repeated by setting the same seed. |
| __`int system(string cmd)`__                                                        | pass a command to be executed in the shell (may be disabled for security)                                                                                                                                                                   |

## Math

The __Math__ class is a subclass of [Object](#object) and is comprised of a 
number of _static_ math function including all trignometric functions as well as 
random number generators. Expresses angles in radians. There is some overlap
with static functions of the [Std](#std) class. Generally the Math variant
should be preferred.

```chuck
// print sine of pi/2
<<<< Math.sin( Math.PI / 2.0 ) >>>;

// infinite time-loop
while( true )
{
  // generate random float (and print)
  <<< Math.random2f( 100.0, 1000.0 ) >>>;
  // wait a bit
  50::ms => now;
}
```

| Math.functions                                   | Description                                                                                                                                                                                                                                 |
| :----------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| __`float PI`__                                   | constant PI; used: Math.PI                                                                                                                                                                                                                  |
| __`float TWO_PI`__                               | constant PI*2; used: Math.TWO_PI                                                                                                                                                                                                            |
| __`float e`__                                    | Euler's constant, base of natural logarithm; same as Math.exp(1); use as: Math.e or Math.E                                                                                                                                                  |
| __`complex i`__                                  | the imaginary number 'i' as a complex value; use as: Math.i or Math.j or Math.I or Math.J                                                                                                                                                   |
| __`int RANDOM_MAX`__                             | max value returned by Math.random() (NOTE: not to be confused with Std.rand*)                                                                                                                                                               |
|                                                  |
| __`int abs(int x)`__                             | returns the absolute value of an integer                                                                                                                                                                                                    |
| __`float acos(float x)`__                        | computes the arc cosine of x                                                                                                                                                                                                                |
| __`float asin(float x)`__                        | computes the arc sine of x                                                                                                                                                                                                                  |
| __`float atan2(float y, float x)`__              | computes the principal value of the arc tangent of y/x, using the signs of both arguments to determine the quadrant of the return value                                                                                                     |
| __`float atan(float x)`__                        | computes the arc tangent of x                                                                                                                                                                                                               |
| __`float ceil(float x)`__                        | round to smallest integral value (returned as float) not less than x                                                                                                                                                                        |
| __`float cos(float x)`__                         | computes the cosine of x                                                                                                                                                                                                                    |
| __`float cosh(float x)`__                        | computes the hyperbolic cosine of x                                                                                                                                                                                                         |
| __`float dbtopow(float value)`__                 | converts decibels (dB) to signal power ratio                                                                                                                                                                                                |
| __`float dbtorms(float value)`__                 | converts decibles (dB) to rms                                                                                                                                                                                                               |
| __`int ensurePow2(int n)`__                      | return the integral (returned as int) smallest power of 2 greater than the value of x.                                                                                                                                                      |
| __`float exp(float x)`__                         | computes e^x, the base-e exponential of x                                                                                                                                                                                                   |
| __`float fabs(float value)`__                    | return the absolute value of float                                                                                                                                                                                                          |
| __`float floor(float x)`__                       | round to largest integral value (returned as float) not greater than x                                                                                                                                                                      |
| __`float fmod(float x, float y)`__               | computes the floating point remainder of x / y                                                                                                                                                                                              |
| __`float ftom(float f)`__                        | converts frequency (Hz) to MIDI note number space.                                                                                                                                                                                          |
| __`float gauss(float x, float mean, float sd)`__ | computes the weight for input x taken from a gaussian distribution around the mean and standard deviation                                                                                                                                                  |
| __`float hypot(float x, float y)`__              | computes the euclidean distance of the orthogonal vectors (x,0) and (0,y)                                                                                                                                                                   |
| __`float im(complex value)`__                    | return the imaginary component of a complex number                                                                                                                                                                                          |
| __`int isinf(float x)`__                         | return 1 if x is infinite, else return 0                                                                                                                                                                                                    |
| __`int isnan(float x)`__                         | return 1 if x "is not a number", else return 0                                                                                                                                                                                              |
| __`float log10(float x)`__                       | computes the logarithm of x to base 10                                                                                                                                                                                                      |
| __`float log2(float x)`__                        | computes the logarithm of x to base 2                                                                                                                                                                                                       |
| __`float log(float x)`__                         | computes the natural logarithm of x                                                                                                                                                                                                         |
| __`float mag(polar value)`__                     | return the magnitude of a polar value                                                                                                                                                                                                       |
| __`float map(float value, float x1, float x2, float y1, float y2)`__ | maps a number in one range to a second range. Unclamped. |
| __`float map2(float value, float x1, float x2, float y1, float y2)`__ | maps a number in one range to a second range. Clamped. |
| __`float max(float x, float y)`__                | return greater of two values                                                                                                                                                                                                                |
| __`float min(float x, float y)`__                | return lesser of two values                                                                                                                                                                                                                 |
| __`float mtof(float value)`__                    | converts a MIDI note number to frequency (Hz) note the input value is of type 'float' (supports fractional note number)                                                                                                                     |
| __`int nextpow2(int x)`__                        | computes the integeral (returned as int) smallest power of 2 greater than the value of x                                                                                                                                                    |
| __`float phase(polar value)`__                   | return the phase of a polar return                                                                                                                                                                                                          |
| __`float pow(float x, float y)`__                | computes x taken to the y-th power                                                                                                                                                                                                          |
| __`float powtodb(float value)`__                 | converts signal power ratio to decibels (dB)                                                                                                                                                                                                |
| __`float ptor(polar[] from, complex[] to)`__     | convert an array of polar complex numbers to an array of rectangular complex numbers in place (the second argument is the array that is to be modified). Returns the total number of conversions.                                           |
| __`int random2(int min, int max)`__              | generates random integer in the range [min, max]                                                                                                                                                                                            |
| __`float random2f(float min, float max)`__       | generates random floating point number in the range [min, max]                                                                                                                                                                              |
| __`int random()`__                               | generates random integer between 0 and Math.RANDOM_MAX (NOTE: Math.random*() functions use a different, superior random number generator than the Std.rand*() functions)                                                                    |
| __`float randomf()`__                            | generates random floating point number in the range [0, 1] (NOTE: this is different semantics than Std.randf(), which has the range [-1,1])                                                                                                 |
| __`float re(complex value)`__                    | return the real component of a complex number                                                                                                                                                                                               |
| __`float remainder(float x, float y)`__          | computes the value r such that `r = x - n * y`, where n is the integer nearest the exact value of x / y.  If there are two integers closest to x / y, n shall be the even one. If r is zero, it is given the same sign as x                 |
| __`float rmstodb(float value)`__                 | converts rms to decibels (dB)                                                                                                                                                                                                               |
| __`float round(float x)`__                       | round to nearest integral value (returned as float)                                                                                                                                                                                         |
| __`float rtop(complex[] from, polar[] to)`__     | convert an array of rectangular complex numbers to an array of polar complex numbers in place (the second argument is the array that is to be modified). Returns the total number of conversions.                                           |
| __`float sgn(float value)`__                     | computes the sign of the input as -1.0 (negative), 0 (zero), or 1.0 (positive)                                                                                                                                                              |
| __`float sin(float x)`__                         | computes the sine of x                                                                                                                                                                                                                      |
| __`float sinh(float x)`__                        | computes the hyperbolic sine of x                                                                                                                                                                                                           |
| __`float sqrt(float x)`__                        | computes the nonnegative square root of x  (x must be >= 0)                                                                                                                                                                                 |
| __`void srandom(int seed)`__                     | provide a seed to the random function. Different seeds will generate very different sequences of random numbers even if the seeds are close together. Alternatively, a sequence of random numbers can be repeated by setting the same seed. |
| __`float tan(float x)`__                         | computes the tangent of x                                                                                                                                                                                                                   |
| __`float tanh(float x)`__                        | computes the hyperbolic tangent of x                                                                                                                                                                                                        |
| __`float trunc(float x)`__                       | round to largest integral value (returned as float) no greater in magnitude than x                                                                                                                                                          |

## Machine

__Machine__ is a subclass of [Object](#object) and constitutes the ChucK runtime 
interface to the virtual machine.  It is comprised entirely of static functions,
so there's no need to create an instance of this class. Machine is used to 
manage shreds and the functions are similar to the 
[On-the-fly Programming Commands](./otfp.md) except these are invoked 
from within a ChucK program and are subject to the timing mechanism.

| Machine.function                       | Description                                                                                                          |
| :------------------------------------- | :------------------------------------------------------------------------------------------------------------------- |
| __`int add(string path)`__             | compile and spork a new shred from file at 'path' into the VM now. Returns the new `shredID`(see example/machine.ck) |
| __`void crash()`__                     | literally causes the VM to crash. The very last resort; use with care.  Thanks.                                      |
| __`int intsize()`__                    | return the bit size of a integer.                                                                                    |
| __`int remove(int id)`__               | remove shred from VM by shred ID (returned by add/spork)                                                             |
| __`int replace(int id, string path)`__ | replace shred with new shred from file (returns new shred id or 0 on error)                                          |
| __`int[] shreds()`__                   | return an integer array containing IDs of current [Shred](#shred) objects                                            |
| __`int status()`__                     | display current status of VM (see example/status.ck)                                                                 |


## Event

The __Event__ is a subclass of [Object](#object) and allows exact synchronization
across an arbitrary number of shreds.  It is common to create a _subclass_ of
of Event comprised of custom methods and member variables.

| Event.function            | Description                                                               |
| :------------------------ | ------------------------------------------------------------------------- |
| __`void broadcast()`__    | Signal all shreds that are waiting on this event.                         |
| __`int can_wait()`__      | Whether or not the event can be waited on. Currently always returns true. |
| __`void signal()`__       | Signal one shred that is waiting on this event.                           |
| __`void wait(Shred me)`__ | (Currently unsupported.)                                                  |

## Shred

__Shred__ is a subclass of [Object](#object) and facilitates various operations 
and interactions with shreds running in the ChucK virtual machine. 

| Shred.function                    | Description                                                                                                                            |
| :-------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------- |
| __`static Shred fromId(int id)`__ | returns a Shred object corresponding to the provided ID. [Machine](#machine).shreds() can be used to obtain a list of active Shred ids |
|                                   |
| __`string arg(int index)`__       | return the launch argument at the specified index.                                                                                     |
| __`int args()`__                  | return the number of arguments provided to the shred.                                                                                  |
| __`void clone()`__                |                                                                                                                                        |
| __`string dir()`__                | return the enclosing directory of the source code file from which this shred's code is derived (same as .sourceDir()).                 |
| __`string dir(int levelsUp)`__    | return the enclosing directory, the specified number of parent directories up.                                                         |
| __`int done()`__                  | Return true if the shred is done processing; false otherwise.                                                                          |
| __`void exit()`__                 | immediately halt the shred's operation and remove it from the virtual machine.                                                         |
| __`int id()`__                    | return the unique numeric id of the shred.                                                                                             |
| __`string path()`__               | return the file path of the source code file from which this shred's code is derived (same as .sourcePath()).                          |
| __`int running()`__               | return true if the shred is currently running; false otherwise.                                                                        |
| __`string sourceDir()`__          | return the enclosing directory of the source code file from which this shred's code is derived.                                        |
| __`string sourcePath()`__         | return the path of the source code file from which this shred's code is derived.                                                       |
| __`void yield()`__                | cause the shred to temporarily stop processing, allowing other scheduled shreds to run as needed.                                      |

## RegEx

__RegEx__ is a subclass of [Object](#object) and implements regular expression 
matching and replacing in strings. The RegEx style supported is POSIX-extended.
__RegEx__ is comprised of 4 _static_ functions and so there is no need to
create an instance of this class.

| RegEx.function                                                           | Description                                                                                                                                      |
| :----------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------- |
| __`int match(string pattern, string str)`__                              | return true if match for pattern is found in str, false otherwise                                                                                |
| __`int match(string pattern, string str, string[] matches)`__            | return the match and sub-patterns in matches. matches[0] in the entire matched pattern, matches[1] is the first sub-pattern (if any), and so on. |
| __`string replace(string pattern, string replacement, string str)`__     | replace the first instance of pattern in str with replacement, returning the result.                                                             |
| __` string replaceAll(string pattern, string replacement, string str)`__ | replace all instances of pattern in str with replacement, returning the result.                                                                  |

${PROGFOOTER}
