import React, { memo } from "react"
import styles from "./style.module.scss"
import { Skeleton, Space } from "antd"

// 骨架屏
export interface SkeletonFormProps {
	/** 骨架屏类型 */

	active?: boolean
	loading?: boolean
	size?: "small" | "large" | "default"
}
function SkeletonForm(props: SkeletonFormProps) {
	return (
		<div className={styles.pro_skeleton}>
			<div className={styles.skeleton_title}>
				<Skeleton.Input {...props} className={styles.title} />
			</div>
			<div className={styles.skeleton_content}>
				<div className={styles.form_input}>
					{Array.from({ length: 2 }, (_, i) => (
						<div className={styles.item} key={i}>
							<Skeleton.Input {...props} className={styles.label} />
							<Skeleton.Input {...props} className={styles.value} />
						</div>
					))}
				</div>
				{Array.from({ length: 2 }, (_, i) => (
					<div className={styles.single} key={i}>
						<Skeleton.Input {...props} className={styles.label} />
						<Skeleton.Input {...props} className={styles.value} />
					</div>
				))}
				<div className={styles.form_select}>
					<div className={styles.select_wrap}>
						<Skeleton.Button {...props} />
						<Skeleton.Button {...props} />
						<Skeleton.Button {...props} />
						<Skeleton.Button {...props} />
					</div>
					<Skeleton.Input {...props} className={styles.input} />
				</div>
				<Skeleton.Input {...props} className='w-full my-6' />
				<div className={styles.media}>
					<Skeleton.Image className={styles.image} {...props} />
					<Skeleton.Input className={styles.code} {...props} />
				</div>
			</div>
			{/* <div className={styles.submit}>
				<Skeleton.Button {...props} className={styles.button} />
				<Skeleton.Button {...props} className={styles.button} />
			</div> */}
		</div>
	)
}
export default memo(SkeletonForm)
