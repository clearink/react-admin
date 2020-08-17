const CracoAntDesignPlugin = require("craco-antd")
const WebpackBar = require("webpackbar")
const CracoAlias = require("craco-alias")
const isDev = process.env.NODE_ENV === "development"

module.exports = {
	webpack: {
		plugins: [new WebpackBar({ profile: true })],
	},
	plugins: [
		{ plugin: CracoAntDesignPlugin },
		{
			plugin: CracoAlias,
			options: {
				source: "tsconfig",
				baseUrl: ".",
				tsConfigPath: "./tsconfig.extend.json",
			},
		},
	],
}
