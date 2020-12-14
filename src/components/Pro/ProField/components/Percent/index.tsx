import React, {
	forwardRef,
	memo,
	ReactNode,
	Ref,
	useImperativeHandle,
	useMemo,
	useRef,
} from "react"
import withDefaultProps from "@/hocs/withDefaultProps"
import classNames from "classnames"
import { InputNumber } from "antd"
import { getPrecisionNumber, getSymbol, toNumber } from "./utils"
import { removeSeparator } from "@/utils/regExp"
import "./style.scss"
import { ProFieldProps } from "../type"

interface IProps extends ProFieldProps {
	text: string | number
	prefix?: ReactNode
	precision: number
	suffix: ReactNode
	hasColor: boolean
	hasSymbol: boolean
}
/**
 * 百分比
 */
function FieldPercent(props: IProps, ref: Ref<any>) {
	const { text, mode, render, renderFormItem, fieldProps, ...rest } = props
	const { suffix, prefix, hasSymbol, precision, hasColor } = rest
	const inputRef = useRef()

	useImperativeHandle(ref, () => inputRef.current ?? {}, [])

	const numberValue = useMemo(() => toNumber(removeSeparator(text, "%")), [
		text,
	])

	if (mode === "read") {
		// 格式化成百分比
		const dom = (
			<span
				className={classNames({
					"pro_filed__percent--default": !hasColor,
					"pro_filed__percent--color1": numberValue > 0,
					"pro_filed__percent--color2": numberValue < 0,
				})}
			>
				{prefix && <span>{prefix}</span>}
				{hasSymbol && (
					<span className='pro_field__percent--symbol	'>
						{getSymbol(numberValue)}
					</span>
				)}
				{getPrecisionNumber(Math.abs(numberValue), precision)}
				{suffix && <span>{suffix}</span>}
			</span>
		)
		if (render) return render(text, { mode, ...fieldProps, ...rest }, dom)
		return dom
	}
	// 渲染 form
	const formDom = (
		<InputNumber ref={inputRef} placeholder='请输入' {...fieldProps} />
	)
	if (renderFormItem)
		return renderFormItem(text, { mode, ...fieldProps }, formDom)
	return formDom
}

export default memo(
	withDefaultProps(forwardRef(FieldPercent), {
		hasColor: false,
		mode: "read",
		hasSymbol: true,
		suffix: "%",
		precision: 2,
	})
)
