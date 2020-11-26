export interface IConfigList {
	name: string
	hidden?: boolean
	default?: any
	type?: string
	value: {
		[key: string]: {
			name: string
			hidden?: boolean
			default?: any
			type?: string
		}
	}
}
