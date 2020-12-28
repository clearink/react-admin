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
import { BaseProFieldProps } from "../../type"
import classNames from "classnames"
import { InputNumberProps } from "antd/lib/input-number"
import { InputNumber } from "antd"
import { getPrecisionNumber, getSymbol, toNumber } from "./utils"
import { removeSeparator } from "@/utils/formatValues"
import "./style.scss"

// 去除 min 和 max
interface FieldPercentProps
	extends BaseProFieldProps,
		Omit<InputNumberProps, "max" | "min"> {
	suffix?: React.ReactNode
	prefix?: React.ReactNode | any
	hasSymbol?: boolean // 是否有符号
	hasColor?: boolean
	value: number
}

function FieldPercent(props: FieldPercentProps, ref: Ref<any>) {
	const {
		value,
		mode,
		render,
		renderFormItem,
		suffix,
		prefix,
		hasSymbol,
		precision,
		hasColor,
		...rest
	} = props
	const inputRef = useRef()

	useImperativeHandle(ref, () => inputRef.current ?? {}, [])

	const numberValue = useMemo(() => toNumber(removeSeparator(value, "%")), [
		value,
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
				{getPrecisionNumber(
					hasSymbol ? Math.abs(numberValue) : numberValue,
					precision
				)}
				{suffix && <span>{suffix}</span>}
			</span>
		)
		if (render) return render(value, { mode, ...rest }, dom)
		return dom
	}
	// 渲染 form
	const formDom = (
		<InputNumber {...rest} value={value} ref={inputRef} placeholder='请输入' />
	)
	if (renderFormItem) return renderFormItem(value, { mode }, formDom)
	return formDom
}

export default memo(
	withDefaultProps(forwardRef(FieldPercent), {
		hasColor: true,
		mode: "read",
		hasSymbol: true,
		suffix: "%",
		precision: 2,
		min: 0,
		max: 100,
		width: 120,
	})
)
