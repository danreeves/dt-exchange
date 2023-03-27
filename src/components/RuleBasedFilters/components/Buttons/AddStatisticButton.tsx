import { RuleText } from "../RuleText"
import "./AddStatisticButton.css"

type AddStatBtnProps = {
  statRule?: boolean
  onClick: () => void
}
export function AddStatisticButton(props: AddStatBtnProps) {
  return (
    <>
      <div className={"add-stat-wrapper" }>
        <button onClick={props.onClick} type={"button"} className={"add-btn"}>
          <RuleText size={"small"}>
            + Add Statistic...
          </RuleText>
        </button>
      </div>
    </>
  )
}
