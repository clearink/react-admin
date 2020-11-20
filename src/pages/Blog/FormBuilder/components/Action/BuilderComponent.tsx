// 绑定drop
import React, { ComponentType, isValidElement, memo, useMemo } from "react"
import classNames from "classnames"
import dnd from "@/configs/dnd"
import styles from "./style.module.scss"
import { useDrop } from "react-dnd"
import componentMap from "@/configs/componentMap"
import { actions } from "@/store/reducers/builder"
import GetBoundAction from "@/utils/GetBoundAction"
import useTypedSelector from "@/hooks/useTypedSelector"
const boundActions = GetBoundAction(actions)

//TODO 应该拖拽时不能选中
function BuilderComponent(props: { [key: string]: any }) {
	const { children, className, item, type, config, ...rest } = props
	const selectId = useTypedSelector((state) => state.builder.selectId)
	const [isActive, dropRef] = useDrop({
		accept: dnd.COMPONENT,
		drop: (item: { type: string; name: string }, monitor) => {
			console.log("我将在我的位置之后新增一条数据", item)
		},
		collect(monitor) {
			return monitor.canDrop() && monitor.isOver({ shallow: false })
		},
	})

	// console.log(props);
	const renderComponent = useMemo(() => {
		const MapComponent: ComponentType<any> = componentMap[type]
		if (!isValidElement(<MapComponent />)) {
			return null
		}
		return <MapComponent {...config.value} />
	}, [config.value, type])
	return (
		<div
			ref={dropRef}
			className={classNames(styles.grid_item_container, className, {
				[styles.active]: isActive,
			})}
			{...rest}
		>
			<div
				className={classNames(styles.form_item_wrap)}
				onClick={() => {
					console.log("object")
					// if (selectId !== config.id) boundActions.active(config.id)
				}}
			>
				{renderComponent}
			</div>
			{children}
		</div>
	)
}

export default memo(BuilderComponent)
