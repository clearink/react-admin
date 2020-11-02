import React, { memo, PropsWithChildren, useEffect } from "react"
import { Spin } from "antd"
import { Link } from "react-router-dom"
import styles from "./style.module.scss"
import { actions } from "@/store/reducers/type"
import useTypedSelector from "@/hooks/useTypedSelector"
import GetBoundAction from "@/utils/GetBoundAction"

// 绑定dispatch
const boundFetchList = GetBoundAction(actions.fetchTypeList)

interface IProps {}
function BlogHeader(props: PropsWithChildren<IProps>) {
	const { loading, types } = useTypedSelector((state) => state.type)

	useEffect(() => {
		if (!types.length) boundFetchList()
	}, [types.length])

	return (
		<div className='flex items-center justify-between flex-wrap'>
			<div className='text-2xl'>
				<Link to='/'>ClearInk的博客</Link>
			</div>
			<Spin spinning={loading}>
				<ul className={styles.action}>
					{/* 后端返回各个类型 */}
					<li className={styles.item}>首页</li>
					<li className={styles.item}>分类</li>
					<li className={styles.item}>归档</li>
					<li className={styles.item}>标签</li>
					<li className={styles.item}>关于</li>
				</ul>
			</Spin>
		</div>
	)
}

export default memo(BlogHeader)
