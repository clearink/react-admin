import { dequal } from "dequal"
import usePreviousValue from "../previous-value"

export default function useDeepEqual<S>(value: S) {
	const previousValue = usePreviousValue(value)
	return dequal(value, previousValue)
}
