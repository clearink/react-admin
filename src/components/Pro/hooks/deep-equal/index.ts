import { dequal } from "dequal"
import usePreviousValue from "../previous-value"

/** 注意 初始值为null肯会有影响 */
export default function useDeepEqual<S>(value: S) {
	const previousValue = usePreviousValue(value)
	return dequal(value, previousValue)
}
