module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "rules": {
        "strict": 0,
        "indent": ["error", 2],                                  // インデント 半角スペース2
        "quotes": ["error", "single", { "avoidEscape": true }],  // ダブルクォート禁止
        "semi": ["error", "never"],                              // セミコロン禁止
        "comma-dangle": ["error", "never"],                       // 行末カンマ禁止
    }
};
