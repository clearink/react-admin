import FieldText from "./components/FieldText"
import FieldRate from "./components/FieldRate"
import FieldProgress from "./components/FieldProgress"
import FieldMoney from "./components/FieldMoney"
import FieldCode from "./components/FieldCode"
import FieldDigit from "./components/FieldDigit"
import FieldPercent from "./components/FieldPercent"
import FieldPassword from "./components/FieldPassword"
import FieldDate from "./components/FieldDate"
import FieldStatus from "./components/FieldStatus"
import FieldAvatar from "./components/FieldAvatar"

/* 重写 ProField
   将其分开
   为了更好的 ts 提示
   同时也提供原始的ProField 组件支持
*/
export { FieldText }
export { FieldAvatar }
export { FieldMoney }
export { FieldDigit }
export { FieldPercent }
export { FieldRate }
export { FieldProgress }
export { FieldDate }
export { FieldPassword }
export { FieldCode }

// key 根据 proForm 定义
/**
 * export const formItemMap = {
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
	avatar: ProFormAvatar,
}

 */
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
