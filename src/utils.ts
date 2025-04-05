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

export function safeJsonParse<T>(input: string): T | undefined {
	try {
		return JSON.parse(input)
	} catch (error) {
		return undefined
	}
}

export function getFatSharkUser(): User | undefined {
	// This key is set by FatShark, so it's not in our namespace.
	let user = localStorage.getItem("user")

	if (!user) {
		warn("No user present in localstorage")
		return undefined
	}

	return safeJsonParse<User>(user)
}

export function log(text: string, color = "black") {
	const style = `color: ${color}; font-weight: bold;`
	console.info("%c" + text, style)
}

export function warn(msg: string) {
	console.warn("++", msg, "++")
}

export function camelToSentence(str: string): string {
	let parts = str.split(/(?=[A-Z])/)
	return parts
		.map((s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase())
		.join(" ")
}

export function capitalize(str: string): string {
	return str
		.toLowerCase()
		.split(" ")
		.map((s) => s.charAt(0).toUpperCase() + s.substring(1))
		.join(" ")
}
