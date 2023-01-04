import { useState } from "react"
import { Button } from "./Button"
import { archetype } from "../icons"
import { Loading } from "./Loading"
import { Store, SORT_OPTIONS, FILTER_OPTIONS, DEEMPHASIZE_OPTIONS, FilterOption, DeemphasizeOption } from "./Store"
import { Text } from "./Text"
import { Title } from "./Title"
import { useAccount } from "../hooks/useAccount"
import type { SortOption } from "./Store"
import type { StoreType } from "../types"
import "./Layout.css"
import { STORE_TYPES } from "../types"


const handleRBFSubmit = (e, setState) => {
  e.preventDefault()
  try {
    JSON.parse(e.target.firstChild.value)
  } catch (e) {
    console.log("Invalid JSON string")
  }
  localStorage.setItem('filter-rules', e.target.firstChild.value)
  setState(e.target.firstChild.value)
}

const RuleBasedFilters = (props) => (
  <div id="match-rules-page" className="match-rules">
    <label htmlFor="deemphasize-by">
      <Text>De-emphasize: </Text>
    </label>
    <select
      id="deemphasize-by"
      defaultValue={props.DE}
      onChange={(event) => {
        event.preventDefault()
        props.setDE(event.target.value)
        localStorage.setItem("deemphasize-selection", event.target.value)
      }}
    >
      {DEEMPHASIZE_OPTIONS.map((opt) => (
        <option key={opt} value={opt}>
          {camelToSentence(opt)}
        </option>
      ))}{" "}
    </select>
    <label htmlFor="match-rules">
      <Text>Filter rules</Text>
    </label>
    <form onSubmit={e => handleRBFSubmit(e, props.setState)}>
      <textarea id="match-rules" name="match-rules-area" rows="40" cols="50" defaultValue={props.state} />
      <button type="submit">Save</button>
    </form>
  </div>
) 

const toggleCheckboxChange = (e, setState) => {
  if (e.target.type === 'checkbox') {
    setState(e.target.checked ? "true" : "false")
    localStorage.setItem(e.target.id, e.target.checked ? "true" : "false")
  }
}

export function Layout() {
  let account = useAccount()
  let [activeChar, setActiveChar] = useState<string>()
  let [sortOption, setSortOption] = useState<SortOption>(SORT_OPTIONS[0])
  let [rbfOption, setRBFOption] = useState(localStorage.getItem('filter-rules') || '[{"minStats":360}]')
  let [filterOption, setFilterOption] = useState<FilterOption>(
    FILTER_OPTIONS[0]
  )
  let [storeType, setStoreType] = useState<StoreType>('credits')
  let deemphasizeSelection: DeemphasizeOption
  switch (localStorage.getItem('deemphasize-selection')) {
    case 'hide':
      deemphasizeSelection = "hide"
      break
    case 'opacity':
      deemphasizeSelection = "opacity"
      break
    case 'none':
    default:
      deemphasizeSelection = "none"
  }
  let [enableRuleBasedFilterOption, setEnableRuleBasedFilterOption] = useState(localStorage.getItem('enable-rule-based-filter') || "false")
  let [deemphasizeOption, setDeemphasizeOption] = useState<DeemphasizeOption>(deemphasizeSelection)

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
      <Title>
        Armoury Exchange
      </Title>
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
                    <div style={{ textTransform: "capitalize" }}>
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
          onChange={(event) => {
            setFilterOption(event.target.value)
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
          onChange={(event) => {
            setSortOption(event.target.value)
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
          defaultChecked={enableRuleBasedFilterOption == "true" ? true : undefined}
          onChange={(event) => {
            toggleCheckboxChange(event, setEnableRuleBasedFilterOption)
          }}
        />
      </div>
      <div className="sort-row">
        <details>
          <summary>Show rules</summary>
          <RuleBasedFilters state={rbfOption} setState={setRBFOption} DE={deemphasizeOption} setDE={setDeemphasizeOption} />
        </details>
      </div>

      <Store
        character={account.characters.find((char) => char.id === activeChar)}
        storeType={storeType}
        sortOption={sortOption}
        filterOption={filterOption}
        enableRuleBasedFilterOption={enableRuleBasedFilterOption == "true" ? true : false}
        deemphasizeOption={deemphasizeOption}
      />
    </>
  )
}

function camelToSentence(str: string): string {
  let parts = str.split(/(?=[A-Z])/)
  return parts
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase())
    .join(" ")
}
