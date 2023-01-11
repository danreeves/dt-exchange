import { FormEvent, useState } from "react"
import type { FilterRule, FormFilterRule } from "../../types"
import { Size } from "../../types"
import { camelToSentence } from "../../utils"
import { DEEMPHASIZE_OPTIONS, DeemphasizeOption } from "../Store"
import { CloseButton } from "./components/Buttons/CloseButton"
import { RuleToolbar } from "./components/RuleToolbar"
import { Rules } from "./components/Rules"
import { CollapseButton } from "./components/Buttons/CollapseButton"
import { formDataToRules, rulesToFormData } from "./RuleBasedFilters.service"
import { ToolbarHeader } from "./components/ToolbarHeader"
import { AddRuleButton } from "./components/Buttons/AddRuleButton"
import styled from "styled-components"
import { RulesJsonEditor } from "./components/RulesJsonEditor"
import { SaveButton } from "./components/Buttons/SaveButton"
import { CancelButton } from "./components/Buttons/CancelButton"
import { RuleText } from "./components/RuleText"
import { ShowRulesButton } from "./components/Buttons/ShowRulesButton"

type Props = {
  DE: DeemphasizeOption
  setDE: (option: DeemphasizeOption) => void
  state: FilterRule[]
  setState: (rules: FilterRule[]) => void
}

const Wrapper = styled.div`
  & {
    flex: 1 1 100%;
    min-width: 0;
  }
`
const HeaderRow = styled.div`
  & {
    display: block;
    text-align: right;
  }
`
const StyledRulesSectionHeader = styled.div`
  & {
    width: 100%;
    display: flex;
    align-items: center;
  }
  & > * {
    flex: 0 0 auto;
  }
  & > *:first-child {
    flex: 1 1 100%;
  }
`
const StyledLabel = styled.label`
  & {
    color: #BDBDBDFF;
  }
`
const StyledForm = styled.form`
  & {
    margin-bottom: 15px;
  }
`

export function RuleBasedFilters(props: Props) {
  const newRule = (): FormFilterRule => {
    return {
      character: "",
      item: "",
      blessing: "",
      minBlessingRarity: "0",
      perk: "",
      minPerkRarity: "0",
      minStats: "0",
      minRating: "0",
      store: "",
      isOpen: true
    }
  }

  let [ruleFields, setRuleFields] = useState(props.state ? rulesToFormData(props.state) : [newRule()])
  let [ruleFormDirty, setRuleFormDirty] = useState(false)
  let [ruleFormOpen, setRuleFormOpen] = useState(false)
  let [ruleJsonFormOpen, setRuleJsonFormOpen] = useState(false)

  const handleFormChange = (index: number, event: FormEvent<HTMLInputElement>) => {
    let data: FormFilterRule[] = [...ruleFields]
    const eventTarget: HTMLInputElement = event.target as HTMLInputElement
    // @ts-ignore
    data[index][eventTarget.name] = eventTarget.value
    setRuleFields(data)
    if (!ruleFormDirty) setRuleFormDirty(true)
  }

  const handleAddFormRule = () => {
    let newFormRule: FormFilterRule = newRule()
    setRuleFields([...ruleFields, newFormRule])
  }

  const handleRuleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const rules: FilterRule[] = formDataToRules(ruleFields)
    props.setState(rules)
    if (ruleFormDirty) setRuleFormDirty(false)
  }

  const handleRemoveRule = (index: number) => {
    let newRules: FormFilterRule[] = [...ruleFields]
    newRules.splice(index, 1)
    setRuleFields(newRules)
    if (!ruleFormDirty) setRuleFormDirty(true)
  }

  const handleResetRules = () => {
    setRuleFields(props.state ? rulesToFormData(props.state) : [newRule()])
    if (ruleFormDirty) setRuleFormDirty(false)
  }

  const handleToggleCollapseRule = (index: number) => {
    let data: FormFilterRule[] = [...ruleFields]
    data[index]!.isOpen = !data[index]!.isOpen
    setRuleFields(data)
  }

  function handleSubmitJson(rules: FilterRule[]) {
    // Propagate change up
    props.setState(rules)
    // Propagate the changes into the rule fields
    setRuleFields(rules ? rulesToFormData(rules) : [newRule()])
  }

  return (
    <Wrapper>
      <HeaderRow>
        <ShowRulesButton onClick={() => setRuleFormOpen(!ruleFormOpen)} isOpen={ruleFormOpen}>Show rules</ShowRulesButton>
      </HeaderRow>
      {ruleFormOpen ? (
        <div>
          <StyledForm onSubmit={handleRuleFormSubmit}>
            <StyledRulesSectionHeader>
              <div>
                <StyledLabel htmlFor="deemphasize-by">
                  <RuleText size={Size.Medium}>De-emphasize: </RuleText>
                </StyledLabel>
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
              </div>
              <CancelButton disabled={!ruleFormDirty} onClick={handleResetRules} />
              <SaveButton disabled={!ruleFormDirty} />
            </StyledRulesSectionHeader>
            {ruleFields.map((input, index) => {
              return (
                <div key={index}>
                  <RuleToolbar>
                    <CollapseButton isOpen={input.isOpen} onClick={() => handleToggleCollapseRule(index)} />
                    <ToolbarHeader input={input} />
                    <CloseButton onClick={() => handleRemoveRule(index)} />
                  </RuleToolbar>
                  {input.isOpen ? (
                    <Rules index={index} input={input} onChange={handleFormChange} />
                  ) : undefined}
                </div>
              )
            })}
            <AddRuleButton onClick={handleAddFormRule} />
          </StyledForm>
          <HeaderRow>
            <ShowRulesButton onClick={() => setRuleJsonFormOpen(!ruleJsonFormOpen)} isOpen={ruleJsonFormOpen}>Show JSON</ShowRulesButton>
          </HeaderRow>
          {ruleJsonFormOpen ? (
            <div>
              <RulesJsonEditor state={props.state} onSubmit={handleSubmitJson} />
            </div>
          ) : undefined}
        </div>
      ) : undefined}
    </Wrapper>
  )
}
