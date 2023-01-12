import { RuleText } from "../RuleText"
import { Size } from "../../../../types"
import "./AddRuleButton.css"

export type AddRuleBtnProps = {
  onClick: () => void
}
export function AddRuleButton(props: AddRuleBtnProps) {
  return (
    <>
      <div className={"add-btn-wrapper"}>
        <button onClick={props.onClick} type={"button"} className={"add-btn"}>
          <RuleText size={Size.Medium}>+ Add Rule...</RuleText>
        </button>
      </div>
    </>
  )
}
