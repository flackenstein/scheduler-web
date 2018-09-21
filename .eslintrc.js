module.exports = {
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
        'ecmaVersion': 6,
        'ecmaFeatures': {
            'jsx': true
        },
        sourceType: 'module'
    },
    env: {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "node": true
    },
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    // extends: 'standard', // 'airbnb'
    'extends': [ 'standard', 'eslint:recommended', 'plugin:react/recommended' ],
    // required to lint *.vue files
    plugins: [
        'react',
        'html'
    ],
    // add your custom rules here
    rules: {
        // allow async-await
        'generator-star-spacing': 'off',
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'indent': ['error', 4, {
            'SwitchCase': 1
        }],
        'react/jsx-filename-extension': [1, {
            'extensions': ['.js', '.jsx']
        }],
        'comma-dangle': ['error', {
            'functions': 'ignore'
        }],
        'react/prop-types': 0,
        'no-console': 0,
        'react/prefer-stateless-function': [0, {
            'ignorePureComponents': true
        }]
    },
    'settings': {
        'import/resolver': {
            'webpack': {
                'config': './webpack/webpack.config.dev.js'
            }
        }
    }
}

