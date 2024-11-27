import strings from "./localisation.json"

let localisation = new Proxy(strings, {
	get(target: typeof strings, prop: keyof typeof strings) {
		let nextTarget = target[prop]
		if (nextTarget == null || typeof nextTarget !== "object") {
			nextTarget = {}
		}
		return new Proxy(nextTarget, {
			get(t: { [key: string]: string }, p: string) {
				if (p in t) {
					return t[p]
				}
				return `<${prop}.${p}>`
			},
		})
	},
})

export default localisation
