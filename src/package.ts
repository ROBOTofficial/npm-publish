import { existsSync, readFileSync } from "fs";
import { join } from "path";

export async function getPackageJson() {
  const packagePath = join(process.cwd(), "package.json");
  if (!existsSync(packagePath))
    throw new Error("package.json could not be found in your project's root.");
  const { name, version } = JSON.parse(readFileSync(packagePath, "utf-8"));

  if (!name || !version)
    throw new Error("name or version not found in package.json");

  return {
    name: name as string,
    version: version as string
  };
}

export async function isPublishedVersion(name: string, version: string) {
  try {
    const response = await fetch(
      `https://registry.npmjs.org/${name}/${version}`
    );
    return response.ok;
  } catch {
    return false;
  }
}
