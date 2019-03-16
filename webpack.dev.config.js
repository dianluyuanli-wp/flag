const baseWebpackConfig = require( './webpack.config');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpack = require('webpack');
module.exports = {
    ...baseWebpackConfig,
    devtool: 'inline-source-map',
    plugins: [
        ...baseWebpackConfig.plugins,
        new BundleAnalyzerPlugin({
            analyzerPort: 8899
        }),
    ],
    mode:"development"
}