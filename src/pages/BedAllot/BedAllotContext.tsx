import { createContext } from "react"
export default createContext<{
	buildingId?: string | number | null
	updateRoomTree?: () => void
}>({})
