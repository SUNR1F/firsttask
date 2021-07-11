const path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin');
    const CopyWebpackPlugin = require('copy-webpack-plugin');
const MASTER_JS_FILE = './src/scripts/master.js',
    MASTER_HTML_FILE = './src/index.html',
    OUTPUT_FOLDER = 'dist',
    OUTPUT_MASTER_JS = '[name].bundle.js';

module.exports = env => {

    return {
        mode: env.mode || 'none',

        entry: {
            main: MASTER_JS_FILE
        },

        output: {
            filename: OUTPUT_MASTER_JS,
            path: path.resolve(__dirname, OUTPUT_FOLDER)
        },
        module: {
            rules: [
                {
                    test: /\.m?js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                }, {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader']
                }, {
                    test: /\.less$/,
                    use: ['style-loader', 'css-loader', 'less-loader']
                }, {
                    test: /.(jpe?g|png|gif|svg|ico)$/i,
                    use: [{
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'img/'
                        }
                    }]
                },
            ]
        },

        devtool: env.mode !== 'production'
            ? 'inline-source-map'
            : 'none', // Disabled on production

        devServer: {
            contentBase: path.join(__dirname, OUTPUT_FOLDER),
            compress: true,
            port: 8000
        },

        plugins: getPlugins(env)
    }
}

function getHtmlWebpackPluginOpt(env) {
    const opt = {
        template: MASTER_HTML_FILE,
        minify: {
            collapseInlineTagWhitespace: true,
            collapseWhitespace: true
        },
        inlineSource: '.(js|css)$'
    }
    return opt;
}

function getPlugins(env) {
    const plugins = [
        new CopyWebpackPlugin({
            patterns: [
              { from:'./src/img',to:'img' },
            ],
          }),
          new HtmlWebpackPlugin({
            template: 'src/index.html'
          }),
    ];
    return plugins;
}