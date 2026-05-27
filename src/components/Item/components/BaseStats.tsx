import localisation from "../../../localisation"
import { rating } from "../../../icons"
import "./BaseStats.css"
import { Text } from "../../Text"
import type { Personal } from "../../../types"
import type { CSSProperties } from "react"
import { useMemo } from "react"
import { getProjectedBaseStats } from "../utils"

type Props = {
	offer: Personal
}
export function BaseStats({ offer }: Props) {
	let baseStats = offer.description.overrides.base_stats ?? []
	let projectedBaseStats = useMemo(() => getProjectedBaseStats(baseStats), [baseStats])

	return (
		<div className="row">
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
				}}
			>
				<span style={{}}>Modifiers</span>
				<div
					style={{
						display: "flex",
						alignItems: "center",
					}}
				>
					<img
						src={rating}
						style={{
							height: "1em",
						}}
					/>
					{offer.description.overrides.baseItemLevel}
				</div>
			</div>
			<div className="stats">
				{baseStats.map((stat, index) => {
					let value = Math.round(stat.value * 100)
					let projectedValue = Math.max(projectedBaseStats[index] ?? value, value)

					return (
						<div className="stat" key={stat.name}>
							<Text>{localisation[stat.name].display_name}</Text>
							<div className="stat-bar-row">
								<span className="stat-p">{`${value}/${projectedValue}%`}</span>
								<div
									className="stat-bar-outer"
									style={
										{
											"--stat-projected-width": `${projectedValue}%`,
										} as CSSProperties
									}
								>
									<div
										className="stat-bar-inner"
										style={{
											width: `${value}%`,
										}}
									/>
								</div>
							</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}
