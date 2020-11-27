import React, {
	createContext,
	memo,
	ReactNode,
	Ref,
	useMemo,
	useRef,
	useState,
} from "react"
import { Button, Form } from "antd"
import { PlusOutlined } from "@ant-design/icons"
import ModalTrigger, { IModalTriggerRef } from "../ModalTrigger"
import withDefaultProps from "@/hocs/withDefaultProps"
import RenderForm from "../RenderForm"
import styles from "./style.module.scss"
import ListItem from "./ListItem"
import { nanoid } from "@reduxjs/toolkit"
import FilterValue from "@/utils/FilterValue"

export const ConfigListContext = createContext<any>(null)
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

	const [updateId, setUpdateId] = useState<number | string | null>(null)
	const [formAdd] = Form.useForm()
	const [formUpdate] = Form.useForm()

	// 新增数据
	const handleAddItem = (values: any) => {
		onChange(value.concat({ id: nanoid(8), ...values }))
		addRef.current?.toggle()
		formAdd.resetFields()
	}
	// 编辑
	const handleUpdateItem = (values: Object) => {
		console.log("编辑", values)
		if (updateId === null) return
		onChange(
			value.reduce((pre, cur) => {
				if (cur.id === updateId) return pre.concat({ ...values, id: updateId })
				return pre.concat(cur)
			}, [])
		)
		setUpdateId(null)
		updateRef.current?.toggle()
	}
	// 删除
	const handleDeleteItem = (id: string | number) => {
		onChange(value.filter((item) => item.id !== id))
	}

	// 打开 formUpdate
	const handleStartUpdate = (item: { id: string | number }) => {
		updateRef.current?.toggle()
		setUpdateId(item.id)
		formUpdate.setFieldsValue(item)
	}
	return (
		<ConfigListContext.Provider
			value={{
				handleStartUpdate: handleStartUpdate,
				handleDelete: handleDeleteItem,
			}}
		>
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
						labelCol={{ span: 4 }}
						initialValues={defaultValues}
						config={config}
						onFinish={handleAddItem}
					>
						<Button hidden htmlType='submit'></Button>
					</RenderForm>
				</ModalTrigger>

				<ModalTrigger
					title={`编辑${name}`}
					ref={updateRef}
					onOk={() => formUpdate.validateFields().then(handleUpdateItem)}
				>
					<RenderForm
						form={formUpdate}
						labelCol={{ span: 4 }}
						config={config}
						onFinish={handleUpdateItem}
					>
						<Button htmlType='submit' hidden></Button>
					</RenderForm>
				</ModalTrigger>
			</div>
		</ConfigListContext.Provider>
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
