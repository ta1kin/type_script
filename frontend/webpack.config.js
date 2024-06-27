const path = require("path");
const HtmlWebpuckPlugin = require("html-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');
const fs = require('fs');
const { VueLoaderPlugin, default: loader } = require('vue-loader');


module.exports = {
    mode: 'development',
    entry: path.resolve( __dirname, 'src/index.js' ),
    output: {
        path: path.resolve( __dirname, 'dist' ),
        filename: 'index.[contenthash].js',
        assetModuleFilename: 'assets/[name][ext]',
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: [
                    {
                        loader: 'vue-loader'
                    }
                ]
            },
            {
                test: /\.$scss/,
                use: [ 'vue-style-loader', 'css-loader', 'sass-loader' ]
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|ico)$/i,
                type: 'asset/resource'

            },
            {
                test: /\.html$/,
                use: 'html-loader'
            }
        ]
    },
    devServer: {
        port: 1111,
        compress: true,
        hot: true,
        static: {
            directory: path.resolve( __dirname, 'dist' )
        },
        open: true
    },
    plugins: [
        new HtmlWebpuckPlugin({
            template: path.resolve( __dirname, './src/index.html' ),
            filename: 'index.html'
        }),
        new VueLoaderPlugin(),
        new CopyPlugin({
            patterns: [
                {
                    from: 'frontend/src/assets',
                    to: 'assets',
                    filter: (resourcePath) => {
                        console.log(`Checking directory: ${resourcePath}`);
                        const listDir = fs.readdirSync('./frontend/src/assets');
                        return listDir.length > 0;
                    }
                }
            ]
        })
    ]
}