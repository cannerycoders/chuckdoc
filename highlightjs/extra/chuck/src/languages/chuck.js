/*
Language: ChucK
Website: https://chuck.stanford.edu
Description: chuck is a music composition language that borrows cpp and java sytnax
with  many fewer bells and whistles.  This file was derived from the cpp
language file.
*/
export default function(hljs)
{
    const CHARACTER_ESCAPES = "\\\\(x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4,8}|[0-7]{3}|\\S)";
    const C_STRING_MODE = 
    {
        className: "string",
        variants: [
            {
                begin: "(u8?|U|L)?\"",
                end: "\"",
                illegal: "\\n",
                contains: [ hljs.BACKSLASH_ESCAPE ]
            },
            {
                begin: "(u8?|U|L)?'(" + CHARACTER_ESCAPES + "|.)",
                end: "'",
                illegal: "."
            },
            hljs.END_SAME_AS_BEGIN({
                begin: /(?:u8?|U|L)?R"([^()\\ ]{0,16})\(/,
                end: /\)([^()\\ ]{0,16})"/
            })
        ]
    };
    const C_NUMBER_MODE =
    {
        className: "number",
        variants: [
            {
                begin: "\\b(0b[01']+)"
            },
            {
                begin: "(-?)\\b([\\d']+(\\.[\\d']*)?|\\.[\\d']+)((ll|LL|l|L)(u|U)?|(u|U)(ll|LL|l|L)?|f|F|b|B)"
            },
            {
                begin: "(-?)(\\b0[xX][a-fA-F0-9']+|(\\b[\\d']+(\\.[\\d']*)?|\\.[\\d']+)([eE][-+]?[\\d']+)?)"
            }
        ],
        relevance: 0
    };

    const CHUCK_KEYWORDS =
    {
        /* see chuck.lex ---- */
        keyword: "for while until|10 repeat continue break if else do return " +
        "function fun|10 new class extends public protected " +
        "private static pure const spork|10 global " +
        "default try this float void int dur|10 complex polar vec3 vec4",

        literal: "true false null NULL",

        built_in: "dac|10 adc|10 blackhole|10 me|10 now|10 ms second minute hour day week " +
        "Object UGenMulti UGenStereo UGen " +
        "Osc UAnaBlob UAna Windowing " +
        "ChubGraph Chugen " +
        "Mix2 Pan2 Gain Impulse Step Noise " +

        "Phasor SinOsc|10 TriOsc SawOsc SqrOsc PulseOsc SndBuf2 SndBuf " +
        "HalfRect FullRect " +

        "FilterBasic BPF BRF LPF HPF ResonZ BiQuad " +
        "OnePole TwoPole OneZero TwoZero PoleZero " +

        "LiSa Dyno CNoise Gen17 Gen10 Gen7 Gen5 GenX " +
        "CurveTable WarpTable " +

        "ADSR Envelope DelayL DelayA Delay Echo JCRev NRev " +
        "PRCRev Chorus Modulate PitShift SubNoise BLT Blit " +
        "BlitSaw BlitSquare WvIn WaveLoop WvOut StkInstrument " +
        "BandedWG BlowBotl BlowHole Bowed Brass Clarinet " +
        "Flute Mandolin ModalBar Moog Saxofony Shakers Sitar " +
        "StifKarp VoicForm FM BeeThree FMVoices HevyMetl " +
        "PercFlut Rhodey TubeBell Wurley " +

        "ABSaturator AmbPan3 Bitcrusher ExpDelay ExpEnv Elliptic Faust " +
        "FIR FluidSynth FoldbackSaturator GVerb KasFilter Ladspa " +
        "MagicSine Mesh2D MIAP NHHall PanN Perlin PitchTrack " +
        "PowerADSR Random Sigmund Spectacle Wavetable WinFuncEnv " +
        "WPDiodeLadder WPKorg35 " +

        "IO FileIO StdOut StdErr OscIn OscOut OscMsg Hid HidMsg " +
        "SerialIO MidiIn MidiOut MidiMsg MidiFileIn " +

        "FFT IFFT DCT IDCT Centroid Flux RMS RollOff ZeroX Flip " +
        "pilF FeatureCollector",
    };

    /* pre-existing style classes (each line shares style in eg: a11y-dark.css)
        comment, quote, 
        variable, template-variable, tag, name, selector-id,
            selector-class, regexp, deletion, 
        number, built_in, builtin-name, literal, type, params, meta, link,
        attribute, 
        string, symbol, bullet, addition, 
        title, section
        keyword, selector-tag
     */

    const CHUCK_OPERATORS =
    {
        className: "keyword",
        begin: /=>|\*=>|=\^|<<<|>>>|<</   // just the weird operators
    };

    const CHUCK_NAMESPACES =
    {
        className: "name",
        begin: /Math|Std|Machine|RegEx|Shred|Event/
    }

    return {
        name: "chuck",
        aliases: ["ck"],
        keywords: CHUCK_KEYWORDS,
        contains: [].concat(
            hljs.C_LINE_COMMENT_MODE,
            hljs.C_BLOCK_COMMENT_MODE,
            C_NUMBER_MODE,
            C_STRING_MODE,
            CHUCK_OPERATORS,
            CHUCK_NAMESPACES,
        ),
    };
}
