import { ReactElement, useEffect, useState } from "react"
import { Spinner } from "./Spinner"

export function Countdown({ until }: { until: number }): ReactElement {
  let [mins, setMins] = useState(Math.ceil((until - Date.now()) / 1000 / 60))

  useEffect(() => {
    let intervalId = setInterval(() => {
      setMins(Math.ceil((until - Date.now()) / 1000 / 60))
    }, 1000)
    return () => clearInterval(intervalId)
  })

  return (
    <>
      {`${mins} minutes`}
      <Spinner kind="dots" />
    </>
  )
}
