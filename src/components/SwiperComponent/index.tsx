import React, { ReactNode, PropsWithChildren } from "react"
import { motion as m, AnimatePresence } from "framer-motion"
interface IProps {
	children: ReactNode
}
function SwiperComponent(props: IProps) {
	const { children } = props
	return <AnimatePresence>
    
  </AnimatePresence>
}

export default SwiperComponent
