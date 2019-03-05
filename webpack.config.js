const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
//const uglify_es = require('uglify-es');
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //webpack4 替代extract-text-webpack-plugin，将css单独提取打包

module.exports = {
    context: path.resolve(__dirname),
    entry: {
        app:['./static/ComRender.js'],
        weatherCom: ['./component/WeatherApp/index.js'],
        ssrCom: ['./component/ssrCom/index.js'],
        ssrTest: ['./static/ssrTest.js'],
        //?path=/__webpack_hmr&timeout=20000&reload=true
        //app: './static/ComRender.js',
        // HMR:'webpack-hot-middleware/client',
        // another: './static/another.js',
        // test: './static/test.js',
        another: ['./static/another.js'],
        test: ['./static/test.js']

    },
    // entry:['webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000', './static/ComRender.js'],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        //libraryTarget: 'commonjs2', //设置导出类型，web端默认是var，node需要module.exports = xxx的形式
        publicPath: 'http://127.0.0.1:3001/',
        //publicPath: path.resolve(__dirname, 'dist')
    },
    devtool: 'inline-source-map',
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: 'commons',
                    chunks: "initial",
                    minChunks: 2
                }
            }
        },
        minimizer: [
            new UglifyJsPlugin(),    // 代码压缩的关键插件
            //uglify_es
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({      //对css进行打包，webpack4推荐语法
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
        // new CleanWebpackPlugin('dist'),
        // new BundleAnalyzerPlugin({analyzerPort: 3000}),

        //new webpack.optimize.OccurrenceOrderPlugin(),
        // new webpack.HotModuleReplacementPlugin(),
        //new webpack.NoEmitOnErrorsPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader', 
                        query: {
                            presets: [
                                // ['es2015', {
                                //     'useBuiltIns': true,
                                //     'modules': false,
                                // }],
                                //'stage-0',
                                //'es2015',
                                //'react'
                                '@babel/react', 
                                '@babel/preset-env'
                            ],
                            plugins: [
                                ['import', {                //这个是为了使用antd的样式
                                    libraryName: 'antd',
                                    libraryDirectory: 'es',
                                    style: 'css'
                                }],
                                ['@babel/plugin-transform-runtime',
                                {
                                    "corejs": false,
                                    "helpers": true,
                                    "regenerator": true,
                                    "useESModules": false
                                }],
                                //'@babel/plugin-runtime',
                                "syntax-dynamic-import",    //  支持动态import，支持react-loadable
                                //'transform-decorators-legacy', //在这两个是为了支持es7的装饰器语法，如@observe等
                                ["@babel/plugin-proposal-decorators", { "legacy": true }],
                                '@babel/plugin-proposal-optional-chaining',
                                'transform-class-properties'
                            ]
                        },
                    }
                ]
            },
            {
                test: /\.(css|scss)$/,
                use: [
                    MiniCssExtractPlugin.loader,  //自动提取出css
                    //'style-loader', // 不屏蔽的话会报错
                    'css-loader', 
                    'sass-loader',
                ]
            },
            {
                test: /\.less?$/,
                use: [
                    //MiniCssExtractPlugin.loader,  //自动提取出css
                    'style-loader', // 不屏蔽的话会报错
                    'css-loader', 
                    'less-loader',
                ]
            }
        ]
    },
    
    //mode:"production",
    mode:"development"

};