import { createContext } from "react"
export interface createContextProps {
	buildingId: number | string
}
export default createContext<number | string | undefined>(undefined)
