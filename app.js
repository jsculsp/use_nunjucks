const nunjucks = require('nunjucks')

const createEnv = function (path, opts) {
    let autoescape = opts.autoescape === undefined ? true: autoescape
    let noCache = opts.noCache || false
    let watch = opts.watch || false
    let throwOnUndefined = opts.throwOnUndefined || false
    let fileSystemLoaderOpts = {
        noCache: noCache,
        watch: watch,
    }
    let fileSystemLoader = new nunjucks.FileSystemLoader(path, fileSystemLoaderOpts)
    let customLoader = {
        autoescape: autoescape,
        throwOnUndefined: throwOnUndefined,
    }
    let env = new nunjucks.Environment(fileSystemLoader, customLoader)
    if (opts.filters) {
        for (let f in opts.filters) {
            env.addFilter(f, opts.filters[f])
        }
    }
    return env
}

const env = createEnv('views', {
    watch: true,
    filters: {
        hex: n => `0x${n.toString(16)}`,
    },
})

const s = env.render('hello.html', {
    name: '<Nunjucks>',
    fruits: ['Apple', 'Pear', 'Banana'],
    count: 12000,
})

console.log(s);

console.log(env.render('extend.html', {
    header: 'Hello',
    body: 'bla bla bla...'
}));