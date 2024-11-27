import type { ReactNode } from "react"
import "./ItemState.css"

type Props = {
	children: ReactNode
}

export function ItemState({ children }: Props) {
	return (
		<div className="item-state">
			<div className="item-state-inner">{children}</div>
		</div>
	)
}
