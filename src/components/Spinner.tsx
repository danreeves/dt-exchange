import { useEffect, useReducer } from "react"

let loaders = {
  line: { frames: ["|", "/", "—", "\\"], interval: 80 },
  bar: {
    frames: [
      "[    ]",
      "[=   ]",
      "[==  ]",
      "[=== ]",
      "[ ===]",
      "[  ==]",
      "[   =]",
      "[    ]",
    ],
    interval: 80,
  },
  dots: {
    frames: ["   ", ".  ", ".. ", "...", ".. ", ".  ", "   "],
    interval: 500,
  },
}
export function Spinner({
  reverse,
  kind,
}: {
  reverse?: boolean
  kind?: keyof typeof loaders
}) {
  let increment = reverse ? -1 : 1
  let loader = kind ? loaders[kind] : loaders.line
  let [i, next] = useReducer((i: number) => {
    let n = (i + increment) % loader.frames.length
    if (n < 0) n = loader.frames.length - 1
    return n
  }, 0)
  useEffect(() => {
    let id = setInterval(() => next(), loader.interval)
    return () => clearInterval(id)
  })
  return <span style={{ whiteSpace: "pre" }}>{loader.frames[i]}</span>
}
