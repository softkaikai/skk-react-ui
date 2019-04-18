module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "extends": [
        "standard",
        "standard-react",
        "plugin:proposal-class/recommended",
        "eslint:recommended",
        "plugin:prettier/recommended",
        "prettier/flowtype",
        "prettier/react",
        "prettier/standard"
    ],
    "globals": {
        "describe": true,
        "it": true,
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [],
    "rules": {
    }
};
