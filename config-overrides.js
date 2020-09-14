const {
	override,
	fixBabelImports,
	addWebpackPlugin,
	addWebpackAlias,
	addPostcssPlugins,
} = require("customize-cra")
const WebpackBar = require("webpackbar")
const AntdDayjsWebpackPlugin = require("antd-dayjs-webpack-plugin")
const path = require("path")
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer")
const isProd = process.env.NODE_ENV === "production"
const isAnalyze = process.env.ANALYZE === "true"
module.exports = override(
	fixBabelImports("import", {
		libraryName: "antd",
		libraryDirectory: "es",
		style: "css",
	}),
	addWebpackPlugin(new WebpackBar()),
	(config) => {
		if (isAnalyze) config.plugins.push(new BundleAnalyzerPlugin())
		if (isProd) config.plugins.push(new AntdDayjsWebpackPlugin())
		return config
	},
	addWebpackAlias({
		"@": path.resolve(__dirname, "src"),
	}),
	addPostcssPlugins([
		require("postcss-import"),
		require("tailwindcss"),
		require("autoprefixer"),
	])
)
