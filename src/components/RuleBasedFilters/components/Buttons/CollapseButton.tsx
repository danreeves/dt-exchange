import { SharedToolbarBtnProps, ToolbarButton } from "./ToolbarButton"
import { ChevronDownIcon } from "../Icons/ChevronDownIcon"
import { ChevronRightIcon } from "../Icons/ChevronRightIcon"
import { Size } from "../../../../types"

interface CollapseBtnProps extends SharedToolbarBtnProps {
  isOpen: boolean;
}

export const CollapseButton = ((props: CollapseBtnProps) => {
  return (
    <>
      <ToolbarButton onClick={props.onClick}>
        {props.isOpen ? (
          <ChevronDownIcon size={Size.Large} />
        ) : (
          <ChevronRightIcon size={Size.Large} />
        )}
      </ToolbarButton>
    </>
  )
})
