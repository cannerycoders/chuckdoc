//Under-sampling based resonant Lowpass filter by Kassen
//Internal workings are explained in the source, for those who need that. 
//let's have a look at how to use it in practice here.

chout <= "hi there! \n";
chout <= "Let's do some filtering! \n";
chout <= "Let's start with a simple example: \n";
chout <= "... \n";
chout.flush();
BlitSaw s => KasFilter kf => dac; //we use a BlitSaw because it doesn't alias.

220 => s.freq;


Envelope ramp => blackhole; //our modulation signal.

220			=> ramp.value;
5::second	=> ramp.duration;
5000		=> ramp.target;

while (ramp.value() < ramp.target())
{
	ramp.value() => kf.freq;
	samp => now;
}
0 => s.freq;
0 => s.op;

chout <= "That sounded a bit like a filter and a bit like under-sampling, right? \n";
chout <= "That's because that's exactly what's going on. \n";
chout <= "But we can do more, we can add resonance to it, like a normal filter. \n";
chout <= "Let's try the same sweep again, but now with some resonance. \n";
chout <= "... \n";
chout.flush();
2::second => now;

220			=> s.freq;
1			=> s.op;

220			=> ramp.value;
5::second	=> ramp.duration;
5000		=> ramp.target;
.85			=> kf.resonance;

while (ramp.value() < ramp.target())
{
	ramp.value() => kf.freq;
	samp => now;
}
0 => s.freq;
0 => s.op;


chout <= "With resonance there is a lot more emphasis on the filter sweep. \n";
chout <= "It also brings the artefacts of this technique more to the foreground. \n";
chout <= "That might be good or it could be bad, depending on what you want... \n";
chout <= "I quite like it, so we can go one step further; \n";
chout <= "We can also add a overdrive effect to this resonance, let's try that, \n";
chout <= "we'll also turn the frequency of the input way down for the occasion.... \n";
chout <= "... \n";
chout.flush();
2::second => now;

8			=> s.freq;
1			=> s.op;

75			=> ramp.value;
5::second	=> ramp.duration;
1000		=> ramp.target;
.75			=> kf.accent;
.95			=> kf.resonance;

while (ramp.value() < ramp.target())
{
	ramp.value() => kf.freq;
	samp => now;
}
0 => s.freq;
0 => s.op;
chout <= "That's about it. \n";
chout <= "I found it's especially good for lo-fi acid techna, \n";
chout <= "it might be good for other things as well, \n";
chout <= "Have fun! \n";
chout.flush();

2::second => now;
