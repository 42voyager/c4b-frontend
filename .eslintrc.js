module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: [
        'plugin:vue/vue3-essential',
        'eslint:recommended',
        '@vue/typescript/recommended',
        'plugin:import/typescript',
    ],
    parserOptions: {
        ecmaVersion: 2020,
    },
    settings: {
        node: {
            extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.vue'],
        },
        'import/resolver': {
            alias: {
                map: [['@', './src']],
            },
        },
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'vue/no-unused-components': 'off',
        'semi': ['warn', 'never'],
        'quotes': ['warn', 'single'],
        'max-len': ['warn', 80],
        'indent': ['warn', 4],
    },
}
