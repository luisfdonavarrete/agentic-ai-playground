import {copyFile, mkdir, readdir} from "node:fs/promises";

async function copyMarkdown(source, destination) {
    for (const entry of await readdir(source, {withFileTypes: true})) {
        if (entry.isDirectory()) {
            await copyMarkdown(
                new URL(`${entry.name}/`, source),
                new URL(`${entry.name}/`, destination),
            );
        } else if (entry.isFile() && entry.name.endsWith(".md")) {
            await mkdir(destination, {recursive: true});
            await copyFile(new URL(entry.name, source), new URL(entry.name, destination));
        }
    }
}

await copyMarkdown(new URL("../src/", import.meta.url), new URL("../dist/", import.meta.url));
