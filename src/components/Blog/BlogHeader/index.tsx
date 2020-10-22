import React, { memo, PropsWithChildren } from "react"
import styles from "./style.module.scss"
interface IProps {}
function BlogHeader(props: PropsWithChildren<IProps>) {
	return (
		<div className='flex items-center justify-between flex-wrap'>
			<div className='text-2xl text-blue-600'>ClearInk的博客</div>
			<ul className={styles.action}>
				{/* 后端返回各个类型 */}
				<li className={styles.item}>首页</li>
				<li className={styles.item}>分类</li>
				<li className={styles.item}>归档</li>
				<li className={styles.item}>标签</li>
				<li className={styles.item}>关于</li>
			</ul>
		</div>
	)
}

export default memo(BlogHeader)
