const webpack = require("webpack");

module.exports = {
    mode: 'development',
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
                    "@babel/plugin-transform-arrow-functions"
                ]
            }
        }],
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ]
};