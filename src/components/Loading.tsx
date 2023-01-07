import { Spinner } from "./Spinner"

export function Loading() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "5em",
      }}
    >
      <Spinner kind="line" />
    </div>
  )
}
