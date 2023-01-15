import { expect, jest, test } from "@jest/globals"
import {
  createTimer,
  handleMessage,
  handleAlarm,
  handleTabs,
} from "./background"
import type { User } from "./types"

describe("background script tests", () => {
  const fetchMock = jest.fn() as jest.Mock<typeof global.fetch>
  afterEach(() => {
    ;(window.chrome.alarms.onAlarm.addListener as jest.Mock).mockClear()
    global.fetch = fetchMock
  })
  test("Alarm setting", () => {
    createTimer(5)
    expect(chrome.alarms.create).toHaveBeenCalledWith("user-auth-refresh", {
      delayInMinutes: 5,
    })
  })

  test("Should set auth data if user-auth event received", () => {
    handleMessage(
      { type: "user-auth", user: { name: "test" } },
      {},
      (authData: any) => {
        expect(authData).toEqual({ name: "test" })
      }
    )
  })

  test("Tab handling code", () => {
    const tab = {} as chrome.tabs.Tab
    const tab2 = {} as chrome.tabs.Tab

    tab.url = "https://accounts.atoma.cloud/dashboard"
    tab.id = 1
    tab2.url = "https://google.com"
    tab2.id = 2

    const user = { ExpiresIn: 600 } as User

    handleTabs([tab, tab2], user)
    expect(chrome.tabs.sendMessage).toHaveBeenCalledTimes(1)
    expect(chrome.tabs.sendMessage).toHaveBeenCalledWith(1, {
      type: "user-auth-update",
      user: {
        ExpiresIn: 600,
      },
    })
  })

  describe("Alarm handling tests", () => {
    test("Should create new timer using expiresIn and send message to tabs", async () => {
      Object.defineProperty(global, "authData", {
        value: { name: "test " },
        writable: true,
      })
      const response = {
        ok: true,
        status: 200,
        clone: () => response,
        json: async () => ({ ExpiresIn: 600 }),
      } as Response
      fetchMock.mockResolvedValue(response)
      global.fetch = fetchMock

      expect(chrome.alarms.create).toHaveBeenCalledWith("user-auth-refresh", {
        delayInMinutes: 5,
      })
    })
    test("Should create new timer for 10 minutes if error occurs", async () => {
      fetchMock.mockImplementation(() =>
        Promise.reject({
          ok: false,
          status: 404,
          clone: () => ({ text: async () => "Error" }),
          text: async () => "Error",
        })
      )
      global.fetch = fetchMock
      Object.defineProperty(global, "authData", {
        value: { name: "test " },
        writable: true,
      })
      const alarm = {
        periodInMinutes: 1,
        scheduledTime: 5,
        name: "user-auth-refresh",
      }
      await handleAlarm(alarm)
      expect(chrome.alarms.create).toHaveBeenCalledWith("user-auth-refresh", {
        delayInMinutes: 10,
      })
    })
  })
})
