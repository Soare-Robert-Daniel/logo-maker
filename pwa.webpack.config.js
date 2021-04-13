/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
	entry: {
		"logo-maker": "./src/index.tsx"
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					"style-loader",
					"css-loader",
					{
						loader: "postcss-loader",
						options: {
							postcssOptions: {
								plugins: [ "autoprefixer" ]
							}
						}
					},
					"sass-loader"
				]
			},
		],
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js", ".jsx"],
	},
	output: {
		// ...defaultConfig.output,
		filename: "[name].js",
		path: path.resolve(__dirname, "pwa_build"),

	},
	devServer: {
		writeToDisk: true,
        contentBase: path.join(__dirname, 'pwa_build'),
        compress: true,
	},
	plugins: [
		new BundleAnalyzerPlugin({
			analyzerMode: 'static'
		}),
		new HtmlWebpackPlugin({
			title: 'Progressive Web Application',
            template: 'index.html'
		}),
        new WorkboxPlugin.GenerateSW({
            // these options encourage the ServiceWorkers to get in there fast
            // and not allow any straggling "old" SWs to hang around
            clientsClaim: true,
            skipWaiting: true,
          }),
	]
};