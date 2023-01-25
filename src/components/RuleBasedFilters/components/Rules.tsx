import type React from "react"
import { FormEvent, useState } from "react"
import { Rule } from "./Rule"
import { SplitRuleWrapper } from "./SplitRuleWrapper"
import type { FormFilterRule } from "../../../types"
import "./Rules.css"
import { defaultEmphasisColor, ITEM_OPTIONS, STORE_OPTIONS } from "../../../types"
import { RuleText } from "./RuleText"

type RulesProps = {
  input: FormFilterRule
  index: number
  onChange: (
    index: number,
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void
}
export function Rules(props: RulesProps) {
  let [focusedRule, setFocusedRule] = useState<string>("")

  function handleFormFocus(
    event: FormEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const eventTarget: HTMLInputElement = event.target as HTMLInputElement
    setFocusedRule(eventTarget.id)
  }

  return (
    <>
      <div className={"filter-rules-wrapper"}>
        <SplitRuleWrapper columns={3}>
          <Rule
            label={"Item Type"}
            type={"select"}
            name={"type"}
            index={props.index}
            value={props.input.type}
            focus={focusedRule}
            dataValues={ITEM_OPTIONS}
            addAnyValue
            onChange={(event) => props.onChange(props.index, event)}
            onFocus={(event) => handleFormFocus(event)}
            onBlur={() => setFocusedRule("")}
          />
          <Rule
            label={"Store"}
            type={"select"}
            name={"store"}
            index={props.index}
            value={props.input.store}
            focus={focusedRule}
            dataValues={STORE_OPTIONS}
            addAnyValue
            onChange={(event) => props.onChange(props.index, event)}
            onFocus={(event) => handleFormFocus(event)}
            onBlur={() => setFocusedRule("")}
          />
          <Rule
            label={"Emphasis Color"}
            type={"color"}
            name={"color"}
            index={props.index}
            value={props.input.color || defaultEmphasisColor}
            focus={focusedRule}
            dataValues={["#FF0000", "#F1C40F", "#00FF00", "#00FFFF", "#FF00FF"]}
            onChange={(event) => props.onChange(props.index, event)}
            onFocus={(event) => handleFormFocus(event)}
            onBlur={() => setFocusedRule("")}
          />
        </SplitRuleWrapper>
        <Rule
          label={"Characters"}
          type={"text"}
          name={"character"}
          index={props.index}
          value={props.input.character}
          focus={focusedRule}
          placeholder={"veteran, zealot, psyker, ogryn"}
          onChange={(event) => props.onChange(props.index, event)}
          onFocus={(event) => handleFormFocus(event)}
          onBlur={() => setFocusedRule("")}
        />
        <Rule
          label={"Items"}
          type={"text"}
          name={"item"}
          index={props.index}
          value={props.input.item}
          focus={focusedRule}
          onChange={(event) => props.onChange(props.index, event)}
          onFocus={(event) => handleFormFocus(event)}
          onBlur={() => setFocusedRule("")}
        />
        <Rule
          label={"Blessings"}
          type={"text"}
          name={"blessing"}
          index={props.index}
          value={props.input.blessing}
          focus={focusedRule}
          onChange={(event) => props.onChange(props.index, event)}
          onFocus={(event) => handleFormFocus(event)}
          onBlur={() => setFocusedRule("")}
        />
        <Rule
          label={"Perks"}
          type={"text"}
          name={"perk"}
          index={props.index}
          value={props.input.perk}
          focus={focusedRule}
          onChange={(event) => props.onChange(props.index, event)}
          onFocus={(event) => handleFormFocus(event)}
          onBlur={() => setFocusedRule("")}
        />
        <div className={"filter-rules-group-header"}>
          <RuleText size={"medium"}>Minimums</RuleText>
        </div>
        <SplitRuleWrapper columns={4}>
          <Rule
            label={"Blessing Rarity"}
            type={"number"}
            min={0}
            max={4}
            name={"minBlessingRarity"}
            index={props.index}
            value={props.input.minBlessingRarity}
            focus={focusedRule}
            onChange={(event) => props.onChange(props.index, event)}
            onFocus={(event) => handleFormFocus(event)}
            onBlur={() => setFocusedRule("")}
          />
          <Rule
            label={"Perk Rarity"}
            type={"number"}
            min={0}
            max={4}
            name={"minPerkRarity"}
            index={props.index}
            value={props.input.minPerkRarity}
            focus={focusedRule}
            onChange={(event) => props.onChange(props.index, event)}
            onFocus={(event) => handleFormFocus(event)}
            onBlur={() => setFocusedRule("")}
          />
          <Rule
            label={"Stats"}
            type={"number"}
            min={0}
            max={1000}
            name={"minStats"}
            index={props.index}
            value={props.input.minStats}
            focus={focusedRule}
            onChange={(event) => props.onChange(props.index, event)}
            onFocus={(event) => handleFormFocus(event)}
            onBlur={() => setFocusedRule("")}
          />
          <Rule
            label={"Rating"}
            type={"number"}
            min={0}
            max={1000}
            name={"minRating"}
            index={props.index}
            value={props.input.minRating}
            focus={focusedRule}
            onChange={(event) => props.onChange(props.index, event)}
            onFocus={(event) => handleFormFocus(event)}
            onBlur={() => setFocusedRule("")}
          />
        </SplitRuleWrapper>
      </div>
    </>
  )
}
