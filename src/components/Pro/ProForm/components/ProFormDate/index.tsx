import withFormItem from "@/components/Pro/hocs/withFormItem"
import {
	FieldDate,
	FieldDateRange,
	FieldDateTime,
	FieldDateTimeRange,
	FieldFromNow,
	FieldTime,
} from "@/components/Pro/ProField"
import { FieldDateProps } from "@/components/Pro/ProField/components/FieldDate"
import { FieldDateRangeProps } from "@/components/Pro/ProField/components/FieldDate/FieldDateRange"
import { FieldDateTimeProps } from "@/components/Pro/ProField/components/FieldDate/FieldDateTime"
import { FieldDateTimeRangeProps } from "@/components/Pro/ProField/components/FieldDate/FieldDateTimeRange"
import { FieldFormNowProps } from "@/components/Pro/ProField/components/FieldDate/FieldFromNow"
import { FieldTimeProps } from "@/components/Pro/ProField/components/FieldDate/FieldTime"

export const ProFormDate = withFormItem<FieldDateProps>(FieldDate, {
	style: { width: "100%" },
})

export const ProFormDateTime = withFormItem<FieldDateTimeProps>(FieldDateTime, {
	style: { width: "100%" },
})

export const ProFormDateRange = withFormItem<FieldDateRangeProps>(
	FieldDateRange,
	{
		style: { width: "100%" },
	}
)

// time picker
export const ProFormTime = withFormItem<FieldTimeProps>(FieldTime, {
	style: { width: "100%" },
})

// from now
export const ProFormFromNow = withFormItem<FieldFormNowProps>(FieldFromNow, {
	style: { width: "100%" },
})

// range picker
export const ProFormDateTimeRange = withFormItem<FieldDateTimeRangeProps>(
	FieldDateTimeRange,
	{
		style: { width: "100%" },
	}
)
