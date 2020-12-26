import ProFormAvatar from "./components/ProFormAvatar"
import ProFormCaptcha from "./components/ProFormCaptcha"
import ProFormCheckbox from "./components/ProFormCheckbox"
import {
	ProFormDate,
	ProFormDateRange,
	ProFormDateTime,
	ProFormDateTimeRange,
	ProFormFromNow,
	ProFormTime,
} from "./components/ProFormDate"
import ProFormDight from "./components/ProFormDight"
import ProFormMoney from "./components/ProFormMoney"
import ProFormRadio from "./components/ProFormRadio"
import ProFormSelect from "./components/ProFormSelect"
import ProFormText from "./components/ProFormText"

export { ProFormText }
export { ProFormCaptcha }
export { ProFormSelect }
export { ProFormCheckbox }
export { ProFormRadio }
export { ProFormDight }
export { ProFormAvatar }
export { ProFormMoney }

// form type
export { default as StepsForm } from "./components/StepsForm"
export { default as QueryFilter } from "./components/QueryFilter"
export { default as ProForm } from "./components/BaseForm"
export * from "./components/ProFormDate"

export const formItemMap = {
	text: ProFormText,
	orderNum: ProFormText,
	select: ProFormSelect,
	digit: ProFormDight,
	money: ProFormMoney,
	date: ProFormDate,
	dateTime: ProFormDateTime,
	dateRange: ProFormDateRange,
	time: ProFormTime,
	fromNow: ProFormFromNow,
	dateTimeRange: ProFormDateTimeRange,
	checkbox: ProFormCheckbox,
	radio: ProFormRadio,
	avatar: ProFormAvatar,
}
