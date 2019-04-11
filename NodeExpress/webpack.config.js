const path = require('path');
const nodeExternals = require('webpack-node-externals');

// https://stackoverflow.com/questions/41692643/webpack-and-express-critical-dependencies-warning

module.exports = {
    entry: './src/bin/www.ts',
    devtool: 'inline-source-map',
    mode: 'development',
    target: 'node',
    externals: [nodeExternals()],
    // node: {
    //     console: true,
    //     fs: 'empty',
    //     net: 'empty',
    //     tls: 'empty'
    // },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
};
