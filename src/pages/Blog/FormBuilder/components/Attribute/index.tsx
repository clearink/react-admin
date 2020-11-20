import React, { useEffect, useMemo } from "react"
import { Result } from "antd"
import classNames from "classnames"
import styles from "./style.module.scss"
import useBoolean from "@/hooks/useBoolean"
import { DoubleLeftOutlined, DoubleRightOutlined } from "@ant-design/icons"
import useTypedSelector from "@/hooks/useTypedSelector"
import { Form, useForm } from "@/components/Form"
import componentMap from "@/configs/componentMap"
interface IProps {}
function Attribute(props: IProps) {
	// TODO 自动根据是否选择打开
	const [collapsed, toggle] = useBoolean()
	const { selectId, builderList } = useTypedSelector((state) => state.builder)

	const formMeta = useMemo(
		() => builderList.find((item) => item.id === selectId),
		[selectId, builderList]
	)
	const form = useForm()

	useEffect(() => {
		if (formMeta) {
			Object.entries(formMeta.value).map(([k, v]) => {
				form.setValue(k, v)
			})
		}
	}, [formMeta, form])

	return (
		<>
			<div
				className={classNames(styles.container, {
					[styles.collapsed]: collapsed,
				})}
			>
				{selectId && formMeta ? (
					<Form
						form={form}
						onSubmit={(v) => {
							console.log(v)
						}}
					>
						{Object.entries(formMeta?.config).map(([name, value]) => {
							console.log(value)
							const FormComponent = componentMap[value.type]
							return (
								<Form.Item
									key={name}
									name={name}
									label={value.name}
									//	defaultValue={value.default}
								>
									<FormComponent />
								</Form.Item>
							)
						})}
					</Form>
				) : (
					<Result
						status='404'
						title='请选中组件'
						subTitle='选择组件 修改属性'
						className='pt-56'
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
