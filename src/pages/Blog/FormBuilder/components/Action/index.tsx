import React from "react"
import { Layout } from "antd"
import classNames from "classnames"
import ReactGridLayout from "@/components/ReactGridLayout"
import TickMark from "../TickMark"
import styles from "./style.module.scss"
import { useDrop } from "react-dnd"
import gridLayout from "@/configs/h5Config"
import useTypedSelector from "@/hooks/useTypedSelector"
import Builder from "./Builder"
import { actions } from "@/store/reducers/builder"
import GetBoundAction from "@/utils/GetBoundAction"
import h5Config from "@/configs/h5Config"
import { IDropItem } from "@/@types/page-builder"
const boundActions = GetBoundAction(actions)
const { Content } = Layout
function Action() {
	const builderList = useTypedSelector((state) => state.builder.builderList)
	const [, dropRef] = useDrop({
		accept: h5Config.TYPE,
		drop: (item: IDropItem, monitor) => {
			const isOver = monitor.isOver({ shallow: false })
			const canDrop = monitor.canDrop()
			if (isOver && canDrop) {
				const { config, name } = item
				boundActions.add({
					type: name,
					config: config.configs,
					value: config.defaultValues,
					layout: config.layout,
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
			<ReactGridLayout
				innerRef={dropRef}
				onLayoutChange={(l) => {
					// console.log(l)
				}}
				margin={[0, 0]}
				className={styles.page_container}
				cols={gridLayout.COLS}
				rowHeight={gridLayout.ROW_HEIGHT}
				style={{ width: gridLayout.WIDTH }}
				width={gridLayout.WIDTH}
			>
				{builderList.map((item) => {
					return <Builder item={item} data-grid={item.position} key={item.id} />
				})}
			</ReactGridLayout>
		</Content>
	)
}

export default Action

// react-hotkeys-hook 热键支持
