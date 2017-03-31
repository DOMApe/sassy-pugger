var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var webpack = require('webpack');

var isProd = process.env.NODE_ENV === 'production';
var cssDev = ['style-loader', 'css-loader', 'sass-loader'];
var cssProd = ExtractTextWebpackPlugin.extract({
		fallback: 'style-loader',
		use: ['css-loader', 'sass-loader'],
		publicPath: "/dist"
	});
var cssConfig = isProd ? cssProd : cssDev;

var config = {
	entry:'./src/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{test: /\.(js|jsx)$/, use: 'babel-loader',
				exclude: /node_modules/
			},
			{test: /\.pug$/, use: 'pug-loader'},
			{test: /\.(sass|scss)$/,
				use: cssConfig
			},
			{
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/i,
        use:
					'file-loader?name=[sha256:hash:12].[ext]&outputPath=img/&publicPath=img/'
			}
		]
	},
	devServer: {
  contentBase: path.join(__dirname, "dist"),
  compress: true,
  port: 9000,
	hot: true,
	open: true
},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Project Name',
			minify: {
				collapseWhitespace: true
			},
			hash: true,
			template: './src/pug/index.pug'
		}),
		new ExtractTextWebpackPlugin({
			filename: "bundle.css",
			disable: !isProd,
			allChunks: true
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin()
	]
};

module.exports = config;
