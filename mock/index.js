// mock 数据
const Mock = require("mockjs")
const { Random, mock } = Mock
module.exports = () => {
	const data = {
		posts: [],
		user: [],
	}
	// posts
	for (let index = 0; index < 200; index++) {
		const content = Random.cparagraph(0, 200)
		const tag = Random.cword(2, 6)

		// user
		data.posts.push(
			mock({
				id: index,
				title: "@cword(8,20)",
				content: content,
				desc: content.slice(0, 20),
				tag: tag,
				views: "@integer(100,5000)",
				images: `@image(200x100, @color, ${tag})`,
			})
		)
	}
	// user
	const name = Random.name()
	data.user.push(
		mock({
			id: "@natural()",
			name: name,
			password: "@string('lower',10)",
			avatar: `@image(88x31, @color, ${name})`,
		})
	)
	return data
}
