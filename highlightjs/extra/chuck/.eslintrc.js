module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "sourceType": "module",
        "ecmaVersion": 2017
    },
    "rules": {
        "indent": [
            "off",
            4
        ],
        "no-constant-condition": [
            "off",
        ],
        "no-console": [
            "off",
        ],
        "no-unused-vars": [
            "warn"
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "comma-dangle": [ "off" ],
        "brace-style: ["allman"],
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};
