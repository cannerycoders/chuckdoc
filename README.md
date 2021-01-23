# chuckdoc

Here you'll find a markdown representation of the [ChucK](https://chuck.cs.princeton.edu)
documentation including standard `chugins` and `classes`.  As of 1/23/21, this is the most up-to-date 
version  and complete of ChucK docs that I've found. The updates are the result of ample code spelunking
and will remain a work-in-progress.

`showdownjs` was used in default mode validate the conversion to html.

To run your own build (requires recent node+npm install):

```sh
#git clone this repo
% git clone https://github.com/cannerycoders/chuckdoc
% cd chuckdoc 
# install node support (showdown, klaw)
% npm init
% node build.js # (writes results to `output/`)
# validate the docs
% cd output
# launch your favorite browser on index.html (via `open` on mac, `explorer on windows`)

```
