import "./SplitRuleWrapper.css"

export type TextProps = {
	columns?: 2 | 3 | 4
	children?: any
	className?: string
}
export function SplitRuleWrapper(props: any) {
	return (
		<>
			<div
				className={`filter-rules-split-rules-wrapper 
        ${props.columns === 3 ? "filter-rules-split-3-col" : ""}
        ${props.columns === 4 ? "filter-rules-split-4-col" : ""}
        ${!!props.className ? props.className : ""}`}
			>
				{props.children}
			</div>
		</>
	)
}
