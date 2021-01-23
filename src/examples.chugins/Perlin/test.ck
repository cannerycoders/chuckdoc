
Perlin n => SinOsc s => dac;
50 => n.gain; /* range of frequency modulation */
25 => n.freq;
2 => s.sync; // s input is freq modulation

25::second => now;