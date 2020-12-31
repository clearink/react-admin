import ProFormAvatar from "./components/ProFormUpload"
import ProFormCaptcha from "./components/ProFormCaptcha"
import ProFormCheckbox from "./components/ProFormCheckbox"
import ProFormRadio from "./components/ProFormRadio"
import ProFormSelect from "./components/ProFormSelect"
import ProFormInput from "./components/ProFormInput"
import ProFormNumber from "./components/ProFormNumber"
import ProFormDate from "./components/ProFormDate"
import ProFormDateTime from "./components/ProFormDate/ProFormDateTime"
import ProFormDateRange from "./components/ProFormDate/ProFormDateRange"
import ProFormTime from "./components/ProFormDate/ProFormTime"
import ProFormDateRangeTime from "./components/ProFormDate/ProFormDateRangeTime"
import ProFormTextArea from "./components/ProFormTextArea"

export { ProFormInput }
export { ProFormCaptcha }
export { ProFormSelect }
export { ProFormCheckbox }
export { ProFormRadio }
export { ProFormAvatar }
export { ProFormTextArea }

// form type
export { default as StepsForm } from "./components/StepsForm"
export { default as QueryFilter } from "./components/QueryFilter"
export { default as ProForm } from "./components/BaseForm"

export const formItemMap = {
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
