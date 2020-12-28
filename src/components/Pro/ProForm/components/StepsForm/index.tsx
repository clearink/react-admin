import React, {
	Children,
	cloneElement,
	ReactNode,
	useCallback,
	useMemo,
	useState,
} from "react"
import { Steps, Form, Button, Space } from "antd"
import classNames from "classnames"
import { StepsProps } from "antd/lib/steps"
import { BaseFormProps } from "../../type"
import StepForm, { StepFormComponentType } from "./StepForm"
import styles from "./style.module.scss"
import { FormProviderProps } from "antd/lib/form/context"

export const StepsFormContext = React.createContext<() => void>(() => {})

// 如何解决 最后一次提交的bug
interface StepsFormProps extends Omit<StepsProps, "current"> {
	children?: ReactNode
	onFinish?: (values: any) => void // 目前仅提供一个 onFinish 函数
	containFormName?: boolean // 最后的值是否包含form name
	render?: (dom: JSX.Element) => JSX.Element
}
function StepsForm(props: StepsFormProps) {
	const { children, onFinish, containFormName, render, ...rest } = props

	// 不能被外界控制 除非 ref
	const [current, setCurrent] = useState(0)

	const childCount = useMemo(() => Children.count(children), [children])
	const [formChildren, stepsChildren] = useMemo(() => {
		const formChildren: any[] = []
		const stepsChildren: any[] = []
		// const submitterChildren: React.ReactNode[] = []
		Children.forEach(children as StepFormComponentType[], (child, index) => {
			if (!child.type.StepForm) return null
			const { stepProps, name } = child.props
			stepsChildren.push(<Steps.Step key={name ?? index} {...stepProps} />)
			const isFirst = index === 0
			const isLast = index === childCount - 1

			const submitter: BaseFormProps["submitConfig"] = {
				submitProps: { text: isLast ? undefined : "下一步" },
				render: (dom) => {
					if (isFirst) return dom.pop()
					return (
						<Space>
							<Button onClick={() => setCurrent((p) => p - 1)}>上一步</Button>
							{dom.pop()}
						</Space>
					)
				},
			}
			// submitterChildren.push(submitter)
			formChildren.push(
				cloneElement(child, {
					key: name ?? index,
					submitConfig: submitter,
				})
			) // 处理 submitter
		})
		return [formChildren, stepsChildren]
	}, [children, childCount])

	// 封装一个函数 用于处理 next step
	const handleNextStep = useCallback(() => {
		if (current < childCount - 1) {
			setCurrent((p) => p + 1)
		}
	}, [childCount, current])

	const handleFormFinish: FormProviderProps["onFormFinish"] = (
		name,
		{ forms }
	) => {
		// 如果时最后一个form 调用onFinish
		// 如何判断是否是最后一个 form呢?
		const formNames = Object.keys(forms)
		if (
			name === formNames[formNames.length - 1] &&
			typeof onFinish === "function"
		) {
			let allValues = {}
			for (const k of formNames) {
				const v = forms[k]
				if (containFormName)
					allValues[k] = Object.assign(allValues[k] ?? {}, v.getFieldsValue())
				else allValues = Object.assign(allValues, v.getFieldsValue())
			}
			onFinish(allValues)
		}
	}
	const dom = (
		<div className={styles.pro_steps_form}>
			<div className={styles.pro_steps_wrapper}>
				<Steps {...rest} current={current}>
					{stepsChildren}
				</Steps>
			</div>
			<Form.Provider onFormFinish={handleFormFinish}>
				<StepsFormContext.Provider value={handleNextStep}>
					<div className={styles.form_container}>
						{formChildren.map((child, index) => {
							return (
								<div
									key={child.key}
									className={classNames(styles.step_form, {
										[styles.step_form_active]: index === current,
									})}
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
	if (render) return render(dom)
	return dom
}
StepsForm.StepForm = StepForm
export default StepsForm
