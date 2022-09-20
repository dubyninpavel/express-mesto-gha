module.exports = {
    env: {
        commonjs: true,
        es2021: true,
    },
    extends: [
        'plugin:react/recommended',
        'standard-with-typescript',
        'airbnb-base',
    ],
    overrides: [
    ],
    parserOptions: {
        ecmaVersion: 'latest',
    },
    plugins: [
        'react',
    ],
    rules: {
        'no-underscore-dangle': ['error', { allow: ['_id'] }],
        'linebreak-style': ['off', 'windows'],
        indent: ['warn', 4],
    },
};
