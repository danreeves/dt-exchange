import React, { FormEvent, useRef, useState } from "react"
import type { FilterRule } from "../../../types"
import { rulesToJson } from "../RuleBasedFilters.service"
import "./RulesJsonEditor.css"

export type JsonEditorProps = {
  state: FilterRule[]
  onSubmit: (rules: FilterRule[]) => void
}
export function RulesJsonEditor(props: JsonEditorProps) {
  let [jsonState, setJsonState] = useState<string>(rulesToJson(props.state))
  let [jsonError, setJsonError] = useState(false)
  let jsonTextAreaRef = useRef<HTMLTextAreaElement>(null)

  function setRulesToState() {
    setJsonState(rulesToJson(props.state))
  }

  React.useEffect(setRulesToState, [props.state]);

  function handleSubmitJson(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setJsonError(false)

    try {
      // Parse the string
      let rules: FilterRule[] = JSON.parse(jsonState)
      // Propagate change up
      props.onSubmit(rules)
    } catch (e) {
      setJsonError(true)
    }
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
              const cursorPosition =
                event.key === "PageUp" ? 0 : event.target.textLength

              event.preventDefault()
              event.target.setSelectionRange(cursorPosition, cursorPosition)
            }
          }}
          onChange={function (e) {
            if (jsonTextAreaRef.current) {
              jsonTextAreaRef.current.setCustomValidity("")
              try {
                JSON.parse(e.target.value)
              } catch {
                jsonTextAreaRef.current.setCustomValidity("Invalid JSON")
              }

              jsonTextAreaRef.current.reportValidity()
            }
            setJsonState(e.target.value)
          }}
          value={jsonState}
        />
        {jsonError ? <div className="error-text">Rules not saved due to invalid JSON</div> : null}
        <button type="submit">Save JSON</button>
      </form>
    </>
  )
}
