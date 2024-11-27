import type { ReactNode } from "react"

export function Title({ children }: { children: ReactNode }) {
	return (
		<div className="MuiTypography-root MuiTypography-h2 css-15sy8fq">
			{children}
		</div>
	)
}
