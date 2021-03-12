import { BloodOxyBarProps } from "."
import { valueRange } from "../PressureBar/useBarPercent"

export default function usePercent(
	base: number,
	data: BloodOxyBarProps["data"]
) {
	return data.map((item) => {
		if (base === 0) return 50
		return valueRange(((item.value - base) / base) * 400, -100, 100) + 50
	})
}
