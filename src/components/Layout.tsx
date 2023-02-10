import { useState } from "react"
import { Button } from "./Button"
import { archetype } from "../icons"
import { Loading } from "./Loading"
import {
  Store,
  SORT_OPTIONS,
  FILTER_OPTIONS,
  FilterOption,
  DeemphasizeOption,
} from "./Store"
import { Text } from "./Text"
import { Title } from "./Title"
import { useAccount } from "../hooks/useAccount"
import type { SortOption } from "./Store"
import type { StoreType, FilterRule } from "../types"
import "./Layout.css"
import { STORE_OPTIONS, STORE_LABELS } from "../types"
import { RuleBasedFilters } from "./RuleBasedFilters/RuleBasedFilters"
import { useLocalStorage } from "../hooks/useLocalStorage"
import { SplitRuleWrapper } from "./RuleBasedFilters/components/SplitRuleWrapper"
import { Rule } from "./RuleBasedFilters/components/Rule"

export function Layout() {
  let account = useAccount()
  let [activeChar, setActiveChar] = useLocalStorage<string>("active-char", "")
  let [sortOption, setSortOption] = useLocalStorage<SortOption>(
    "sort-option",
    SORT_OPTIONS[0]!
  )
  let [rbfOption, setRBFOption] = useLocalStorage<FilterRule[]>(
    "filter-rules",
    [{ minStats: 360 }]
  )
  let [filterOption, setFilterOption] = useLocalStorage<FilterOption>(
    "filter-option",
    FILTER_OPTIONS[0]!
  )
  let [storeType, setStoreType] = useLocalStorage<StoreType>(
    "store-type",
    "credits"
  )
  let [enableRuleBasedFiltering, setEnableRuleBasedFiltering] = useLocalStorage(
    "enable-rule-based-filter",
    false
  )
  let [deemphasizeOption, setDeemphasizeOption] =
    useLocalStorage<DeemphasizeOption>("deemphasize-selection", "none")

  let [focusedInput, setFocusedInput] = useState<string>("")


  if (!account) {
    return (
      <>
        <Title>Armoury Exchange</Title>
        <Loading />
      </>
    )
  }


  if (account.characters[0] && !activeChar) {
    setActiveChar(account.characters[0].id)
  }

  if (
    activeChar &&
    account.characters.length &&
    !account.characters.find((char) => char.id === activeChar)
  ) {
    const charId = account?.characters[0]?.id
    if (charId) {
      setActiveChar(charId)
    }
  }

  const character = account.characters.find((char) => char.id === activeChar)

  if (!character) {
    return (
      <>
        <Title>Armoury Exchange</Title>
        <p>You don't have any characters!</p>
      </>
    )
  }

  return (
    <>
      <Title>Armoury Exchange</Title>
      <ul className="char-list">
        {account.characters.map((character) => {
          return (
            <li key={character.id}>
              <Button
                active={activeChar === character.id}
                onClick={() => {
                  setActiveChar(character.id)
                }}
              >
                <div className="char-button">
                  <img
                    src={archetype[character.archetype]}
                    className="class-icon"
                  />
                  <div>
                    <div>{character.name}</div>
                    <div
                      style={{
                        textTransform: "capitalize",
                      }}
                    >
                      {character.archetype} {character.level}
                    </div>
                  </div>
                </div>
              </Button>
            </li>
          )
        })}
      </ul>
      <br />
      <SplitRuleWrapper columns={3}>
        <Rule
          label={"Store Type"}
          type={"select"}
          name={"store_type"}
          value={storeType}
          focus={focusedInput}
          dataValues={STORE_OPTIONS}
          labels={STORE_LABELS}
          onChange={function(event) {
            setStoreType(event.target.value as StoreType)
          }}
          onFocus={(event) => setFocusedInput(event.target.id)}
          onBlur={() => setFocusedInput("")}
        />
        <Rule
          label={"Filter By"}
          type={"select"}
          name={"filter_by"}
          value={filterOption}
          focus={focusedInput}
          dataValues={FILTER_OPTIONS}
          onChange={function(event) {
            setFilterOption(event.target.value as FilterOption)
          }}
          onFocus={(event) => setFocusedInput(event.target.id)}
          onBlur={() => setFocusedInput("")}
        />
        <Rule
          label={"Sort By"}
          type={"select"}
          name={"sort_by"}
          value={sortOption}
          focus={focusedInput}
          dataValues={SORT_OPTIONS}
          onChange={function(event) {
            setSortOption(event.target.value as SortOption)
          }}
          onFocus={(event) => setFocusedInput(event.target.id)}
          onBlur={() => setFocusedInput("")}
        />
      </SplitRuleWrapper>
      <div className="sort-row">
        <label htmlFor="enable-rule-based-filter">
          <Text>Enable rule based filtering: </Text>
        </label>
        <input
          type="checkbox"
          id="enable-rule-based-filter"
          checked={enableRuleBasedFiltering}
          onChange={(event) => {
            setEnableRuleBasedFiltering(event.target.checked)
          }}
        />
      </div>

      {enableRuleBasedFiltering ? (
        <div className="rbf-row">
          <RuleBasedFilters
            state={rbfOption}
            setState={setRBFOption}
            DE={deemphasizeOption}
            setDE={setDeemphasizeOption}
          />
        </div>
      ) : null}

      <Store
        character={character}
        storeType={storeType}
        sortOption={sortOption}
        filterOption={filterOption}
        enableRuleBasedFilterOption={enableRuleBasedFiltering}
        filterRules={rbfOption}
        deemphasizeOption={deemphasizeOption}
      />
    </>
  )
}
