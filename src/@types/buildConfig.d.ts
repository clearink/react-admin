export interface ObjectAny {
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

// 基础组件配置
export interface IConfigItem {
	type: string
	name: string
	cover: string // 封面图
	config: ObjectAny
}

export interface TBuilderItem {
	position: ReactGridLayout.Layout
	config: ObjectAny
	value: ObjectAny
	type: string
	id: string
}
