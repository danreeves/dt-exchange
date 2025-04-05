import type { ReactNode } from "react"
import "./Button.css"

export function Button({
	children,
	active,
	onClick,
	icon,
}: {
	children: ReactNode
	active?: boolean
	icon?: ReactNode
	onClick: () => void
}) {
	return (
		<button className="MuiBox-root css-zv7ju9 my-button" onClick={onClick}>
			<div className="MuiBox-root css-79elbk">
				<div className="MuiBox-root css-10krx7t">
					<div className="MuiBox-root css-13sbp68"></div>
					<div className="MuiBox-root css-17xx4p"></div>
				</div>
				<div className="MuiBox-root css-10kv6m9">
					<div className="MuiBox-root css-i7xczt">
						<div className="MuiBox-root css-cqlfri">
							<div className="MuiBox-root css-10xpame"></div>
							<div className="MuiBox-root css-79elbk">
								<div
									className={
										"MuiButtonBase-root " +
										(active ? "css-1mp75t1" : "css-1uukg39")
									}
								>
									{icon}
									<span className="MuiBox-root css-u96qnb">{children}</span>
								</div>
							</div>
						</div>
					</div>
					<div className="MuiBox-root css-ihhcsm"></div>
					<div className="MuiBox-root css-1umimx5"></div>
					<div className="MuiBox-root css-hm90zw"></div>
					<div className="MuiBox-root css-1uhfc3u"></div>
				</div>
			</div>
		</button>
	)
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
