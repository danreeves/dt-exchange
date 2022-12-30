import type { ReactNode } from "react"
import { credits, rating } from "../icons"
import { Loading } from "./Loading"
import { Text } from "./Text"
import type { Character } from "../types"
import { useMasterList } from "../hooks/useMasterList"
import { useStore } from "../hooks/useStore"
import localisation from "../localisation.json"
import "./Store.css"

function Divider() {
	return <hr className="MuiDivider-root MuiDivider-fullWidth css-pj146d" />
}

function Title({ children }: { children: ReactNode }) {
	return <div className="item-title">{children}</div>
}

const ratingColor = {
	1: 'grey', // grey
	2: "#36AE7C", // green
	3: '#3AB0FF', // blue
	4: '#FFB200', // orange
	5: 'red', // red?
} as const

const raritySymbol = {
	1: "Ⅰ",
	2: "Ⅱ",
	3: "Ⅲ",
	4: "Ⅳ",
	5: "Ⅴ",
} as const

const traitRarityToRating = {
	1: 25,
	2: 35,
	3: 45,
	4: 55,
	5: 65
} as const

export function Store({ character }: { character?: Character }) {
	let store = useStore(character)
	let items = useMasterList()

	if (!store || !items) {
		return <Loading />
	}

	return (
		<>
			{store.personal
				.sort((a, b) => {
					if (
						b.description.overrides.rarity === a.description.overrides.rarity
					) {
						return (
							b.description.overrides.itemLevel -
							a.description.overrides.itemLevel
						)
					}
					return b.description.overrides.rarity - a.description.overrides.rarity
				})
				.map((offer) => {
					// console.log(offer)

					return (
						<div className="MuiBox-root css-178yklu" key={offer.offerId} id="offer">
							<Title>{localisation[offer.description.id].display_name}</Title>

							{offer.state === "completed" ? <Text>Owned</Text> : null}

							{/* <details> */}
							{/* 	<summary className="MuiFormHelperText-root MuiFormHelperText-sizeMedium css-13fvtaj"> */}
							{/* 		Description */}
							{/* 	</summary> */}
							{/* 	<Text>{items![offer.description.id]?.description}</Text> */}
							{/* 	<Text>{items![offer.description.id]?.dev_name}</Text> */}
							{/* 	<Text>{items![offer.description.id]?.dev_description}</Text> */}
							{/* </details> */}

							<div style={{ display: "flex" }}>
								<div className="info-items">
									<div className="info-item" style={{ color: ratingColor[offer.description.overrides.rarity] }}>
										<img src={rating} style={{}} />
										<div>
											<Text>Rating</Text>
											<div id="rating">{offer.description.overrides.itemLevel}</div>
										</div>
									</div>
									<div className="info-item">
										<img src={credits} />
										<div>
											<Text>{offer.price.amount.type}</Text>
											<span style={{ color: 'gold' }} id="credits">{offer.price.amount.amount}</span>
										</div>
									</div>
								</div>

								<div style={{ flex: 1 }}>
									{offer.description.overrides.base_stats ? (<div className="row">
										<div style={{
											display: 'flex', alignItems: 'center',
											justifyContent: 'space-between'
										}}>
											<span style={{}}>Modifiers</span>
											<div style={{ display: 'flex', alignItems: 'center' }} id="modifier_total">
												<img src={rating} style={{ height: '1em' }} />
												{offer.description.overrides.base_stats?.reduce((sum, stat) => {
													return Math.round(sum + (stat.value * 100))
												}, 0)}
											</div>
										</div>
										<div className="stats">
											{offer.description.overrides.base_stats?.map((stat) => {
												return (
													<div className="stat" key={stat.name}>
														<Text>{localisation[stat.name]}</Text>
														<div className="stat-bar-row">
															<span className="stat-p">{`${Math.round(
																stat.value * 100
															)}%`}</span>
															<div className="stat-bar-outer">
																<div
																	className="stat-bar-inner"
																	style={{ width: `${stat.value * 100}%` }}
																/>
															</div>
														</div>
													</div>
												)
											})}
										</div>
									</div>) : null}

									{offer.description.overrides.perks.length > 0 ? (
										<div className="row">
											<div style={{
												display: 'flex', alignItems: 'center',
												justifyContent: 'space-between',
												flex: 1,
											}}>
												<span style={{}}>Perks</span>
												<div style={{ display: 'flex', alignItems: 'center' }} id="perk_total">
													<img src={rating} style={{ height: '1em' }} />
													{offer.description.overrides.perks.reduce((sum, perk) => {
														sum += 10 + ((perk.rarity - 1) * 5)
														return sum
													}, 0)}
												</div>
											</div>
											<div className="perks" id="perks">
												{offer.description.overrides.perks.map(perk => {
													let desc = localisation[perk.id].description
													let descVal = items![perk.id]?.description_values.find(v => v.rarity === perk.rarity.toString())
													let replace = `{${descVal?.string_key}:%s}`
													let description = desc?.replace(replace, descVal?.string_value ?? '')
													return <div className="perk" key={perk.id + perk.rarity} id="perk">
														<div className="perk-rarity">
															{raritySymbol[perk.rarity]}
														</div>
														<Text>
															{description}
														</Text>
													</div>
												})}
											</div>
										</div>) : null}

									{offer.description.overrides.traits.length > 0 ? (
										<div className="row">
											<div style={{
												display: 'flex', alignItems: 'center',
												justifyContent: 'space-between',
												flex: 1,
											}}>
												<span style={{}}>Blessings</span>
												<div style={{ display: 'flex', alignItems: 'center' }} id="blessing_total">
													<img src={rating} style={{ height: '1em' }} />
													{offer.description.overrides.traits.reduce((sum, trait) => {
														if (trait.value) {
															sum += Math.round((trait.value) * 100)
														} else {
															sum += traitRarityToRating[trait?.rarity]
														}
														return sum
													}, 0)}
												</div>
											</div>

											<div className="perks" id="blessings">
												{offer.description.overrides.traits.map(trait => {
													let { description: desc, display_name } = localisation[trait.id]
													let descVals = items![trait.id]?.description_values.filter(v => v.rarity === trait.rarity.toString())
													let description = descVals?.length ?
														descVals.reduce((str, descVal) => {
															let replace = `{${descVal?.string_key}:%s}`
															str = str.replace(replace, descVal?.string_value ?? '')
															return str
														}, desc) : desc

													return <div className="perk" key={trait.id + trait.rarity} id="blessing">
														<div className="perk-rarity">
															{raritySymbol[trait.rarity]}
														</div>
														<Text>
															{`${display_name}: ${description}`}
														</Text>
													</div>
												})}
											</div>
										</div>) : null}

								</div>
							</div>

							<Divider />
						</div>
					)
				})}
		</>
	)
}
