// const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    context: __dirname,
    entry: './src/main.js',
    output: {
        path: __dirname + '/public/build/',
        publicPath: "build/",
        filename: 'main.js',
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                exclude: [/node_modules/, /public/],
                use: ['html-loader'],
            },
            {
                test: /\.js$/,
                exclude: [/node_modules/, /public/],
                use: ['babel-loader'],
            },

            {
                test: /\.s[ac]ss$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(png|jpg|gif|svg)$/i,
                exclude: [/node_modules/, /public/],
                use: ['url-loader'],
            },
        ]
    },
    plugins: [new MiniCssExtractPlugin()]
};
