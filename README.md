# Environment Test Project

Explore what's available in the execution environment of a Kony Visualizer project.
You might be wondering how much of ES6 is available, what the global `this`
object is, whether `Math` or `Intl` are defined and so on. This project answers
those questions.

## Q for Promises

This project also tests the use of [Q](https://github.com/kriskowal/q) for Promises.

To set it up correctly you'll have to install a couple of dependencies and place
them in the right folders. But fear not, this can all be done very easily with
[NPM](https://www.npmjs.com/get-npm) and [Gulp](https://gulpjs.com/).

Assuming you already have NPM (probably if you've installed Node) on your
workstation, just install Gulp by doing this:

```
npm install gulp-cli -g
npm install gulp -D
npx -p touch nodetouch gulpfile.js
gulp --help
```

Then install Q and the [Timeouts polyfill](https://www.npmjs.com/package/kony-timeout-polyfill) declared in `package.json`.
```
npm install
```

Then run Gulp to place those dependencies where Visualizer can find them.
```
gulp
```

Done. Your `modules` directory should look like this.

```
modules
├── Watch
├── androidwear
│   └── require
├── kony-timout-polyfill
│   └── aaa_setTimeout.js
├── require
│   └── q
│       └── q.js
└── workerthreads
```
