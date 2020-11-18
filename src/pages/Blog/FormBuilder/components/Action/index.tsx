import React, { useState, useRef } from "react"
import { Button, Input, Layout } from "antd"
import classNames from "classnames"
import GridLayout from "react-grid-layout"
import TickMark from "../TickMark"
import styles from "./style.module.scss"
import { useDrop } from "react-dnd"
import dnd from "@/configs/dnd"

function BaseCCC() {
	return (
		<div className={classNames(styles.form_item_wrap)}>
			<h1>标题</h1>
			<Input />
		</div>
	)
}

const { Content } = Layout
interface IProps {}
function Action(props: IProps) {
	const containerRef = useRef(null)
	const [length, setLength] = useState(20)
	const [, dropRef] = useDrop({
		accept: dnd.COMPONENT,
		drop: (item: { type: string; name: string }, monitor) => {
			console.log(item, monitor, item.name, monitor.getHandlerId())
			setLength((p) => p + 1)
		},
	})

	const layout = Array.from({ length }, (_, i) => ({
		i: i.toString(),
		x: 0,
		y: 0,
		minX: 2,
		minH: 2,
		w: 12,
		h: 3,
	}))
	return (
		<Content className={classNames(styles.action)}>
			{/* 水平刻度线 */}
			<TickMark className='ml-20 absolute mt-0' end={1350} step={50} />
			{/* 垂直刻度线 */}
			<TickMark className='mt-20 absolute ml-0' vertical end={1050} step={50} />

			{/* 操作区域 */}
			<div className={classNames(styles.action_area)} ref={dropRef}>
				<GridLayout
					isDroppable
					droppingItem={{ i: "drop_item", h: 2, w: 12 }}
					className={styles.page_container}
					layout={layout}
					cols={12}
					rowHeight={30}
					width={375}
				>
					{layout.map((item) => (
						<div
							key={item.i}
							className={classNames(styles.grid_item_container)}
						>
							<BaseCCC />
						</div>
					))}
				</GridLayout>
			</div>

			<Button
				className='absolute top-0'
				onClick={() => {
					setLength((pre) => pre + 1)
				}}
			>
				+1
			</Button>
		</Content>
	)
}

export default Action

// react-hotkeys-hook 热键支持
