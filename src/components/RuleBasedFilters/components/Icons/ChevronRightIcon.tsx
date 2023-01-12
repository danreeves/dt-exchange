import { Size } from "../../../../types"
import "./ChevronRightIcon.css"

export function ChevronRightIcon(props: { size: Size }) {
  const iconSize: string =
    props.size === Size.Large ? "filter-rules-large-icon"
      : props.size === Size.Medium ? "filter-rules-medium-icon"
        : props.size === Size.Small ? "filter-rules-small-icon" : "filter-rules-medium-icon";

  return (
    <>
      <i className={`filter-rules-icon filter-rules-chevron-right-icon ${iconSize}`} />
    </>
  )
}
