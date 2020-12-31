import { dequal } from "dequal"
import usePrevious from "./usePrevious"
export default function useDeepEqual<T>(value: T) {
	const previousValue = usePrevious(value)
	return dequal(value, previousValue)
}
