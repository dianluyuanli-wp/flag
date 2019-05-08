//const nodeExternals = require('webpack-node-externals');
const path = require('path');
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

let serverConfig = {
    context: path.join(__dirname),
    entry: {
        //serverDom: ['./component/ssrCom/index.js'],
        serverDom: ['./static/serverEntry.js'],
    },
    output: {
        // path: path.join(__dirname, 'dist_server'),
        // filename: "[name].ssr.js",
        // libraryTarget: 'commonjs2' //设置导出类型，web端默认是var，node需要module.exports = xxx的形式

        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'commonjs2', //设置导出类型，web端默认是var，node需要module.exports = xxx的形式
        publicPath: 'http://127.0.0.1:3001/',
    },
    // plugins: [
    //     new MiniCssExtractPlugin({      //对css进行打包，webpack4推荐语法
    //         filename: "[name].css",
    //         chunkFilename: "[name].css"
    //     }),
    // ],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                //exclude: /node_modules/,
                use: [{
                    loader: "babel-loader",
                    options: {                //node端的babel编译配置可以简化很多
                        babelrc: false,
                        presets: ["@babel/preset-react",
                            ['env', {
                                // debug: true,
                                modules: 'commonjs',
                                "targets": {
                                    node: 'current',
                                    // modules: false
                                },
                            }]
                        ]
                    }
                }]
            },
            // {
            //     test: /\.(styl|css)$/,          //node端不能 require('xx.css')，会报错
            //     use: ['null-loader']
            // },
            {
                test: /\.(css|scss)$/,
                use: [
                    MiniCssExtractPlugin.loader,  //自动提取出css
                    //'style-loader', // 不屏蔽的话会报错
                    'css-loader', 
                    'sass-loader',
                ]
            },
        ]
    },
    // resolve: {
    //     extensions: ['.js', '.jsx']
    // },
    resolve: {
        alias: {
            '@network': path.resolve(__dirname, 'utils/network'),
            '@tools': path.resolve(__dirname, 'utils/tools')
        }
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) || JSON.stringify('development')
        }),
        new MiniCssExtractPlugin({      //对css进行打包，webpack4推荐语法
            filename: "[name].css",
            chunkFilename: "[name].css"
        }),
    ],
    target: 'node',
    devtool: 'sourcemap',
    mode:"development"
    //externals: [nodeExternals()], //不把node_modules中的文件打包
};


module.exports = serverConfig;
