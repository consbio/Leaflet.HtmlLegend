const path = require('path');
const Webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    context: __dirname,
    devtool: 'source-map',

    entry: {
        'L.Control.HtmlLegend.js': './src/L.Control.HtmlLegend.js',
        'L.Control.HtmlLegend.css': './src/L.Control.HtmlLegend.css'
    },

    output: {
        path: path.resolve('dist'),
        filename: '[name]',
        sourceMapFilename: '[name].map'
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: {
                        loader: 'css-loader',
                        options: {
                            minimize: true
                        }
                    }
                })
            }
        ]
    },

    plugins: [
        new ExtractTextPlugin('L.Control.HtmlLegend.css'),
        new Webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compressor: {
                warnings: false
            }
        })
    ]
};
