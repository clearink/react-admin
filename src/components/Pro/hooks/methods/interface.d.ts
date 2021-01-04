export interface ExtensionReducer<S> {
	[key: string]: (state: S, ...args: any) => S
}

type OmitState<T> = T extends (state: any, ...args: infer P) => any
	? (...args: P) => void
	: never
export type Methods<R extends ExtensionReducer<S>, S> = {
	[K in keyof R]: OmitState<R[K]>
}
