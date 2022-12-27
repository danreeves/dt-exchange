import { useState } from "react"
import { Button } from "./Button"
import { Countdown } from "./Countdown"
import { css } from "./css"
import { icons } from "./img"
import { Loading } from "./Loading"
import { Spinner } from "./Spinner"
import { Store } from "./Store"
import { Text } from "./Text"
import { Title } from "./Title"
import { useAccount } from "./useAccount"
import { useStore } from "./useStore"

css`
  .char-list {
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 1em;
    margin-top: 1em;
  }

  .char-list li {
    list-style: none;
    display: flex;
    flex: 1;
  }

  .char-list li .my-button {
    flex: 1;
  }

  .class-icon {
    height: 3em;
    width: auto;
    vertical-align: middle;
    margin-right: 1em;
  }

  .char-button {
    display: flex;
    flex-direction: row;
    align-items: center;
    text-align: left;
  }
`

export function Layout() {
  let account = useAccount()
  let store = useStore(account?.characters?.[0])
  let [activeChar, setActiveChar] = useState<string>()

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

  let countdown = store ? (
    <Text>
      Refresh in <Countdown until={parseInt(store.currentRotationEnd, 10)} />
    </Text>
  ) : (
    <Text>
      Refresh in <Spinner kind="bar" />
    </Text>
  )

  return (
    <>
      <Title>
        Armoury Exchange
        {countdown}
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
                    src={icons[character.archetype]}
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
      <Store
        character={account.characters.find((char) => char.id === activeChar)}
      />
    </>
  )
}
