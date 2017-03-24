const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const path = require('path');

const config = {
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
      {test: /\.(jpe?g|png|gif|svg)$/i, use: "file-loader?name=[name].[ext]&publicPath=src/img/&outputPath=dist/images/"},

			{test: /\.pug$/, use: 'pug-loader'},
			{test: /\.(sass|scss)$/, use: ExtractTextWebpackPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader', 'sass-loader'],
        publicPath: "/dist"
      	})
			}
		]
	},
	devServer: {
  contentBase: path.join(__dirname, "dist"),
  compress: true,
  port: 9000,
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
			disable: false,
			allChunks: true
		})
	]
};

module.exports = config;
