import { useState } from "react"
import { Button } from "./Button"
import { Countdown } from "./Countdown"
import { archetype } from "../icons"
import { Loading } from "./Loading"
import { Store, SORT_OPTIONS, FILTER_OPTIONS, DEEMPHASIZE_OPTIONS, FilterOption, DeemphasizeOption } from "./Store"
import { Text } from "./Text"
import { Title } from "./Title"
import { useAccount } from "../hooks/useAccount"
import { useStore } from "../hooks/useStore"
import "./Layout.css"

import type { SortOption } from "./Store"

const handleSubmit = (e, setState) => {
  e.preventDefault()
  try {
    JSON.parse(e.target.firstChild.value)
  } catch (e) {
    console.log("Invalid JSON string")
  }
  localStorage.setItem('filter-rules', e.target.firstChild.value)
  setState(e.target.firstChild.value)
}

const Rules = (props) => (
  <div id="match-rules-page" className="match-rules">
    <label htmlFor="deemphasize-by">
      <Text>De-emphasize: </Text>
    </label>
    <select
      id="deemphasize-by"
      onChange={(event) => {
        props.setDE(event.target.value)
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
    <form onSubmit={e => handleSubmit(e, props.setState)}>
      <textarea id="match-rules" name="match-rules-area" rows="40" cols="50" defaultValue={props.state} />
      <button type="submit">Save</button>
    </form>
  </div>
) 

export function Layout() {
  let account = useAccount()
  let store = useStore(account?.characters?.[0], false) // Don't poll here
  let [activeChar, setActiveChar] = useState<string>()
  let [sortOption, setSortOption] = useState<SortOption>(SORT_OPTIONS[0])
  let [matchOption, setMatchOption] = useState(localStorage.getItem('filter-rules') || '[{"minStats":360}]')
  let [filterOption, setFilterOption] = useState<FilterOption>(
    FILTER_OPTIONS[0]
  )
  let [deemphasizeOption, setDeemphasizeOption] = useState<DeemphasizeOption>(DEEMPHASIZE_OPTIONS[0])

  if (!account || !store) {
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
        <Text>
          Refresh in{" "}
          <Countdown until={parseInt(store.currentRotationEnd, 10)} />
        </Text>
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
          ))}{" "}
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
          ))}{" "}
        </select>
      </div>

      <div className="sort-row">
        <details>
          <summary>Show rules</summary>
          <Rules state={matchOption} setState={setMatchOption} DE={deemphasizeOption} setDE={setDeemphasizeOption} />
        </details>
      </div>

      <Store
        character={account.characters.find((char) => char.id === activeChar)}
        sortOption={sortOption}
        filterOption={filterOption}
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
