import isEqual from "lodash.isequal"
import { DependencyList, useEffect, useRef } from "react"

/**
 * 有时候不希望props的某个属性影响 effect
 * 可以采用 useRef 欺骗 react
 * 用法:
 * useMemoEffect(()=>{
 * },[],transform)
 * 如何得到 transform的用法呢?
 */
export default function useMemoEffect<T>(
	callback: (...args: any[]) => T,
	deps?: DependencyList,
	...memorizes: any[]
) {
	const memorizeRef = useRef(memorizes)
	useEffect(() => {
		memorizeRef.current = memorizes
	}, [memorizes])
	useEffect(() => {
		callback(...memorizeRef.current)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, deps)
}

// const memoTransform = useRef(transform)
// useEffect(() => {
// 	memoTransform.current = transform
// }, [transform])

// useEffect(() => {
// 	if (data) memoTransform.current?.(data, dispatch, actions)
// }, [data])
