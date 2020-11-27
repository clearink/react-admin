import React, { isValidElement, useEffect, useMemo } from "react"
import { Button, Result } from "antd"
import classNames from "classnames"
import styles from "./style.module.scss"
import useBoolean from "@/hooks/useBoolean"
import { DoubleLeftOutlined, DoubleRightOutlined } from "@ant-design/icons"
import { Form, Typography } from "antd"
import FormMap from "@/configs/FormMap"
import { selectors, actions } from "@/store/reducers/builder"
import useCacheSelector from "@/hooks/useCacheSelector"
import GetBoundAction from "@/utils/GetBoundAction"
import RenderForm from "@/components/RenderForm"

const boundActions = GetBoundAction(actions)
interface IProps {}
function Attribute(props: IProps) {
	// TODO 自动根据是否选择打开
	const [collapsed, toggle] = useBoolean()
	const formMeta = useCacheSelector(selectors.selectConfig)
	const [form] = Form.useForm()

	useEffect(() => {
		if (!formMeta) return
		form.setFieldsValue(formMeta.value)
	}, [form, formMeta])

	const handleUpdate = (value: any) => {
		if (!formMeta) return
		boundActions.update({
			value,
			id: formMeta.id,
		})
	}
	const handleDelete = () => {
		console.log(formMeta)
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
							<Button
								block
								danger
								type='primary'
								onClick={handleDelete}
								className='mt-8'
							>
								删除
							</Button>
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
