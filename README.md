# chuckdoc

Here you'll find a markdown representation of the [ChucK](https://chuck.cs.princeton.edu)
documentation including standard `chugins` and `classes`.  As of 1/23/21, this is the most up-to-date 
and complete set of ChucK docs that I've been able to find. The updates are the result of ample code spelunking
and will remain a work-in-progress.

You can view the docs directly on github [here](src/index.md) or you can convert them to html for 
other applications and improved styling.

To build html requires recent node+npm install:

```sh
# git clone this repo
% git clone https://github.com/cannerycoders/chuckdoc

# install node support (showdown, klaw)
% cd chuckdoc 
% npm init

# run the conversion
% node build.js # (writes results to `output/`)

# validate the docs
% cd output
# launch your favorite browser on index.html (via `open` on mac, `explorer on windows`)
```

Enjoy!
