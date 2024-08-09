const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/index.ts',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist'),
        },
        compress: true,
        port: 9002,  // Changed port to 8080
        hot: true,
        open: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'index.html',
            inject: 'body'
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'src/data1.json', to: 'data1.json' },
                { from: 'src/data2.json', to: 'data2.json' },
                { from: 'src/datastore.json', to: 'datastore.json' },
                { from: 'src/studentProgram.json', to: 'studentProgram.json' },
            ]
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    mode: 'development'
};




