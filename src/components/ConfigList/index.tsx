import React, { memo, ReactNode, useEffect, useMemo, useRef } from "react"
import { Button, Form } from "antd"
import { PlusOutlined } from "@ant-design/icons"
import ModalTrigger, { IModalTriggerRef } from "../ModalTrigger"
import withDefaultProps from "@/hocs/withDefaultProps"
import FilterValue from "@/utils/FilterValue"
import RenderForm from "../RenderForm"
import styles from "./style.module.scss"
import ListItem from "./ListItem"

/**
 * 作用
 * 用于增加一些配置的数量
 * 以value的方式传入配置的name属性
 * 以modal的方式新增表单用于新增属性
 */

interface IProps {
	config: Object
	name: string
	value: any[]
	onChange: Function
	children: ReactNode
}
function ConfigList(props: IProps) {
	const { config, name, value, onChange } = props
	console.log("ConfigList", props)

	// 获取表单的默认值
	const defaultValues = useMemo(() => {
		const result = {}
		for (let [k, v] of Object.entries(config)) {
			result[k] = v.default
		}
		return result
	}, [config])

	const addRef = useRef<IModalTriggerRef>(null)
	const updateRef = useRef<IModalTriggerRef>(null)

	const [formAdd] = Form.useForm()
	const [formUpdate] = Form.useForm()

	// 新增数据
	const handleAddItem = (values: any) => {
		console.log(values)
		onChange(value.concat(values))
		addRef.current?.toggle()
		formAdd.resetFields()
	}
	const handleUpdateItem = () => {}
	return (
		<div className={styles.config_list__wrap}>
			{/* 预览 */}
			<ListItem data={value} config={config} />

			<ModalTrigger
				title={`新增${name}`}
				ref={addRef}
				trigger={
					<Button type='primary' icon={<PlusOutlined />}>
						新增
					</Button>
				}
				onOk={() => formAdd.validateFields().then(handleAddItem)}
			>
				<RenderForm
					form={formAdd}
					initialValues={defaultValues}
					config={config}
					onFinish={handleAddItem}
				>
					<Button htmlType='submit' className='hidden'></Button>
				</RenderForm>
			</ModalTrigger>

			<ModalTrigger
				title={`编辑${name}`}
				ref={updateRef}
				onOk={() => formAdd.validateFields().then(handleUpdateItem)}
			>
				<RenderForm
					form={formUpdate}
					initialValues={defaultValues}
					config={config}
					onFinish={handleUpdateItem}
				>
					<Button htmlType='submit' className='hidden'></Button>
				</RenderForm>
			</ModalTrigger>
		</div>
	)
}

export default memo(
	withDefaultProps(ConfigList, {
		config: {},
		children: null,
		name: "项",
		value: [],
	})
)
