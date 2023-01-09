// @ts-nocheck
import {expect, jest, test} from "@jest/globals"
import { render } from "@testing-library/react"
import { getFatSharkUser, setLocalStorage } from "../../src/utils"
import { ContextDumper } from "../testUtils"
jest.mock("../../src/utils", () => ({
    getFatSharkUser: jest.fn(),
    setLocalStorage: jest.fn()
}))

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
        },
        sendMessage: jest.fn()
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

const { UserContextProvider, UserContext } = require("../../src/components/context/UserContextProvider")

describe("UserContextProvider tests", () => {
    test("should call runtime sendMessage with user-auth if user exists", () => {
        const user = {
            AccessToken: "string",
            RefreshToken: "string",
            ExpiresIn: 600,
            Sub: "test",
            AccountName: "test person"
        }
        getFatSharkUser.mockReturnValue(user)

        const callback = jest.fn()

        render(<UserContextProvider>
            <ContextDumper context={UserContext} callback={callback} />
        </UserContextProvider>)

        expect(chrome.runtime.sendMessage).toHaveBeenCalledWith({ type: "user-auth", user })
        expect(callback).toHaveBeenCalledWith({ ...user })
    })

    test("should update user when message occurs", () => {
        jest.useFakeTimers("modern")
        jest.setSystemTime(new Date(2023, 1, 5))
        const user = {
            AccessToken: "string",
            RefreshToken: "string",
            ExpiresIn: 600,
            Sub: "test",
            AccountName: "test person"
        }
        const expectedUser = {
            AccessToken: "string",
            AccountName: "test person",
            ExpiresIn: 600,
            RefreshAt: 1675584300000,
            RefreshToken: "string",
            Sub: "test",
        }
        getFatSharkUser.mockReturnValue(user)
        chrome.runtime.onMessage.addListener.mockImplementation((callback) => {
            callback({ user, type: "user-auth-update" }, null, () => {})
        })
        const callback = jest.fn()

        render(<UserContextProvider>
            <ContextDumper context={UserContext} callback={callback} />
        </UserContextProvider>)

        expect(setLocalStorage).toHaveBeenCalledWith("user", expectedUser)
        expect(callback).toHaveBeenCalledWith(expectedUser)
    })
})