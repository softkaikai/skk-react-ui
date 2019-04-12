module.exports = function (api) {
    api.cache(true);

    const presets = [
        '@babel/preset-env',
        '@babel/preset-react'
    ];
    const plugins = [
        '@babel/plugin-proposal-object-rest-spread',
        // 减少包大小的
        '@babel/plugin-transform-runtime',
        '@babel/plugin-syntax-dynamic-import',
        '@babel/plugin-proposal-class-properties',
        'babel-plugin-styled-components'
    ];

    return {
        presets,
        plugins
    };
}
