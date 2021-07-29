// auto-generate built/autoindex.md associated
// with the examples dir. NB: this is different
// from the searchindex.
let path = require("path");
let klaw = require("klaw");

main();

function main()
{
    let rootDir = path.join(process.cwd(), "src/examples")
    let ckfiles = 0;
    let bkfiles = 0;
    let ckFileList = [];
    let ckBookMap = {};
    klaw(rootDir).on("data", (item) =>
    {
        if(path.extname(item.path) == ".ck")
        {
            let subpath = item.path.substr(rootDir.length + 1);
            let dirname = path.dirname(subpath);
            if(subpath.indexOf("book") == 0)
            {
                // one list per chapter
                let l = ckBookMap[dirname];
                if(l == undefined)
                {
                    l = [];
                    ckBookMap[dirname] = l;
                }
                bkfiles++;
                l.push(subpath);
            }
            else
            {
                ckfiles++;
                ckFileList.push(subpath);
            }
        }
    }).on("end", () =>
    {
        // booklist arrives semi-sorted 
        console.log("ChucKExamples: " + ckfiles);
        console.log("BookExamples: " + bkfiles + " in " +
            Object.keys(ckBookMap).length + " chapters");

        let rChap = /chapter(\d+)/;
        let chapters = Object.keys(ckBookMap).sort((a, b) =>
        {
            // [book,digital-artists,chapter1]
            let an = parseInt(a.match(rChap)[1]);
            let bn = parseInt(b.match(rChap)[1]);
            return an - bn;
        });

        let rFile = /Listing\d+.(\d*).ck/;
        let compareFiles = function(a, b)
        {
            let amatch = a.match(rFile);
            let bmatch = b.match(rFile);
            if(amatch && bmatch)
            {
                let an = parseInt(amatch[1]);
                let bn = parseInt(bmatch[1]);
                return an - bn;
            }
            return a < b;
        };
        for(let ch of chapters)
        {
            let ckfiles = ckBookMap[ch].sort(compareFiles);
            outputBookChapter(ch, ckfiles);
        }
    });
}

function outputBookChapter(ch, files)
{
    let nch = ch.split(path.sep)[2];
    console.log(`#### ${nch}`);
    console.log(`| ${nch} |`);
    console.log(`|:--|`);
    let fix = /\\/g;
    for(let f of files)
    {
        let fields = f.split(path.sep);
        let fn = fields[fields.length - 1];
        console.log(`|[${fn}](${f.replace(fix, "/")}) |`);
    }
}
