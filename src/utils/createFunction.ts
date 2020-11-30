export default function createFunction(funcStr: string) {
	// eslint-disable-next-line no-new-func
	return new Function(`"use strict";return ${funcStr}`)()
}
