import { RuleText } from "../RuleText"
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
					{props.isOpen ? <ChevronDownIcon size={"small"} /> : <ChevronRightIcon size={"small"} />}
					<RuleText size={"small"}>{props.children}</RuleText>
				</div>
			</button>
		</>
	)
}
