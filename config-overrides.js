const {
	override,
	fixBabelImports,
	addWebpackPlugin,
	addWebpackAlias,
	addPostcssPlugins,
	addWebpackExternals,
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
	addWebpackExternals({
		numeral: "window.numeral",
	}),
	addWebpackPlugin(new WebpackBar(), new AntdDayjsWebpackPlugin()),
	(config) => {
		if (isAnalyze) config.plugins.push(new BundleAnalyzerPlugin())
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
