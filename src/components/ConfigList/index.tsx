import React, { useMemo } from "react"
import styles from "./style.module.scss"
import { Button } from "antd"
import {
	PlusCircleFilled,
	PlusCircleOutlined,
	PlusOutlined,
} from "@ant-design/icons"
import ModalTrigger from "../ModalTrigger"
/**
 * 作用
 * 用于增加一些配置的数量
 * 以value的方式传入配置的name属性
 * 以modal的方式新增表单用于新增属性
 */
function ConfigList(props: any) {
	console.log("ConfigList", props)
	const config = useMemo(() => 1, [])
	return (
		<div className={styles.config_list__wrap}>
			<div>preview</div>
			<ModalTrigger
				trigger={
					<Button
						type='primary'
						icon={<PlusOutlined />}
						onClick={(e) => {
							console.log(12312123)
						}}
					>
						新增
					</Button>
				}
			>
				<p>1231223213213</p>
			</ModalTrigger>
		</div>
	)
}

export default ConfigList
