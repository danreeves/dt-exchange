import React, { FormEvent, useRef, useState } from "react"
import type { FilterRule } from "../../../types"
import { rulesToJson } from "../RuleBasedFilters.service"
import "./RulesJsonEditor.css"
import { SaveButton } from "./Buttons/SaveButton"
import { CancelButton } from "./Buttons/CancelButton"

export type JsonEditorProps = {
	state: FilterRule[]
	onSubmit: (rules: FilterRule[]) => void
}
export function RulesJsonEditor(props: JsonEditorProps) {
	let [ruleFormDirty, setRuleFormDirty] = useState(false)
	let [jsonState, setJsonState] = useState<string>(rulesToJson(props.state))
	let [jsonError, setJsonError] = useState(false)
	let jsonTextAreaRef = useRef<HTMLTextAreaElement>(null)

	function setRulesToState() {
		setJsonError(false)
		setRuleFormDirty(false)
		setJsonState(rulesToJson(props.state))
	}

	React.useEffect(setRulesToState, [props.state])

	function handleSubmitJson(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()
		// Parse the string
		let rules: FilterRule[] = JSON.parse(jsonState)
		// Propagate change up
		props.onSubmit(rules)
	}

	return (
		<>
			<form onSubmit={handleSubmitJson}>
				<textarea
					className={"filter-rules-json-editor"}
					ref={jsonTextAreaRef}
					id="match-rules"
					name="match-rules-area"
					rows={15}
					onKeyDown={function (event: any) {
						// Workaround for Chrome specific bug: https://github.com/danreeves/dt-exchange/issues/41
						if (event.key === "PageUp" || event.key === "PageDown") {
							const cursorPosition = event.key === "PageUp" ? 0 : event.target.textLength

							event.preventDefault()
							event.target.setSelectionRange(cursorPosition, cursorPosition)
						}
					}}
					onChange={function (e) {
						if (jsonTextAreaRef.current) {
							setJsonError(false)
							jsonTextAreaRef.current.setCustomValidity("")
							try {
								JSON.parse(e.target.value)
							} catch {
								setJsonError(true)
								jsonTextAreaRef.current.setCustomValidity("Invalid JSON")
							}

							jsonTextAreaRef.current.reportValidity()
						}
						setJsonState(e.target.value)
						setRuleFormDirty(true)
					}}
					value={jsonState}
				/>
				<div className={"filter-rules-section-footer"}>
					<CancelButton disabled={!ruleFormDirty} onClick={setRulesToState} />
					<SaveButton disabled={!ruleFormDirty || jsonError}>Save JSON</SaveButton>
				</div>
			</form>
		</>
	)
}
