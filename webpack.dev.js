const path = require('path');

// Pure JS
// module.exports = {
//     entry: './src/index.js',
//     output: {
//         filename: 'main.js',
//         path: path.resolve(__dirname, 'dist')
//     }
// };

// TypeScript
module.exports = {
    entry: './src/index.ts',
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, 'dist')
    },

    devtool: "source-map",

    resolve: {
        extensions: ["", "webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },

    module: {
        rules: [
            { test: /\.tsx?$/, loader: "ts-loader" },
            { test: /\.js$/, loader: "source-map-loader" },
        ]
    },

    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 8000
    }
};