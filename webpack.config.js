const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

let conf = {
    entry: {
        app: ['babel-polyfill', path.resolve(__dirname, 'src', 'index.js')],
    },
    devtool: 'source-map',
    output: {
        filename: './js/bundle.[chunkhash:8].js',
        publicPath: ''
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            { test: [/\.vert$/, /\.frag$/], use: 'raw-loader' },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader"
                ]
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            esModule: false
                        }
                    }
                ]
            },

        ],
    },
    optimization: {
        nodeEnv: 'production',
        minimize: true,
        // minimizer: [
        //     new UglifyJsPlugin({
        //         test: /\.js($|\?)/i,
        //         cache: true,
        //         parallel: true,
        //         uglifyOptions: {
        //             compress: false,
        //             ecma: 6,
        //             mangle: true
        //         },
        //         sourceMap: true // set to true if you want JS source maps
        //     }),
        //     new OptimizeCSSAssetsPlugin({})
        // ],
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    ecma: 6,
                    warnings: false,
                    parse: {},
                    compress: {
                        drop_console: true,
                    },
                    mangle: true, // Note `mangle.properties` is `false` by default.
                    module: false,
                    output: {
                        comments: false,
                    },
                    toplevel: false,
                    nameCache: null,
                    ie8: false,
                    keep_classnames: undefined,
                    keep_fnames: false,
                    safari10: false,
                },
                parallel: 4,
            }),
        ],
        splitChunks: {
            // name: 'vendor'
            chunks: 'all',
            //     minSize: 200000,
            //     maxSize: 0,
            //     minChunks: 2,
            //     maxAsyncRequests: 5,
            //     maxInitialRequests: 3
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'HotFruitsQuattro',
        }),
        // new HtmlWebpackPlugin({
        //     title: 'Custom template',
        //     // Load a custom template (lodash by default see the FAQ for details)
        //     template: 'indexTemplate.html'
        // }),
        new MiniCssExtractPlugin({
            filename: "./src/css/[name].css",
            chunkFilename: "./src/css/[id].css"
        }),
        // new CopyWebpackPlugin([
        //     {from:path.resolve(__dirname,'src', 'assets'), to:path.resolve(__dirname, 'dist', 'src', 'assets')},
        //     {from:path.resolve(__dirname,'src', 'Shaders'), to:path.resolve(__dirname, 'dist', 'src', 'Shaders')},
        //     {from:path.resolve(__dirname,'src', 'draco'), to:path.resolve(__dirname, 'dist', 'src', 'draco')},
        //     {from:path.resolve(__dirname,'src', 'css', 'fonts'), to:path.resolve(__dirname, 'dist', 'src', 'css')},
        //     {from:path.resolve(__dirname,'src', 'localization'), to:path.resolve(__dirname, 'dist', 'src', 'localization')},
        // ]),
        // new webpack.DefinePlugin({
        //     'CANVAS_RENDERER': JSON.stringify(true),
        //     'WEBGL_RENDERER': JSON.stringify(true)
        // }),
        // new webpack.HashedModuleIdsPlugin(),
        // new BundleAnalyzerPlugin(),
    ]
};

module.exports = conf;