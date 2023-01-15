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
import { STORE_TYPES } from "../types"
import { camelToSentence } from "../utils"
import { RuleBasedFilters } from "./RuleBasedFilters/RuleBasedFilters"
import { useLocalStorage } from "../hooks/useLocalStorage"

export function Layout() {
  let account = useAccount()
  let [activeChar, setActiveChar] = useState<string>()
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

      <div className="sort-row">
        <label htmlFor="store-type">
          <Text>Store type: </Text>
        </label>
        <select
          id="store-type"
          value={storeType}
          onChange={(event) => {
            setStoreType(event.target.value as StoreType)
          }}
        >
          {STORE_TYPES.map((opt) => (
            <option key={opt} value={opt}>
              {camelToSentence(opt)}
            </option>
          ))}
        </select>
        <label htmlFor="filter-by">
          <Text>Filter by: </Text>
        </label>
        <select
          id="filter-by"
          value={filterOption}
          onChange={(event) => {
            setFilterOption(event.target.value as FilterOption)
          }}
        >
          {FILTER_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {camelToSentence(opt)}
            </option>
          ))}
        </select>

        <label htmlFor="sort-by">
          <Text>Sort by: </Text>
        </label>
        <select
          id="sort-by"
          value={sortOption}
          onChange={(event) => {
            setSortOption(event.target.value as SortOption)
          }}
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {camelToSentence(opt)}
            </option>
          ))}
        </select>
      </div>

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
        character={account.characters.find((char) => char.id === activeChar)}
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
