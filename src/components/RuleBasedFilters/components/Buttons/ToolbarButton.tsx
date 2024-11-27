import "./ToolbarButton.css"

export type SharedToolbarBtnProps = {
	onClick: () => void
	children?: any
}
export function ToolbarButton(props: SharedToolbarBtnProps) {
	return (
		<>
			<button
				className={"filter-rules-toolbar-btn"}
				onClick={props.onClick}
				type={"button"}
				onMouseDown={(e) => {
					e.preventDefault()
					e.stopPropagation()
				}}
			>
				{props.children}
			</button>
		</>
	)
}
