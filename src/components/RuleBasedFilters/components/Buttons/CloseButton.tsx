import { CloseIcon } from "../Icons/CloseIcon"
import { SharedToolbarBtnProps, ToolbarButton } from "./ToolbarButton"
import { Size } from "../../../../types"

export function CloseButton(props: SharedToolbarBtnProps) {
  return (
    <>
      <ToolbarButton onClick={props.onClick}>
        <CloseIcon size={Size.Large} />
      </ToolbarButton>
    </>
  )
}
