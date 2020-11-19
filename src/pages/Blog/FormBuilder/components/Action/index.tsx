import React, { useState, useRef } from "react"
import { Button, Input, Layout } from "antd"
import classNames from "classnames"
import GridLayout, { Layout as rglLayout } from "react-grid-layout"
import TickMark from "../TickMark"
import styles from "./style.module.scss"
import { useDrop } from "react-dnd"
import dnd from "@/configs/dnd"

function BaseCCC(props: { [key: string]: any }) {
	const { children, className, ...rest } = props
	const [isActive, dropRef] = useDrop({
		accept: dnd.COMPONENT,
		drop: (item: { type: string; name: string }, monitor) => {
			console.log("我将在我的位置之前新增一条数据", item)
			// console.log("BaseCCC", monitor.isOver({ shallow: false }))
			// // console.log(item, monitor, item.name, monitor.getHandlerId())
		},
		collect(monitor) {
			return monitor.canDrop() && monitor.isOver({ shallow: false })
		},
	})
	return (
		<div
			ref={dropRef}
			className={classNames(styles.grid_item_container, className, {
				[styles.active]: isActive,
			})}
			{...rest}
		>
			<div className={classNames(styles.form_item_wrap)}>
				<h1>标题</h1>
				<Input />
			</div>
			{children}
		</div>
	)
}

const { Content } = Layout
interface IProps {}
function Action(props: IProps) {
	const [length, setLength] = useState<any[]>([])
	const [, dropRef] = useDrop({
		accept: dnd.COMPONENT,
		drop: (item: { type: string; name: string }, monitor) => {
			const isOver = monitor.isOver({ shallow: false })
			if (isOver) {
				console.log("我将在末尾添加一条数据", item)
			}
			// console.log(item, monitor, item.name, monitor.getHandlerId())
		},
	})

	return (
		<Content className={classNames(styles.action)}>
			{/* 水平刻度线 */}
			<TickMark className='ml-20 absolute mt-0' end={1350} step={50} />
			{/* 垂直刻度线 */}
			<TickMark className='mt-20 absolute ml-0' vertical end={1050} step={50} />

			{/* 操作区域 */}
			<div className={classNames(styles.action_area)} ref={dropRef}>
				<GridLayout
					onLayoutChange={(l) => {
						setLength(l)
					}}
					margin={[1, 1]}
					className={styles.page_container}
					layout={length}
					cols={12}
					rowHeight={30}
					width={375}
				>
					{length.map((item) => (
						<BaseCCC key={item.i} />
					))}
				</GridLayout>
			</div>
			<Button
				className='absolute top-0'
				onClick={() => {
					setLength((p) => {
						return p.concat({
							i: p.length.toString(),
							x: 0,
							y: Infinity,
							minX: 2,
							minH: 2,
							w: 12,
							h: 3,
						})
					})
				}}
			>
				+1
			</Button>
		</Content>
	)
}

export default Action

// react-hotkeys-hook 热键支持
