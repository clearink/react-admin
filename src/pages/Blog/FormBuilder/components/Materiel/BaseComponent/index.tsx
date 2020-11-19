import React, { memo } from "react"
import classNames from "classnames"
import btn from "@/assets/images/btn.jpg"
import styles from "./style.module.scss"
import { useDrag } from "react-dnd"
import dnd from "@/configs/dnd"

function _BaseComponent(props: any) {
	const [{ isDragging }, dragRef] = useDrag({
		item: { type: dnd.COMPONENT, name: "button" },
		collect: (monitor) => ({
			isDragging: !!monitor.isDragging(),
		}),
	})
	return (
		<div
			ref={dragRef}
			className={classNames(styles.item, { [styles.dragging]: isDragging })}
		>
			<img draggable={false} alt={"123"} className={styles.cover} src={btn} />
			<div className={styles.name}> Button 按钮</div>
		</div>
	)
}
const BaseComponent = memo(_BaseComponent)
// 基础组件
function BaseComponentList(props: any) {
	return (
		<div className={classNames(styles.container)}>
			{Array.from({ length: 2 }, (_, i) => (
				<BaseComponent key={i} />
			))}
		</div>
	)
}

export default BaseComponentList
/**
 * props:
 * cover 封面
 * value 对应的map数据
 * id
 *
 * name 名称
 *
 * 可配置的属性
 * 可以拖拽
 */
