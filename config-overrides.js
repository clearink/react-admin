const {
	override,
	fixBabelImports,
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
	addWebpackExternals({}),
	// addWebpackPlugin 一次只能push一个plugin
	(config) => {
		config.plugins.push(new WebpackBar())
		if (isProd) config.plugins.push(new AntdDayjsWebpackPlugin()) // 生产环境启用
		if (isAnalyze) config.plugins.push(new BundleAnalyzerPlugin()) // 打包分析
		return config
	},
	addWebpackAlias({
		"@": path.resolve(__dirname, "src"),
	}),
	addPostcssPlugins([require("tailwindcss"), require("autoprefixer")])
)
