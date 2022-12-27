import type { ReactNode } from "react"
import { css } from "./css"
import { creditsImg, ratingIcon } from "./img"
import { Loading } from "./Loading"
import { Text } from "./Text"
import type { Character } from "./types"
import { useMasterList } from "./useMasterList"
import { useStore } from "./useStore"

css`
	.item-title {
		margin-bottom: .5em;
	}

  .info-item {
    display: flex;
    align-items: center;
    margin: 0.25em;
    margin-right: 0.75em;
    text-transform: capitalize;
  }
  .info-item img {
    height: 3em;
    float: left;
	padding: .2em;
  }
  .stats {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    grid-column-gap: 1em;
    grid-row-gap: 1em;
  }
  .stat {
  }
  .stat-name {
    color: rgb(189, 189, 189);
  }
  .stat-bar-row {
    display: flex;
    align-items: center;
  }
  .stat-p {
    margin-right: 0.5em;
  }
  .stat-bar-outer {
    width: 100%;
    height: 0.7em;
    border: 1px solid yellow;
    padding: 1px;
  }
  .stat-bar-inner {
    position: relative;
    background: yellow;
    height: 100%;
  }
`

function Divider() {
	return <hr className="MuiDivider-root MuiDivider-fullWidth css-pj146d" />
}

function Title({ children }: { children: ReactNode }) {
	return (
		<div className="item-title">
			{children}
		</div>
	)
}

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
					console.log(offer)
					return (
						<div className="MuiBox-root css-178yklu" key={offer.offerId}>
							<Title>{items![offer.description.id]?.display_name}</Title>
							<div style={{ display: "flex" }}>
								<div>
									<div className="info-item">
										<img src={ratingIcon} style={{}} />
										<div>
											<Text>Rating</Text>
											{offer.description.overrides.itemLevel}
										</div>
									</div>
									<div className="info-item">
										<img src={creditsImg} />
										<div>
											<Text>{offer.price.amount.type}</Text>
											{offer.price.amount.amount}
										</div>
									</div>
								</div>
								<div>
									<div className="stats">
										{offer.description.overrides.base_stats?.map((stat) => {
											return (
												<div className="stat">
													<Text>{stat.name}</Text>
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
								</div>
							</div>
							<details>
								<summary className="MuiFormHelperText-root MuiFormHelperText-sizeMedium css-13fvtaj">
									Description
								</summary>
								<Text>{items![offer.description.id]?.description}</Text>
								<Text>{items![offer.description.id]?.dev_name}</Text>
								<Text>{items![offer.description.id]?.dev_description}</Text>
							</details>
							<Divider />
						</div>
					)
				})}
		</>
	)
}
