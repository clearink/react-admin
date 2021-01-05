import React, { memo } from "react"
import classNames from "classnames"
import { ProTableColumns } from "@/components/Pro/ProTable/type"
import { Button } from "antd"
import { PlusOutlined, UsergroupAddOutlined } from "@ant-design/icons"
import ProTable from "@/components/Pro/ProTable"
import { FieldStatusProps } from "@/components/Pro/ProField/components/FieldStatus"
import styles from "./style.module.scss"

// 护理设置
const columns: ProTableColumns<any>[] = [
	{
		title: "方案名称",
		dataIndex: "title",
	},
	{
		title: "护理起始日期",
		dataIndex: "beginDate",
		field: "date",
	},
	{
		title: "当前状态",
		dataIndex: "status",
		field: "select",
		read: {
			renderType: "badge",
			options: ["停护", "启用"],
			statusList: ["#666", "green"],
		},
	},
	{
		title: "护理内容",
		width: 600,
		dataIndex: "content",
		read: {
			ellipsis: true,
		},
	},
	{
		title: "操作",
		field: "option",
		render: (value, record, index, action) => {
			return (
				<Button type='link' icon={<UsergroupAddOutlined />}>
					护理设置
				</Button>
			)
		},
	},
]
const data = Array.from({ length: 8 }, (_, i) => {
	return {
		key: i,
		title: [
			"自理",
			"半护",
			"全护1",
			"全护2",
			"特护1",
			"特护2",
			"特护3",
			"特护4",
		][i],
		beginDate: [
			"2019-07-06",
			"2019-04-14",
			"2019-04-14",
			"2019-07-06",
			"2019-07-06",
			"2019-07-06",
			"2019-07-06",
		][i],
		status: i === 0 ? "启用" : "停护",
		content: [
			"生活完全自理  进食、冲凉、换衣服、参与中心各种活动、中心负责打饭、理发、洗衣服。",
			"生活部分自理 进食、换衣服、能够参与中心活动、护理院调水温老人自己冲凉。",
			"神志清楚、语言自答、使用轮椅、不包尿裤、自行使用呼叫器、中心负责修剪趾甲、胡须、理发冲凉、换洗衣服等。",
			"神志恍惚、使用轮椅、24小时包尿裤。",
			"神志模糊、语无伦次、使用轮椅、24小时包尿裤、中心负责冲凉、换洗衣服、翻身扣背、喂饭。",
			"意识不请、绝对卧床、鼻饲或饮流食、包尿裤、中心负责冲凉、床上擦身、翻身扣背、胃管护理、口腔护理、眼部护理、制定护理流程和护理计划等。",
			"绝对卧床、鼻饲、留置导尿、给与导管护理、生活护理—（翻身扣背、擦身、膀胱冲洗、眼部护理、口腔护理、制定护理计划、制定流食及饮水量的达标）",
			"绝对卧床、鼻饲管、留置导尿管、各种引流管、气管切开、压疮、给与各种导管护理、生活护理（翻身扣背、擦身、膀胱冲洗、褥疮护理、口腔护理、气管切开处用药及护理、制定生活护理及基础护理计划、制定流食及饮用水量的计划）",
		][i],
	}
})
function NurseDetail() {
	return (
		<div>
			<ProTable
				bordered
				columns={columns}
				dataSource={data}
				renderTitle={(state, dispatch, actions) => {
					return (
						<Button type='primary' icon={<PlusOutlined />}>
							新增护理方案
						</Button>
					)
				}}
			/>
		</div>
	)
}
export default memo(NurseDetail)
