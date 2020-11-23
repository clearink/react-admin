export interface IBuilderLayout {
	i: string
	x: number
	y: number
	w: number
	h: number
}
export interface IBuilderConfig {
	[key: any]: any
}

export interface IDropItem {
	type: string
	name: string
	config: {
		defaultValues: Object
		configs: Object
	}
}
