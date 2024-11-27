import type { Size } from "../../../../types"
import "./CloseIcon.css"

export function CloseIcon(props: { size: Size }) {
	const iconSize: string =
		props.size === "large"
			? "filter-rules-large-icon"
			: props.size === "medium"
				? "filter-rules-medium-icon"
				: props.size === "small"
					? "filter-rules-small-icon"
					: "filter-rules-medium-icon"

	return (
		<>
			<i className={`filter-rules-icon filter-rules-close-icon ${iconSize}`} />
		</>
	)
}
