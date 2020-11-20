import React from "react"
import { Layout } from "antd"
import classNames from "classnames"
import ReactGridLayout from "@/components/ReactGridLayout"
import TickMark from "../TickMark"
import styles from "./style.module.scss"
import { useDrop } from "react-dnd"
import dnd from "@/configs/dnd"
import gridLayout from "@/configs/pageBuilder"
import useTypedSelector from "@/hooks/useTypedSelector"
import BuilderComponent from "./BuilderComponent"
import { actions } from "@/store/reducers/builder"
import { nanoid } from "@reduxjs/toolkit"
import GetBoundAction from "@/utils/GetBoundAction"
import baseComponentMap from "@/configs/baseComponentMap"
const boundActions = GetBoundAction(actions)
const { Content } = Layout
interface IProps {}
function Action(props: IProps) {
	const { builderList } = useTypedSelector((state) => state.builder)
	const [, dropRef] = useDrop({
		accept: dnd.COMPONENT,
		drop: (item: { type: string; name: string }, monitor) => {
			const isOver = monitor.isOver({ shallow: false })
			const canDrop = monitor.canDrop()
			if (isOver && canDrop) {
				console.log("我将在末尾添加一条数据")
				// 发送Action
				const id = nanoid(8) // 生成唯一id
				const config = baseComponentMap[item.name].config ?? {} // 可配置信息
				boundActions.add({
					id,
					position: { i: id, x: 0, y: Infinity, w: 12, h: 3 }, // 位置信息
					type: item.name,
					// 可配置信息
					config,
					// 配置属性 应当有默认值
					value: Object.entries(config).reduce((pre, [k, v]: [string, any]) => {
						return { ...pre, [k]: v.default }
					}, {}),
				})
			}
		},
	})

	return (
		<Content className={classNames(styles.action)}>
			{/* 水平刻度线 */}
			<TickMark className='ml-20 absolute mt-0' end={1350} step={50} />
			{/* 垂直刻度线 */}
			<TickMark className='mt-20 absolute ml-0' vertical end={1050} step={50} />

			{/* 操作区域 */}
			<div className={classNames(styles.action_area)}>
				<ReactGridLayout
					innerRef={dropRef}
					onLayoutChange={(l) => {
						// console.log(l)
					}}
					margin={[1, 1]}
					className={styles.page_container}
					cols={gridLayout.COLS}
					rowHeight={gridLayout.ROW_HEIGHT}
					style={{ width: gridLayout.WIDTH }}
					width={gridLayout.WIDTH}
				>
					{builderList.map((item) => (
						<BuilderComponent
							key={item.id}
							data-grid={item.position}
							config={item}
							type={item.type}
						/>
					))}
				</ReactGridLayout>
			</div>
		</Content>
	)
}

export default Action

// react-hotkeys-hook 热键支持
