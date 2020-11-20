const {
	override,
	fixBabelImports,
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
	fixBabelImports("antd", {
		libraryName: "antd",
		libraryDirectory: "es",
		style: "css",
	}),
	fixBabelImports("zarm", {
		libraryName: "zarm",
		style: "css",
	}),
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
