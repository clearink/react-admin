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
const isDev = process.env.NODE_ENV === "development"

module.exports = override(
	fixBabelImports("import", {
		libraryName: "antd",
		libraryDirectory: "es",
		style: "css",
	}),
	addWebpackPlugin(new WebpackBar(), new AntdDayjsWebpackPlugin()),
	addWebpackAlias({
		"@": path.resolve(__dirname, "src"),
	}),
	addPostcssPlugins([
		require("postcss-import"),
		require("tailwindcss"),
		require("autoprefixer"),
	])
)
