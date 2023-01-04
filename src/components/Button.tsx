import type { ReactNode } from "react"
import "./Button.css"

export function Button({
	children,
	active,
	onClick,
}: {
	children: ReactNode
	active?: boolean
	onClick: () => void
}) {
	return (
		<button
			className="my-button"
			style={{
				border: active
					? "1px solid rgb(93, 248, 255)"
					: "1px solid transparent",
			}}
			onClick={onClick}
		>
			<div className="css-163wdz4" />
			<div
				style={{
					fontFamily: "Roboto Mono, monospace",
					color: "white",
					position: "relative",
					zIndex: 1,
					display: "block",
				}}
			>
				{children}
			</div>
			<div className="MuiBox-root css-1f09p60"></div>
			<div className="MuiBox-root css-1h3zxal"></div>
			<div className="MuiBox-root css-180vjhs"></div>
			<div className="MuiBox-root css-11fio0f"></div>
		</button>
	)
}
