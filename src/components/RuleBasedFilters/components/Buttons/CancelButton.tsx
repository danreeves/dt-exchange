import { RuleText } from "../RuleText"
import "./CancelButton.css"

export type CancelBtnProps = {
	onClick: () => void
	disabled: boolean
}
export function CancelButton(props: CancelBtnProps) {
	return (
		<>
			<button
				className={"filter-rules-btn cancel-filter-rule-changes-btn"}
				type={"button"}
				disabled={props.disabled}
				onClick={props.onClick}
			>
				<RuleText size={"medium"}>Cancel</RuleText>
			</button>
		</>
	)
}
