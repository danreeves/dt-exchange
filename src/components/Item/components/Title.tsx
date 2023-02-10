import type { ReactNode } from "react"

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
