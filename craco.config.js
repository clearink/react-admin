const CracoAntDesignPlugin = require("craco-antd")
const WebpackBar = require("webpackbar")

const isDev = process.env.NODE_ENV === "development"
module.exports = {
	webpack: {
		plugins: [new WebpackBar({ profile: true })],
	},
	plugins: [{ plugin: CracoAntDesignPlugin }],
}
