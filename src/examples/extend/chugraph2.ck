
// Chugraph2
//  a Chugraph that has stereo inputs and outputs
//  this may be useful in contructing hierachical effects chains.
//  NB: this trivial example doesn't fully motivate the application
//  since we could easily wire a standard Chugraph into a Pan2 node
//  to achieve this effect.

class MyString extends Chugraph2
{
    // karplus + strong plucked string filter
    // Ge Wang (gewang@cs.princeton.edu)
    
    Noise imp => OneZero lowpass => this.outlet;
    lowpass => DelayA delay => lowpass;
    
    .99999 => float R;
    1/220 => float L;
    -1 => lowpass.zero;
    220 => freq;
    0 => imp.gain;
    
    fun float freq( float f )
    {
        1/f => L;
        L::second => delay.delay;
        Math.pow( R, L ) => delay.gain;
        return f;
    }
    
    fun void pluck()
    {
        1 => imp.gain;
        L::second => now;
        0 => imp.gain;
        (Math.log(.0001) / Math.log(R))::samp => now;
    }
}

MyString s[3];
// MyOsc s[1];
for(int i; i < s.size(); i++) s[i] => dac;
.7 => dac.gain;

for(int j;j<20;j++)
{
    for( int i; i < s.size(); i++ )
    {
        Math.random2f(-1, 1) => s[i].pan;
        Math.random2( 60,72 ) => Std.mtof => s[i].freq;
        spork ~ s[i].pluck();
        0.25::second => now;
    }
    2::second => now;
}
