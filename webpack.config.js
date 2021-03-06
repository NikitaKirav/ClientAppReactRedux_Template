const path = require('path');
const bundleFolder = "./production/";
const publicFolder = "./production/";
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const optimization = () => {
    const config = {};

    if (isProd) {
        config.minimizer = [
            new OptimizeCssAssetsWebpackPlugin(),
            new TerserWebpackPlugin()
        ]
    }
    return config;
};

module.exports = {
    entry: {
        site: './src/index.js',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, bundleFolder),
        publicPath: '/'
    },
    devtool: isDev ? 'inline-source-source-map' : '',
    optimization: optimization(),
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html',
            path: '/bundle/',
            chunks: ['site']
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                enforce: 'pre',
                use: 'eslint-loader'
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {                    
                    presets: [
                        '@babel/preset-env'
                    ]
                }
            },
            {
                test: /\.(png|jpg|svg|giv)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'images/',
                            useRelativePath: true
                        }
                    }
                ]
            },
            {
                test: /^(?!.*?\.module).*\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: isDev,
                            reloadAll: true
                        },

                    }, 'css-loader'
                ]
            },
            {
                test: /^(?!.*?\.module).*\.less$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: isDev,
                            reloadAll: true
                        },

                    }, "css-loader",
                    'less-loader'
                ]
            },
            {
                test: /\.module\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: isDev,
                            reloadAll: true,
                            modules: true,
                            esModule: true
                        },

                    }, 'css-loader?modules'
                ]
            },
            {
                test: /\.module\.less$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: isDev,
                            reloadAll: true,
                            modules: true,
                            esModule: true
                        },

                    }, "css-loader?modules",
                    'less-loader'
                ]
            },

        ]
    },
    devServer: {
        contentBase: path.resolve(__dirname, publicFolder),
        port: 3000,
        historyApiFallback: true,
        inline: true,
        hot: true,
        host: '0.0.0.0'
    }
};
