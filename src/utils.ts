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

	try {
		parsed = JSON.parse(jsonString)
	} catch {
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
