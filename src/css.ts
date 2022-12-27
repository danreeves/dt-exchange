import { waitFor } from "./utils"

export async function css(strings: TemplateStringsArray) {
  await waitFor(() => document.head, 66, 500)
  let styleSheet = document.createElement("style")
  styleSheet.innerText = strings.join("")
  document.head.appendChild(styleSheet)
}
