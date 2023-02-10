import type { ReactNode } from "react"
import "./Title.css"

export function Title({
  children,
  style,
}: {
  children: ReactNode
  style?: React.CSSProperties
}) {
  return (
    <div className="item-title" style={style}>
      {children}
    </div>
  )
}
