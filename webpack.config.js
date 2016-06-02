var path = require('path');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var dir_js = path.resolve(__dirname, 'src');
var dir_html = path.resolve(__dirname, 'src/www');
var dir_build = path.resolve(__dirname, 'build');


module.exports = {
    entry: path.resolve(dir_js, 'app.js'),
    output: {
        path: dir_build,
        filename: "packed.js"
    },
    debug: true,
    module: {
        loaders: [
            {
                loader: "babel-loader",
                // Skip any files outside of your project's `src` directory
                include: dir_js,
                // Only run `.js` and `.jsx` files through Babel
                test: /\.js$/,
                // Options to configure babel with
                query: {
                    presets: ['es2015', 'react'],
                }
            },
        ]
    },
    plugins: [
        // Simply copies the files over
        new CopyWebpackPlugin([
            // to: output.path
            { from: dir_html}
        ]),
        // Avoid publishing files when compilation fails
        new webpack.NoErrorsPlugin()
    ],
    stats: {
        // Nice colored output
        colors: true
    },
    // Create Sourcemaps for the bundle
    devtool: 'source-map',
}