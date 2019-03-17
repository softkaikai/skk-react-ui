const path = require('path');

const webpack = require('webpack');

const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({size: 10});


module.exports = {
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.(jsx|js)$/,
                exclude: /node_modules/,
                use: 'happypack/loader?id=babel'
            },
            {
                test: /\.(scss|css)$/,
                exclude: /(node_modules|global_css)/,
                use: 'happypack/loader?id=css'
            },
            {
                test: /\.(scss|css)$/,
                include: /(global_css)/,
                use: 'happypack/loader?id=global_css'
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HappyPack({
            id: 'babel',
            threads: 3,
            // threadPool: happyThreadPool,
            loaders: [
                {
                    loader: 'babel-loader',
                    options: {
                        // 开启缓存，加快构建
                        cacheDirectory : true,
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react'
                        ],
                        plugins: [
                            '@babel/plugin-proposal-object-rest-spread',
                            // 减少包大小的
                            '@babel/plugin-transform-runtime',
                            '@babel/plugin-syntax-dynamic-import',
                            '@babel/plugin-proposal-class-properties'
                        ]
                    }
                }
            ]
        }),
        new HappyPack({
            id: 'css',
            threads: 3,
            // threadPool: happyThreadPool,
            loaders: [
                'style-loader',
                {
                    loader: 'css-loader',
                    options: {
                        modules: true,
                        importLoaders: 1
                    }
                },
                'sass-loader'
            ]
        }),
        new HappyPack({
            id: 'global_css',
            threads: 3,
            // threadPool: happyThreadPool,
            loaders: [
                'style-loader',
                {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1
                    }
                },
                'sass-loader'
            ]
        }),
        new webpack.DllReferencePlugin({
            context: path.resolve(__dirname, '..'),
            manifest: path.resolve(__dirname, '../manifest/react_manifest.json')
        }),
        new webpack.DllReferencePlugin({
            context: path.resolve(__dirname, '..'),
            manifest: path.resolve(__dirname, '../manifest/redux_manifest.json')
        }),
        new webpack.DllReferencePlugin({
            context: path.resolve(__dirname, '..'),
            manifest: path.resolve(__dirname, '../manifest/router_manifest.json')
        }),
    ]
}