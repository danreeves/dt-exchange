import fs from "fs"
import path from "path"
import * as esbuild from "esbuild"
import { zip } from "zip-a-folder"

function createBuilds() {
	// delete builds dir if it doesn't exist
	if (fs.existsSync("builds")) {
		fs.rmSync(path.join("builds"), { recursive: true })
	}

	// create it again
	fs.mkdirSync("builds")

	// for each manifest file
	for (const manifest of fs.readdirSync("manifests")) {
		const name = path.basename(manifest, ".json")

		fs.mkdirSync(path.join("builds", name))

		// copy all files from extension/ to builds/name/
		for (const file of fs.readdirSync("extension")) {
			fs.copyFileSync(
				path.join("extension", file),
				path.join("builds", name, file),
			)
		}

		// merge manifest file into builds/name/manifest.json
		const baseManifest = JSON.parse(fs.readFileSync("extension/manifest.json"))
		const manifestOverrides = JSON.parse(
			fs.readFileSync(path.join("manifests", manifest)),
		)

		// merge definitions and overwrite the manifest file in the build
		fs.writeFileSync(
			path.join("builds", name, "manifest.json"),
			JSON.stringify(
				{
					...baseManifest,
					...manifestOverrides,
				},
				null,
				4,
			),
		)
		zip(path.join("builds", name), path.join("builds", `${name}.zip`))
	}
}

let buildsPlugin = {
	name: "builds",
	setup(build) {
		build.onEnd(() => {
			createBuilds()
			console.log("built...")
		})
	},
}

const config = {
	entryPoints: ["./src/bundle.tsx", "./src/background.ts"],
	bundle: true,
	outdir: "extension",
	jsx: "automatic",
	loader: {
		".png": "dataurl",
		".md": "text",
	},
	plugins: [buildsPlugin],
}

if (process.argv.includes("--watch")) {
	config.sourcemap = true
	const ctx = await esbuild.context(config)
	await ctx.watch()
} else {
	await esbuild.build(config)
}
