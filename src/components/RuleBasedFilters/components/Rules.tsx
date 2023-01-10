import type React from "react"
import { FormEvent, useState } from "react"
import styled from "styled-components"
import { Rule } from "./Rule"
import { SplitRuleWrapper } from "./SplitRuleWrapper"
import type { FormFilterRule } from "../../../types"

type RulesProps = {
  input: FormFilterRule
  index: number
  onChange: (index: number, event: React.ChangeEvent<HTMLInputElement>) => void
}

const StyledWrapper = styled.div`
  & {
    border-width: 1px;
    border-style: solid;
    border-color: #5df8ff;
    border-top: none;
    padding: 8px 15px;
    margin-bottom: 10px;
  }
`

export const Rules = ((props: RulesProps) => {
  let [focusedRule, setFocusedRule] = useState<string>("")

  const handleFormFocus = (event: FormEvent<HTMLInputElement>) => {
    const eventTarget: HTMLInputElement = event.target as HTMLInputElement
    setFocusedRule(eventTarget.id)
  }

  return (
    <>
      <StyledWrapper>
        <Rule
          label={ "Characters" }
          type={ "text" }
          name={ "character" }
          index={ props.index }
          value={ props.input.character }
          focus={ focusedRule }
          onChange={ event => props.onChange(props.index, event) }
          onFocus={ event => handleFormFocus(event)}
          onBlur={ () => setFocusedRule("") }
        />
        <Rule
          label={ "Items" }
          type={ "text" }
          name={ "item" }
          index={ props.index }
          value={ props.input.item }
          focus={ focusedRule }
          onChange={ event => props.onChange(props.index, event) }
          onFocus={ event => handleFormFocus(event)}
          onBlur={ () => setFocusedRule("") }
        />
        <Rule
          label={ "Blessings" }
          type={ "text" }
          name={ "blessing" }
          index={ props.index }
          value={ props.input.blessing }
          focus={ focusedRule }
          onChange={ event => props.onChange(props.index, event) }
          onFocus={ event => handleFormFocus(event)}
          onBlur={ () => setFocusedRule("") }
        />
        <Rule
          label={ "Perks" }
          type={ "text" }
          name={ "perk" }
          index={ props.index }
          value={ props.input.perk }
          focus={ focusedRule }
          onChange={ event => props.onChange(props.index, event) }
          onFocus={ event => handleFormFocus(event)}
          onBlur={ () => setFocusedRule("") }
        />
        <SplitRuleWrapper>
          <Rule
            label={ "Minimum Blessing Rarity" }
            type={ "number" }
            min={ 0 }
            max={ 4 }
            name={ "minBlessingRarity" }
            index={ props.index }
            value={ props.input.minBlessingRarity }
            focus={ focusedRule }
            onChange={ event => props.onChange(props.index, event) }
            onFocus={ event => handleFormFocus(event)}
            onBlur={ () => setFocusedRule("") }
          />
          <Rule
            label={ "Minimum Perk Rarity" }
            type={ "number" }
            min={ 0 }
            max={ 4 }
            name={ "minPerkRarity" }
            index={ props.index }
            value={ props.input.minPerkRarity }
            focus={ focusedRule }
            onChange={ event => props.onChange(props.index, event) }
            onFocus={ event => handleFormFocus(event)}
            onBlur={ () => setFocusedRule("") }
          />
        </SplitRuleWrapper>
        <SplitRuleWrapper>
          <Rule
            label={ "Minimum Stats" }
            type={ "number" }
            min={ 0 }
            max={ 1000 }
            name={ "minStats" }
            index={ props.index }
            value={ props.input.minStats }
            focus={ focusedRule }
            onChange={ event => props.onChange(props.index, event) }
            onFocus={ event => handleFormFocus(event)}
            onBlur={ () => setFocusedRule("") }
          />
          <Rule
            label={ "Minimum Rating" }
            type={ "number" }
            min={ 0 }
            max={ 1000 }
            name={ "minRating" }
            index={ props.index }
            value={ props.input.minRating }
            focus={ focusedRule }
            onChange={ event => props.onChange(props.index, event) }
            onFocus={ event => handleFormFocus(event)}
            onBlur={ () => setFocusedRule("") }
          />
        </SplitRuleWrapper>
      </StyledWrapper>
    </>
  )
})
