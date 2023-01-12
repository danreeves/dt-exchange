import { CloseIcon } from "../Icons/CloseIcon"
import { SharedToolbarBtnProps, ToolbarButton } from "./ToolbarButton"

export function CloseButton(props: SharedToolbarBtnProps) {
  return (
    <>
      <ToolbarButton onClick={props.onClick}>
        <CloseIcon size={"large"} />
      </ToolbarButton>
    </>
  )
}
