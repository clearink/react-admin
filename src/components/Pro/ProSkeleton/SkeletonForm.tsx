import React, { memo } from "react"
import styles from "./style.module.scss"
import { Skeleton, Space } from "antd"

// 骨架屏
export interface SkeletonFormProps {
	/** 骨架屏类型 */

	active?: boolean
	loading?: boolean
	size?: "small" | "large" | "default"
	row?: number
}
function SkeletonForm(props: SkeletonFormProps) {
	const { row, ...rest } = props
	const height = row === undefined ? "100%" : row * 30
	return (
		<div className={styles.pro_skeleton} style={{ height }}>
			<div className={styles.skeleton_title}>
				<Skeleton.Input {...rest} className={styles.title} />
			</div>
			<div className={styles.skeleton_content}>
				<div className={styles.form_input}>
					{Array.from({ length: 2 }, (_, i) => (
						<div className={styles.item} key={i}>
							<Skeleton.Input {...rest} className={styles.label} />
							<Skeleton.Input {...rest} className={styles.value} />
						</div>
					))}
				</div>
				{Array.from({ length: 2 }, (_, i) => (
					<div className={styles.single} key={i}>
						<Skeleton.Input {...rest} className={styles.label} />
						<Skeleton.Input {...rest} className={styles.value} />
					</div>
				))}
				<div className={styles.form_select}>
					<div className={styles.select_wrap}>
						<Skeleton.Button {...rest} />
						<Skeleton.Button {...rest} />
						<Skeleton.Button {...rest} />
						<Skeleton.Button {...rest} />
					</div>
					<Skeleton.Input {...rest} className={styles.input} />
				</div>
				<Skeleton.Input {...rest} className='w-full my-6' />
				<div className={styles.media}>
					<Skeleton.Image className={styles.image} {...rest} />
					<Skeleton.Input className={styles.code} {...rest} />
				</div>
			</div>
		</div>
	)
}
export default memo(SkeletonForm)
