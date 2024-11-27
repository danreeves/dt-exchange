import { CloseIcon } from "../Icons/CloseIcon"
import { ToolbarButton } from "./ToolbarButton"
import type { Size } from "../../../../types"

type CloseBtnProps = {
	onClick: () => void
	size?: Size
	children?: any
}

export function CloseButton(props: CloseBtnProps) {
	return (
		<>
			<ToolbarButton onClick={props.onClick}>
				<CloseIcon size={props.size || "large"} />
			</ToolbarButton>
		</>
	)
}
