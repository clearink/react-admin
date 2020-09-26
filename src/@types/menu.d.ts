import { IRoute } from "./route"
export type TMenu = Pick<
	IRoute,
	"title" | "icon" | "path" | "key" | "routes" | "hide"
>
