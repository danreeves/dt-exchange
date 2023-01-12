import { RuleText } from "../RuleText"
import { Size } from "../../../../types"
import { ChevronDownIcon } from "../Icons/ChevronDownIcon"
import { ChevronRightIcon } from "../Icons/ChevronRightIcon"
import "./ShowRulesButton.css"

export type ShowRulesBtnProps = {
  onClick: () => void
  isOpen: boolean
  children?: any
}
export function ShowRulesButton(props: ShowRulesBtnProps) {
  return (
    <>
      <button
        className={"filter-rules-btn filter-rules-show-rules-btn"}
        type={"button"}
        onClick={props.onClick}
      >
        <div className={"filter-rules-show-rules-inner-wrapper"}>
          {props.isOpen ? (
            <ChevronDownIcon size={Size.Small} />
          ) : (
            <ChevronRightIcon size={Size.Small} />
          )}
          <RuleText size={Size.Small}>{ props.children }</RuleText>
        </div>
      </button>
    </>
  )
}
