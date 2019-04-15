const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
//const uglify_es = require('uglify-es');
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //webpack4 替代extract-text-webpack-plugin，将css单独提取打包

const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    context: path.resolve(__dirname),
    entry: {
        app:['./static/ComRender.js'],
        //weatherCom: ['./component/WeatherApp/index.js'],
        //ssrCom: ['./static/ssrTest.js'],
        // ssrTest: ['./static/ssrTest.js'],
        //HMR:'webpack-hot-middleware/client',
        // another: './static/another.js',
        // test: './static/test.js',
        // another: ['./static/another.js'],
        // test: ['./static/test.js'],
        // vendor: ['react', 'react-dom']
    },
    // entry:['webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000', './static/ComRender.js'],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        //libraryTarget: 'commonjs2', //设置导出类型，web端默认是var，node需要module.exports = xxx的形式
        //publicPath: 'http://127.0.0.1:3001/',
        publicPath: path.resolve(__dirname, 'dist')
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                antd: {
                    name: 'antd',
                    test: (module) => {
                        return /antd|ant-design/g.test(module.context);
                    },
                    chunks: 'initial',
                    priority: 10
                },
                commons: {
                    // name: 'commons',
                    // chunks: "initial",
                    // minChunks: 2,
                    test: /[\\/]node_modules[\\/]/,
                    name: 'commons',
                    chunks: 'initial',
                    minChunks: 2,
                    //priority: 2,
                    // name: true,
                    // maxSize: 1000000,
                    // maxInitialRequests: 3,
                    // maxAsyncRequests: 3
                }
            },
        },
        minimizer: [
            new UglifyJsPlugin(),    // 代码压缩的关键插件
            //uglify_es
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({      //对css进行打包，webpack4推荐语法
            filename: "[name].css",
            chunkFilename: "[name].css"
        }),
        // new OptimizeCssAssetsPlugin({
        //     assetNameRegExp: /\.css$/g,       //一个正则表达式，指示应优化/最小化的资产的名称。提供的正则表达式针对配置中ExtractTextPlugin实例导出的文件的文件名运行，而不是源CSS文件的文件名。默认为/\.css$/g
        //     cssProcessor: require('cssnano'), //用于优化\最小化CSS的CSS处理器，默认为cssnano
        //     cssProcessorOptions: { safe: true, discardComments: { removeAll: true } }, //传递给cssProcessor的选项，默认为{}
        //     canPrint: true                    //一个布尔值，指示插件是否可以将消息打印到控制台，默认为true
        // }),
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
                                    //libraryDirectory: 'es',
                                    style: 'css' //'css'
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
                    MiniCssExtractPlugin.loader,  //自动提取出css
                    'style-loader', // 不屏蔽的话会报错
                    'css-loader', 
                    'less-loader',
                ]
            }
        ]
    },
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM'
    }
    //mode:"production",
    //mode:"development"

};