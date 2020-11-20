import React, { memo } from "react"
import classNames from "classnames"
import btn from "@/assets/images/components/button.jpg"
import styles from "./style.module.scss"
import { useDrag } from "react-dnd"
import dnd from "@/configs/dnd"
import baseComponentMap from "@/configs/baseComponentMap"

const baseComponentList = Object.values(baseComponentMap)

// 绑定拖拽
function _BaseComponent(props: any) {
	const { config } = props
	const [{ isDragging }, dragRef] = useDrag({
		item: { type: dnd.COMPONENT, name: config.type },
		collect: (monitor) => ({
			isDragging: !!monitor.isDragging(),
		}),
	})
	return (
		<div
			ref={dragRef}
			className={classNames(styles.item, { [styles.dragging]: isDragging })}
		>
			<img
				draggable={false}
				alt={"123"}
				className={styles.cover}
				src={config.cover}
			/>
			<div className={styles.name}>{config.name}</div>
		</div>
	)
}
const BaseComponent = memo(_BaseComponent)
// 基础组件
function BaseComponentList(props: any) {
	return (
		<div className={classNames(styles.container)}>
			{baseComponentList.map((config) => {
				return <BaseComponent key={config.type} config={config} />
			})}
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
