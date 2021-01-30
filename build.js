const path = require("path");
const fs = require("fs");
let showdown = require("showdown");
let converter = new showdown.Converter(
{
    literalMidWordUnderscores: true, // so snake_case doesn't mess up
    tables: true, // used extensively in program reference pages
    completeHTMLDocument: true
});
let klaw = require("klaw");

let VarMap = {}; // filled in by initChucKDocs
let ClassMapper = (page) => { return "ChucK" }; // pagename to outer div class
let root = process.cwd();
let OutputDir = path.join(root, "output");
let InputDir = path.join(root, "src");

main();

// Then, use it with a simple async for loop
function main()
{
    initChucKDocs();
    klaw(InputDir).on("data", processKlawItem);
}

function processKlawItem(item)
{
    let subpath = item.path.substr(InputDir.length + 1);
    let fmt = path.parse(subpath);
    if(fmt.ext == ".md")
    {
        delete fmt.base;
        fmt.ext = ".html";
    }
    fmt.dir = path.join(OutputDir, fmt.dir);
    let output = path.format(fmt);
    let dirty = false;
    if(!fs.existsSync(output))
        dirty = true;
    else
    if(!item.stats.isDirectory())
    {
        let ostat = fs.lstatSync(output);
        if(item.stats.mtime > ostat.mtime)
            dirty = true;
    }
    if(dirty)
    {
        if(item.stats.isDirectory())
        {
            console.log("mkdir " + output);
            fs.mkdirSync(output);
        }
        else
        {
            if(fmt.ext == ".html")
            {
                // convert
                console.log("convert: " + subpath);
                mdToHtml(item.path, output, subpath);
            }
            else
            {
                console.log("copy: " + subpath);
                fs.copyFileSync(item.path, output);
            }
        }
    }
}

function mdToHtml(inpath, outpath, subpath)
{
    let depth = 0;
    let dirname = path.dirname(subpath);
    if(dirname != ".")
    {
        let dirs = dirname.split(path.sep);
        if(dirs[0] == ".") // refs like "./foo.md"
            dirs.shift();
        depth = dirs.length;
    }
    let txt = fs.readFileSync(inpath).toString();
    let ntxt = substituteVars(txt);
    let html = converter.makeHtml(ntxt);
    let html2 = fixupAssetRefs(html, depth);
    let html3 = fixupStyling(html2, subpath, depth);
    fs.writeFileSync(outpath, html3);
}

function substituteVars(txt)
{
    return txt.replace(/\$\{\w+\}/g,
        (match) =>
        {
            let key = match.slice(2, -1);
            let result = VarMap[key];
            if(result === undefined)
                return match;
            else
                return result;
        });
}

/**
 * given a pile of html, find refs to external assets (presumably authored
 * relative to the current markdown) and fully qualify them relative to
 * our base/root dir.
 * @param {} body  (pile of post-transformed, pre-parsed html)
 */
function fixupAssetRefs(body, depth)
{
    // https://regexr.com/333d1
    // .* means any char, ? means bail early (prior to the ")
    let r = /src=["'].*?["']|href=["'].*?["']/g;
    let nbody = body.replace(r, (match, p1) =>
    {
        // src="https:/foo/bar"; href="/foo/bar", etc
        return match.replace(/["'](.*?)["']/, (match, p1) =>
        {
            if(p1.indexOf("http") == 0)
                return match;
            else
            {
                let p2 = p1.replace(".md", ".html");
                if(p2[0] == "/")
                {
                    // if a file in language/foo.html has refs like:
                    // '/images/x', we'd like to convert refs to "../images"
                    // relative refs should 'just work', but have the 
                    // downside of locking a subdir into its place.
                    if(depth > 0)
                        p2 = path.join("../".repeat(depth), p2);
                    else
                        p2 = path.join(".", p2);
                    p2 = p2.replace(/\\/g, "/");
                    // console.log("correcting " + p1 + " to " + p2 + ` (${depth})`);
                }
                return p2;
            }
        });
    });
    return nbody;
}

// here we introduce a stylesheet link as well as attach page-specific 
// classes to the body.
function fixupStyling(html, subfile, depth)
{
    let toroot;
    if(depth == 0)
        toroot = "./";
    else
        toroot = "../".repeat(depth);

    let r = /<\/head>|<body>|<\/body>/g;
    let nbody = html.replace(r, (match, p1) =>
    {
        if(match == "</head>")
        {
            return `<link href="${toroot}index.css" rel="stylesheet">\n${match}`;
        }
        else
        if(match == "<body>")
        {
            return `<body><div class="Markdown ${ClassMapper(subfile)}">`;
        }
        else
        {
            return "</div></body>"
        }

    });
    return nbody;
}

function initChucKDocs()
{
    let snips = {};
    snips.ckheader = "<a href='/index.md'>" +
        "<img src='/images/chuck_logo.jpg' class='PageLogo'/>" +
        "</a>";
    snips.ckoffsite = "<hr/>" +
        "[ChucK Home](https://chuck.cs.princeton.edu) | " +
        "[Floss Manual](https://en.flossmanuals.net/chuck/_full/1) | " +
        "[ccrma](https://ccrma.stanford.edu) | " +
        "[soundlab](https://soundlab.cs.princeton.edu)";
    snips.ckbackhome = "[ChucK Docs](/index.md)";
    snips.cklanghome = "[ChucK Language](/language/index.md)";
    snips.ckproghome = "[ChucK Programmer's Reference](/program/index.md)";

    VarMap = {
        "CHUCKVERS": "1.4.x.x (numchucks/db)",
        "LASTBUILT": new Date().toLocaleString(),
        "PAGEHEADER": snips.ckheader,
        "BACKHOME": `<hr/><center>${snips.ckbackhome}</center>`,
        "OFFSITELINKS": snips.ckoffsite,
        "LANGHEADER": snips.ckheader,
        "LANGFOOTER": `<hr/><center>${snips.cklanghome} | ${snips.ckbackhome}</center>`,
        "PROGHEADER": snips.ckheader,
        "PROGFOOTER": `<br/><hr/><center>${snips.ckproghome} | ${snips.ckbackhome}</center>`,
    };

    ClassMapper = (subpath) =>
    {
        let basename = path.basename(subpath);
        let dirname = path.dirname(subpath);
        let classlist = ["ChucK"];
        if(dirname != "" && dirname != ".") // ie not root
            classlist.push(dirname[0].toUpperCase() + dirname.substr(1));
        if(basename.indexOf("uana") != -1)
            classlist.push("UAna");
        // console.log(fileref + " classlist: " + classlist);
        return classlist.join(" ");
    };
}
