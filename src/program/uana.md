${PROGHEADER}

<center>

## ChucK Unit Analyzers

[^ programmer's guide](./index.md) | [std classes](./classes_std.md) | [basic ugen](./ugen_basic.md)  
[^^ language guide to uanae](../language/uana.md)

<!-- nb: extra eol spaces on some lines cause <br/> -->
[UAna](#uana) | [UAnaBlob](#uanablob) | [Windowing](#windowing)  
[FFT](#fft) | [IFFT](#ifft) | [DCT](#dct) | [IDCT](#idct)  
[Centroid](#centroid) | [Flux](#flux) | [RMS](#rms) |
[RollOff](#rolloff) | [ZeroX](#zerox) | [Flip](#flip)
[pilF](#pilF) | [FeatureCollector](#featurecollector)

</center>

----------------------------------------------------------------------------

#### UAna

__`UAna`__ is the base class from which all unit analyzers (UAnae) inherit.
UAnae (note plural form) can be interconnected via `=>` (standard chuck operator)
or via `=^` (upchuck operator), and the connection type specifies the _types 
of_ and _when_ data is passed between UAnae and UGens. When `.upchuck()` is 
invoked on a given UAna, the UAna-chain (UAnae connected via =^) is traversed 
backwards from the upchucked UAna, and analysis is performed at each UAna 
along the chain; the updated analysis results are stored in `UAnaBlob`s.

| UAna.functions                         | Description                                    |
| :------------------------------------- | :--------------------------------------------- |
| __`complex cval(int index)`__          | Get blob's _complex_ value at index.           |
| __`complex[] cvals()`__                | Get blob's _complex_ array.                    |
| __`float fval(int index)`__            | Get blob's float value at index.               |
| __`float[] fvals()`__                  | Get blob's float array.                        |
| __`int isUpConnectedTo(UAna right)`__  | Is connected to another uana via `=^`?         |
| __`UAnaBlob upchuck()`__               | Initiate analysis at the UAna; returns result. |
|                                        |
| member variable: __`UAnaBlob m_blob`__ | Stores state associated with analysis          |

#### UAnaBlob

__`UAnaBlob`__ contains results associated with UAna analysis. There is a 
UAnaBlob associated with every UAna. As a UAna is upchucked, the result is 
stored in the UAnaBlob's floating point vector and/or complex vector. 
The intended interpretation of the results depends on the specific UAna. 

| UAnaBlob.functions            | Description                                |
| :---------------------------- | :----------------------------------------- |
| __`complex cval(int index)`__ | Get blob's complex value at index.         |
| __`complex[] cvals()`__       | Get blob's complex array.                  |
| __`float fval(int index)`__   | Get blob's float value at index.           |
| __`float[] fvals()`__         | Get blob's float array.                    |
| __`time when()`__             | Get the time when blob was last upchucked. |

#### Windowing

__`Windowing`__ is a utility class comprised of static functions to embody
classic windowing functions associated with digital signal processing pipelines.
Each windowing function produces a float array of weights over a sample
region, or _window_, specified by its size parameter. These results are 
passed as a window parameter to various UAnae.

| Windowing.functions                           | Description                 |
| :-------------------------------------------- | :-------------------------- |
| __`static float[] blackmanHarris(int size)`__ | generalized cosine weighted |
| __`static float[] hamming(int size)`__        | cosine weighted             |
| __`static float[] hann(int size)`__           | cosine weighted             |
| __`static float[] triangle(int size)`__       | aka linear intepolation     |
| __`static float[] rectangle(int size)`__      | aka point sampling          |

note: this table is sorted in the order of decreasing complexity + quality.

see [Window Function](https://en.wikipedia.org/wiki/Window_function) (wikipedia)

#### FFT

__`FFT`__ is a subclass of [UAna](#uana) and computes the Fast Fourier Transform 
on incoming audio samples, and outputs the result via its `UAnaBlob` as both 
the complex spectrum and the magnitude spectrum. A buffering mechanism 
maintains the previous FFTsize # of samples, allowing FFT's to be taken at 
any point in time, on demand (via .upchuck() or by upchucking a downstream 
UAna. The window size (along with an arbitrary window shape) is controlled 
via the `.window` function. The hop size is completely dynamic, and is 
throttled by how time is advanced.

| FFT.functions                               | Description                                                           |
| :------------------------------------------ | :-------------------------------------------------------------------- |
| __`int size(int size)`__                    | Set the FFT-size.                                                     |
| __`int size()`__                            | Get the FFT-size.                                                     |
| __`void spectrum(complex[] buffer)`__       | Manually retrieve the results of a transform.                         |
| __`void transform(float[] from)`__          | Manually take FFT (as opposed to using .upchuck() / upchuck operator) |
| __`float[] window(), window(float[] win)`__ | Get/set the transform window/size                                     |
| __`int windowSize()`__                      | Get the current window size.                                          |

#### IFFT

__`IFFT`__ is a subclass of [UAna](#uana) that computes the inverse Fast 
Fourier Transform on incoming spectral frames (on demand), and overlap-adds 
the results into its internal buffer, ready to be sent to other UGens 
connected via `=>`. The window size (along with an arbitrary window shape) is 
controlled via the .window method.

| IFFT.functions                              | Description                                                            |
| :------------------------------------------ | :--------------------------------------------------------------------- |
| __`void samples(float[] buffer)`__          | Manually take IFFT (as opposed to using .upchuck() / upchuck operator) |
| __`int size(), size(int size)`__            | Get/set the IFFT-size.                                                 |
| __`void transform(complex[] from)`__        | Manually take IFFT (as opposed to using .upchuck() / upchuck operator) |
| __`float[] window(), window(float[] win)`__ | Get/set the transform window/size                                      |
| __`int windowSize()`__                      | Get the current window size.                                           |

#### DCT

__`DCT`__ is a subclass of [UAna](#uana) that computes the `Discrete Cosine Transform` 
on incoming audio samples, and outputs the result via its UAnaBlob as real values 
in the D.C. spectrum. A buffering mechanism maintains the previous DCT size # 
of samples, allowing DCT to be taken at any point in time, on demand 
(via .upchuck() or by upchucking a downstream UAna; see UAna documentation). 
The window size (along with an arbitry window shape) is controlled via the 
.window method. The hop size is completely dynamic, and is throttled by how 
time is advanced.

| DCT.functions                               | Description                                                            |
| :------------------------------------------ | :--------------------------------------------------------------------- |
| __`int size(), size(int size)`__            | Get/set the DCT size.                                                  |
| __`void spectrum(float[] buffer)`__         | Manually retrieve the results of a transform.                          |
| __`void transform(float[] from)`__          | Manually take DCT (as opposed to using .upchuck() / upchuck operator). |
| __`float[] window(), window(float[] win)`__ | Get/set the transform window/size.                                     |
| __`int windowSize()`__                      | Get the current window size.                                           |

#### IDCT

__`IDCT`__ is a subclass of [UAna](#uana) that computes the _inverse_
`Discrete Cosine Transform`on incoming spectral frames (on demand), and 
overlap-adds the results into its internal buffer, ready to be sent to 
other UGens connected via `=>`. The window size (along with an arbitry 
window shape) is controlled via the .window method.

| IDCT.functions                              | Description                                                             |
| :------------------------------------------ | :---------------------------------------------------------------------- |
| __`void samples(float[] buffer)`__          | Manually get result of previous IDCT.                                   |
| __`int size(), size(int size)`__            | Get/set the IDCT size.                                                  |
| __`void transform(complex[] from)`__        | Manually take IDCT (as opposed to using .upchuck() / upchuck operator). |
| __`float[] window(), window(float[] win)`__ | Get/set the transform window/size.                                      |
| __`int windowSize()`__                      | Get the current window size.                                            |

#### Centroid

__`Centroid`__ is a subclass of [UAna](#uana) that computes the spectral 
centroid from a magnitude spectrum (either from incoming UAna or manually 
given), and outputs one value in its blob.

| Centroid.functions                        | Description                                        |
| :---------------------------------------- | :------------------------------------------------- |
| __`static float compute(float[] input)`__ | Manually computes the centroid from a float array. |

#### Flux

__`Flux`__ is a subclass of [UAna](#uana) that computes the spectral flux 
between successive magnitude spectra (via incoming UAna, or given manually), 
and outputs one value in its blob.

| Flux.functions                                                     | Description                                                                                |
| :----------------------------------------------------------------- | :----------------------------------------------------------------------------------------- |
| __`static float compute(float[] lhs, float[] rhs)`__               | Manually computes the flux between two frames                                              |
| __`static float compute(float[] lhs, float[] rhs, float[] diff)`__ | Manually computes the flux between two frames, and stores the difference in a third array. |
| __`void reset()`__                                                 | Reset the extractor.                                                                       |

#### RMS

__`RMS`__ is a subclass of [UAna](#uana) that computes the root-mean-squared
power mean from a magnitude spectrum (either from an incoming UAna, or given 
manually), and outputs one value in its blob.

| RMS.functions                             | Description                                   |
| :---------------------------------------- | :-------------------------------------------- |
| __`static float compute(float[] input)`__ | Manually computes the RMS from a float array. |

#### Rolloff

__`Rolloff`__ is a subclass of [UAna](#uana) that computes the spectral rolloff 
from a magnitude spectrum (either from incoming UAna, or given manually), and 
outputs one value in its blob.

| Rolloff.functions                                    | Description                                       |
| :--------------------------------------------------- | :------------------------------------------------ |
| __`static float compute(float[] input, float pct)`__ | Manually computes the rolloff from a float array. |
| __`float percent(), percent(float percent)`__        | Get/set the percentage for computing rolloff.     |

#### ZeroX

__`ZeroX`__ is a subclass of [UAna](#uana) that computes zero-crossings (array
locations where the sign flips from + to - or the reverse). NB: there is also
a [ZeroX UGen](./ugen_basic.md#zerox).

| ZeroX.functions                           | Description                                              |
| :---------------------------------------- | :------------------------------------------------------- |
| __`static float compute(float[] input)`__ | Manually computes the zero crossings from a float array. |

#### Flip

__`Flip`__ is a subclass of [UAna](#uana) that turns audio samples into frames
in the UAna domain.

| Flip.functions                              | Description                                                             |
| :------------------------------------------ | :---------------------------------------------------------------------- |
| __`void output(float[] buffer)`__           | Manually take Flip (as opposed to using .upchuck() / upchuck operator)  |
| __`int size(), size(int size)`__            | Get/set the Flip size.                                                  |
| __`void transform(float[] from)`__          | Manually take Flip (as opposed to using .upchuck() / upchuck operator). |
| __`float[] window(), window(float[] win)`__ | Get/set the transform window/size.                                      |
| __`int windowSize()`__                      | Get the current window size.                                            |

#### pilF

__`pilF`__ is a subclass of [UAna](#uana) that turns UAna frames into 
audio samples, via overlap add.

| pilF.functions                              | Description                                                             |
| :------------------------------------------ | :---------------------------------------------------------------------- |
| __`void output(float[] buffer)`__           | Manually take pilF (as opposed to using .upchuck() / upchuck operator)  |
| __`int size(), size(int size)`__            | Get/set the pilF size.                                                  |
| __`void transform(float[] from)`__          | Manually take Flip (as opposed to using .upchuck() / upchuck operator). |
| __`float[] window(), window(float[] win)`__ | Get/set the transform window/size.                                      |
| __`int windowSize()`__                      | Get the current window size.                                            |

#### FeatureCollector

__`FeatureCollector`__ is a subclass of [UAna](#uana) that turns UAna input 
into a single feature vector, upon .upchuck().

| FeatureCollector.functions | Description |
| :------------------------- | :---------- |
|                            |

${PROGFOOTER}