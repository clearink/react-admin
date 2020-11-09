import React, { useState, MouseEvent, useRef, useReducer } from "react"
import { Button, Input, Layout } from "antd"
import classNames from "classnames"
import GridLayout from "react-grid-layout"
import {
	ActionCreatorWithPayload,
	createAction,
	createReducer,
	createSlice,
	PayloadAction,
} from "@reduxjs/toolkit"
import {
	DragHandlers,
	motion as m,
	PanInfo,
	useDragControls,
} from "framer-motion"
import TickMark from "../TickMark"
import styles from "./style.module.scss"
import useThrottle from "@/hooks/useThrottle"

const { Content } = Layout
interface IProps {}

const init = {
	pre: { x: 0, y: 0 },
	cur: { x: 0, y: 0 },
}
const slice = createSlice({
	name: "dragPosition",
	initialState: init,
	reducers: {
		setPrePosition(state, action: PayloadAction<typeof init.pre>) {
			state.pre = action.payload
		},
		setCurPosition(state, action: PayloadAction<typeof init.cur>) {
			state.cur = action.payload
		},
	},
})
function Action(props: IProps) {
	const containerRef = useRef(null)
	const [length, setLength] = useState(2)
	const [{ cur, pre }, dispatch] = useReducer(slice.reducer, init)
	const dragControls = useDragControls()

	// 节流函数
	const handleOnDrag = useThrottle<Function>((e: any, info: PanInfo) => {
		console.log(e, info)
	}, 200)

	const handleClickContainer = (e: MouseEvent<HTMLDivElement>) => {
		if (e.target === containerRef.current) {
			console.log("移动")
		}
	}

	const layout = Array.from({ length }, (_, i) => ({
		i: i.toString(),
		x: 0,
		y: 0,
		minX: 2,
		minH: 2,
		w: 12,
		h: 5,
	}))
	return (
		<Content className={classNames(styles.action)}>
			{/* 水平刻度线 */}
			<TickMark className='ml-20 absolute mt-0' end={1350} step={50} />
			{/* 垂直刻度线 */}
			<TickMark className='mt-20 absolute ml-0' vertical end={1050} step={50} />

			{/* 操作区域 */}
			<m.div
				className={classNames(styles.action_area)}
				ref={containerRef}
				drag
				dragElastic={0}
				dragMomentum={false}
				// dragListener={false}
				// onDrag={handleOnDrag}
				onTouchStart={(e) => {
					if (e.target === containerRef.current) {
						dragControls.start(e)
					}
				}}
				onMouseDown={(e) => {
					if (e.target === containerRef.current) {
						dragControls.start(e)
					}
				}}
				onWheel={(e) => {
					console.log(e.deltaY)
				}}
			>
				<GridLayout
					layout={layout}
					className={styles.page_container}
					cols={12}
					rowHeight={30}
					width={375}
					style={{ transform: `translate(${cur.x}px,${cur.y}px)` }}
				>
					{layout.map((item) => (
						<div
							key={item.i}
							className={classNames(styles.grid_item_container)}
						>
							<div className={classNames(styles.form_item_wrap)}>
								<h1>标题</h1>
								<Input />
							</div>
						</div>
					))}
				</GridLayout>
			</m.div>

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
