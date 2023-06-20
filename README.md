# chuckdoc

Here you'll find a markdown representation of the [ChucK](https://chuck.cs.princeton.edu)
documentation including standard `chugins` and `classes`.  As of 6/23/21, this is the most up-to-date 
and complete set of ChucK docs that I've been able to find. The updates are the result of ample code spelunking
and will remain a work-in-progress.

You can view the <i>searchable</i> docs live [here](https://cannerycoders.com/docs/chuck/).
For a non-searchable native-github view [click here](src/index.md). You can also convert these
docs to html for other applications and/or custom styling.

To build html requires recent node+npm install:

```sh
# git clone this repo
% git clone https://github.com/cannerycoders/chuckdoc

# install node support (showdown, klaw)
% cd chuckdoc 
% npm init

# run the conversion
% node mdtohtml.js # (writes results to `_output/`)

# validate the docs
% cd _output
# launch your favorite browser on index.html (via `open` on mac, `explorer on windows`)
# note: script-loading for search requires that you view your browsers in a server-like
#  environment.
```

Enjoy!
