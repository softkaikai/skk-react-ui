const path = require('path');
const fs = require('fs-extra');
const execa = require('execa');
const { green, yellow, red } = require('chalk');

const libRoot = path.resolve(__dirname, '../lib');
const esRoot = path.resolve(libRoot, './es');
const src = path.resolve(__dirname, '../src');


const clean = () => fs.existsSync(libRoot) && fs.removeSync(libRoot);

const step = (name, fn) => async () => {
    console.log(green('Building Start: ') + yellow(name));
    await fn();
    console.log(green('Building End: ') + yellow(name));
};


const buildEs = step('es', async () => {
    await execa.shell(`npx babel ${src} --out-dir ${esRoot} --env-name "es" --ignore "src/app.js","src/demoIndex.js"`)
});
const buildCommonJs = step('cjs',  async () => {
    await execa.shell(`npx babel ${src} --out-dir ${libRoot} --env-name "cjs" --ignore "src/app.js","src/demoIndex.js"`)
});


clean();
Promise.all([
    buildCommonJs(),
    buildEs()
]).catch(err => {
    if (err) {
        console.error(red(err));
    }
    process.exit(1);
})


