
// Chugraph2b
//  a Chugraph that has stereo inputs and outputs
//  this may be useful in contructing hierachical effects chains.
//  This example demonstrates stereo inputs.

class PassIt extends Chugraph2
{
    this.inlet => this.outlet;
    0 => this.inlet.gain;

    fun void play()
    {
        .5 => this.inlet.gain;
        .5::second => now;
        0 => this.inlet.gain;
    }

}

PassIt s[3];
[-1., 0, 1] @=> float pans[];

for(int i; i < s.size(); i++) 
{
    SqrOsc o1;
    SqrOsc o2;
    Pan2 pan;
    .5 => o1.gain;
    .5 => o2.gain;
    100 => o1.freq;
    200 => o2.freq;
    o1 => pan.left;
    o2 => pan.right;
    pan => s[i] => dac;
    pans[i] => s[i].pan;
}

s[1].play();
2::second => now;

for(int j;j<20;j++)
{
    for( int i; i < s.size(); i++ )
    {
        s[i].play();
        2::second => now;
    }
}
