import { Buffer } from "buffer/"
import type { User } from "./types"

export function createFetcher(user: User) {
	return async function fetchApi(path: string) {
		let url = path.startsWith("https")
			? path
			: `https://bsp-td-prod.atoma.cloud${path}`

		if (url.includes(":sub")) {
			url = url.replace(":sub", user.Sub)
		}

		let res = await fetch(url, {
			headers: {
				authorization: `Bearer ${user.AccessToken}`,
			},
		})

		if (res.ok) {
			try {
				let json = await res.clone().json()
				return json
			} catch {
				return await res.text()
			}
		}
	}
}

function safeParseJSON<T>(jsonString: string): T | undefined {
	let parsed: T | undefined

	let accountNameRe = /"AccountName".*",/
	let quoteInAccountNameRe = /"AccountName":".*(").*",/

	// If the account name has special characters it might be malformed
	// and have quotes in it. This breaks JSON.parse. Remove it.
	if (jsonString.search(quoteInAccountNameRe) > 0) {
		jsonString = jsonString.replace(accountNameRe, '')
	}

	try {
		parsed = JSON.parse(jsonString)
	} catch {
		warn("User could not be decoded")
		parsed = undefined
	}

	return parsed
}

export function getLocalStorage<T>(key: string): T | undefined {
	const encoded = localStorage.getItem(key)
	const decoded = encoded
		? safeParseJSON<T>(Buffer.from(encoded, "base64").toString())
		: undefined

	return decoded
}

export function log(msg: string) {
	console.log(`++[ ${msg} ]++`)
}

export function warn(msg: string) {
	console.warn(`++! ${msg} !++`)
}
