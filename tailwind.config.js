// 24 格栅格布局
function createGridLayoutWidth(colNum = 24) {
	const result = {}
	for (let i = 0; i < colNum; i++) {
		result[`${i}/${colNum}`] = `${(i / colNum) * 100}%`
	}
	return result
}
module.exports = {
	purge: ["./src/**/*.tsx", "./src/**/*.scss"],
	theme: {
		extend: {
			width: {
				...createGridLayoutWidth(),
			},
		},
	},
	variants: {},
	plugins: [],
	corePlugins: {
		preflight: false,
	},
	important: true,
}
