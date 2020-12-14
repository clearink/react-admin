import React from "react"
import Avatar from "./components/Avatar"
import Percent from "./components/Percent"
import FieldText from "./components/FieldText"
import FieldMoney from "./components/FieldMoney"
import { FieldType, RenderProps } from "./components/type"
import FieldSecond from "./components/FieldSecond"
import FieldDigit from "./components/FieldDigit"
import FieldRate from "./components/FieldRate"
import FieldSelect from "./components/FieldSelect"
import FieldCheckbox from "./components/FieldCheckbox"
import FieldRadio from "./components/FieldRadio"
import FieldProgress from "./components/FieldProgress"
import FieldDate from "./components/FieldDate"
import FieldFromNow from "./components/FieldFromNow"
import FieldPassword from './components/FieldPassword'


function renderField(
	fieldValue: any,
	filedType: FieldType,
	props: RenderProps
) {
	const { fieldProps, ...rest } = props
	switch (filedType) {
		case "avatar":
			return <Avatar src={fieldValue} {...fieldProps} />
		case "text":
			return <FieldText text={fieldValue} {...rest} fieldProps={fieldProps} />
		case "money":
			return (
				<FieldMoney
					text={fieldValue}
					locale={fieldProps?.locale}
					{...rest}
					fieldProps={fieldProps}
				/>
			)
		case "percent":
			return (
				<Percent
					text={fieldValue}
					{...rest}
					hasColor={fieldProps?.hasColor}
					precision={fieldProps?.precision}
					hasSymbol={fieldProps?.hasSymbol}
					fieldProps={fieldProps}
				/>
			)
		case "number":
			return <FieldDigit text={fieldValue} {...rest} fieldProps={fieldProps} />
		case "second":
			return <FieldSecond text={fieldValue} {...rest} fieldProps={fieldProps} />
		case "rate":
			return <FieldRate text={fieldValue} {...rest} fieldProps={fieldProps} />
		case "select":
			return <FieldSelect text={fieldValue} {...rest} fieldProps={fieldProps} />
		case "checkbox":
			return (
				<FieldCheckbox text={fieldValue} {...rest} fieldProps={fieldProps} />
			)
		case "radio":
			return <FieldRadio text={fieldValue} {...rest} fieldProps={fieldProps} />
		case "radioButton":
			return (
				<FieldRadio
					optionType='button'
					text={fieldValue}
					{...rest}
					fieldProps={fieldProps}
				/>
			)
		case "progress":
			return (
				<FieldProgress text={fieldValue} {...rest} fieldProps={fieldProps} />
			)
		case "date":
			return <FieldDate text={fieldValue} {...rest} fieldProps={fieldProps} />
		case "dateTime":
			return (
				<FieldDate
					showTime
					text={fieldValue}
					{...rest}
					fieldProps={fieldProps}
				/>
			)
		case "fromNow":
			return (
				<FieldFromNow text={fieldValue} {...rest} fieldProps={fieldProps} />
			)
		case "password":
			return (
				<FieldPassword text={fieldValue} {...rest} fieldProps={fieldProps} />
			)
		default:
			return <>{fieldValue}</>
	}
}

export default renderField
