import type { ReactNode } from "react"

export function Title({ children }: { children: ReactNode }) {
  return (
    <div className="MuiTypography-root MuiTypography-body1 css-1hn6tsi">
      {children}
    </div>
  )
}
