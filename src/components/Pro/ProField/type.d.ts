export interface BaseFieldRenderProps {
	render?: (props: {}, dom: React.ReactNode) => JSX.Element
	/** value 可以不要吧 */
}

export type FieldOptionType = { label: string; value: any }

export interface BaseProFieldProps<T> {
	text?: any
	render?: (props: Omit<T, "render">, dom: JSX.Element) => JSX.Element
}
export interface BaseFieldSelectProps {
	/**  color array */
	fieldEnum?: string[]
}
