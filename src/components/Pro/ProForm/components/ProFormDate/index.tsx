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

export const ProFormDate = withFormItem<FieldDateProps>(FieldDate)

export const ProFormDateTime = withFormItem<FieldDateTimeProps>(FieldDateTime)

export const ProFormDateRange = withFormItem<FieldDateRangeProps>(
	FieldDateRange
)

// time picker
export const ProFormTime = withFormItem<FieldTimeProps>(FieldTime)

// from now
export const ProFormFromNow = withFormItem<FieldFormNowProps>(FieldFromNow)

// range picker
export const ProFormDateTimeRange = withFormItem<FieldDateTimeRangeProps>(
	FieldDateTimeRange
)
