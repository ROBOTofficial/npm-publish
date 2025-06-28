import * as core from "@actions/core";
import { exec } from "@actions/exec";
import { getPackageJson, isPublishedVersion } from "./package.js";

export async function run(): Promise<void> {
  try {
    const npmToken = core.getInput("npm-token");
    const publishedCheck = core.getBooleanInput("published-check");
    const installCommand = core.getInput("install");
    const runCommand = core.getInput("runCommand");
    const publishCommand = core.getInput("publish");

    if (!npmToken) {
      return core.setFailed("npm_token input not found");
    }

    if (publishedCheck) {
      const { name, version } = await getPackageJson();
      if (await isPublishedVersion(name, version)) {
        return core.notice(
          "The action has been terminated because the version has already been published."
        );
      }
    }

    await exec(`NODE_AUTH_TOKEN="${npmToken}"`);

    await exec(installCommand);

    if (runCommand) {
      await exec(runCommand);
    }

    await exec(publishCommand, [], {
      env: {
        NODE_AUTH_TOKEN: npmToken
      }
    });

    return core.notice("published!");
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message);
  }
}
