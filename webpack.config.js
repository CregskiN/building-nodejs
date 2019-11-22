const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const miniCssExtractPlugin = new MiniCssExtractPlugin({
    // Options similar to the same options in webpackOptions.output
    // all options are optional
    filename: '[name].css',
    chunkFilename: '[id].css',
    ignoreOrder: false, // Enable to remove warnings about conflicting order
});

module.exports = {
    mode: 'production',
    entry: {
        index: './src/script/index.js'
    },

    output: {
        path: path.resolve(__dirname, 'build/script'), // 打包到根目录的build/script文件夹下
        filename: '[name].js'
    },

    module: {
        rules: [
            {
                test: /\.js$/, // 定义规则： 针对.js
                include: [ // 筛选：包含
                    path.resolve(__dirname, "src/script")
                ],
                loader: 'babel-loader',
            },
            {
                test: /\.less$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        // you can specify a publicPath here
                        // by default it uses publicPath in webpackOptions.output
                        publicPath: '../',
                        hmr: process.env.NODE_ENV === 'development',
                    },
                }, {// .css -> commonJS
                    loader: 'css-loader'
                }, {// .less -> .css (包含@import转换)
                    loader: 'less-loader',
                    options: {
                        strictMath: true,
                        noIeCompat: true,
                    },
                }]
            },
        ]
    },

    plugins: [
        miniCssExtractPlugin
    ],
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM'
    }


};