import FieldAvatar from "./components/FieldAvatar"
import FieldDate from "./components/FieldDate"
import FieldDigit from "./components/FieldDigit"
import FieldSelect from "./components/FieldSelect"
import FieldText from "./components/FieldText"

/* 重写 ProField
   将其分开
   为了更好的 ts 提示
   同时也提供原始的ProField 组件支持
*/
export { default as FieldText } from "./components/FieldText"
export { default as FieldAvatar } from "./components/FieldAvatar"
export { default as FieldMoney } from "./components/FieldMoney"
export { default as FieldDigit } from "./components/FieldDigit"
export { default as FieldPercent } from "./components/FieldPercent"
export { default as FieldRate } from "./components/FieldRate"
export { default as FieldSelect } from "./components/FieldSelect"
export { default as FieldCheckbox } from "./components/FieldCheckbox"
export { default as FieldRadio } from "./components/FieldRadio"
export { default as FieldProgress } from "./components/FieldProgress"
export { default as FieldDate } from "./components/FieldDate"
export { default as FieldDateTime } from "./components/FieldDate/FieldDateTime"
export { default as FieldFromNow } from "./components/FieldDate/FieldFromNow"
export { default as FieldTime } from "./components/FieldDate/FieldTime"
export { default as FieldDateRange } from "./components/FieldDate/FieldDateRange"
export { default as FieldDateTimeRange } from "./components/FieldDate/FieldDateTimeRange"
export { default as FieldPassword } from "./components/FieldPassword"
export { default as FieldCode } from "./components/FieldCode"
export { default as FieldJson } from "./components/FieldJson"

export const ProFieldMap = {
	text: FieldText,
	orderNum: FieldText,
	select: FieldSelect,
	digit: FieldDigit,
	date: FieldDate,
	avatar: FieldAvatar,
}
