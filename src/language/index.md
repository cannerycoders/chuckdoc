${PAGEHEADER}

<center>

# ChucK Language Reference

`version ${CHUCKVERS}`

<!--
<img src="/images/on-the-fly_50dpi.jpg" style="width:90%;max-width:600px">
-->

See also [ChucK Programmer's Reference](../program/index.md).

</center>

-----

### Intro

[ChucK](http://chuck.cs.princeton.edu) is a strongly-typed,
**strongly-timed**, concurrent audio and multimedia programming language.
It is compiled into virtual instructions, which are immediately run in the
ChucK Virtual Machine.  This guide documents the features of the Language,
Compiler, and Virtual Machine for a ChucK programmer.

<!-- spaces after each line imply <br/> -->
<!-- markdown auto-generates anchors for h elemnets and 
-- in the process 'flattens' out bad characters.
-- Operator titles have lots of offenders, so we
-- manually introduce anchors with easier names.
-- Anchors should take the form: <a id="myname"></a>.
-->

### [Overview](overview.md)

[running chuck](overview.md#runningchuck)  
[comments](overview.md#comments")  
[reserved words](overview.md#reservedwords)  

### [Types, Values, Variables](type.md)

[primitive types](type.md#primitivetypes)  
[values](type.md#valuesliterals")  
[variables](type.md#variables)  
[references](type.md#referencetypes)  
[complex types](type.md#complextypes)  

### [Arrays](arrays.md)

[declaring](array.md#declaration)  
[multi-dimensional](array.md#multidimensionalarrays)  
[lookup](array.md#lookup)  
[associative arrays](array.md#associativearrays)  
[assignment](array.md#arrayassignment)  

### [Operators + Operations](oper.md)

[`=> =^ =<` (chuck, upchuck, unchuck)](oper.md#chuckops)  
[`+ - * /` (arithmetic)](oper.md#arithmetic)
[`%` (modulo)](oper.md#modulo)  
[`&& || == != >= <=` (logical)](oper.md#logical)
[`& | ^` (bitwise)](oper.md#bitwise)  
[`++ --` (inc / dec)](oper.md#incdec)  
[`! + - new`](oper.md#unary)  
[`$` (cast)](oper.md#cast)  
[`<<` (array append)](array.md#arrayops)  

### [Control Structures](ctrl.md)

[`if / else`](ctrl.md#if)  
[`while`](ctrl.md#while)  
[`until`](ctrl.md#until)  
[`for`](ctrl.md#for)  
[`break / continue`](ctrl.md#break")  

### [Manipulating Time](time.md)

[time and duration](time.md#type)  
[operations (arithmetic)](time.md#oper)  
[the keyword 'now'](time.md#now)  
[advancing time](time.md#advance)  

### [Functions](func.md)

[writing](func.md#write)  
[calling](func.md#calling)  
[overloading](func.md#overloading)  
  
### [Concurrency, Processes, Shreds](spork.md)

[sporking shreds](spork.md#spork)  
[the `me` keyword](spork.md#me)  
[using `machine.add()`](spork.md#add)  
[inter-shred communication](spork.md#com)  
[commandline](spork.md#arguments)  

### [Classes and Objects](class.md)

[introduction](class.md#intro)  
[existing classes](class.md#base)  
[working with objects](class.md#new)  
[writing a class](class.md#create)  
[members (data + functions)](class.md#member)  
[static (data + functions)](class.md#static)  
[inheritance](class.md#extend)  
[overloadation (overloading + overriding)](class.md#overloadation)  

### [Unit Generators](ugen.md)

[declaring](ugen.md#decl)
[connecting] (ugen.md#connect)  
[controlling (timing mechanism)](ugen.md#ctrl)  
[mono + stereo](ugen.md#chan)  
[built-in](ugen.md#builtin)  
creating (coming soon)

### [Unit Analyzers](uana.md)

[declaring](uana.md#declaring)  
[connecting](uana.md#connecting)  
[controlling over time](uana.md#controlling)  
[representing metadata: the UAnaBlob](uana.md#representing_metadata)  
[representing complex data](uana.md#representing_complex)  
[performing analysis in UAna networks](uana.md#performing)  
[built-in unit analyzers](uana.md#builtin)  
creating (coming soon)
<!--[using events](uana.md#using_events)  -->

### [Events](event.md)

[what they are](event.md#intro)  
[using](event.md#use)  
[the MIDI event](event.md#midi)  
[the OSC event](event.md#osc)
[creating custom events](event.md#extend)  

${LANGFOOTER}
