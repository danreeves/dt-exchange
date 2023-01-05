import { FormEvent, ReactNode, useRef, useState } from "react"
import type { FilterRule } from "../types"
import { camelToSentence } from "../utils"
import { DeemphasizeOption, DEEMPHASIZE_OPTIONS } from "./Store"
import { Text } from "./Text"
import "./RuleBasedFilters.css"

type Props = {
  DE: DeemphasizeOption
  setDE: (option: DeemphasizeOption) => void
  state: FilterRule[]
  setState: (rules: FilterRule[]) => void
}

export function RuleBasedFilters(props: Props) {
  let [state, setState] = useState<string>(JSON.stringify(props.state, null, 4))
  let [error, setError] = useState(false)
  let textAreaRef = useRef<HTMLTextAreaElement>(null)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setError(false)

    try {
      // Parse the string
      let rules = JSON.parse(state)
      // Format the string back into the textarea
      setState(JSON.stringify(rules, null, 4))
      // Propagate change up
      props.setState(rules)
    } catch (e) {
      setError(true)
    }
  }

  return (
    <details className="rbf-details-panel">
      <summary className="MuiFormHelperText-root MuiFormHelperText-sizeMedium css-13fvtaj rbf-details-summary">
        Show rules
      </summary>
      <div id="match-rules-page" className="match-rules">
        <label htmlFor="deemphasize-by">
          <Text>De-emphasize: </Text>
        </label>
        <select
          id="deemphasize-by"
          value={props.DE}
          onChange={(event) => {
            props.setDE(event.target.value as DeemphasizeOption)
            localStorage.setItem("deemphasize-selection", event.target.value)
          }}
        >
          {DEEMPHASIZE_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {camelToSentence(opt)}
            </option>
          ))}{" "}
        </select>
        <form onSubmit={handleSubmit}>
          <label htmlFor="match-rules">
            <Text>Filter rules</Text>
          </label>
          <textarea
            ref={textAreaRef}
            id="match-rules"
            className="rule-input"
            name="match-rules-area"
            rows={15}
            onKeyDown={(event) => {
                // Workaround for Chrome specific bug: https://github.com/danreeves/dt-exchange/issues/41
                if (event.key === 'PageUp' || event.key === 'PageDown') {
                  const cursorPosition = event.key === 'PageUp' ? 0 : event.target.textLength;
              
                  event.preventDefault();
                  event.target.setSelectionRange(cursorPosition, cursorPosition);
                }
            }}
            onChange={(e) => {
              if (textAreaRef.current) {
                textAreaRef.current.setCustomValidity("")
                try {
                  JSON.parse(e.target.value)
                } catch {
                  textAreaRef.current.setCustomValidity("Invalid JSON")
                }

                textAreaRef.current.reportValidity()
              }
              setState(e.target.value)
            }}
            value={state}
          />
          {error ? <Warn>Rules not saved due to invalid JSON</Warn> : null}
          <button type="submit">Save</button>
        </form>
      </div>
    </details>
  )
}

function Warn({ children }: { children: ReactNode }) {
  return <div className="error-text">{children}</div>
}
