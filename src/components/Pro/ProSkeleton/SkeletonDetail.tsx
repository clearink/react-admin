import React, { memo } from "react"
import styles from "./style.module.scss"
import { Skeleton } from "antd"

// 骨架屏
export interface SkeletonDetailProps {
	/** 骨架屏类型 */

	active?: boolean
	loading?: boolean
	size?: "small" | "large" | "default"
}
function SkeletonDetail(props: SkeletonDetailProps) {
	return (
		<div className={styles.pro_skeleton}>
			<div className={styles.skeleton_title}>
				<Skeleton.Input {...props} className={styles.title} />
			</div>
			<div className={styles.skeleton_content}>
				<div className={styles.list}>
					{Array.from({ length: 3 }, (_, i) => (
						<div className={styles.item} key={i}>
							<Skeleton.Input {...props} className={styles.label} />
							<Skeleton.Input {...props} className={styles.value} />
						</div>
					))}
					{Array.from({ length: 3 }, (_, i) => (
						<div className={styles.item} key={i}>
							<Skeleton.Input {...props} className={styles.label} />
							<Skeleton.Input {...props} className={styles.value} />
						</div>
					))}
					{Array.from({ length: 3 }, (_, i) => (
						<div className={styles.item} key={i}>
							<Skeleton.Input {...props} className={styles.label} />
							<Skeleton.Input {...props} className={styles.value} />
						</div>
					))}
				</div>
				<Skeleton {...props} />
				<div className={styles.group}>
					<Skeleton.Input {...props} className={styles.group_title} />
					<div className={styles.group_content}>
						<Skeleton
							title={false}
							paragraph={{ rows: 4 }}
							{...props}
							className={styles.group_item}
						/>
						<Skeleton
							title={false}
							paragraph={{ rows: 4 }}
							{...props}
							className={styles.group_item}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}
export default memo(SkeletonDetail)
