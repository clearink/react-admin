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

export const ProFieldMap = {
	text: FieldText,
	orderNum: FieldText,

	digit: FieldDigit,

	avatar: FieldAvatar,

	password: FieldPassword,
	code: FieldCode,

	status: FieldStatus,
	progress: FieldProgress,

	date: FieldDate,

	money: FieldMoney,
	percent: FieldPercent,
	rete: FieldRate,
}
