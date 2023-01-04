import type { ReactNode } from "react"

export function Text({ children }: { children: ReactNode }) {
  return (
    <div className="MuiFormHelperText-root MuiFormHelperText-sizeMedium css-13fvtaj">
      {children}
    </div>
  )
}
