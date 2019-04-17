const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    entry: {
        customer: './src/demoIndex.js',
    },
    output: {
        filename: '[hash:8].bundle.js',
        path: path.resolve(__dirname, '../dist')
    },
    resolve: {
        extensions: ['.jsx', '.js', '.json']
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: 'index.html'
        })
    ]
}
