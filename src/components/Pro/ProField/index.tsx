import FieldAvatar from "./components/FieldAvatar"
import FieldCheckbox from "./components/FieldCheckbox"
import FieldCode from "./components/FieldCode"
import FieldDate from "./components/FieldDate"
import FieldDateRange from "./components/FieldDate/FieldDateRange"
import FieldDateTime from "./components/FieldDate/FieldDateTime"
import FieldDateTimeRange from "./components/FieldDate/FieldDateTimeRange"
import FieldFromNow from "./components/FieldDate/FieldFromNow"
import FieldTime from "./components/FieldDate/FieldTime"
import FieldDigit from "./components/FieldDigit"
import FieldJson from "./components/FieldJson"
import FieldMoney from "./components/FieldMoney"
import FieldPassword from "./components/FieldPassword"
import FieldPercent from "./components/FieldPercent"
import FieldProgress from "./components/FieldProgress"
import FieldRadio from "./components/FieldRadio"
import FieldRate from "./components/FieldRate"
import FieldSelect from "./components/FieldSelect"
import FieldText from "./components/FieldText"

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
export { FieldSelect }
export { FieldCheckbox }
export { FieldRadio }
export { FieldProgress }
export { FieldDate }
export { FieldTime }
export { FieldDateTime }
export { FieldFromNow }
export { FieldDateRange }
export { FieldDateTimeRange }
export { FieldPassword }
export { FieldCode }
export { FieldJson }

export const ProFieldMap = {
	text: FieldText,
	orderNum: FieldText,
	digit: FieldDigit,
	avatar: FieldAvatar,

	password: FieldPassword,
	code: FieldCode,
	json: FieldJson,

	select: FieldSelect,
	checkbox: FieldCheckbox,
	radio: FieldRadio,
	progress: FieldProgress,

	date: FieldDate,
	time: FieldTime,
	dateTime: FieldDateTime,
	dateRange: FieldDateRange,
	dateTimeRange: FieldDateTimeRange,
	fromNow: FieldFromNow,

	money: FieldMoney,
	percent: FieldPercent,
	rete: FieldRate,
}
