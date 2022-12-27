import { Spinner } from "./Spinner"

export function Loading() {
  return (
    <p style={{ textAlign: "center", margin: "3em" }}>
      {"+ "}
      <Spinner kind="bar" />
      {" loading "}
      <Spinner kind="bar" reverse />
      {" +"}
    </p>
  )
}
