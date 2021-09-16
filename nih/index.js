/* global: hljs, lunr -- */

// This script runs on each page-load. Installed by mdtohtml.js.
// Should load-time become an issue, we may need to move to a
// single-page app (spa). Biggest concern would be the search-index:
// /searchIndex.json:  for chuck it's currently 2.4M. Typical image is 1M.
// We could cache this in local-index or hope that the browser does that already.
import ChuckHighlighter from "./highlighters/chuck.js";
import AbcHighlighter from "./highlighters/abc.js";

// console.log("loaded script " + window.location.pathname);
// /docs/chuck/program/index.html -> toroot: ..
let fields = window.location.pathname.replace(/\\/g, "/").split("/");
let rootIndex = fields.indexOf("chuck");
let depth = fields.length - rootIndex - 2;
const sToRoot = "../".repeat(depth);
//console.log("toroot:" + sToRoot);

window.hljs.registerLanguage("chuck", ChuckHighlighter);
window.hljs.registerLanguage("abc", AbcHighlighter);
window.hljs.highlightAll();

document.body.oncontextmenu = onContextMenu;
// install hot-keys here?
// handle deep-links here?

let sMainEl = document.querySelector(".Markdown");
let sLunr = window.lunr; // intra-page search works for browsers via ctrl-f
let sSearch =
{
    Index: null,
    Term: null,
    CtrlsEl: null,
    InputEl: null,
    OutputEl: null, 
};
let sNavTargets = null; // used by onContextMenu

// here: all offsite links trigger new-window creation in browser
for(let el of document.querySelectorAll("a"))
{
    if(el.host != window.location.host)
        el.setAttribute("target", "_blank");
}

// install click handler for search
for(let el of document.querySelectorAll("button"))
{
    el.onclick = onClick;
}

// obtain our search-index
HttpRequest(`${sToRoot}searchIndex.json`)
.then((txt) =>
{
    sSearch.Index = sLunr.Index.load(JSON.parse(txt));
    sSearch.InputEl = document.querySelector(".SearchInput");
    sSearch.OutputEl = document.querySelector(".SearchOutput");
    sSearch.CtrlsEl = document.querySelector(".SearchCtrls");
    // button click-handlers already installed
    console.log("searchIndex loaded");
});

function HttpRequest(url, method = "GET", responseType=null)
{
    return new Promise((resolve, reject) =>
    {
        let x = new XMLHttpRequest();
        x.onload = () =>
        {
            if(x.status == 200)
                resolve(x.response); // <=== yay
            else
                reject(new Error("httpasync " + x.status));
        };
        x.onerror = (evt) =>
        {
            reject(new Error(`can't ${method} ${url}`));
        };
        // do we need x.onreadystatechange?
        // XXX: support for POST, headers, response-type, etc
        x.open(method, url, true /*async*/ );
        if(responseType)
            x.responseType = responseType;
        x.send();
    });
}

function onContextMenu(evt)
{
    if(!sNavTargets)
    {
        sNavTargets = [];
        for(let hEl of sMainEl.querySelectorAll("h1, h2, h3, h4, h5, h6"))
        {
            sNavTargets.push([hEl, hEl.innerText]);
        }
    }
    evt.preventDefault();
}

function onClick(evt)
{
    switch(evt.target.innerText)
    {
    case "search":
        onSearchBegin();
        break;
    case "close":
        onSearchEnd();
        break;
    default:
        console.log("click " + evt.target.innerText);
        break;
    }
}

function onSearchEnd()
{
    sSearch.OutputEl.classList.add("Invis");
    sSearch.CtrlsEl.classList.add("Minify");
    sMainEl.focus();
    sSearch.Term = null;
}

function onSearchBegin()
{
    sSearch.CtrlsEl.classList.remove("Minify");
    sSearch.InputEl.select();
    sSearch.InputEl.focus();
    if(sSearch.InputEl.value.length)
        sSearch.OutputEl.classList.remove("Invis");
    sSearch.InputEl.onkeydown = (evt) =>
    {
        if(evt.key == "Escape")
        {
            onSearchEnd();
            evt.preventDefault();
        }
        else
        if(evt.key == "ArrowUp")
        {
            onSearchPrev();
            evt.preventDefault();
        }
        else
        if(evt.key == "ArrowDown")
        {
            onSearchNext();
            evt.preventDefault();
        }
    };

    sSearch.InputEl.onchange = () => /* vs: onkeydown or oninput */
    {
        console.log("search for " + sSearch.InputEl.value);
        sSearch.Term = sSearch.InputEl.value.trim();
        if(sSearch.Term.length)
            sSearch.Results = sSearch.Index.search(sSearch.Term);
        else
            sSearch.Results = [];
        let html = [];
        if(sSearch.Results.length)
        {
            let buildLink = (r) =>
            {
                // searchIndex has refs to .md,.ck,.abc, etc files.
                let label = r.ref.replace(".md", "");
                let ref = r.ref.replace(/\.md$|\.abc$|\.ck$/, ".html");
                return `<div><a href='${sToRoot}${ref}'>${label}</a></div>`;
            }

            for(let r of sSearch.Results)
                html.push(buildLink(r));

        }
        else
            html.push("<div class='disabled Pad'>(no results)<br/><br/></div>");

        // always update content after search in case of prior
        // marks. we update and scrollTo marks therein
        // let url = this.state.LastURL || this.config.initURL;
        // this.updateContent(url);
        sSearch.OutputEl.innerHTML = html.join("");
        sSearch.OutputEl.classList.remove("Invis");
    };
}

console.debug("Done loading custom docs bootstrapper");