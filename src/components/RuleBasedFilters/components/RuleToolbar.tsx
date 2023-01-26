import "./RuleToolbar.css"

export function RuleToolbar(props: any) {
  return (
    <>
      <div className={"filter-rules-toolbar-wrapper"}>
        <div className={"filter-rules-toolbar"}>{props.children}</div>
        <div className={"filter-rules-toolbar-bg"} />
      </div>
    </>
  )
}
