import React, { useMemo, useRef } from "react"
import styles from "./style.module.scss"
import { Button } from "antd"
import { PlusOutlined } from "@ant-design/icons"
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
	const updateRef = useRef(null)
	return (
		<div className={styles.config_list__wrap}>
			<div>preview</div>
			<ModalTrigger
				title='新增轮播图'
				trigger={
					<Button type='primary' icon={<PlusOutlined />}>
						新增
					</Button>
				}
			>
				<p>1231223213213</p>
			</ModalTrigger>
			<ModalTrigger title='编辑轮播图' ref={updateRef}>
				<p>1231223213213</p>
			</ModalTrigger>
		</div>
	)
}

export default ConfigList
