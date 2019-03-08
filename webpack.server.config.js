//const nodeExternals = require('webpack-node-externals');
const path = require('path');
const webpack = require("webpack");

let serverConfig = {
    context: path.join(__dirname),
    entry: {
        serverDom: ['./component/ssrCom/index.js'],
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
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [{
                    loader: "babel-loader",
                    options: {                //node端的babel编译配置可以简化很多
                        babelrc: false,
                        presets: ["@babel/preset-react",
                            ['env', {
                                // debug: true,
                                "targets": {
                                    node: 'current',
                                    // modules: false
                                },
                            }]
                        ]
                    }
                }]
            },
            {
                test: /\.(styl|css)$/,          //node端不能 require('xx.css')，会报错
                use: ['null-loader']
            },
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) || JSON.stringify('development')
        }),
    ],
    target: 'node',
    devtool: 'sourcemap',
    //externals: [nodeExternals()], //不把node_modules中的文件打包
};


module.exports = serverConfig;
