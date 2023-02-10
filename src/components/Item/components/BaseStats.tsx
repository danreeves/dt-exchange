import localisation from "../../../localisation.json"
import "./BaseStats.css"
import { Text } from "../../Text"

export function BaseStats({ rating, offer }) {
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
                    style={{
                      width: `${stat.value * 100}%`,
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
