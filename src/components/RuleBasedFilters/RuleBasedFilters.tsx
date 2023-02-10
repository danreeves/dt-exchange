import { FormEvent, useState } from "react"
import type { FilterRule, FormFilterRule } from "../../types"
import { DEEMPHASIZE_OPTIONS, DeemphasizeOption } from "../Item"
import { CloseButton } from "./components/Buttons/CloseButton"
import { RuleToolbar } from "./components/RuleToolbar"
import { Rules } from "./components/Rules"
import { CollapseButton } from "./components/Buttons/CollapseButton"
import { formDataToRules, rulesToFormData } from "./RuleBasedFilters.service"
import { ToolbarHeader } from "./components/ToolbarHeader"
import { AddRuleButton } from "./components/Buttons/AddRuleButton"
import { RulesJsonEditor } from "./components/RulesJsonEditor"
import { SaveButton } from "./components/Buttons/SaveButton"
import { CancelButton } from "./components/Buttons/CancelButton"
import { ShowRulesButton } from "./components/Buttons/ShowRulesButton"
import "./RuleBasedFilters.css"
import { useLocalStorage } from "../../hooks/useLocalStorage"
import { DragHandleIcon } from "./components/Icons/DragHandle"
import { Rule } from "./components/Rule"
import { SplitRuleWrapper } from "./components/SplitRuleWrapper"

type Props = {
  DE: DeemphasizeOption
  setDE: (option: DeemphasizeOption) => void
  state: FilterRule[]
  setState: (rules: FilterRule[]) => void
}

export function RuleBasedFilters(props: Props) {
  function newRule(): FormFilterRule {
    return {
      character: "",
      item: "",
      type: "",
      blessing: "",
      minBlessingRarity: "0",
      perk: "",
      minPerkRarity: "0",
      minStats: "0",
      minRating: "0",
      store: "",
      color: "",
      isOpen: true,
    }
  }

  let [dragItem, setDragItem] = useState<number | undefined>(undefined)
  let [dragOverItem, setDragOverItem] = useState<number | undefined>(undefined)
  let [ruleFields, setRuleFields] = useState(
    props.state ? rulesToFormData(props.state) : [newRule()]
  )
  let [ruleFormDirty, setRuleFormDirty] = useState(false)
  let [ruleFormOpen, setRuleFormOpen] = useState(false)
  let [ruleJsonFormOpen, setRuleJsonFormOpen] = useState(false)
  let [deemphasisStyle, setDeemphasisStyle] =
    useLocalStorage<DeemphasizeOption>(
      "deemphasize-selection",
      DEEMPHASIZE_OPTIONS[0]!
    )
  let [focusedInput, setFocusedInput] = useState<string>("")

  function dragStart(position: number) {
    setDragItem(position)
  }

  function dragEnter(position: number) {
    setDragOverItem(position)
  }

  function drop() {
    if (
      dragItem !== undefined &&
      dragOverItem !== undefined &&
      dragItem !== dragOverItem
    ) {
      let data: FormFilterRule[] = [...ruleFields]
      const dragItemContent: FormFilterRule = data[dragItem]!
      data.splice(dragItem, 1)
      data.splice(dragOverItem, 0, dragItemContent)
      setRuleFields(data)
      if (!ruleFormDirty) setRuleFormDirty(true)
    }
    setDragItem(undefined)
    setDragOverItem(undefined)
  }

  function handleFormChange(
    index: number,
    event: FormEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    let data: FormFilterRule[] = [...ruleFields]
    const eventTarget: HTMLInputElement | HTMLSelectElement = event.target as
      | HTMLInputElement
      | HTMLSelectElement
    // @ts-ignore
    data[index][eventTarget.name] = eventTarget.value
    setRuleFields(data)
    if (!ruleFormDirty) setRuleFormDirty(true)
  }

  function handleAddFormRule() {
    let newFormRule: FormFilterRule = newRule()
    setRuleFields([...ruleFields, newFormRule])
  }

  function handleRuleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const rules: FilterRule[] = formDataToRules(ruleFields)
    props.setState(rules)
    setRuleFields(rulesToFormData(rules))
    if (ruleFormDirty) setRuleFormDirty(false)
  }

  function handleRemoveRule(index: number) {
    let newRules: FormFilterRule[] = [...ruleFields]
    newRules.splice(index, 1)
    setRuleFields(newRules)
    if (!ruleFormDirty) setRuleFormDirty(true)
  }

  function handleResetRules() {
    setRuleFields(props.state ? rulesToFormData(props.state) : [newRule()])
    if (ruleFormDirty) setRuleFormDirty(false)
  }

  function handleToggleCollapseRule(index: number) {
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
    <div className={"filter-rules-section"}>
      <div className={"filter-rules-show-btn-wrapper"}>
        <ShowRulesButton
          onClick={() => setRuleFormOpen(!ruleFormOpen)}
          isOpen={ruleFormOpen}
        >
          Show rules
        </ShowRulesButton>
      </div>
      {ruleFormOpen ? (
        <div>
          <form
            className={"filter-rules-form"}
            onSubmit={handleRuleFormSubmit}
            onDragEnter={function(e) {
              e.preventDefault()
            }}
            onDragOver={function(e) {
              e.preventDefault()
            }}
          >
            <SplitRuleWrapper columns={3} className={"deemphasis-wrapper"}>
              <Rule
                label={"De-emphasize Style"}
                type={"select"}
                name={"deemphasis"}
                value={deemphasisStyle}
                focus={focusedInput}
                dataValues={DEEMPHASIZE_OPTIONS}
                onChange={function(event) {
                  props.setDE(event.target.value as DeemphasizeOption)
                  setDeemphasisStyle(event.target.value as DeemphasizeOption)
                }}
                onFocus={(event) => setFocusedInput(event.target.id)}
                onBlur={() => setFocusedInput("")}
              />
            </SplitRuleWrapper>
            {ruleFields.map(function(input, index) {
              return (
                <div key={index}>
                  <div
                    draggable
                    onDragStart={function() {
                      dragStart(index)
                    }}
                    onDragEnter={function(e) {
                      e.preventDefault()
                      dragEnter(index)
                    }}
                    onDragOver={function(e) {
                      e.preventDefault()
                    }}
                    onDragEnd={drop}
                  >
                    <RuleToolbar>
                      <DragHandleIcon size={"medium"} />
                      <CollapseButton
                        isOpen={input.isOpen}
                        onClick={() => handleToggleCollapseRule(index)}
                      />
                      <ToolbarHeader input={input} />
                      <CloseButton onClick={() => handleRemoveRule(index)} />
                    </RuleToolbar>
                  </div>
                  {input.isOpen ? (
                    <Rules
                      index={index}
                      input={input}
                      onChange={handleFormChange}
                    />
                  ) : undefined}
                </div>
              )
            })}
            <AddRuleButton onClick={handleAddFormRule} />
            <div className={"filter-rules-section-footer"}>
              <div className={"divide-left"}>
                <ShowRulesButton
                  onClick={() => setRuleJsonFormOpen(!ruleJsonFormOpen)}
                  isOpen={ruleJsonFormOpen}
                >
                  Show JSON
                </ShowRulesButton>
              </div>
              <CancelButton
                disabled={!ruleFormDirty}
                onClick={handleResetRules}
              />
              <SaveButton disabled={!ruleFormDirty} />
            </div>
          </form>
          {ruleJsonFormOpen ? (
            <div>
              <RulesJsonEditor
                state={props.state}
                onSubmit={handleSubmitJson}
              />
            </div>
          ) : undefined}
        </div>
      ) : undefined}
    </div>
  )
}
