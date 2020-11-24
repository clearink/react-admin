// 绑定drop
import React, { isValidElement, memo, useMemo } from "react"
import classNames from "classnames"
import styles from "./style.module.scss"
import { useDrop } from "react-dnd"
import BuilderMap from "@/configs/BuilderMap"
import { actions } from "@/store/reducers/builder"
import GetBoundAction from "@/utils/GetBoundAction"
import useTypedSelector from "@/hooks/useTypedSelector"
import h5Config from "@/configs/h5Config"
const boundActions = GetBoundAction(actions)
//TODO 应该拖拽时不能选中
function Builder(props: { [key: string]: any }) {
	const { children, className, item, ...rest } = props
	const selectId = useTypedSelector((state) => state.builder.selectId)
	const { type, value, id } = item

	const [isActive, dropRef] = useDrop({
		accept: h5Config.TYPE,
		drop: (item: { type: string; name: string }, monitor) => {
			console.log("我将在我的位置之后新增一条数据")
		},
		collect(monitor) {
			return monitor.canDrop() && monitor.isOver({ shallow: false })
		},
	})

	const renderComponent = useMemo(() => {
		const MapComponent = BuilderMap[type]
		if (MapComponent && isValidElement(<MapComponent />)) {
			return <MapComponent {...value} />
		}
	}, [type, value])
	return (
		<div
			ref={dropRef}
			className={classNames(styles.grid_item_container, className, {
				[styles.active]: isActive,
			})}
			{...rest}
			onMouseDown={(e) => {
				rest.onMouseDown(e)
				if (selectId !== id) boundActions.active(id)
			}}
		>
			<div className={classNames(styles.form_item_wrap)}>{renderComponent}</div>
			{children}
		</div>
	)
}

export default memo(Builder)
