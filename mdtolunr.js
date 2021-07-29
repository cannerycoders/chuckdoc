// mdtolunr
// scan provided input files to produce a search index.json files
// for use by the lunr search engine.
const fs = require("fs");
const path = require("path");
const lunr = require("lunr");
const usage = `
    ${process.argv[1]} -i src/a.md src/x/b.md ... -o pathto/index.json
`;

let state = null;
let inputs = [];
let output = null;
for(let arg of process.argv)
{
    if(arg == "-i")
        state = "input";
    else
    if(arg == "-o")
        state = "output";
    else
    if(state == "input")
        inputs.push(arg);
    else
    if(state == "output")
    {
        if(output)
            console.warn(`usage\n${usage}`);
        output = arg;
    }
}
// else arg0 or arg1
if(output && inputs.length)
{
    let index = lunr(function()
    {
        this.ref("name");
        this.field("text");
        for(let i of inputs)
        {
            let relname = path.relative("src", i).replace(/\\/g, "/");
            if(!relname)
                console.warn(i);
            this.add(
            {
                name: relname,
                text: fs.readFileSync(i),
            });
        }
    });
    fs.writeFileSync(output, JSON.stringify(index));
    console.log(`Re-indexed ${inputs.length} markdown files to ${output}`);
}
else
    throw new Error(usage);
