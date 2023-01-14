import type { Size } from "../../../../types"
import "./DragHandle.css"

export type DragHandleProps = {
  size: Size
}

export function DragHandleIcon(props: DragHandleProps) {
  const iconSize: string =
    props.size === "large" ? "filter-rules-large-icon"
      : props.size === "medium" ? "filter-rules-medium-icon"
        : props.size === "small" ? "filter-rules-small-icon" : "filter-rules-medium-icon";

  return (
    <>
      <div className={ `filter-rules-drag-handle-wrapper` }>
        <i className={ `filter-rules-drag-handle-icon ${ iconSize }` } />
        <i className={ `filter-rules-drag-handle-icon ${ iconSize }` } />
      </div>
    </>
  )
}
