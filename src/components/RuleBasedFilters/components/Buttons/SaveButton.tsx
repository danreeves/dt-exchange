import { Size } from "../../../../types"
import { RuleText } from "../RuleText"
import "./SaveButton.css"

export type SaveBtnProps = {
  disabled: boolean
}
export function SaveButton(props: SaveBtnProps) {
  return (
    <>
      <button
        className={"filter-rules-btn filter-rules-save-btn"}
        type={"submit"}
        disabled={props.disabled}
      >
        <RuleText size={Size.Medium}>Save</RuleText>
      </button>
    </>
  )
}
