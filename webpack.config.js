const merge  = require('webpack-merge');

const baseOptions = require('./build/webpack.base');
const devOptions = require('./build/webpack.dev');
const prodOptions = require('./build/webpack.prod');


module.exports = function(env, argv) {
    if (env && env.prod) {
        return merge(baseOptions, prodOptions);
    }
    return merge(baseOptions, devOptions);
}