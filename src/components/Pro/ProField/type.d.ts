export type FieldOptionType = { label: string; value: any }
export type ProFieldRender<T> = (
	props: Omit<T, "render">,
	dom: JSX.Element
) => JSX.Element
interface FieldStyleProps {
	style?: React.CSSProperties
	className?: string
}
export interface BaseProFieldProps<T> extends FieldStyleProps {
	text?: any
	render?: (props: Omit<T, "render">, dom: JSX.Element) => JSX.Element
}
export interface BaseFieldSelectProps {
	/**  color array */
	statusList?: string[]
}
