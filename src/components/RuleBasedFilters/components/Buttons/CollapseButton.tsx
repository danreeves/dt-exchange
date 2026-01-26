import { SharedToolbarBtnProps, ToolbarButton } from "./ToolbarButton"
import { ChevronDownIcon } from "../Icons/ChevronDownIcon"
import { ChevronRightIcon } from "../Icons/ChevronRightIcon"

interface CollapseBtnProps extends SharedToolbarBtnProps {
	isOpen: boolean
}
export function CollapseButton(props: CollapseBtnProps) {
	return (
		<>
			<ToolbarButton onClick={props.onClick}>
				{props.isOpen ? <ChevronDownIcon size={"large"} /> : <ChevronRightIcon size={"large"} />}
			</ToolbarButton>
		</>
	)
}
