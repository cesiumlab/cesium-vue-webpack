var path = require('path')
var webpack = require('webpack')
var CleanWebpackPlugin = require('clean-webpack-plugin');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

// 这里可以指定Cesium的来源
// const CesiumDebugDir = 'C:/vtxf/time/2018/projects/n1805-cesium-gist/Source';
// const CesiumReleaseDir = 'C:/vtxf/time/2018/projects/n1805-cesium-gist/Build/Cesium';
const CesiumDebugDir = 'node_modules/cesium/Build/Cesium';
const CesiumReleaseDir = 'node_modules/cesium/Source';

module.exports = {
    entry: {
        main: './Source/main.js'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].js',
        library: '[name]',
        libraryTarget: 'umd'
    },
    module: {
        rules: [{
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader'
                ],
            },
            {
                test: /\.sass$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader?indentedSyntax'
                ],
            },
            {
                test: /\.less$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    // 'less-loader',
                    {
                        loader: 'less-loader',
                        options: { javascriptEnabled: true }
                    }
                ],
            },
            {
                test: /\.vue$/,
                use: [
                    {
                        loader: 'vue-loader',
                        options: {
                            loaders: {
                                // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
                                // the "scss" and "sass" values for the lang attribute to the right configs here.
                                // other preprocessors should work out of the box, no loader config like this necessary.
                                'scss': [
                                    'vue-style-loader',
                                    'css-loader',
                                    'sass-loader'
                                ],
                                'sass': [
                                    'vue-style-loader',
                                    'css-loader',
                                    'sass-loader?indentedSyntax'
                                ]
                            }
                            // other vue-loader options go here
                        },
                    },
                    {
                        loader: 'iview-loader',
                        options: {
                            prefix: false
                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf|topojson)$/,
                loader: 'url-loader',
                options: {
                    limit: 8192,
                    name: '[name].[hash].[ext]',
                    useRelativePath: false,
                    outputPath: './static/assets',
                    publicPath: './static/assets',
                }
            },
            {
                test: /\.html$/,
                loader: 'raw-loader'
            },
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
        },
        extensions: ['*', '.js', '.vue', '.json']
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true,
        overlay: true
    },
    performance: {
        hints: false
    },
    devtool: '#eval-source-map',
    externals: {
        'Cesium': "Cesium",
    },
    plugins: [
        new HtmlwebpackPlugin({
            filename: `./index.html`,
            template: `./Source/index.html`,

            // chunks: [`Demos//${demoStr}/main`],
            inject: false,
            minify: {
                removeAttributeQuotes: true,
                removeComments: true,
                collapseWhitespace: true,
                minifyJS: true,
                minifyCSS: true,
            }
        }),
        new CopyWebpackPlugin([
            {
                from: process.env.NODE_ENV === 'production' ? CesiumDebugDir : CesiumReleaseDir,
                to: 'static/Cesium',
                toType: 'dir'
            },
            {
                from: `Source/static`,
                to: `static`,
                toType: 'dir'
            }
        ])
    ]
}

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = false // 不生成source map
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new CleanWebpackPlugin('./dist'),

        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),
    ])
} else {
    module.exports.devtool = '#source-map'
}