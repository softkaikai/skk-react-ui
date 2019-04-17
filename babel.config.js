module.exports = function (api) {
    let env = '';
    // api.cache(true);

    switch(api.env()) {
        case 'es':
            env = false;
            break;
        case 'cjs':
            env = 'cjs';
            break;
        default:
            env = 'auto';
    }

    const presets = [
        ['@babel/preset-env', {modules: env}],
        '@babel/preset-react'
    ];
    const plugins = [
        '@babel/plugin-proposal-object-rest-spread',
        '@babel/plugin-proposal-export-default-from',
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
