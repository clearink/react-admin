import React, { memo } from "react"
import classNames from "classnames"
import styles from "./style.module.scss"
import { useDrag } from "react-dnd"
import h5Config from "@/configs/h5Config"
import { IConfigItem } from "@/@types/buildConfig"

function Materiel(props: IConfigItem) {
	const { type, name, config, cover } = props
	const [{ isDragging }, dragRef] = useDrag({
		item: { type: h5Config.TYPE, name: type, config },
		collect: (monitor) => ({
			isDragging: !!monitor.isDragging(),
		}),
	})
	return (
		<div
			ref={dragRef}
			className={classNames(styles.item, { [styles.dragging]: isDragging })}
		>
			<img draggable={false} alt={"123"} className={styles.cover} src={cover} />
			<div className={styles.name}>{name}</div>
		</div>
	)
}
export default memo(Materiel)
