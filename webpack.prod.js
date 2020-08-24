const webpack = require("webpack");

module.exports = {
    mode: 'production',
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /(node_modules)/,
            loader: 'babel-loader',
            query: {
                presets: [
                    [
                        "@babel/preset-env",
                        {
                            "targets": {
                                "ie": "11"
                            }
                        }
                    ]
                ],
                plugins: [
                    "@babel/plugin-transform-arrow-functions",
                    "@babel/plugin-proposal-class-properties"
                ]
            }
        }],
    }
};