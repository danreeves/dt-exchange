import { useState } from "react"
import { Button } from "./Button"
import { archetype } from "../icons"
import { Loading } from "./Loading"
import { Store, SORT_OPTIONS, FILTER_OPTIONS, FilterOption } from "./Store"
import { Text } from "./Text"
import { Title } from "./Title"
import { useAccount } from "../hooks/useAccount"
import type { SortOption } from "./Store"
import type { StoreType } from "../types"
import "./Layout.css"
import { STORE_TYPES } from "../types"


export function Layout() {
  let account = useAccount()
  let [activeChar, setActiveChar] = useState<string>()
  let [sortOption, setSortOption] = useState<SortOption>(SORT_OPTIONS[0])
  let [filterOption, setFilterOption] = useState<FilterOption>(
    FILTER_OPTIONS[0]
  )
  let [storeType, setStoreType] = useState<StoreType>('credits')

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

      <Store
        character={account.characters.find((char) => char.id === activeChar)}
        storeType={storeType}
        sortOption={sortOption}
        filterOption={filterOption}
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
