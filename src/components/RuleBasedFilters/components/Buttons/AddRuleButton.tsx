import { RuleText } from "../RuleText"
import "./AddRuleButton.css"

export type AddRuleBtnProps = {
	onClick: () => void
}
export function AddRuleButton(props: AddRuleBtnProps) {
	return (
		<>
			<div className={"add-btn-wrapper"}>
				<button onClick={props.onClick} type={"button"} className={"add-btn"}>
					<RuleText size={"medium"}>+ Add Rule...</RuleText>
				</button>
			</div>
		</>
	)
}
