//
// bpf (lower passband, upper passband, stopband):
//

Noise n => Elliptic ell => dac;
0.1 => n.gain;

80 => ell.atten; // 80 dB attenuation
10 => ell.ripple; // 10 dB ripple will cause ringing

ell.bpf(500,600,650); // create band-pass filter which
                      // passes the range 500-600 Hz
                      // unattenuated, then slopes from
                      // 600-650 Hz (and 450-500 Hz)

true => ell.bypass; // bypass filter
2::second => now;

false => ell.bypass; // activate filter
minute => now;