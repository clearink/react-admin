import React, {
	Children,
	cloneElement,
	ComponentType,
	ReactElement,
	ReactNode,
	useMemo,
	useState,
} from "react"
import { Steps, Form } from "antd"
import classNames from "classnames"
import { StepProps, StepsProps } from "antd/lib/steps"
import { BaseFormProps } from "../../type"
import StepForm from "./StepForm"
import styles from "./style.module.scss"
import { nanoid } from "@reduxjs/toolkit"
import { FormInstance } from "antd/lib/form"

export const StepsFormContext = React.createContext<
	| {
			current: number
			setCurrent: React.Dispatch<React.SetStateAction<number>>
	  }
	| undefined
>(undefined)

interface StepsFormProps {
	stepsProps?: Omit<StepsProps, "current">
	children?: ReactNode
	form?: FormInstance
	onFinish?: (values: any) => void
}
// 分离
function StepsForm(props: StepsFormProps) {
	const { stepsProps, children, form: PropsForm } = props
	const [form] = Form.useForm(PropsForm)
	// 分离 steps.step 与 form children
	// 这个一定是 要给到 StepForm 的 且不能被外界控制 除非 ref
	const [current, setCurrent] = useState(0)

	const [formChildren, stepsChildren] = useMemo(() => {
		const formChildren: any[] = []
		const stepsChildren: any[] = []
		Children.forEach(
			children as ReactElement<
				BaseFormProps & {
					stepProps: StepProps
				},
				ComponentType<any> & { StepForm?: boolean }
			>[],
			(child, index) => {
				if (!child.type.StepForm) return null
				// 是 StepForm
				const { stepProps } = child.props
				stepsChildren.push(<Steps.Step key={nanoid(8)} {...stepProps} />)
				formChildren.push(cloneElement(child, { key: nanoid(8) }))
			}
		)
		return [formChildren, stepsChildren]
	}, [children])

	return (
		<div className={styles.pro_steps_form}>
			<div className={styles.pro_steps_wrapper}>
				<Steps {...stepsProps} current={current}>
					{stepsChildren}
				</Steps>
			</div>
			<Form.Provider
				onFormFinish={(name, info) => {
					console.log(name, info)
				}}
			>
				<StepsFormContext.Provider value={{ current, setCurrent }}>
					<div className={styles.form_container}>
						{formChildren.map((child, index) => {
							return (
								<div
									className={classNames(styles.step_form, {
										[styles.step_form_active]: index === current,
									})}
									key={child.key}
								>
									{child}
								</div>
							)
						})}
					</div>
				</StepsFormContext.Provider>
			</Form.Provider>
		</div>
	)
}
StepsForm.StepForm = StepForm
export default StepsForm
