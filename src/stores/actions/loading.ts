import { LOADING, COMPLETE } from "../actionTypes"

export const LoadStart = () => {
	return {
		type: LOADING,
	}
}
export const LoadEnd = () => {
	return {
		type: COMPLETE,
	}
}
