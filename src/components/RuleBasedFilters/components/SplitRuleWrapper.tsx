import "./SplitRuleWrapper.css"

export type TextProps = {
  columns?: 2 | 3
  children?: any
}
export function SplitRuleWrapper(props: any) {
  return (
    <>
      <div className={`filter-rules-split-rules-wrapper ${props.columns === 3 ? "filter-rules-split-3-col" : ""}`}>
        { props.children }
      </div>
    </>
  )
}
