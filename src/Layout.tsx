import { useState } from "react"
import { Button } from "./Button"
import { Countdown } from "./Countdown"
import { archetype } from "./icons"
import { Loading } from "./Loading"
import { Spinner } from "./Spinner"
import { Store } from "./Store"
import { Text } from "./Text"
import { Title } from "./Title"
import { useAccount } from "./useAccount"
import { useStore } from "./useStore"
import "./Layout.css"

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
      <Store
        character={account.characters.find((char) => char.id === activeChar)}
      />
    </>
  )
}
