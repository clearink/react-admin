import React, { useEffect } from "react"
import { Button, Result, Modal, Popconfirm } from "antd"
import classNames from "classnames"
import styles from "./style.module.scss"
import useBoolean from "@/hooks/useBoolean"
import { DoubleLeftOutlined, DoubleRightOutlined } from "@ant-design/icons"
import { Form, Typography } from "antd"
import { selectors, actions } from "@/store/reducers/builder"
import useCacheSelector from "@/hooks/useCacheSelector"
import GetBoundAction from "@/utils/GetBoundAction"
import RenderForm from "@/components/RenderForm"

const boundActions = GetBoundAction(actions)
function Attribute() {
	// TODO 自动根据是否选择打开
	const [collapsed, toggle] = useBoolean()
	const formMeta = useCacheSelector(selectors.selectConfig)
	const [form] = Form.useForm()

	useEffect(() => {
		if (!formMeta) return
		form.setFieldsValue(formMeta.value)
	}, [form, formMeta])


	// 更新组件
	const handleUpdate = (value: any) => {
		if (!formMeta) return
		boundActions.update({
			value,
			id: formMeta.id,
		})
	}

	// 删除该组件
	const handleDelete = () => {
		if (formMeta) boundActions.delete(formMeta.id)
	}
	return (
		<>
			<div
				className={classNames(styles.container, {
					[styles.collapsed]: collapsed,
				})}
			>
				{formMeta ? (
					<>
						<Typography.Title level={4} className='mb-8'>
							配置属性
						</Typography.Title>
						<RenderForm
							initialValues={formMeta.value}
							config={formMeta.config}
							form={form}
							onFinish={handleUpdate}
						>
							<Button block type='primary' htmlType='submit'>
								修改
							</Button>
							<Popconfirm
								title='您将删除该组件'
								cancelText='取消'
								okText='删除'
								okType='danger'
								okButtonProps={{ type: "primary" }}
								onConfirm={handleDelete}
							>
								<Button block danger type='primary' className='mt-8'>
									删除
								</Button>
							</Popconfirm>
						</RenderForm>
					</>
				) : (
					<Result
						status='404'
						title='请选中组件'
						subTitle='选择组件 修改属性'
						className='px-0 py-0 pt-56'
					/>
				)}
			</div>
			{/* trigger */}
			<div
				className={classNames(styles.trigger, {
					[styles.collapsed]: collapsed,
				})}
				onClick={toggle as any}
			>
				{collapsed ? <DoubleLeftOutlined /> : <DoubleRightOutlined />}
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
