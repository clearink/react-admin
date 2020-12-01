import React, { memo } from "react"
import classNames from "classnames"
import styles from "./style.module.scss"
import { useDrag } from "react-dnd"
import h5Config from "@/configs/h5Config"

interface IProps {
	config: {
		type: string
		name: string
		cover: string
		config: any
	}
}
function Materiel(props: IProps) {
	const { config } = props
	const [{ isDragging }, dragRef] = useDrag({
		item: { type: h5Config.TYPE, name: config.type, config: config.config },
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
export default memo(Materiel)
