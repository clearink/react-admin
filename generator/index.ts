const fs = require("fs")

const ejs = require("ejs")
// 生成器简易版
/**
 * 每个页面的组织结构如下所示
 * some-page
 *  --index.tsx
 *  --table    表格 pro-table
 *    --index.tsx
 *  --details  详情 pro-card与pro-field
 *    -- index.tsx
 *  --add      添加 DrawerForm or ModalForm 新增会与table严重耦合 如何解决 
 * 						 目前是table暴露一个onCreate
 *    -- index.tsx
 *  --edit     编辑 DrawerForm or ModalForm
 *    -- index.tsx
 */

// 数据哪里来?
const data = [
	{
		title: "房间编号",
		width: 160,
		dataIndex: "orgRoomId",
		search: {
			label: undefined,
			name: "roomId",
			placeholder: "房间编号",
		},
		read: {
			copyable: true,
			ellipsis: true,
		},
	},
	{
		title: "床位编号",
		width: 100,
		dataIndex: "num",
	},
	{
		title: "入住用户",
		dataIndex: "memberName",
		read: {
			copyable: true,
		},
	},
	{
		title: "护管人员",
		dataIndex: "careWorkerName",
		read: {
			copyable: true,
		},
	},
	{
		title: "床垫设备号",
		dataIndex: "deviceNum",
		read: {
			copyable: true,
		},
	},
	{
		title: "开放状态",
		dataIndex: "status",
		render(value) {
			return "<Switch defaultChecked={value} />"
		},
	},
]
// 根据传过来的data 找到相应的数据
const tableColumns = []
const addFormColumns = []
const editFormColumns = []
const detailColumns = []
ejs.renderFile(
	"./template/index.ejs",
	{
		title: "床位管理",

		listUrl: "list",
		deleteUrl: "delete",
		addUrl: "add",
		editUrl: "edit",
	},
	(err, str) => {
		if (err) return
		fs.writeFile("./template/index.tsx", str, (err) => {
			if (err) return
			console.log("文件保存成功")
		})
	}
)
