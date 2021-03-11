import React, {
	PropsWithChildren,
	useCallback,
	useEffect,
	useState,
} from "react"
import PageHeaderWrap from "@/components/PageHeaderWrap"
import { useCount } from "./count-context"

function Logger(props: any) {
	console.log(`${props.label} rendered`)
	return null // what is returned here is irrelevant...
}
function Counter(props: any) {
	const [count, setCount] = React.useState(0)
	const increment = () => setCount((c) => c + 1)
	return (
		<div>
			<button onClick={increment}>The count is {count}</button>
			{props.children}
		</div>
	)
}

function WorkPlace() {
	return (
		<div className='dashboard_page__wrap h-full flex flex-col '>
			<PageHeaderWrap ghost={false} title='工作台' subTitle='hhhh' />
			<main className='p-10 pb-0 flex-auto m-10 '>
				<Counter>
					<Logger label='counter' />
				</Counter>
			</main>
		</div>
	)
}

export default WorkPlace
