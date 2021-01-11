import {
	FieldAvatar,
	FieldCode,
	FieldDate,
	FieldDigit,
	FieldMoney,
	FieldPassword,
	FieldPercent,
	FieldProgress,
	FieldRate,
	FieldText,
	FieldStatus,
} from "../Pro/ProField"
import {
	ProFormCheckbox,
	ProFormDate,
	ProFormDateRange,
	ProFormDateRangeTime,
	ProFormDateTime,
	ProFormInput,
	ProFormNumber,
	ProFormRadio,
	ProFormSelect,
	ProFormTime,
} from "../Pro/ProForm"
import BSAvatar from "./Form/BSAvatar"
import BSTreeSelect from "./Form/BSTreeSelect"
import BSUploadList from "./Form/BSUploadList"

export { BSAvatar }
export { BSTreeSelect }

export { default as AddForm } from "./Form/AddForm"
export { default as EditForm } from "./Form/EditForm"
export { default as Detail } from "./Field/Detail"

export const ProFormMap = {
	text: ProFormInput,
	orderNum: ProFormInput,
	select: ProFormSelect,
	digit: ProFormNumber,
	money: ProFormNumber,
	date: ProFormDate,
	dateTime: ProFormDateTime,
	dateRange: ProFormDateRange,
	time: ProFormTime,
	dateTimeRange: ProFormDateRangeTime,
	checkbox: ProFormCheckbox,
	radio: ProFormRadio,
	avatar: BSAvatar,
	"upload-list": BSUploadList,
	"tree-select": BSTreeSelect,
}

export const ProFieldMap = {
	text: FieldText,
	orderNum: FieldText, // TODO 定义一个组件
	digit: FieldDigit,
	money: FieldMoney,

	select: FieldStatus,
	checkbox: FieldStatus,
	radio: FieldStatus,

	// 不同的timeFormat
	date: FieldDate,
	dateTime: FieldDate,
	dateRange: FieldDate,
	dateTimeRange: FieldDate,
	time: FieldDate,

	avatar: FieldAvatar,

	status: FieldStatus,
	password: FieldPassword,
	code: FieldCode,

	progress: FieldProgress,

	percent: FieldPercent,
	rete: FieldRate,
}
