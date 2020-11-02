import React from "react"
import { Result } from "antd"
import classNames from "classnames"
import styles from "./style.module.scss"
import useBoolean from "@/hooks/useBoolean"
import { DoubleLeftOutlined, DoubleRightOutlined } from "@ant-design/icons"
const width = "30rem"
interface IProps {}
function Attribute(props: IProps) {
	const [collapsed, toggle] = useBoolean()
	return (
		<>
			<div
				className={classNames(styles.container, {
					[styles.collapsed]: collapsed,
				})}
			>
				<Result
					status='404'
					title='请选中组件'
					subTitle='选择组件 修改属性'
					className='pt-56'
				/>

				{/* trigger */}
				<div className={styles.trigger} onClick={toggle as any}>
					{collapsed ? <DoubleLeftOutlined /> : <DoubleRightOutlined />}
				</div>
			</div>
			<div
				className={classNames(styles.placeholder, {
					[styles.collapsed]: collapsed,
				})}
			></div>
		</>
	)
}

export default Attribute
