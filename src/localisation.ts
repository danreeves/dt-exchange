import strings from "./localisation.json"

let localisation = new Proxy(strings, {
  get(target: typeof strings, prop: keyof typeof strings) {
    return new Proxy(target[prop] || {}, {
      get(t: { [key: string]: string }, p: string) {
        if (p in t) {
          return t[p] + "test"
        }
        return `<${prop}.${p}>`
      },
    })
  },
})

export default localisation
