import "./SplitRuleWrapper.css"

export function SplitRuleWrapper(props: any) {
  return (
    <>
      <div className={"filter-rules-split-rules-wrapper"}>
        { props.children }
      </div>
    </>
  )
}
