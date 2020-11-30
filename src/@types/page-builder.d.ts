export interface IBuilderConfig {
	[key: string]: any
}

export interface IDropItem {
	type: string
	name: string
	config: {
		defaultValues: Object
		configs: Object
		layout: Object
	}
}
