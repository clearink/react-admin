const {
	override,
	fixBabelImports,
	addWebpackPlugin,
	addWebpackAlias,
	addPostcssPlugins,
	addLessLoader,
} = require("customize-cra")
const WebpackBar = require("webpackbar")
const AntdDayjsWebpackPlugin = require("antd-dayjs-webpack-plugin")
const path = require("path")
const isDev = process.env.NODE_ENV === "development"

module.exports = override(
	fixBabelImports("import", {
		libraryName: "antd",
		libraryDirectory: "es",
		style: true,
	}),
	addLessLoader({
		lessOptions: {
			modifyVars: { "@primary-color": "#1DA57A" },
			javascriptEnabled: true,
		},
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
