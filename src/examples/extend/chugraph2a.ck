
// Chugraph2a
//  a Chugraph that has stereo inputs and outputs
//  this may be useful in contructing hierachical effects chains.
//  This example demonstrates stereo inputs.

class MyString extends Chugraph2
{
    // karplus + strong plucked string filter
    // Ge Wang (gewang@cs.princeton.edu)
    OneZero lowpass;
    DelayA delay;
    
    this.inlet => this.lowpass => this.outlet;
    this.lowpass => this.delay => this.lowpass;
    -1 => this.lowpass.zero;
    220 => this.freq;
    0 => this.inlet.gain;
    
    .99999 => float R;
    1/220 => float L;
    
    fun float freq( float f )
    {
        1/f => L;
        L::second => this.delay.delay;
        Math.pow( R, L ) => this.delay.gain;
        return f;
    }
    
    fun void pluck()
    {
        1 => inlet.gain;
        L::second => now;
        0 => inlet.gain;
        (Math.log(.0001) / Math.log(R))::samp => now;
    }
}


MyString s[3];
[-1., 0, 1] @=> float pans[];
for(int i; i < s.size(); i++) 
{
    new Noise => s[i] => dac;
    pans[i] => s[i].pan;
}

for(int j;j<20;j++)
{
    for( int i; i < s.size(); i++ )
    {
        Math.random2(60, 72) => Std.mtof => s[i].freq;
        spork ~ s[i].pluck();
        0.25::second => now;
    }
    2::second => now;
}
