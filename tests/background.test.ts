// @ts-nocheck
import {expect, jest, test} from '@jest/globals';

global.chrome = {
    alarms: {
        create: jest.fn(),
        onAlarm: {
            addListener: jest.fn()
        }
    },
    runtime: {
        onMessage: {
            addListener: jest.fn()
        }
    },
    browserAction: {
        onClicked: {
            addListener: jest.fn()
        }
    },
    tabs: {
        query: jest.fn(),
        sendMessage: jest.fn()
    }
}

const { createTimer, handleMessage, handleAlarm } = require("../src/background")

describe("background script tests", () => {
    afterEach(() => {
        chrome.alarms.create.mockClear()
        global.fetch = jest.fn()
    })
    test("Alarm setting", () => {
        createTimer(5)
        expect(chrome.alarms.create).toHaveBeenCalledWith("user-auth-refresh", { delayInMinutes: 5 })
    })

    test("Should set auth data if user-auth event received", () => {
        handleMessage({ type: "user-auth", user: { name: "test" }}, null, (authData: any) => {
            expect(authData).toEqual({name: "test" })
        })
    })

    describe("Alarm handling tests", () => {
        test("Should create new timer using expiresIn and send message to tabs", async () => {
            global.fetch.mockResolvedValue({
                ok: true,
                clone: () => ({
                    json: () => ({
                        ExpiresIn: 600
                    })
                })
            })
            Object.defineProperty(global, "authData", {
                value: { name: "test " },
                writable: true
            })
            const alarm = {
                periodInMinutes: 1,
                scheduledTime: 5,
                name: "user-auth-refresh"
            }

            chrome.tabs.query.mockImplementation((_, callback: (tabs) => void) => {
                callback([{
                    url: "https://accounts.atoma.cloud/dashboard",
                    id: "validTab"
                }, {
                    url: "https://google.com",
                    id: "notValidTab"
                }])
            })
            await handleAlarm(alarm)
            expect(chrome.alarms.create).toHaveBeenCalledWith("user-auth-refresh", { delayInMinutes: 5 })
            expect(chrome.tabs.sendMessage).toHaveBeenCalledTimes(1)
            expect(chrome.tabs.sendMessage).toHaveBeenCalledWith("validTab", {
                type: "user-auth-update",
                user: {
                    ExpiresIn: 600
                }
            })
        })
        test("Should create new timer for 10 minutes if error occurs", async () => {
            global.fetch.mockRejectedValue("error")
            Object.defineProperty(global, "authData", {
                value: { name: "test " },
                writable: true
            })
            const alarm = {
                periodInMinutes: 1,
                scheduledTime: 5,
                name: "user-auth-refresh"
            }
            await handleAlarm(alarm)
            expect(chrome.alarms.create).toHaveBeenCalledWith("user-auth-refresh", { delayInMinutes: 10 })
        })
    })
})