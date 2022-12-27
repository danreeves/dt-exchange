import { useSyncExternalStore } from "react"
import { isEqual } from "lodash"
import { getLocalStorage, sleep } from "./utils"
import type { User } from "./types"

export async function getLatestUser(
  currentUser?: User
): Promise<User | undefined> {
  let originalUser = currentUser || getLocalStorage<User>("user")
  for (let i = 0; i <= 10; i++) {
    let newUser = getLocalStorage<User>("user")
    if (
      (!originalUser && newUser) ||
      (originalUser &&
        newUser &&
        newUser.AccessToken != originalUser.AccessToken)
    ) {
      return newUser
    }
    await sleep(1000)
  }
  return originalUser
}

class UserStore {
  listeners: Set<() => void>
  foundFirstUser: boolean
  user?: User

  constructor() {
    this.listeners = new Set<() => void>()
    this.foundFirstUser = false

    getLatestUser().then((user) => {
      if (user) {
        this.foundFirstUser = true
        this.user = user
        this.update()
      }
    })
  }

  subscribe = (rerender: () => void) => {
    if (!this.listeners.has(rerender)) {
      this.listeners.add(rerender)
    }
    return () => this.listeners.delete(rerender)
  }

  update = () => {
    this.listeners.forEach((cb) => cb())
  }

  getUser = () => {
    if (this.foundFirstUser) {
      let lsUser = getLocalStorage<User>("user")
      if (isEqual(this.user, lsUser)) {
        return this.user
      } else if (lsUser) {
        this.user = lsUser
        return this.user
      }
    }
    return undefined
  }
}

let userStore = new UserStore()

export function useUser(): User | undefined {
  return useSyncExternalStore(userStore.subscribe, userStore.getUser)
}
