const path = require('path');
const nodeExternals = require('webpack-node-externals');
const cleanWebpack = require('clean-webpack-plugin');
//const NodemonPlugin = require('nodemon-webpack-plugin');

module.exports = {
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        inline:false,
        port: process.env.PORT || 3000
},
    entry:'./src/index.js',
    output:{
        filename:'bundle.js',
        path:path.resolve(__dirname,'dist')
    },
    target:'node',
    externals:[nodeExternals()],
    plugins:[
        new cleanWebpack.CleanWebpackPlugin()
    ]
}