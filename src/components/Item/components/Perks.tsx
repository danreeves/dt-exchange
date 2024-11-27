import { raritySymbol } from "../consts"
import localisation from "../../../localisation"
import { Text } from "../../Text"
import { rating } from "../../../icons"
import type { Items, Personal } from "../../../types"
import "./Perks.css"
import { getPerkDescription } from "../utils"

type Props = {
	offer: Personal
	items: Items
}
export function Perks({ offer, items }: Props) {
	return (
		<div className="row">
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					flex: 1,
				}}
			>
				<span style={{}}>Perks</span>
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
					{offer.description.overrides.perks.reduce((sum, perk) => {
						sum += 10 + (perk.rarity - 1) * 5
						return sum
					}, 0)}
				</div>
			</div>
			<div>
				{offer.description.overrides.perks.map((perk) => {
					const description = getPerkDescription(perk, items)
					return (
						<div className="perk" key={perk.id + perk.rarity}>
							<div className="perk-rarity">{raritySymbol[perk.rarity]}</div>
							<Text>{description}</Text>
						</div>
					)
				})}
			</div>
		</div>
	)
}
