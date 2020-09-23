type TMenu = {
	title: string
	path: string
	menu?: TMenu[]
	icon?: ComponentType<any> | string
}
