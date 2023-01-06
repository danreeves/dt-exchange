import { useCallback, useState } from "react"

const NAMESPACE = "armoury-exchange-"

const makeKey = (key: string) => `${NAMESPACE}${key}`

function setLocalStorage(key: string, value: unknown) {
  localStorage.setItem(makeKey(key), JSON.stringify(value))
}

function getLocalStorage<T>(key: string): T | undefined {
  return JSON.parse(localStorage.getItem(makeKey(key)) ?? "undefined")
}

export function useLocalStorage<T>(
  key: string,
  defaultValue: T
): [T, (newValue: T) => void] {
  let [state, _setState] = useState<T | undefined>(getLocalStorage<T>(key))

  let setState = useCallback(
    (value: T) => {
      setLocalStorage(key, value)
      _setState(value)
    },
    [key, _setState]
  )

  if (state == null && defaultValue != null) {
    setState(defaultValue)
  }

  return [state!, setState]
}
